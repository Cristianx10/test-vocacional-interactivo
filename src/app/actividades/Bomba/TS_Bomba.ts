import * as createjs from 'createjs-module';

import NavegadorContext from '../../comunicacion/NavegadorContext';
import { Actividad } from '../../configuraciones/main';
import { resultados } from '../../resultados/resultados';
import { random, shuffle } from '../../utilidades/utils';
import Pantalla from '../../componentes/Pantalla/Pantalla';

interface Cable_style {
    normal: createjs.Graphics;
    click: createjs.Graphics;
    hover: createjs.Graphics;
    color: string;
}


class Cable1_style implements Cable_style {
    normal: createjs.Graphics;
    click: createjs.Graphics;
    hover: createjs.Graphics;
    color: string;

    constructor(color: string) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();

        this.normal.beginFill("black").drawRect(0, 3, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(10, 6, 35, 19, 50, 5).bezierCurveTo(50, 5, 60, -10, 78, 5);
        this.click.beginFill("black").drawRect(0, 3, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(10, 6, 35, 19, 40, 5).beginStroke("").moveTo(60, 5).beginStroke(this.color).bezierCurveTo(55, 5, 60, -10, 78, 5);
        this.hover.beginFill("black").drawRect(0, 3, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(10, 6, 35, 19, 50, 5).bezierCurveTo(50, 5, 60, -10, 78, 5);
    }

}

class Cable2_style implements Cable_style {
    normal: createjs.Graphics;
    click: createjs.Graphics;
    hover: createjs.Graphics;
    color: string;

    constructor(color: string) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();

        this.normal.beginFill("black").drawRect(0, 13, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 17, 20, 14, 34, 27).bezierCurveTo(34, 27, 55, 31, 60, 11).bezierCurveTo(60, 11, 60, 0, 76, 2);
        this.click.beginFill("black").drawRect(0, 13, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 17, 20, 14, 34, 27).beginStroke("").moveTo(53, 20).beginStroke(this.color).bezierCurveTo(53, 20, 60, 0, 76, 2);
        this.hover.beginFill("black").drawRect(0, 13, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(11, 17, 20, 14, 34, 27).bezierCurveTo(34, 27, 55, 31, 60, 11).bezierCurveTo(60, 11, 60, 0, 76, 2);
    }

}


class Cable3_style implements Cable_style {
    normal: createjs.Graphics;
    click: createjs.Graphics;
    hover: createjs.Graphics;
    color: string;

    constructor(color: string) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();

        this.normal.beginFill("black").drawRect(0, 0, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 5, 50, -12, 76, 13);
        this.click.beginFill("black").drawRect(0, 0, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 5, 30, -5, 40, 13).beginStroke("").moveTo(55, 13).beginStroke(this.color).bezierCurveTo(55, 13, 70, -5, 76, 13);
        this.hover.beginFill("black").drawRect(0, 0, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(11, 5, 50, -12, 76, 13);
    }

}


class Cable4_style implements Cable_style {
    normal: createjs.Graphics;
    click: createjs.Graphics;
    hover: createjs.Graphics;
    color: string;

    constructor(color: string) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();

        this.normal.beginFill("black").drawRect(0, 12, 13, 8).beginFill("").setStrokeStyle(2).beginStroke(this.color).bezierCurveTo(11, 17, 55, 22, 76, 0);
        this.click.beginFill("black").drawRect(0, 12, 13, 8).beginFill("").setStrokeStyle(2).beginStroke(this.color).bezierCurveTo(11, 17, 35, 22, 40, 15).beginStroke("").moveTo(55, 13).beginStroke(this.color).bezierCurveTo(55, 13, 70, -5, 76, 0);
        this.hover.beginFill("black").drawRect(0, 12, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(11, 17, 55, 22, 76, 0);
    }

}

class TS_Bomba extends Actividad {

    actual?: Cable;
    nActual = 0;
    cables: Array<Cable>;
    contenedor: createjs.Container;
    bomba?: createjs.Bitmap;
    fondo: createjs.Shape;
    mouse?: createjs.Bitmap;
    pantalla?: Pantalla;

    viewIntruccion?: HTMLElement;


    constructor() {
        super();
        this.cables = new Array();
        this.contenedor = new createjs.Container();
        this.size(600, 400)

        this.stage.enableMouseOver();
        this.contenedor.x = 60;
        this.contenedor.y = 100;
        this.contenedor.scaleX = 1.5;
        this.contenedor.scaleY = 1.1;


        this.fondo = new createjs.Shape();
        this.fondo.graphics.beginFill("#251E20").drawRoundRect(50, 40, 480, 300, 30);
        this.stage.addChild(this.fondo);
        this.stage.addChild(this.contenedor);



        this.bomba = new createjs.Bitmap("/img/salud/bomba.png");
        this.bomba.x = (this.canvas.width / 2) - (247 / 2);
        this.bomba.y = (this.canvas.height / 2) - (242 / 2);
        this.stage.addChild(this.bomba);
        this.stage.update();

        this.mouse = new createjs.Bitmap("/img/salud/mano.png");
        this.stage.addChild(this.mouse);

        this.stage.on("stagemousemove", () => {
            if (this.mouse != null) {
                this.mouse.x = this.stage.mouseX;
                this.mouse.y = this.stage.mouseY;
            }
            this.stage.update();
        });
        this.stage.update();

        this.propiedades.intentos = 0;
        this.propiedades.fallos = 0;
        this.propiedades.aciertos = 0;

        this.registro.setId("Bomba");

        this.setIntentoFallo(() => {
            var nav = NavegadorContext.navegador;
            if (nav) {
                nav.continuar();
            }

        })

        this.setValidacion(() => {
            var nav = NavegadorContext.navegador;
            if (nav) {
                nav.continuar();
            }

        })

        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }

    }

    uidstring: string = "";
    setUIDa(t: string) {
        this.uidstring = t;
    }

    onInicial() {


    }

    onFinal() {

        if (this.pantalla) {
            resultados.setTiempo(this, this.pantalla.timer.tiempo + "");
        }
        
        this.registro.setUID(this.uidstring);
        this.registro.agregar();
        resultados.evaluar(this)

    }

    mesclar(principal?: HTMLElement) {
        let distancia = 40;
        this.contenedor.removeAllChildren();
        shuffle(this.cables);
        let altura = 0;
        this.cables.forEach((c) => {
            c.cable.y = distancia * c.orden;
            this.contenedor.addChild(c.cable);

        });
        this.stage.update();
        this.nActual = 0;
        this.actual = this.cables[this.nActual];

        this.viewIntruccion = principal;
        if (this.viewIntruccion) {
            this.viewIntruccion.innerHTML = `Corta el cable <span style="color:${this.actual.color};">${this.actual.nombre}</span>`;
        }


    }

    siguiente() {
        this.nActual++;
        if (this.nActual < this.cables.length) {
            this.actual = this.cables[this.nActual];

            if (this.viewIntruccion) {
                this.viewIntruccion.innerHTML = `Corta el cable <span style="color:${this.actual.color};">${this.actual.nombre}</span>`;
            }
        }
    }

    agregarCable(nombre: string, color: string, color2: string) {
        let tipo = random(0, 3);
        let cable;
        switch (tipo) {
            case 0:
                cable = new Cable(this, nombre, color, color2, new Cable1_style(color2), this.cables.length);
                break;
            case 1:
                cable = new Cable(this, nombre, color, color2, new Cable2_style(color2), this.cables.length);
                break;
            case 2:
                cable = new Cable(this, nombre, color, color2, new Cable3_style(color2), this.cables.length);
                break;
            default:
                cable = new Cable(this, nombre, color, color2, new Cable4_style(color2), this.cables.length);
                break;
        }
        this.cables.push(cable);
    }
}

class Cable {

    stage: createjs.Stage;
    nombre: string;
    color: string;
    real: string;
    style: Cable_style;
    cable: createjs.Shape;
    bomba: TS_Bomba
    cortado = false;
    orden: number;


    constructor(bomba: TS_Bomba, nombre: string, color: string, color2: string, tipo: Cable_style, orden: number) {
        this.bomba = bomba;
        this.stage = bomba.stage;
        this.nombre = nombre;
        this.real = color2;
        this.color = color;
        this.style = tipo;
        this.cable = new createjs.Shape();
        this.cable.graphics = tipo.normal;
        this.orden = orden;
        this.cable.graphics.endStroke().beginFill("rgb(0,0,0,0.01)").drawRect(0, 0, 80, 20);


        this.cable.on("click", () => {
            if (this.bomba != null) {
                if (this.bomba.actual == this) {

                    this.bomba.propiedades.intentos++;
                    this.bomba.propiedades.aciertos++;

                    this.bomba.doIntentoAcierto();

                    if (this.bomba.nActual + 1 >= this.bomba.cables.length) {

                        this.bomba.doValidacion();
                    }
                } else {
                    this.bomba.propiedades.fallos++;
                    this.bomba.doIntentoFallo();
                }
                this.bomba.siguiente();
            }

            this.cable.graphics = this.style.click;
            this.stage.update();
            this.cortado = true;
        });

        this.cable.on("mouseover", () => {

            if (this.cortado == false) {
                this.cable.graphics = this.style.hover;
                this.cable.graphics.endStroke().beginFill("rgb(0,0,0,0.01)").drawRect(0, 0, 80, 30);
                this.stage.update();
            }

        });

        this.cable.on("mouseout", () => {
            if (this.cortado == false) {
                this.cable.graphics = this.style.normal;
                this.stage.update();
            }
        });
    }


}



export default TS_Bomba;