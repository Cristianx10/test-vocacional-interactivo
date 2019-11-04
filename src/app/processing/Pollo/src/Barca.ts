import APollitos, { Coordenada } from "./Logica";
import Personaje from "./Personaje";
import * as createjs from 'createjs-module';

class Barca {

    vista: createjs.Bitmap;
    escenario: APollitos;
    stage: createjs.Stage;

    pos: Coordenada;
    posInit: Coordenada;
    personajes: Personaje[];
    enMovimiento: boolean = false;

    constructor(escenario: APollitos) {
        this.escenario = escenario;
        this.stage = this.escenario.stage;
   
        this.vista = new createjs.Bitmap("/img/2019/pollo/img/barca.png")

        this.escenario.vistaJuego.addChild(this.vista);
        this.stage.update();
        this.pos = { x: 0, y: 0 };
        this.posInit = { x: 0, y: 0 };
        this.personajes = [];

        this.vista.on("click", () => {
            this.onClick();
        });


        this.vista.on("rollover", () => {
            if (this.personajes.length > 0) {
                this.vista.scaleX = 1.2;
                this.vista.scaleY = 1.2;
                this.stage.update();
            }
        });

        this.vista.on("mouseout", () => {
            this.vista.scaleX = 1;
            this.vista.scaleY = 1;
            this.stage.update();
        });
    }

    onClick() {

        let personajesMov = false;
        this.personajes.forEach((p) => {
            if (p.enMovimiento) {
                personajesMov = true;
            }
        })

        if (this.personajes.length > 0 && personajesMov == false) {

            if (this.escenario.zonaActiva == this.escenario.zonaA) {
                this.enMovimiento = true;
                createjs.Tween.get(this.vista).to({ x: this.pos.x + 200, y: this.pos.y }, 500).call(() => {
                    this.escenario.evaluar();
                    this.enMovimiento = false;
                });
                this.pos = { x: this.pos.x + 200, y: this.pos.y };
                this.escenario.zonaActiva = this.escenario.zonaB;
            } else {
                this.enMovimiento = true;
                createjs.Tween.get(this.vista).to({ x: this.pos.x - 200, y: this.pos.y }, 500).call(() => {
                    this.escenario.evaluar();
                    this.enMovimiento = false;
                });
                this.pos = { x: this.pos.x - 200, y: this.pos.y };
                this.escenario.zonaActiva = this.escenario.zonaA;
            }

            this.personajes.forEach((p, i) => {
                p.setPosAnimUnic(this.pos.x + ((i) * 90), this.pos.y - 40);
            });

        }
    }

    setPos(x: number, y: number) {
        this.vista.x = x;
        this.vista.y = y;
        this.pos = { x: x, y: y };
        this.posInit = { x: x + 0, y: y + 0 };
    }

    setPosAnim(x: number, y: number) {
        let mx = Math.abs(this.pos.x - x);
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

    acomodar() {
        this.personajes.forEach((p, i) => {
            p.setPosAnim(this.pos.x + (i * 90), this.pos.y - 40);
        })
        this.stage.update();
    }

    agregar(personaje: Personaje) {
        this.personajes.push(personaje);
        personaje.setPos(this.pos.x + ((this.personajes.length - 1) * 90), this.pos.y - 40);
        // this.acomodar();
    }

    agregarAnim(personaje: Personaje) {
        this.personajes.push(personaje);
        personaje.setPosAnim(this.pos.x + ((this.personajes.length - 1) * 90), this.pos.y - 40);
        //this.acomodar();
    }

    quitar(personaje: Personaje) {
        let index = this.personajes.indexOf(personaje);
        if (index != -1) {
            this.personajes.splice(index, 1);
        }
        // this.acomodar();
    }

    reset() {
        this.enMovimiento = true;
        createjs.Tween.get(this.vista).to({ x: this.posInit.x, y: this.posInit.y }, 500).call(() => {
            this.enMovimiento = false;
        });
        this.pos = { x: this.posInit.x, y: this.posInit.y };
        this.escenario.zonaActiva = this.escenario.zonaA;
        this.personajes = [];
    }

}

export default Barca;