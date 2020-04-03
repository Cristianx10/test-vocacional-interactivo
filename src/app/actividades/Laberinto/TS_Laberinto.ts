import * as createjs from 'createjs-module';

import ActividadContext from '../../comunicacion/ActividadContext';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import { Actividad } from '../../configuraciones/main';
import { resultados } from '../../resultados/resultados';
import Pantalla from '../../componentes/Pantalla/Pantalla';


class Laberinto_Meta {
    meta: createjs.Shape;
    activado: boolean;
    laberinto: TS_Laberinto;

    constructor(laberinto: TS_Laberinto, x: number, y: number, width: number, height: number) {
        this.laberinto = laberinto;

        this.meta = new createjs.Shape();
        this.meta.x = x;
        this.meta.y = y;
        this.activado = false;

        this.meta.graphics.beginFill("red").drawRect(0, 0, width, height);
        this.meta.setBounds(x, y, 30, 49);

        this.laberinto.l_interfaz.addChild(this.meta);
    }

    sobre(forma: createjs.Shape) {
        let sobre = false;
        if (this.meta != null) {
            let tamForm = forma.getBounds();
            let tam = this.meta.getBounds();
            if (forma.x + (tamForm.width / 2) > this.meta.x && forma.x - (tamForm.width / 2) < this.meta.x + tam.width &&
                forma.y + (tamForm.height / 2) > this.meta.y && forma.y - (tamForm.height / 2) < this.meta.y + tam.height) {
                sobre = true;
            }
        }
        return sobre;
    }

}

class Laberinto_cursor {

    ellipse: createjs.Shape;
    activado: boolean;
    laberinto: TS_Laberinto;
    inicio: boolean;

    initX: number;
    initY: number;

    constructor(laberinto: TS_Laberinto, x: number, y: number) {
        this.laberinto = laberinto;
        this.ellipse = new createjs.Shape();
        this.initX = x + 0;
        this.initY = y + 0;
        this.ellipse.x = x;
        this.ellipse.y = y;
        this.inicio = false;

        this.activado = false;
        this.ellipse.graphics.beginFill("#1E1E1E").drawCircle(0, 0, 5);
        this.ellipse.setBounds(x, y, 10, 10);


        this.ellipse.on("click", (e: any) => {
            this.activado = true;
            this.inicio = true;
            //e.remove();
        });

        this.laberinto.stage.on("stagemousemove", () => {

            if (this.activado) {
                this.mover(this.laberinto.stage.mouseX, this.laberinto.stage.mouseY);
            }

            if (this.inicio && this.activado == false) {
                this.mover(this.laberinto.stage.mouseX, this.laberinto.stage.mouseY);

                //this.laberinto.update();
            }

        });

        this.laberinto.l_interfaz.addChild(this.ellipse);


    }

    reset() {
        this.activado = false;
        this.inicio = false;
        this.ellipse.x = this.initX;
        this.ellipse.y = this.initY;
    }

    mover(x: number, y: number) {
        this.ellipse.x = x;
        this.ellipse.y = y;
    }
    getX() {
        return this.ellipse.x;
    }

    getY() {
        return this.ellipse.y;
    }

}

export default class TS_Laberinto extends Actividad {

    laberinto?: createjs.Sprite;
    cursor?: Laberinto_cursor;
    meta?: Laberinto_Meta;
    l_mapa: createjs.Container;
    l_interfaz: createjs.Container;

    initState = false;

    pantalla?: Pantalla;


    constructor() {
        super();

        this.stage.enableMouseOver();
        this.l_mapa = new createjs.Container();
        this.l_interfaz = new createjs.Container();
        this.contenedor.addChild(this.l_mapa, this.l_interfaz);

        this.propiedades.vidas = 3;
        this.propiedades.completo = false;
        this.propiedades.fallos = 0;

        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }

        if(ActividadContext.intentos){
            ActividadContext.intentos.setVidas(this.propiedades.vidas)
        }
    }

    crearLaberinto(url: string, width: number, height: number, cont: number, speed?: number) {

        let var_speed = 1;
        if (speed != null) { var_speed = speed; }

        let piezas = new createjs.SpriteSheet({
            images: [url],
            frames: { width: width, height: height },
            animations: {
                normal: [0, cont - 1, "normal", var_speed],
            },
        });

        this.laberinto = new createjs.Sprite(piezas, "normal");
        this.contenedor.setBounds(0, 0, width, height);
        this.contenedor.x = (this.canvas.width - width) / 2;
        this.contenedor.y = (this.canvas.height - height) / 2;

        this.l_mapa.addChildAt(this.laberinto, 0);
        this.stage.update();



        this.registro.setId("Laberinto");
    }

    continuar() {
        if (this.pantalla) {
            this.pantalla.continuar();
        }
    }

    onInicial() {

    }

    onFinal() {
        if (this.pantalla) {
            resultados.setTiempo(this, this.pantalla.timer.tiempo + "");
        }
        this.registro.agregar();
        resultados.evaluar(this);
    }

    crearCursor(x: number, y: number) {
        this.cursor = new Laberinto_cursor(this, x, y);
        this.iniciar(false);

    }

    iniciar(inicio?: boolean) {

        if (this.cursor != null) {
            if (inicio == null) {
                this.cursor.activado = true;
            } else {
                this.cursor.activado = inicio;
            }
        }

        if (this.initState === false) {
            this.initState = true;


            createjs.Ticker.addEventListener("tick", () => {
                if (this.cursor != null && this.cursor.activado) {

                    if (this.cursor.activado && this.sobre(this.cursor.ellipse)) {

                        if (this.intentoAcierto != null) {
                            this.intentoAcierto();
                        }

                    } else {
                        //this.detener();
                        this.propiedades.vidas -= 1;
                        this.propiedades.fallos += 1;

                        if(ActividadContext.intentos){
                            ActividadContext.intentos.setVidas(this.propiedades.vidas)
                        }
                        
                        if (this.intentoFallo != null) {
                            this.intentoFallo();
                        }


                    }

                    if (this.meta != null && this.meta.sobre(this.cursor.ellipse)) {
                        this.detener();
                        if (this.laberinto != null) {
                            this.laberinto.stop();
                        }

                        this.propiedades.completo = true;
                        if (this.validacion != null) {

                            this.validacion();
                        }
                    }
                }
                this.update();

            });

        }

    }

    private detener() {

        createjs.Ticker.removeAllEventListeners("tick");
        if (this.cursor != null) {
            this.cursor.activado = false;
        }

    }


    crearMeta(x: number, y: number, width: number, height: number) {
        this.meta = new Laberinto_Meta(this, x, y, width, height);
        this.stage.update();
    }

    sobre(forma: createjs.Shape) {
        let sobre = false;
        if (this.laberinto != null) {
            let tamForm = forma.getBounds();
            if (this.laberinto.hitTest(forma.x - this.laberinto.x + (tamForm.width / 2), forma.y - this.laberinto.y)) {
                sobre = true;
            } else {
                return false;
            }
            if (this.laberinto.hitTest(forma.x - this.laberinto.x - (tamForm.width / 2), forma.y - this.laberinto.y)) {
                sobre = true;
            } else {
                return false;
            }
            if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y + (tamForm.height / 2) - this.laberinto.y)) {
                sobre = true;
            } else {
                return false;
            }
            if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y - (tamForm.height / 2) - this.laberinto.y)) {
                sobre = true;
            } else {
                return false;
            }
        }
        return sobre;
    }

}