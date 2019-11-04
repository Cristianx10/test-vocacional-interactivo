import { Actividad } from '../../../configuraciones/main';
import * as createjs from 'createjs-module';
import Barca from './Barca';
import Personaje from './Personaje';
import Zona from './Zona';

export interface Coordenada { x: number; y: number; }

class APollitos extends Actividad {
    personajes: Personaje[]

    zonaA: Zona;
    zonaB: Zona;

    zonas: Zona[] = [];

    zonaActiva: Zona;

    barca: Barca;

    vistaJuego: createjs.Container;

    vistaPerdio: createjs.Container;
    animPerdio: createjs.Sprite;

    constructor() {
        super();
        this.personajes = [];
        this.vistaJuego = new createjs.Container;
        this.stage.addChild(this.vistaJuego);

        this.zonaA = new Zona(this, { x: 50, y: 520 });
        this.zonaB = new Zona(this, { x: 900, y: 520 });

        this.zonas.push(this.zonaA);
        this.zonas.push(this.zonaB);

        this.barca = new Barca(this);
        this.barca.setPos(450, 550);

        this.stage.enableMouseOver();

        this.zonaActiva = this.zonaA;

        createjs.Ticker.addEventListener("tick", this.stage);
        this.agregar("pollito", { x: 100, y: 520 });
        this.agregar("pollito", { x: 200, y: 520 });
        this.agregar("pollito", { x: 300, y: 520 });
        this.agregar("", { x: 400, y: 520 });
        this.agregar("", { x: 500, y: 520 });
        this.agregar("", { x: 600, y: 520 });

        this.personajes.forEach(p => {
            this.zonaA.agregar(p);
        });

        this.propiedades.intentos = 0;
        this.propiedades.vidas = 3;
        this.propiedades.puntuacion = 0;
        this.propiedades.aciertos = 0;
        this.propiedades.fallos = 0;
        this.propiedades.validado = false;

        let data = {
            images: ["/img/2019/pollo/img/anim-perdio.png"],
            frames: { width: 300, height: 80, regX: 150, regY: 40 },
            animations: {},
            framerate: 30
        };

        this.vistaPerdio = new createjs.Container;

        let SpriteSheet = new createjs.SpriteSheet(data);
        this.animPerdio = new createjs.Sprite(SpriteSheet);
        let fondo = new createjs.Bitmap("/img/2019/pollo/img/lose.png");
        fondo.setBounds(0, 0, 1280, 720);
        fondo.scaleX = 1.2;
        fondo.scaleY = 1.2;

        this.vistaPerdio.on("click", () => {
            this.reset();
        })

        this.vistaPerdio.addChild(fondo, this.animPerdio);

        this.animPerdio.x = 640;
        this.animPerdio.y = 260;

    }

    agregar(tipo: string, pos: Coordenada) {
        if (tipo == "pollito") {
            let person = new Personaje(this, tipo);
            person.setPos(pos.x, pos.y);
            this.personajes.push(person);

        } else {
            let person = new Personaje(this);
            person.setPos(pos.x, pos.y);
            this.personajes.push(person);
        }

    }

    reset() {
        this.zonaA.reset();
        this.zonaB.reset();
        this.barca.reset();

        this.personajes.forEach(p => {
            this.zonaA.agregar(p);
        })

        this.animPerdio.stop();
        this.stage.addChild(this.vistaJuego);
        this.stage.removeChild(this.vistaPerdio);
    }

    evaluar() {
        this.propiedades.intentos++;
        this.doIntento();


        let acerto = 0;

        let valido = false;

        this.zonas.forEach((z) => {

            let nZorros = 0;
            let nPollos = 0;

            z.personajes.forEach((p) => {
                if (p.type == "pollito") {
                    nPollos++;
                } else {
                    nZorros++;
                }
            });

            if (this.zonaActiva == z) {
                this.barca.personajes.forEach((p) => {
                    if (p.type == "pollito") {
                        nPollos++;
                    } else {
                        nZorros++;
                    }
                });
            }

            if (nZorros > nPollos && nPollos != 0) {

            } else {
                acerto++;
            }

            if (z == this.zonaB && this.zonaActiva == this.zonaB) {
                if (this.personajes.length == (nZorros + nPollos)) {

                    valido = true;
                }
            }
        });

        if (acerto == 2) {
            this.propiedades.aciertos++;
            this.doIntentoAcierto();
        } else {
            this.propiedades.fallos++;
            this.propiedades.vidas--;
            this.doIntentoFallo();
            this.animPerdio.gotoAndPlay(0);
            this.stage.removeChild(this.vistaJuego);
            this.stage.addChild(this.vistaPerdio);
        }

        if (valido) {
            this.propiedades.validado = true;
            this.doValidacion();
        }




        //  this.zonaA.evaluar();
        //  this.zonaB.evaluar();
    }
}



export default APollitos;