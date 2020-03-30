import p5 from 'p5';
import 'p5/lib/addons/p5.sound';

import ProcessingContext from '../../../comunicacion/ProcessingContext';
import Processing from '../../../componentes/Processing/Processing';

import Elemento from './Elemento';


export default class Logica {


    app: p5;


    pantalla: number;

    iden?: NodeJS.Timeout | any;

    tiempo: number;

    //PANTALLAS
    fuente: p5.Font;
    inicio: p5.Image;
    instrucciones: p5.Image;
    previo: p5.Image;
    juego: p5.Image;
    resultados: p5.Image;

    escuhar: Elemento;
    escuhar2: Elemento;
    escuhar3: Elemento;

    alegria: Elemento;
    asco: Elemento;
    ira: Elemento;
    miedo: Elemento;
    sorpresa: Elemento;
    tristeza: Elemento;
    intentosimg: Elemento;

    caso1: p5.SoundFile;
    caso2: p5.SoundFile;
    caso3: p5.SoundFile;

    unocasouno: Elemento;
    doscasouno: Elemento;
    trescasouno: Elemento;

    unocasodos: Elemento;
    doscasodos: Elemento;

    unocasotres: Elemento;
    doscasotres: Elemento;
    trescasotres: Elemento;

    intentos: number;

    emocion: string;

    seleccion?: Elemento;
    seleccionado: boolean;

    unocasounoestado: boolean;
    doscasounoestado: boolean;
    trescasounoestado: boolean;

    unocasodosestado: boolean;
    doscasodosestado: boolean;

    unocasotresestado: boolean;
    doscasotresestado: boolean;
    trescasotresestado: boolean;

    //algoritmo de resultaedos

    caso1resultado: string[];
    caso2resultado: string[];
    caso3resultado: string[];
    puntaje: number;

    icono: p5.Image | undefined;
    icono2: p5.Image | undefined;
    icono3: p5.Image | undefined;
    icono1_2: p5.Image | undefined;
    icono2_2: p5.Image | undefined;
    icono1_3: p5.Image | undefined;
    icono2_3: p5.Image | undefined;
    icono3_3: p5.Image | undefined;

    processing?: Processing;
    propiedades: any = {};


    constructor(app: p5) {

        const loadSound = (path: string) =>
            ((app as any) as p5.SoundFile).loadSound(path);

        this.app = app;
        this.run = this.run.bind(this);
        this.pantalla = 0;
        this.tiempo = 480;
        this.iden = undefined;

        //PANTALLAS
        this.fuente = this.app.loadFont("/img/2020/Gusanito/fuentes/Montserrat-SemiBold.otf");
        this.inicio = this.app.loadImage("/img/2020/Gusanito/data/Inicio.jpg");
        this.instrucciones = this.app.loadImage("/img/2020/Gusanito/data/Instrucciones.jpg");
        this.previo = this.app.loadImage("/img/2020/Gusanito/data/Previo.jpg");
        this.juego = this.app.loadImage("/img/2020/Gusanito/data/Juego.jpg");
        this.resultados = this.app.loadImage("/img/2020/Gusanito/data/Resultados.jpg");
        this.escuhar = new Elemento(this.app, "/img/2020/Gusanito/data/escuchar.png", 319, 93);
        this.escuhar2 = new Elemento(this.app, "/img/2020/Gusanito/data/escuchar.png", 319, 409);
        this.escuhar3 = new Elemento(this.app, "/img/2020/Gusanito/data/escuchar.png", 967, 93);

        this.alegria = new Elemento(this.app, "/img/2020/Gusanito/data/alegria.png", 850, 468);
        this.asco = new Elemento(this.app, "/img/2020/Gusanito/data/asco.png", 1167, 468);
        this.ira = new Elemento(this.app, "/img/2020/Gusanito/data/ira.png", 1087, 468);
        this.miedo = new Elemento(this.app, "/img/2020/Gusanito/data/miedo.png", 772, 468);
        this.sorpresa = new Elemento(this.app, "/img/2020/Gusanito/data/sorpresa.png", 927, 468);
        this.tristeza = new Elemento(this.app, "/img/2020/Gusanito/data/tristeza.png", 1007, 468);
        this.intentosimg = new Elemento(this.app, "/img/2020/Gusanito/data/intentos.png", 570, 120);

        this.caso1 = loadSound("/img/2020/Gusanito/data/audios/caso1.mpeg");
        this.caso2 = loadSound("/img/2020/Gusanito/data/audios/caso2.mpeg");
        this.caso3 = loadSound("/img/2020/Gusanito/data/audios/caso3.mpeg");

        this.unocasouno = new Elemento(this.app, "/img/2020/Gusanito/data/1caso1.png", 179, 197);
        this.doscasouno = new Elemento(this.app, "/img/2020/Gusanito/data/2caso1.png", 283, 187);
        this.trescasouno = new Elemento(this.app, "/img/2020/Gusanito/data/3caso1.png", 389, 197);

        this.unocasodos = new Elemento(this.app, "/img/2020/Gusanito/data/1caso2.png", 282, 490);
        this.doscasodos = new Elemento(this.app, "/img/2020/Gusanito/data/2caso2.png", 390, 500);

        this.unocasotres = new Elemento(this.app, "/img/2020/Gusanito/data/1caso3.png", 890, 205);
        this.doscasotres = new Elemento(this.app, "/img/2020/Gusanito/data/2caso3.png", 997, 196);
        this.trescasotres = new Elemento(this.app, "/img/2020/Gusanito/data/3caso3.png", 1100, 205);

        this.intentos = 5;

        this.emocion = "";

        this.seleccion;
        this.seleccionado = false;

        this.unocasounoestado = false;
        this.doscasounoestado = false;
        this.trescasounoestado = false;

        this.unocasodosestado = false;
        this.doscasodosestado = false;

        this.unocasotresestado = false;
        this.doscasotresestado = false;
        this.trescasotresestado = false;

        //algoritmo de resultaedos

        this.caso1resultado = ['', '', ''];
        this.caso2resultado = ['', ''];
        this.caso3resultado = ['', '', ''];
        this.puntaje = 0;



        if (ProcessingContext.actividad) {
            this.processing = ProcessingContext.actividad;
            this.propiedades = this.processing.propiedades;
        }

        this.propiedades.puntaje = this.puntaje;

        this.propiedades.puntaje1 = this.puntaje;
        this.propiedades.puntaje2 = this.puntaje;
        this.propiedades.puntaje3 = this.puntaje;

        this.propiedades.emocion = this.emocion;
        this.propiedades.intentos = this.intentos;

    }


    pintar() {
        switch (this.pantalla) {

            case 0:
                //PANTALLA INICIAL
                this.app.image(this.inicio, 0, 0);
                break;
            case 1:
                //PANTALLA INSTRUCCIONES
                this.app.image(this.instrucciones, 0, 0);
                break;
            case 2:
                //PANTALLA PREVIO AL JUEGO
                this.app.image(this.previo, 0, 0);
                break;
            case 3:
                this.app.background(0);
                //PANTALLA JUEGO
                this.app.image(this.juego, 0, 0);

                if (this.caso1.isPlaying()) {
                    this.app.tint(255, 255, 0);
                }
                this.escuhar.pintar();
                this.app.noTint();
                if (this.caso2.isPlaying()) {
                    this.app.tint(255, 255, 0);
                }
                this.escuhar2.pintar();
                this.app.noTint();
                if (this.caso3.isPlaying()) {
                    this.app.tint(255, 255, 0);
                }
                this.escuhar3.pintar();
                this.app.noTint();



                this.unocasouno.pintar();
                this.doscasouno.pintar();
                this.trescasouno.pintar();

                this.unocasodos.pintar();
                this.doscasodos.pintar();

                this.unocasotres.pintar();
                this.doscasotres.pintar();
                this.trescasotres.pintar();


                //pintar vidas
                for (let i = 0; i < this.intentos; i++) {
                    this.intentosimg.pintar()
                    this.intentosimg.setposx(590 + (i * 30));

                }






                this.app.imageMode(this.app.CENTER);
                //caso 1
                if (this.unocasounoestado === true && this.icono) {
                    this.app.image(this.icono, 185, 199, 67, 67);

                }
                if (this.doscasounoestado === true && this.icono2) {
                    this.app.image(this.icono2, 288, 190, 77, 77);

                }
                if (this.trescasounoestado === true && this.icono3) {
                    this.app.image(this.icono3, 394, 200, 93, 93);

                }


                //caso 2

                if (this.unocasodosestado === true && this.icono1_2) {
                    this.app.image(this.icono1_2, 287, 495, 77, 77);

                }
                if (this.doscasodosestado === true && this.icono2_2) {
                    this.app.image(this.icono2_2, 396, 503, 97, 97);

                }


                //caso 3

                if (this.unocasotresestado === true && this.icono1_3) {
                    this.app.image(this.icono1_3, 896, 208, 97, 97);

                }
                if (this.doscasotresestado === true && this.icono2_3) {
                    this.app.image(this.icono2_3, 1000, 199, 80, 80);

                }
                if (this.trescasotresestado === true && this.icono3_3) {
                    this.app.image(this.icono3_3, 1105, 209, 68, 68);

                }


                //condicio de tiempo

                if (this.tiempo <= 0) {
                    this.caso1.stop();
                    this.caso2.stop();
                    this.caso3.stop();
                    this.stop();
                    this.pantalla = 4;

                }




                this.alegria.pintar();
                this.asco.pintar();
                this.ira.pintar();
                this.miedo.pintar();
                this.sorpresa.pintar();
                this.tristeza.pintar();

                this.app.imageMode(this.app.CORNER);


                this.app.textFont(this.fuente);
                this.app.textSize(50);
                this.app.fill(0);
                this.app.text("Tiempo:" + this.tiempo + "s", 810, 580);



                break;
            case 4:
                //PANTALLA RESULTADOS
                this.app.image(this.resultados, 0, 0);
                this.app.fill(255);
                this.app.textAlign(this.app.CENTER);
                this.app.text(this.tiempo + "s", 640, 345);
                break;
        }
        this.app.fill(0);
        this.propiedades.puntuacion = this.puntaje;
        //this.app.text("x:" + this.app.mouseX + "y:" + this.app.mouseY, 500, 500);
    }

    click() {
        switch (this.pantalla) {
            case 0:
                //PANTALLA INICIO
                //Pasar de la pantalla de inicio a la pantalla de instrucciones
                if (this.app.mouseX > 465 && this.app.mouseX < 820 && this.app.mouseY > 595 && this.app.mouseY < 660 && this.pantalla == 0) {
                    this.pantalla = 1;
                }
                break;
            case 1:
                //PANTALLA INSTRUCCIONES
                //Pasa de la pantalla de instrucciones a la pantalla previa al juego
                if (this.app.mouseX > 520 && this.app.mouseX < 760 && this.app.mouseY > 595 && this.app.mouseY < 660 && this.pantalla == 1) {
                    this.pantalla = 2;
                }
                break;
            case 2:
                //PANTALLA PREVIA AL JUEGO
                //Pasa de la pantalla previa a la pantalla del juego
                if (this.app.mouseX > 465 && this.app.mouseX < 820 && this.app.mouseY > 590 && this.app.mouseY < 655 && this.pantalla == 2) {
                    this.pantalla = 3;
                    this.start();
                }
                break;
            case 3:


                //audios

                if (this.escuhar.isSobre() && this.caso1.isPlaying() == false && this.intentos >= 1) {
                    this.caso2.stop();
                    this.caso3.stop();
                    this.caso1.play();
                    this.intentos--;
                }

                if (this.escuhar2.isSobre() && this.caso2.isPlaying() == false && this.intentos >= 1) {
                    this.caso1.stop();
                    this.caso3.stop();
                    this.caso2.play();
                    this.intentos--;
                }

                if (this.escuhar3.isSobre() && this.caso3.isPlaying() == false && this.intentos >= 1) {
                    this.caso1.stop();
                    this.caso2.stop();
                    this.caso3.play();
                    this.intentos--;
                }

                this.propiedades.intentos = this.intentos;

                //Area sensible Eliminar vidas
                if (this.app.mouseX > 300 && this.app.mouseX < 350 && this.app.mouseY > 67 &&
                    this.app.mouseY < 110) {

                }


                if (this.alegria.isSobre()) {
                    this.seleccion = this.alegria;
                    this.seleccionado = true;
                    this.emocion = "alegria";

                }

                if (this.miedo.isSobre()) {
                    this.seleccion = this.miedo;
                    this.seleccionado = true;
                    this.emocion = "miedo";

                }

                if (this.sorpresa.isSobre()) {
                    this.seleccion = this.sorpresa;
                    this.seleccionado = true;
                    this.emocion = "sorpresa";

                }

                if (this.tristeza.isSobre()) {
                    this.seleccion = this.tristeza;
                    this.seleccionado = true;
                    this.emocion = "tristeza";

                }

                if (this.ira.isSobre()) {
                    this.seleccion = this.ira;
                    this.seleccionado = true;
                    this.emocion = "ira";

                }

                if (this.asco.isSobre()) {
                    this.seleccion = this.asco;
                    this.seleccionado = true;
                    this.emocion = "asco";

                }

                this.propiedades.emocion = this.emocion;

                if (this.app.mouseX > 860 && this.app.mouseX < 1070 && this.app.mouseY > 605 && this.app.mouseY < 645 && this.pantalla == 3) {
                    this.pantalla = 4;
                    this.stop();


                    //Evaluar las respuesas

                    let caso1rescorrect = 'sorpresa,tristeza,miedo';
                    let caso2rescorrect = 'alegria,ira';
                    let caso3rescorrect = 'tristeza,sorpresa,asco';
                    ;

                    //evaluacion caso 1
                    if (this.caso1resultado.join() === caso1rescorrect) {
                        this.puntaje += 75;
                        this.propiedades.puntaje1 += 75;
                    } if (this.caso1resultado.join() != caso1rescorrect && this.caso1resultado.includes('sorpresa') && this.caso1resultado.includes('tristeza') && this.caso1resultado.includes('miedo')) {
                        this.puntaje += 15;
                        this.propiedades.puntaje1 += 15;
                    }


                    //evaluacion caso 2
                    if (this.caso2resultado.join() === caso2rescorrect) {
                        this.puntaje += 50;
                        this.propiedades.puntaje2 += 50;
                    } if (this.caso2resultado.join() != caso2rescorrect && this.caso2resultado.includes('alegria') && this.caso2resultado.includes('ira')) {
                        this.puntaje += 10;
                        this.propiedades.puntaje2 += 10;
                    }



                    //evaluacion caso 3
                    if (this.caso3resultado.join() === caso3rescorrect) {
                        this.puntaje += 75;
                        this.propiedades.puntaje3 += 75;
                    } if (this.caso3resultado.join() != caso3rescorrect && this.caso3resultado.includes('tristeza') && this.caso3resultado.includes('sorpresa') && this.caso3resultado.includes('asco')) {
                        this.puntaje += 15;
                        this.propiedades.puntaje3 += 15;
                    }

                    this.caso3.stop();
                    this.caso1.stop();
                    this.caso2.stop();

                    this.propiedades.puntuacion = this.puntaje;

                    console.log(this.puntaje);

                    setTimeout(() => {
                        if (this.processing) {
                            this.processing.continuar();
                        }
                    }, 5000);

                }

                break;
        }


        //llevarse la cara

    }

    arrastre() {
        if (this.seleccion != null) {
            this.seleccion.arrastrar();
        }
    }


    soltar() {

        //caso 1

        if (this.seleccion != null && this.unocasouno.isSobre()) {
            this.caso1resultado.splice(0, 1, this.emocion);
            console.log(this.caso1resultado);
            this.icono = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.unocasounoestado = true;
        }


        if (this.seleccion != null && this.doscasouno.isSobre()) {
            this.caso1resultado.splice(1, 1, this.emocion);
            console.log(this.caso1resultado);
            this.icono2 = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.doscasounoestado = true;

        }


        if (this.seleccion != null && this.trescasouno.isSobre()) {
            this.caso1resultado.splice(2, 1, this.emocion);
            console.log(this.caso1resultado);
            this.icono3 = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.trescasounoestado = true;

        }


        //caso 2

        if (this.seleccion != null && this.unocasodos.isSobre()) {
            this.caso2resultado.splice(0, 1, this.emocion);
            console.log(this.caso2resultado);
            this.icono1_2 = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.unocasodosestado = true;



        }


        if (this.seleccion != null && this.doscasodos.isSobre()) {
            this.caso2resultado.splice(1, 1, this.emocion);
            console.log(this.caso2resultado);
            this.icono2_2 = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.doscasodosestado = true;

        }


        //caso 3
        if (this.seleccion != null && this.unocasotres.isSobre()) {
            this.caso3resultado.splice(0, 1, this.emocion);
            console.log(this.caso3resultado);
            this.icono1_3 = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.unocasotresestado = true;



        }


        if (this.seleccion != null && this.doscasotres.isSobre()) {
            this.caso3resultado.splice(1, 1, this.emocion);
            console.log(this.caso3resultado);
            this.icono2_3 = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.doscasotresestado = true;

        }


        if (this.seleccion != null && this.trescasotres.isSobre()) {
            this.caso3resultado.splice(2, 1, this.emocion);
            console.log(this.caso3resultado);
            this.icono3_3 = this.app.loadImage("/img/2020/Gusanito/data/" + this.emocion + ".png");
            this.trescasotresestado = true;

        }

        this.seleccionado = false;
        if (this.seleccion != null && this.seleccion != undefined) {
            this.seleccion.resetPosicion();
            this.seleccion = undefined;
        }

    }



    start() {
        this.iden = setInterval(this.run, 1000);
    }

    run() {
        this.tiempo--;
    }

    stop() {
        clearInterval(this.iden);
    }











}