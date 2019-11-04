import APollitos, { Coordenada } from "./Logica";
import Barca from "./Barca";
import * as createjs from 'createjs-module';

class Personaje {

    vista: createjs.Bitmap;
    escenario: APollitos;
    stage: createjs.Stage;

    type: string;
    pos: Coordenada;
    barca: Barca;
    enMovimiento: boolean = false;

    constructor(escenario: APollitos, type?: string) {
        if (type) {
            this.type = type;
            this.vista = new createjs.Bitmap("/img/2019/pollo/img/pollo.png");
        } else {
            this.type = "zorro";
            this.vista = new createjs.Bitmap("/img/2019/pollo/img/zorro.png");
        }
        this.escenario = escenario;
        this.barca = this.escenario.barca;
        this.stage = this.escenario.stage;

        this.pos = { x: 0, y: 0 };


        this.escenario.vistaJuego.addChildAt(this.vista, 0);
        this.stage.update();

        this.vista.on("click", () => {
            let indexBarca = this.barca.personajes.indexOf(this);
            let indexZona = this.escenario.zonaActiva.personajes.indexOf(this);

            if (this.barca.enMovimiento == false) {

                if (indexBarca != -1) {
                    this.barca.quitar(this);
                    this.escenario.zonaActiva.agregar(this);

                } else if (this.barca.personajes.length < 2 && indexZona != -1) {
                    this.escenario.zonaActiva.quitar(this);
                    this.barca.acomodar();
                    this.barca.agregarAnim(this);
                }
            }
        });


        this.vista.on("rollover", () => {
            this.vista.scaleX = 1.2;
            this.vista.scaleY = 1.2;
            this.stage.update();
        });

        this.vista.on("mouseout", () => {
            this.vista.scaleX = 1;
            this.vista.scaleY = 1;
            this.stage.update();
        });
    }


    setPos(x: number, y: number) {
        this.vista.x = x;
        this.vista.y = y;
        this.pos = { x: x, y: y };
    }


    setPosAnim(x: number, y: number) {
        let mx = Math.abs(x + this.pos.x) / 2;
        let my = this.pos.y - 150;
        this.enMovimiento = true;
        createjs.Tween.get(this.vista).to({ x: mx, y: my }, 500, createjs.Ease.circIn).to({ x: x, y: y }, 500).call(() => { this.enMovimiento = false; });
        this.pos = { x: x, y: y };
    }

    setPosAnimUnic(x: number, y: number) {
        this.enMovimiento = true;
        createjs.Tween.get(this.vista).to({ x: x, y: y }, 500).call(() => { this.enMovimiento = false; });
        this.pos = { x: x, y: y };
    }

}


export default Personaje;