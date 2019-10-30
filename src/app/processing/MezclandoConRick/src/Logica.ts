import p5 = require("p5");
import { number } from "prop-types";
import Elemento from "./Elemento";

export default class Logica {

    app: p5;
    pantalla: number;

    iden: any;
    idenins: any;


    tiempo: number;

    tiempoins: number;

    mezclando: boolean;
    reproduciendo: boolean;
    rickmezclando: p5.Image[] = [];
    puntero: number;
    contadoranim: number;



    sel: boolean;
    seleccion?: Elemento;
    reto: number;
    aciertos: number; //cuenta los aciertos
    font: p5.Font;
    fondo: p5.Image;
    mesa: p5.Image;
    rick: p5.Image;
    decoracion1: p5.Image;
    decoracion2: p5.Image;

    hidrogeno: Elemento;
    oxigeno: Elemento;
    sodio: Elemento;
    aluminio: Elemento;
    cloro: Elemento;


    cobre: Elemento;
    bromo: Elemento;
    hierro: Elemento;
    litio: Elemento;
    calcio: Elemento;

    recipiente: Elemento;
    recipiente2: Elemento;
    boton: Elemento;
    libro: Elemento;
    mas: p5.Image;

    libroShow = false;
    compuestos: p5.Image;
    compuestosinicio: p5.Image;
    instrucciones: p5.Image;
    jugar: Elemento;
    continuar: Elemento;
    cerrar: Elemento;


    compuesto1: p5.Image;
    compuesto2: p5.Image;
    compuesto3: p5.Image;
    compuesto4: p5.Image;
    compuesto5: p5.Image;
    compuesto6: p5.Image;
    compuesto7: p5.Image;
    compuesto8: p5.Image;
    compuesto9: p5.Image;
    compuesto10: p5.Image;





    icono?: p5.Image;
    icono2?: p5.Image;

    elemento: number;
    mezcla = "";
    mezcla2 = "";
    separador: string[] = [];
    separador2: string[] = [];


    constructor(app: p5) {
        this.app = app;
        this.pantalla = 0;
        this.run = this.run.bind(this);
        this.iden = null;
        this.tiempo = 90;

        this.runins = this.runins.bind(this);
        this.idenins = null;
        this.tiempoins = 30;

        this.mezclando = false;
        this.reproduciendo = true;
        this.rickmezclando = [];
        this.puntero = 0;
        this.contadoranim = 0;

        for (var i = 0; i < 12; i++) {
            this.rickmezclando.push(this.app.loadImage("/img/2019/ciencias/imgs/animacion/rick" + i + ".png"));
        }

        this.elemento = -1;

        this.sel = false;

        this.reto = 0;
        this.aciertos = 0; //cuenta los aciertos
        this.font = this.app.loadFont("/img/2019/ciencias/fonts/impact.ttf");
        this.fondo = this.app.loadImage("/img/2019/ciencias/imgs/fondo.png");
        this.mesa = this.app.loadImage("/img/2019/ciencias/imgs/mesa.png");
        this.rick = this.app.loadImage("/img/2019/ciencias/imgs/rick.png");
        this.decoracion1 = this.app.loadImage("/img/2019/ciencias/imgs/decoracion1.png");
        this.decoracion2 = this.app.loadImage("/img/2019/ciencias/imgs/decoracion2.png");

        this.hidrogeno = new Elemento(this.app, "/img/2019/ciencias/imgs/hidrogeno.png", 208, 93);
        this.oxigeno = new Elemento(this.app, "/img/2019/ciencias/imgs/oxigeno.png", 293, 93);
        this.sodio = new Elemento(this.app, "/img/2019/ciencias/imgs/sodio.png", 375, 93);
        this.aluminio = new Elemento(this.app, "/img/2019/ciencias/imgs/aluminio.png", 463, 93);
        this.cloro = new Elemento(this.app, "/img/2019/ciencias/imgs/cloro.png", 548, 93);


        this.cobre = new Elemento(this.app, "/img/2019/ciencias/imgs/cobre.png", 208, 245);
        this.bromo = new Elemento(this.app, "/img/2019/ciencias/imgs/bromo.png", 293, 245);
        this.hierro = new Elemento(this.app, "/img/2019/ciencias/imgs/hierro.png", 375, 245);
        this.litio = new Elemento(this.app, "/img/2019/ciencias/imgs/litio.png", 463, 245);
        this.calcio = new Elemento(this.app, "/img/2019/ciencias/imgs/calcio.png", 548, 245);

        this.recipiente = new Elemento(this.app, "/img/2019/ciencias/imgs/cuadrado.png", 240, 625);
        this.recipiente2 = new Elemento(this.app, "/img/2019/ciencias/imgs/cuadrado2.png", 530, 625);
        this.boton = new Elemento(this.app, "/img/2019/ciencias/imgs/boton.png", 740, 625);
        this.libro = new Elemento(this.app, "/img/2019/ciencias/imgs/libro.png", 1115, 91);
        this.mas = this.app.loadImage("/img/2019/ciencias/imgs/mas.png");

        this.libroShow = false;
        this.compuestos = this.app.loadImage("/img/2019/ciencias/imgs/compuestos.png");
        this.compuestosinicio = this.app.loadImage("/img/2019/ciencias/imgs/compuestosinicio.png");
        this.instrucciones = this.app.loadImage("/img/2019/ciencias/imgs/instrucciones.png");
        this.jugar = new Elemento(this.app, "/img/2019/ciencias/imgs/jugar.png", 920, 536);
        this.continuar = new Elemento(this.app, "/img/2019/ciencias/imgs/continuar.png", 920, 536);
        this.cerrar = new Elemento(this.app, "/img/2019/ciencias/imgs/x.png", 88, 78);




        this.compuesto1 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto1.png");
        this.compuesto2 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto2.png");
        this.compuesto3 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto3.png");
        this.compuesto4 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto4.png");
        this.compuesto5 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto5.png");
        this.compuesto6 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto6.png");
        this.compuesto7 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto7.png");
        this.compuesto8 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto8.png");
        this.compuesto9 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto9.png");
        this.compuesto10 = this.app.loadImage("/img/2019/ciencias/imgs/compuesto10.png");







        this.elemento;
        this.mezcla = "";
        this.mezcla2 = "";
        this.separador = [];
        this.separador2 = [];



    }

    pintar() {
        switch (this.pantalla) {
            case 0:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.instrucciones, 0, 0);
                this.jugar.pintar();
                break;

            case 1:
                this.app.background(50, 50, 50);
                this.app.image(this.compuestosinicio, 600, 350);
                this.app.text(this.tiempoins, 600, 60);
                if (this.tiempoins <= 0) {
                    this.pantalla = 2;
                }

                if (this.iden == null && this.tiempoins <= 0) {
                    this.start();
                    this.reto = 0;
                } else {
                    clearInterval(this.iden);
                    this.iden = null;
                }
                break;

            case 2:
                //pantalla de juego     


                //this.animacionmal.draw();
                this.app.textFont(this.font);
                this.app.textSize(32);
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.fondo, 0, 0);
                this.app.image(this.mesa, 0, 0);

                switch (this.reto) {
                    case 0:
                        this.app.image(this.compuesto1, 885, 580);

                        break;
                    case 1:
                        this.app.image(this.compuesto2, 885, 580);
                        break;
                    case 2:
                        this.app.image(this.compuesto3, 885, 580);
                        break;
                    case 3:
                        //this.app.text("Crea un compuesto de Hidruro de sodio", 600, 90);
                        this.app.image(this.compuesto4, 885, 580);
                        break;
                    case 4:
                        //this.app.text("Crea un compuesto de Hidruro de calcio", 600, 90);
                        this.app.image(this.compuesto5, 885, 580);
                        break;
                    case 5:
                        //this.app.text("Crea un compuesto de Hidruro de cobre", 600, 90);
                        this.app.image(this.compuesto6, 885, 580);
                        break;
                    case 6:
                        //this.app.text("Crea un compuesto de Óxido cuproso", 600, 90);
                        this.app.image(this.compuesto7, 885, 580);
                        break;
                    case 7:
                        //this.app.text("Crea un compuesto de Cloruro ferroso", 600, 90);
                        this.app.image(this.compuesto8, 885, 580);
                        break;
                    case 8:
                        //this.app.text("Crea un compuesto de Cloruro férrico", 600, 90);
                        this.app.image(this.compuesto9, 885, 580);
                        break;
                    case 9:
                        //this.app.text("Crea un compuesto de Hidruro de litio", 600, 90);
                        this.app.image(this.compuesto10, 885, 580);
                        break;

                    default:
                        break;
                }


                this.app.image(this.decoracion1, 85, 312);
                this.app.image(this.decoracion2, 295, 362);
                this.app.imageMode(this.app.CENTER);


                if (this.mezclando === true) {
                    this.app.image(this.rickmezclando[this.puntero], 935, 295);
                    if (this.app.frameCount % 7 == 1 && this.reproduciendo === true) {
                        this.puntero++;
                        if (this.puntero === 11) {
                            //this.reproduciendo = false;
                            this.puntero = 10;
                            this.contadoranim++;
                            console.log(this.contadoranim);
                            if (this.contadoranim === 8) {
                                this.mezclando = false;
                                this.contadoranim = 0;
                                this.puntero = 0;
                            }

                        }
                    }

                }


                if (this.mezclando === false) {

                    this.app.image(this.rick, 935, 295);
                }

                this.recipiente.pintar();
                this.recipiente2.pintar();
                this.boton.pintar();
                this.libro.pintar();
                this.app.image(this.mas, 385, 625);
                this.app.text("Tiempo: " + this.tiempo, 10, 40);

                this.calcio.pintar();
                this.cobre.pintar();
                this.bromo.pintar();
                this.hierro.pintar();
                this.litio.pintar();
                this.hidrogeno.pintar();
                this.oxigeno.pintar();
                this.sodio.pintar();
                this.aluminio.pintar();
                this.cloro.pintar();
                //console.log(this.separador);

                if (this.mezcla != "") {
                    if (this.icono) {
                        this.app.image(this.icono, 240, 625);
                    }
                }

                if (this.mezcla2 != "") {
                    if (this.icono2) {
                        this.app.image(this.icono2, 530, 625);
                    }
                }


                if (this.separador.length > 1) {
                    this.app.noStroke();
                    this.app.textSize(20);
                    this.app.fill(255, 0, 0);
                    this.app.ellipse(294, 650, 30, 30)
                    this.app.fill(255, 255, 255);
                    this.app.text(this.separador.length, 289, 657);
                    this.app.fill(0, 0, 0);
                    this.app.textSize(30);
                }

                if (this.separador2.length > 1) {
                    this.app.noStroke();
                    this.app.textSize(20);
                    this.app.fill(255, 0, 0);
                    this.app.ellipse(586, 650, 30, 30)
                    this.app.fill(255, 255, 255);
                    this.app.text(this.separador2.length, 581, 657);
                    this.app.fill(0, 0, 0);
                    this.app.textSize(30);
                }



                if (this.libroShow === true) {
                    this.app.image(this.compuestos, 600, 350);
                    this.cerrar.pintar()

                }

                if (this.tiempo <= 0) {
                    this.pantalla = 3;
                    console.log(this.tiempo);

                    this.stop();
                }

                break;

            case 3:
                this.app.background(201, 150, 23);
                this.continuar.pintar();

                break;

            default:
                break;
        }
        //this.app.text(this.app.mouseX + " " + this.app.mouseY, this.app.mouseX, this.app.mouseY);
    }


    vaciar() {
        this.mezcla = "";
        this.mezcla2 = "";
        this.separador = [];
        this.separador2 = [];
    }

    mouse() {

        switch (this.pantalla) {
            case 0:
                if (this.jugar.isSobre()) {
                    this.pantalla++;

                    if (this.idenins == null) {
                        this.startins();
                    } else {
                        clearInterval(this.idenins);
                        this.idenins = null;
                    }

                }
                break;

            case 1:

                break;


            case 2:
                //pantalla de juego
                if (this.hidrogeno.isSobre()) {
                    this.seleccion = this.hidrogeno;
                    this.sel = true;
                    this.elemento = 0
                }
                if (this.oxigeno.isSobre()) {
                    this.seleccion = this.oxigeno;
                    this.sel = true;
                    this.elemento = 1;
                }
                if (this.sodio.isSobre()) {
                    this.seleccion = this.sodio;
                    this.sel = true;
                    this.elemento = 2;
                }
                if (this.aluminio.isSobre()) {
                    this.seleccion = this.aluminio;
                    this.sel = true;
                    this.elemento = 3;
                }
                if (this.cloro.isSobre()) {
                    this.seleccion = this.cloro;
                    this.sel = true;
                    this.elemento = 4;
                }
                if (this.calcio.isSobre()) {
                    this.seleccion = this.calcio;
                    this.sel = true;
                    this.elemento = 5;
                }
                if (this.cobre.isSobre()) {
                    this.seleccion = this.cobre;
                    this.sel = true;
                    this.elemento = 6;
                }
                if (this.bromo.isSobre()) {
                    this.seleccion = this.bromo;
                    this.sel = true;
                    this.elemento = 7;
                }
                if (this.hierro.isSobre()) {
                    this.seleccion = this.hierro;
                    this.sel = true;
                    this.elemento = 8;
                }
                if (this.litio.isSobre()) {
                    this.seleccion = this.litio;
                    this.sel = true;
                    this.elemento = 9;
                }
                break;

            case 3:
                if (this.continuar.isSobre()) {
                    //pasar a sigueinte actividad
                }
                break;

            default:
                break;
        }

        if (this.boton.isSobre() && this.libroShow === false && this.mezcla != "" && this.mezcla2 != "") {




            switch (this.reto) {
                case 0:
                    if (this.mezcla === ("2/2/") && this.mezcla2 === ("1/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                    }
                    break;
                case 1:
                    if (this.mezcla === ("3/3/") && this.mezcla2 === ("1/1/1/")) {
                        console.log("mezclaaa")
                        this.reto = 2;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 2:
                    if (this.mezcla === ("2/") && this.mezcla2 === ("4/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 3:
                    if (this.mezcla === ("2/") && this.mezcla2 === ("0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 4:
                    if (this.mezcla === ("5/") && this.mezcla2 === ("0/0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 5:
                    if (this.mezcla === ("6/") && this.mezcla2 === ("0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 6:
                    if (this.mezcla === ("6/6/") && this.mezcla2 === ("1/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 7:
                    if (this.mezcla === ("8/") && this.mezcla2 === ("4/4/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 8:
                    if (this.mezcla === ("8/") && this.mezcla2 === ("4/4/4/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;

                    }

                    break;
                case 9:
                    if (this.mezcla === ("9/") && this.mezcla2 === ("0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.aciertos++;
                    } else {
                        this.mezclando = true;
                        this.pantalla = 3;
                        this.vaciar();
                        this.stop();


                    }

                    break;
                default:
                    break;
            }


        }
        if (this.cerrar.isSobre()) {
            this.libroShow = false;
        }
        if (this.libro.isSobre()) {
            /////MEEEZCLAAAAA
            this.libroShow = true;
        }



    }

    mouseReleased() {
        if (this.seleccion != null && this.recipiente.isSobre()) {
            switch (this.elemento) {
                case 0:
                    this.mezcla += "0/";
                    break;
                case 1:
                    this.mezcla += "1/";
                    break;
                case 2:
                    this.mezcla += "2/";
                    break;
                case 3:
                    this.mezcla += "3/";
                    break;
                case 4:
                    this.mezcla += "4/";
                    break;
                case 5:
                    this.mezcla += "5/";
                    break;
                case 6:
                    this.mezcla += "6/";
                    break;
                case 7:
                    this.mezcla += "7/";
                    break;
                case 8:
                    this.mezcla += "8/";
                    break;
                case 9:
                    this.mezcla += "9/";
                    break;

                default:
                    break;
            }




            this.separador = this.mezcla.split("/");
            this.separador.pop();


            for (var i = 0; i < this.separador.length; i++) {

                if (this.separador[this.separador.length - 1] != this.separador[i]) {
                    this.mezcla = "";

                    for (var i = 0; i < this.separador.length - 1; i++) {
                        this.separador.splice(i, this.separador.length - 1);
                        this.mezcla = this.separador[0] + "/";
                    }

                }
            }

            if (this.separador != null) {
                let num = this.separador[0];
                console.log(num)

                this.icono = this.app.loadImage("/img/2019/ciencias/imgs/" + num + ".png");


            }
            //console.log(this.separador);
            //console.log(this.mezcla);


        }




        if (this.seleccion != null && this.recipiente2.isSobre()) {
            switch (this.elemento) {
                case 0:
                    this.mezcla2 += "0/";
                    break;
                case 1:
                    this.mezcla2 += "1/";
                    break;
                case 2:
                    this.mezcla2 += "2/";
                    break;
                case 3:
                    this.mezcla2 += "3/";
                    break;
                case 4:
                    this.mezcla2 += "4/";
                    break;
                case 5:
                    this.mezcla2 += "5/";
                    break;
                case 6:
                    this.mezcla2 += "6/";
                    break;
                case 7:
                    this.mezcla2 += "7/";
                    break;
                case 8:
                    this.mezcla2 += "8/";
                    break;
                case 9:
                    this.mezcla2 += "9/";
                    break;
                default:
                    break;
            }
            console.log(this.mezcla2);
            this.separador2 = this.mezcla2.split("/");
            this.separador2.pop();

            for (var i = 0; i < this.separador2.length; i++) {

                if (this.separador2[this.separador2.length - 1] != this.separador2[i]) {
                    this.mezcla2 = "";

                    for (var i = 0; i < this.separador2.length - 1; i++) {
                        this.separador2.splice(i, this.separador2.length - 1);
                        this.mezcla2 = this.separador2[0] + "/";
                    }

                }
            }
            console.log(this.separador2);
            console.log(this.mezcla2);

            if (this.separador2 != null) {
                let num = this.separador2[0];
                console.log(num)
                this.icono2 = this.app.loadImage("/img/2019/ciencias/imgs/" + num + ".png");
            }



        }
        this.sel = false;
        if (this.seleccion != null) {
            this.seleccion.resetPosicion();
            this.seleccion = undefined;
            this.elemento = -1;
        }
    }

    mouseDragged() {
        if (this.seleccion != null && this.mezclando === false) {
            this.seleccion.arrastrar();
        }

        if (this.seleccion != null && this.recipiente.isSobre()) {

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




    startins() {
        this.idenins = setInterval(this.runins, 1000);
    }

    runins() {
        this.tiempoins--;
    }


}