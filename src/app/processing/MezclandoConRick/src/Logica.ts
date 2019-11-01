import p5 = require("p5");
import { number } from "prop-types";
import Elemento from "./Elemento";
import ProcessingImg from "../../../componentes/Processing/ProcessingImg";

class Logica {

    app: p5;
    pantalla: number;

    iden: any;
    idenins: any;

    puntaje: number;
    mezclandobien: boolean
    punterocompuesto: number;


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
    aciertos: number = 0; //cuenta los aciertos
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

    compuesto1: p5.Image[];


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


    img: ProcessingImg;


    icono?: p5.Image;
    icono2?: p5.Image;

    elemento: number = 0;
    mezcla = "";
    mezcla2 = "";
    separador: string[] = [];
    separador2: string[] = [];

    vidas: number;
    vida: p5.Image;


    constructor(app: p5) {
        this.app = app;
        this.img = new ProcessingImg(this.app);
        this.pantalla = 2;
        this.run = this.run.bind(this);
        this.iden = null;
        this.tiempo = 90;

        this.runins = this.runins.bind(this);
        this.idenins = null;
        this.tiempoins = 30;

        this.mezclando = false;;
        this.mezclandobien = false;
        this.reproduciendo = true;
        this.rickmezclando = [];
        this.puntero = 0;
        this.contadoranim = 0;

        for (var i = 0; i < 12; i++) {
            this.rickmezclando.push(this.img.loadImage("/img/2019/ciencias/imgs/animacion/rick" + i + ".png"));
        }


        this.sel = false;
        this.seleccion;
        this.reto = 0;
        this.puntaje = 0; //cuenta los puntaje
        this.font = this.app.loadFont("/img/2019/ciencias/fonts/impact.ttf");
        this.fondo = this.img.loadImage("/img/2019/ciencias/imgs/fondo.png");
        this.mesa = this.img.loadImage("/img/2019/ciencias/imgs/mesa.png");
        this.rick = this.img.loadImage("/img/2019/ciencias/imgs/rick.png");
        this.decoracion1 = this.img.loadImage("/img/2019/ciencias/imgs/decoracion1.png");
        this.decoracion2 = this.img.loadImage("/img/2019/ciencias/imgs/decoracion2.png");

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
        this.mas = this.img.loadImage("/img/2019/ciencias/imgs/mas.png");

        this.libroShow = false;
        this.compuestos = this.img.loadImage("/img/2019/ciencias/imgs/compuestos.png");
        this.compuestosinicio = this.img.loadImage("/img/2019/ciencias/imgs/compuestosinicio.png");
        this.instrucciones = this.img.loadImage("/img/2019/ciencias/imgs/instrucciones.png");
        this.jugar = new Elemento(this.app, "/img/2019/ciencias/imgs/jugar.png", 920, 536);
        this.continuar = new Elemento(this.app, "/img/2019/ciencias/imgs/continuar.png", 920, 536);
        this.cerrar = new Elemento(this.app, "/img/2019/ciencias/imgs/x.png", 88, 78);
        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

        this.punterocompuesto = 0;
        this.compuesto1 = [];
        for (var i = 0; i <= 1; i++) {
            this.compuesto1.push(this.img.loadImage("/img/2019/ciencias/imgs/compuesto1." + i + ".png"));
        }

        this.vidas = 3;
        this.vida = this.img.loadImage("/img/2019/ciencias/imgs/corazon.png");

        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO







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
                //NUEVOOOOOOOOOOOOOOOOOOOO
                this.app.textFont(this.font);
                this.app.textSize(32);
                this.app.fill(163, 111, 69);
                //NUEVOOOOOOOOOOOOOOOOOOOO
                this.app.image(this.compuestosinicio, 600, 350);
                this.app.text("comienza en: " + this.tiempoins, 930, 610);
                this.app.fill(0, 0, 0);
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

                this.app.textFont(this.font);
                this.app.textSize(32);
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.fondo, 0, 0);
                this.app.image(this.mesa, 0, 0);

                //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                this.app.text("Intentos:", 660, 58);

                if (this.vidas === 0 && this.puntero === 10) {
                    this.pantalla = 3;
                    stop();
                }

                if (this.vidas > 2) {
                    this.app.image(this.vida, 920, 30);
                }
                if (this.vidas > 1) {
                    this.app.image(this.vida, 860, 30);
                }

                if (this.vidas > 0) {
                    this.app.image(this.vida, 800, 30);
                }

                this.app.image(this.compuesto1[this.punterocompuesto], 850, 575);
                if (this.app.frameCount % 50 === 0 && this.punterocompuesto === 0) {
                    this.punterocompuesto = 1;
                } else if (this.app.frameCount % 50 === 0 && this.punterocompuesto === 1) {
                    this.punterocompuesto = 0;
                }

                this.app.textSize(22);
                this.app.textAlign(this.app.CENTER)
                this.app.fill(107, 80, 48);
                //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                switch (this.reto) {
                    case 0:
                        this.app.text("Óxido de sodio", 995, 635);
                        break;
                    case 1:
                        this.app.text("Óxido de aluminio", 995, 635);
                        break;
                    case 2:
                        this.app.text("Sal común", 995, 635);
                        break;
                    case 3:
                        this.app.text("Hidruro de sodio", 995, 635);
                        break;
                    case 4:
                        this.app.text("Hidruro de calcio", 995, 635);
                        break;
                    case 5:
                        this.app.text("Hidruro de cobre", 995, 635);
                        break;
                    case 6:
                        this.app.text("Óxido cuproso", 995, 635);
                        break;
                    case 7:
                        this.app.text("Cloruro ferroso", 995, 635);
                        break;
                    case 8:
                        this.app.text("Cloruro férrico", 995, 635);
                        break;
                    case 9:
                        this.app.text("Hidruro de litio", 995, 635);
                        break;

                    default:
                        break;
                }
                this.app.fill(0, 0, 0);
                this.app.textAlign(this.app.LEFT);
                this.app.textSize(32);
                this.app.image(this.decoracion1, 85, 312);
                this.app.image(this.decoracion2, 295, 362);
                this.app.imageMode(this.app.CENTER);

                let estatico = true;

                if (this.mezclando === true) {
                    estatico = false;
                    this.app.image(this.rickmezclando[this.puntero], 935, 295);
                    if (this.app.frameCount % 7 == 1 && this.reproduciendo === true) {
                        this.puntero++;
                        if (this.puntero === 11) {
                            //this.reproduciendo = false;
                            this.puntero = 10;
                            this.contadoranim++;
                            console.log(this.contadoranim);


                            if (this.contadoranim === 13) {
                                this.mezclando = false;
                                this.contadoranim = 0;
                                this.puntero = 0;
                            }

                        }
                    }

                }



                if (this.mezclandobien === true) {
                    estatico = false;
                    this.app.image(this.rickmezclando[this.puntero], 935, 295);
                    if (this.app.frameCount % 7 == 1 && this.reproduciendo === true) {
                        this.puntero++;
                        if (this.puntero === 5) {
                            this.puntero = 0;
                            this.mezclandobien = false;
                            estatico = true;
                        }
                    }

                }


                if (this.mezclandobien === false && estatico === true) {

                    this.app.image(this.rick, 935, 295);
                }

                if (this.mezclando === false && estatico === true) {

                    this.app.image(this.rick, 935, 295);
                }

                this.recipiente.pintar();
                this.recipiente2.pintar();
                this.boton.pintar();
                this.libro.pintar();
                this.app.image(this.mas, 385, 625);
                this.app.text("Tiempo: " + this.tiempo, 10, 58);

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
                if (this.mezcla != "" && this.icono) {
                    this.app.image(this.icono, 240, 625);
                }

                if (this.mezcla2 != "" && this.icono2) {
                    this.app.image(this.icono2, 530, 625);
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


                //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                if (this.puntaje <= 0) {
                    this.puntaje = 0;
                }
                //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO


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
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                    }
                    break;
                case 1:
                    if (this.mezcla === ("3/3/") && this.mezcla2 === ("1/1/1/")) {
                        console.log("mezclaaa")
                        this.reto = 2;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                    }

                    break;
                case 2:
                    if (this.mezcla === ("2/") && this.mezcla2 === ("4/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                    }

                    break;
                case 3:
                    if (this.mezcla === ("2/") && this.mezcla2 === ("0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                    }

                    break;
                case 4:
                    if (this.mezcla === ("5/") && this.mezcla2 === ("0/0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                    }

                    break;
                case 5:
                    if (this.mezcla === ("6/") && this.mezcla2 === ("0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                    }

                    break;
                case 6:
                    if (this.mezcla === ("6/6/") && this.mezcla2 === ("1/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                    }

                    break;
                case 7:
                    if (this.mezcla === ("8/") && this.mezcla2 === ("4/4/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                    }

                    break;
                case 8:
                    if (this.mezcla === ("8/") && this.mezcla2 === ("4/4/4/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.reto++;
                        this.vaciar();
                        this.mezclando = true;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                    }

                    break;
                case 9:
                    if (this.mezcla === ("9/") && this.mezcla2 === ("0/")) {
                        console.log("mezclaaa")
                        this.reto++;
                        this.vaciar();
                        this.puntaje += 10;
                        this.mezclandobien = true;
                    } else {
                        this.mezclando = true;
                        this.pantalla = 3;
                        this.vaciar();
                        this.stop();
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                        this.puntaje -= 15;
                        this.vidas--;
                        //NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO


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
                this.icono = this.img.loadImage("/img/2019/ciencias/imgs/" + num + ".png");


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
                this.icono2 = this.img.loadImage("/img/2019/ciencias/imgs/" + num + ".png");
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

export default Logica;