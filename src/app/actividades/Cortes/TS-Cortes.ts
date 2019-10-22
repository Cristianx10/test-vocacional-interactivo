import { radians, degrees } from '../../utilidades/utils';
import { Actividad } from '../../configuraciones/main';
import * as createjs from 'createjs-module';

function raizN(x: number, n: number) {
    return Math.exp(Math.log(x) / n);
}

interface Coordenada {
    x: number;
    y: number;
}

interface CoordenadaP {
    x: number;
    y: number;
    posx: number;
    posy: number;
}


export class SalaCirugia extends Actividad {

    cortando: boolean;
    bisturi?: createjs.Bitmap;
    cortes: Array<CorteLinea>;

    constructor() {
        super();

        if (this.registro)
            this.registro.setId("Cortes");

        this.cortando = false;
        this.canvas.width = 1000;
        this.canvas.height = 480;
        this.canvas.style.background = "#AEE9DB";

        let bisturi_img = document.createElement('img');
        bisturi_img.src = "../img/cortes/bisturi.png";

        let corte = new createjs.Shape();

        this.stage.addChild(corte);

        bisturi_img.addEventListener("load", () => {
            this.bisturi = new createjs.Bitmap(bisturi_img);
            this.stage.addChild(this.bisturi);

            this.stage.on("stagemousemove", () => {
                let x = this.stage.mouseX;
                let y = this.stage.mouseY;
                if (this.bisturi != null) {
                    this.bisturi.x = x - 5;
                    this.bisturi.y = y;
                }
                if (this.cortando) {
                    corte.graphics.beginFill("red").drawCircle(x, y, 1);
                }
                this.stage.update();
            });
        });

        this.cortes = [];
    }

    cargarCuerpo(url: string) {
        let cuerpoA = document.createElement('img');
        cuerpoA.src = url;

        cuerpoA.addEventListener("load", () => {
            let ima = new createjs.Bitmap(cuerpoA);
            let cor = ima.getBounds();
            ima.x = (this.canvas.width - cor.width) / 2;
            this.stage.addChildAt(ima, 0);
            this.stage.update();
        });
    }

    agregarLinea(coordenadaA: Coordenada, coordenadaB: Coordenada, distancia: number) {
        let corte = new CorteLinea(this, distancia);
        corte.trazadoLineal(coordenadaA, coordenadaB);
        this.cortes.push(corte);
        this.stage.addChild(corte.linea);
    }

    agregarCurva(coordenadaA: Coordenada, coordenadaB: Coordenada, frecuencia: number, distancia: number) {
        let corte = new CorteLinea(this, frecuencia);
        corte.trazoCurva(coordenadaA, coordenadaB, distancia);
        this.cortes.push(corte);
        this.stage.addChild(corte.linea);
    }

    agregarCurvaDerecha(coordenadaA: Coordenada, coordenadaB: Coordenada, frecuencia: number) {
        let corte = new CorteLinea(this, frecuencia);
        corte.trazadoCurvaIzquierda(coordenadaA, coordenadaB);
        this.cortes.push(corte);
        this.stage.addChild(corte.linea);
    }


}


export class CorteLinea {

    linea: createjs.Shape;
    puntos: Array<Coordenada>;
    historial: Array<Coordenada>;
    lienzo: SalaCirugia;
    registrando: boolean
    dis: number;
    color = "#EF3838";

    // puntos:Array<>;

    constructor(lienzo: SalaCirugia, dis: number) {
        this.dis = dis;
        this.puntos = [];
        this.lienzo = lienzo;
        this.registrando = false;
        this.historial = [];


        this.linea = new createjs.Shape();

        this.linea.on("mousedown", () => {
            this.registrando = true;
            this.lienzo.cortando = true;

        });

        lienzo.stage.on("stagemouseup", () => {
            if (this.registrando) {
                console.log("Des" + this.getDesviacion());
            }
            this.registrando = false;
            this.lienzo.cortando = false;
        });

        lienzo.stage.on("stagemousemove", () => {
            if (this.registrando) {
                let y = Math.round(this.lienzo.stage.mouseY);
                let x = Math.round(this.lienzo.stage.mouseX);
                this.historial.push({ x: x, y: y });
            }
        });
    }

    trazoCurva(inicio: Coordenada, final: Coordenada, distancia: number) {

        let nPuntos = final.y - inicio.y;

        for (let i = 0; i < nPuntos; i++) {

            let x = Math.round(inicio.x + Math.sin(radians(i * this.dis)) * distancia);
            let y = Math.round(inicio.y + (i));

            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });

        }

        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);
    }

    trazadoLineal(inicio: Coordenada, final: Coordenada) {

        let nPuntos = final.y - inicio.y;

        let m = 0;
        if ((final.x - inicio.x) == 0) {

        } else {
            m = (final.y - inicio.y) / (final.x - inicio.x);
        }


        for (let i = 0; i < nPuntos; i++) {

            let y = Math.round(i + inicio.y);
            let x = inicio.x;
            if (m != 0) {
                x = (y - inicio.y + (m * inicio.x)) / m;
            }

            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });
        }

        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);

    }

    trazadoCurvaDerecha(inicio: Coordenada, final: Coordenada) {

        let distancia = final.y - inicio.y;

        for (let i = 0; i < distancia; i++) {

            let index = i / distancia * 90;

            let x = Math.round(inicio.x + Math.cos(radians(index)) * distancia);
            let y = Math.round(inicio.y + Math.sin(radians(index)) * distancia);

            if (i == 0) {
                this.linea.graphics.beginFill("blue").drawCircle(x, y, 5);

            } else if (i == distancia - 1) {
                this.linea.graphics.beginFill("blue").drawCircle(x, y, 5);
            }

            this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            this.puntos.push({ x: x, y: y });
        }

    }

    trazadoCurvaIzquierda(inicio: Coordenada, final: Coordenada) {

        let distancia = final.y - inicio.y;

        for (let i = 0; i < distancia; i++) {

            let index = i / distancia * 90;

            let x = Math.round(inicio.x + -Math.cos(radians(index)) * distancia);
            let y = Math.round(inicio.y + Math.sin(radians(index)) * distancia);

            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });

            if (i == 0) {
                this.linea.graphics.beginFill("blue").drawCircle(x, y, 5);

            } else if (i == distancia - 1) {
                this.linea.graphics.beginFill("blue").drawCircle(x, y, 5);
            }

        }


    }

    getDesviacion() {
        let total = 0;
        let total_matrix = 0;

        this.historial.forEach((coordenada) => {
            let puntos = obtenerMenorDistancia(coordenada, this.puntos);
            let dis = distancia(puntos.a, puntos.b, coordenada);
            if (isNaN(dis)) {

            } else {
                total++;
                total_matrix += dis;

            }
        });

        let resultado = total_matrix / total;

        return resultado;
    }
}





function distancia(puntoO: Coordenada, puntoA: Coordenada, puntoB: Coordenada) {
    let OAX = puntoA.x - puntoO.x;
    let OAY = puntoA.y - puntoO.y;
    let OAD = Math.sqrt((OAX * OAX) + (OAY * OAY));

    let OBX = puntoB.x - puntoO.x;
    let OBY = puntoB.y - puntoO.y;
    let OBD = Math.sqrt((OBX * OBX) + (OBY * OBY));

    let esc = (OAX * OBX) + (OAY * OBY);

    let angulo = degrees(Math.acos(esc / (OAD * OBD)));

    let dis = OBD * Math.sin(radians(angulo));

    if (isNaN(angulo)) {
        console.log("Es: " + angulo);
    }

    return dis;
}

function obtenerMenorDistancia(ref: Coordenada, matrix: Array<Coordenada>) {
    let cordenadaA = { x: 0, y: 0 };
    let cordenadaB = { x: 0, y: 0 };
    let matrixD: Array<{ coordenada: Coordenada, distancia: number }> = []
    for (let i = 0; i < matrix.length; i++) {
        let m: Coordenada = matrix[i];
        let dis = Math.sqrt(Math.pow(m.x - ref.x, 2) + Math.pow(m.y - ref.y, 2));
        matrixD.push({ coordenada: m, distancia: dis });
    }

    matrixD.sort((a, b) => {
        return a.distancia - b.distancia;
    });


    cordenadaA = matrixD[0].coordenada;
    cordenadaB = matrixD[1].coordenada;

    return { a: cordenadaA, b: cordenadaB };
}