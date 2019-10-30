import p5 from "p5";
import Logica from './Logica';
import ProcessingImg from "../../../componentes/Processing/ProcessingImg";

interface IRGB {
    r: number;
    g: number;
    b: number;
}

export class Nino {

    log: Logica
    app: p5;
    color: IRGB;

    x: number;
    y: number;

    ancho: number;
    alto: number;

    tiempopedir: number = 0;
    xpanal: number = 0;
    ypanal: number = 0;

    necesidad: number;
    contador: number;
    anchobarra: number;
    altobarra: number;
    contadorbarra: number;
    error: number;
    iniciarcontador: boolean;

    panalsucio: p5.Image;

    img: ProcessingImg;

    constructor(log: Logica, x: number, y: number, ancho: number, alto: number) {
        this.log = log;
        this.x = x;
        this.y = y;
        this.app = this.log.app;
        this.color = {
            r: 0,
            g: 222,
            b: 211
        };
        this.ancho = ancho;
        this.alto = alto;

        /**---------- */
        this.necesidad = 0;
        this.contador = 0;
        this.iniciarcontador = true;
        this.anchobarra = 96;
        this.altobarra = 12;
        this.contadorbarra = 0;
        this.error = 0;

        this.img = new ProcessingImg(this.app);

        this.panalsucio = this.img.loadImage("/img/2019/revoltosos/data/panalsucio.png");

    }

    seleccionarNecesidad() {//---------------------------------------------------------------------------------------------
        if (this.log.getPantalla() == 3) {
            if (this.iniciarcontador) {
                this.contador = this.app.millis();
                this.iniciarcontador = false;
                let randomtiempo = parseInt(this.app.random(2, 6) + "");
                this.tiempopedir = randomtiempo * 1000;
            }

            if (this.necesidad == 0) {
                console.log("Nina2 tiempo:" + this.tiempopedir);
                if (parseInt(this.app.millis() + "") - this.contador >= this.tiempopedir) {
                    this.necesidad = parseInt(this.app.random(1, 7) + "");
                    this.contadorbarra = this.app.millis();
                }
            }
        }
    }

    recibir(i: number) {
        if (i == this.necesidad) {
            if (this.necesidad == 22) {
                this.necesidad = 23;
            } else {
                /**Acierto */
                console.log("Correcto");
                this.necesidad = 0;
                this.contador = this.app.millis();
                this.error = -1;
                this.calcularfelicidad();
            }
        } else {
            this.error = 1;
            this.calcularfelicidad();
            /**Fallos */
            console.log("Incorrecto");
        }
    }

    arrastrarPanal() {
        if (this.necesidad == 2) {
            this.xpanal = this.app.mouseX - 41;
            this.ypanal = this.app.mouseY - 36;
            this.log.seleccion = this.panalsucio;
            console.log("selecionadado")
        }
    }

    soltarPanal() {
        if (this.necesidad == 2) {
            //System.out.println("tiene pa�al sucioooooooooooooooooooooooooo");
            if (this.xpanal + 41 > this.log.getXbasura() && this.xpanal + 41 < this.log.getXbasura() + 71
                && this.ypanal + 36 > this.log.getYbasura() && this.ypanal + 36 < this.log.getYbasura() + 121) {
                //System.out.println("solto pa�aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal");
                this.necesidad = 22;
                this.xpanal = this.x + this.ancho / 2;
                this.ypanal = this.y + this.alto / 2;
            } else {
                this.xpanal = this.x + this.ancho / 2;
                this.ypanal = this.y + this.alto / 2;
            }
        }
    }

    calcularfelicidad() {
        if (this.error == 1) {
            this.log.barrafelicidad(-4);
        } else {
            if (((this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12)) / 12) >= 5) {
                //System.out.println("envi� feliiiz");
                this.log.barrafelicidad(4);
            } else if (((this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12)) / 12) >= 1) {
                //System.out.println("envi� normaaaal");
                this.log.barrafelicidad(0);
            } else if (((this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12)) / 12) <= 0) {
                //System.out.println("envi� tristeeee");
                this.log.barrafelicidad(-4);
            }
        }
    }



    setTiempopedir(tiempopedir: number) {
        this.tiempopedir = tiempopedir;
    }

}

export default Nino;