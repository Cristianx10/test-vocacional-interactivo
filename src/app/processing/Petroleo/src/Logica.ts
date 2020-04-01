import p5 from 'p5';

import ProcessingContext from '../../../comunicacion/ProcessingContext';
import Processing from '../../../componentes/Processing/Processing';

import { Elemento } from './Elemento';

export class Logica {

    app: p5;
    puntaje: number;
    precio: number;
    pantalla: number;
    inicio: p5.Image;
    intro: p5.Image;
    intro3: p5.Image;
    intro4: p5.Image;
    intro5: p5.Image;
    intro6: p5.Image;
    final: p5.Image;

    btnNext: Elemento;

    modal1: p5.Image;
    modal2: p5.Image;
    modal3: p5.Image;
    modal4: p5.Image;
    modal5: p5.Image;

    meses: p5.Image;
    mes1: p5.Image;
    mes2: p5.Image;
    mes3: p5.Image;
    mes4: p5.Image;
    mes5: p5.Image;
    mes6: p5.Image;
    mes7: p5.Image;
    mes8: p5.Image;
    mes9: p5.Image;

    comprar: p5.Image;
    vender: p5.Image;

    fuente: p5.Font;
    fuente2: p5.Font;

    btnVenderActivado: p5.Image;
    btnVenderDesactivado: p5.Image;
    btnComprarActivado: p5.Image;
    btnComprarDesactivado: p5.Image;

    btnJugar: Elemento;

    botonesActivados: Elemento[];
    botonesDesactivados: Elemento[];
    booleansBotones: boolean[];

    modalB1: boolean;
    modalB2: boolean;
    modalB3: boolean;
    modalB4: boolean;
    modalB5: boolean;
    contador: number;

    dinero: number;
    cantidadBarriles: number;
    precioBarril: number | any;
    dineroTotal: number | Number | any;

    compra: boolean;
    barrilesComprados: number;
    vende: boolean;
    barrilesVendidos: number;
    pasa: boolean;

    contar = false;

    porcentaje = 0;

    instruccion1: p5.Image;
    instruccion2: p5.Image;
    flechaRoja: p5.Image;
    flechaVerde: p5.Image;

    btnSiguiente: Elemento;

    dineroTxt: string;
    dineroTotalTxt: string;
    cantidadBarrilesTxt: string;

    text = "";
    largo = 0;

    processing?: Processing;
    propiedades: any = {};


    constructor(app: p5) {

        this.app = app;

        this.puntaje = 0;

        this.precio = 1;

        this.pantalla = 0;

        this.inicio = app.loadImage("/img/2020/Petroleo/img/PantallaInicial.png");
        this.intro = app.loadImage("/img/2020/Petroleo/img/Introducción.png");
        this.intro3 = app.loadImage("/img/2020/Petroleo/img/Introduccióntres.png");
        this.intro4 = app.loadImage("/img/2020/Petroleo/img/Introduccióncuatro.png");
        this.intro5 = app.loadImage("/img/2020/Petroleo/img/Introduccióncinco.png");
        this.intro6 = app.loadImage("/img/2020/Petroleo/img/Introducciónseis.png");
        this.final = app.loadImage("/img/2020/Petroleo/img/PantallaFinal.png");

        this.btnNext = new Elemento(this.app, ("/img/2020/Petroleo/img/BotonPasar.png"), 1149, 654);

        this.modal1 = app.loadImage("/img/2020/Petroleo/img/modal.png");
        this.modal2 = app.loadImage("/img/2020/Petroleo/img/modal2.png");
        this.modal3 = app.loadImage("/img/2020/Petroleo/img/modal3.png");
        this.modal4 = app.loadImage("/img/2020/Petroleo/img/modal4.png");
        this.modal5 = app.loadImage("/img/2020/Petroleo/img/modal5.png");

        this.instruccion1 = app.loadImage("/img/2020/Petroleo/img/Instrucciones1.png");
        this.instruccion2 = app.loadImage("/img/2020/Petroleo/img/Instrucciones2.png");

        this.meses = app.loadImage("/img/2020/Petroleo/img/Meses.png");
        this.mes1 = app.loadImage("/img/2020/Petroleo/img/Mes1.png");
        this.mes2 = app.loadImage("/img/2020/Petroleo/img/Mes2.png");
        this.mes3 = app.loadImage("/img/2020/Petroleo/img/Mes3.png");
        this.mes4 = app.loadImage("/img/2020/Petroleo/img/Mes4.png");
        this.mes5 = app.loadImage("/img/2020/Petroleo/img/Mes5.png");
        this.mes6 = app.loadImage("/img/2020/Petroleo/img/Mes6.png");
        this.mes7 = app.loadImage("/img/2020/Petroleo/img/Mes7.png");
        this.mes8 = app.loadImage("/img/2020/Petroleo/img/Mes8.png");
        this.mes9 = app.loadImage("/img/2020/Petroleo/img/Mes9.png");

        this.comprar = app.loadImage("/img/2020/Petroleo/img/ModalparaComprar.png");
        this.vender = app.loadImage("/img/2020/Petroleo/img/ModalparaVender.png");

        this.flechaRoja = app.loadImage("/img/2020/Petroleo/img/flecha1.png");
        this.flechaVerde = app.loadImage("/img/2020/Petroleo/img/flecha2.png");

        this.fuente = app.loadFont("/img/2020/Petroleo/fonts/RobotoCondensed-Bold.ttf");
        this.fuente2 = app.loadFont("/img/2020/Petroleo/fonts/RobotoCondensed-Regular.ttf");

        this.btnVenderActivado = app.loadImage("/img/2020/Petroleo/img/BotonVenderActivado.png");
        this.btnVenderDesactivado = app.loadImage("/img/2020/Petroleo/img/BotonVenderDesactivado.png");
        this.btnComprarActivado = app.loadImage("/img/2020/Petroleo/img/BotonComprarActivado.png");
        this.btnComprarDesactivado = app.loadImage("/img/2020/Petroleo/img/BotonComprarDesactivado.png");

        this.btnSiguiente = new Elemento(this.app, ("/img/2020/Petroleo/img/BotonSiguiente.png"), 640, 652);
        this.btnJugar = new Elemento(this.app, ("/img/2020/Petroleo/img/BotonJugar.png"), 640, 652);

        this.botonesActivados = [
            new Elemento(this.app, "/img/2020/Petroleo/img/btn100.png", 184, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn200.png", 324, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn300.png", 466, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn400.png", 607, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn500.png", 184, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn600.png", 324, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn700.png", 466, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn800.png", 607, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn900.png", 184, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1000.png", 324, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1100.png", 466, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1200.png", 607, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1300.png", 184, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1400.png", 324, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1500.png", 466, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1600.png", 607, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1700.png", 184, 497),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1800.png", 324, 497),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1900.png", 466, 497),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn2000.png", 607, 497)
        ];

        this.botonesDesactivados = [
            new Elemento(this.app, "/img/2020/Petroleo/img/btn100B.png", 184, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn200B.png", 324, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn300B.png", 466, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn400B.png", 607, 209),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn500B.png", 184, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn600B.png", 324, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn700B.png", 466, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn800B.png", 607, 281),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn900B.png", 184, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1000B.png", 324, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1100B.png", 466, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1200B.png", 607, 353),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1300B.png", 184, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1400B.png", 324, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1500B.png", 466, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1600B.png", 607, 425),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1700B.png", 184, 497),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1800B.png", 324, 497),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn1900B.png", 466, 497),
            new Elemento(this.app, "/img/2020/Petroleo/img/btn2000B.png", 607, 497)
        ];

        this.booleansBotones = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ];

        this.modalB1 = false;
        this.modalB2 = false;
        this.modalB3 = false;
        this.modalB4 = false;
        this.modalB5 = false;
        this.contador = 0;

        this.dinero = 100000;
        this.cantidadBarriles = 1000;
        this.precioBarril = 50;
        this.dineroTotal = this.dinero + (this.cantidadBarriles * this.precioBarril);
        this.precioBarril.toFixed(0);
        this.dineroTxt = "";
        this.dineroTotalTxt = "";
        this.cantidadBarrilesTxt = "";

        this.compra = false;
        this.barrilesComprados = 0;
        this.vende = false;
        this.barrilesVendidos = 0;
        this.pasa = false;

        this.porcentaje = 0;

        if (ProcessingContext.actividad) {
            this.processing = ProcessingContext.actividad;
            this.propiedades = this.processing.propiedades;
        }

        this.propiedades.porcentaje = this.porcentaje;
        this.propiedades.puntaje = this.puntaje;

    }

    mouse() {

        for (let i = 0; i < 20; i++) {
            if (this.compra) {
                if (this.botonesActivados[i].isSobre() && this.booleansBotones[i]) {
                    this.barrilesComprados = 100 + (i * 100);
                }
            }

            if (this.vende) {
                if (this.botonesActivados[i].isSobre() && this.booleansBotones[i]) {
                    this.barrilesVendidos = 100 + (i * 100);
                }
            }
        }

        switch (this.pantalla) {
            case 2:
                if (this.app.mouseX > 500 && this.app.mouseX < 777 && this.app.mouseY > 520 && this.app.mouseY < 575) {
                    this.pantalla = 3;
                }
                break;

            case 3:
                if (this.btnNext.isSobre()) {
                    if (this.modalB1 == true && this.modalB2 == true && this.modalB3 == true && this.modalB4 == true && this.modalB5 == true) {
                        this.pantalla = 4;
                    }
                    this.contar = true;
                }
                break;

            case 5:
                if (this.app.mouseX > 502 && this.app.mouseX < 777 && this.app.mouseY > 475 && this.app.mouseY < 527) {
                    this.pantalla = 6;
                }
                break;

            case 6:
                if (this.btnSiguiente.isSobre()) {
                    this.pantalla = 17;
                }
                break;

            case 17:
                if (this.btnJugar.isSobre()) {
                    this.dineroTotal = this.dinero + (this.cantidadBarriles * this.precioBarril.toFixed(0));
                    this.pantalla = 6;
                    this.pasa = true;
                }
                break;

            default:
                break;
        }

        if (this.pantalla == 7 || this.pantalla == 8 || this.pantalla == 9 || this.pantalla == 10 || this.pantalla == 11 || this.pantalla == 12 || this.pantalla == 13 || this.pantalla == 14 || this.pantalla == 15) {
            if (this.app.mouseX > 63 && this.app.mouseX < 313 && this.app.mouseY > 632 && this.app.mouseY < 702) {
                this.compra = true;
            }

            if (this.app.mouseX > 954 && this.app.mouseX < 1204 && this.app.mouseY > 632 && this.app.mouseY < 702) {
                this.vende = true;
            }

            if (this.app.mouseX > 508 && this.app.mouseX < 757 && this.app.mouseY > 632 && this.app.mouseY < 702) {
                this.precioBarril += ((this.precioBarril.toFixed(0) * this.porcentaje) / 100);
                this.dineroTotal = this.dinero + (this.cantidadBarriles * this.precioBarril.toFixed(0));
                this.pasa = true;
                if (this.pantalla === 15) {

                    setTimeout(() => {
                        if (this.processing) {
                            this.processing.continuar();
                        }
                    }, 5000);

                }
            }

            if (this.vende || this.compra) {
                if (this.app.mouseX > 366 && this.app.mouseX < 615 && this.app.mouseY > 567 && this.app.mouseY < 637) {
                    this.vende = false;
                    this.compra = false;
                    this.barrilesComprados = 0;
                    this.barrilesVendidos = 0;
                }

                if (this.vende && this.barrilesVendidos != 0) {
                    if (this.app.mouseX > 684 && this.app.mouseX < 934 && this.app.mouseY > 567 && this.app.mouseY < 637) {
                        this.precioBarril += ((this.precioBarril.toFixed(0) * this.porcentaje) / 100);
                        this.precioBarril.toFixed(0);
                        this.cantidadBarriles -= this.barrilesVendidos;
                        this.dinero += (this.precioBarril.toFixed(0) * this.barrilesVendidos);
                        this.dineroTotal = this.dinero + (this.cantidadBarriles * this.precioBarril.toFixed(0));
                        this.barrilesVendidos = 0;
                        this.vende = false;
                        this.pasa = true;
                    }
                }

                if (this.compra && this.barrilesComprados != 0) {
                    if (this.app.mouseX > 684 && this.app.mouseX < 934 && this.app.mouseY > 567 && this.app.mouseY < 637) {
                        this.precioBarril += ((this.precioBarril.toFixed(0) * this.porcentaje) / 100);
                        this.precioBarril.toFixed(0);
                        this.cantidadBarriles += this.barrilesComprados;
                        this.dinero -= (this.precioBarril.toFixed(0) * this.barrilesComprados);
                        this.dineroTotal = this.dinero + (this.cantidadBarriles * this.precioBarril.toFixed(0));
                        this.barrilesComprados = 0;
                        this.compra = false;
                        this.pasa = true;
                    }
                }
                for (let i = 0; i < 20; i++) {
                    this.booleansBotones[i] = false;
                }
            }
        }
        this.dineroTxt = this.convertNumToString(this.dinero);
        this.dineroTotalTxt = this.convertNumToString(this.dineroTotal.toFixed(0));
        this.cantidadBarrilesTxt = this.convertNumToString(this.cantidadBarriles);
    }





    pintar() {

        this.app.textFont(this.fuente2);
        this.app.textAlign(this.app.LEFT);
        this.app.textSize(24);
        if (this.contar == true) {
            this.contador++;
        }

        this.contar = true;

        //console.log(this.contador);
        //console.log(this.pantalla);
        //console.log(this.dinero);

        this.app.imageMode(this.app.CORNER);
        if (this.pasa) {
            this.pantalla++;
            this.pasa = false;
        }

        switch (this.pantalla) {
            case 0:
                if (this.contador > 300) {
                    this.pantalla = 1;
                }
                this.app.image(this.inicio, 0, 0);
                break;

            case 1:
                if (this.contador > 1250) {
                    this.pantalla = 2;
                }
                this.app.image(this.intro, 0, 0);
                break;

            case 2:
                this.app.image(this.intro3, 0, 0);
                this.contar = false;
                break;

            case 3:
                this.contar = false;
                this.app.image(this.intro4, 0, 0);
                if (this.app.mouseX > 444 && this.app.mouseX < 455 && this.app.mouseY > 342 && this.app.mouseY < 354) {
                    this.app.image(this.modal1, 110, 322);
                    this.modalB1 = true;
                }

                if (this.app.mouseX > 562 && this.app.mouseX < 573 && this.app.mouseY > 140 && this.app.mouseY < 152) {
                    this.app.image(this.modal2, 225, 120);
                    this.modalB2 = true;
                }

                if (this.app.mouseX > 674 && this.app.mouseX < 685 && this.app.mouseY > 372 && this.app.mouseY < 383) {
                    this.app.image(this.modal3, 340, 350);
                    this.modalB3 = true;
                }

                if (this.app.mouseX > 789 && this.app.mouseX < 801 && this.app.mouseY > 263 && this.app.mouseY < 274) {
                    this.app.image(this.modal4, 455, 240);
                    this.modalB4 = true;
                }

                if (this.app.mouseX > 902 && this.app.mouseX < 912 && this.app.mouseY > 164 && this.app.mouseY < 174) {
                    this.app.image(this.modal5, 565, 145);
                    this.modalB5 = true;
                }
                break;

            case 4:
                if (this.contador > 1950) {
                    this.pantalla = 5;
                }
                this.app.image(this.intro5, 0, 0);
                break;

            case 5:
                this.app.image(this.intro6, 0, 0);
                break;

            case 6:
                this.contar = false;
                this.app.image(this.instruccion1, 0, 0);
                this.btnSiguiente.pintar();
                break;

            case 7:
                this.contar = false;
                this.app.image(this.mes1, 0, 0);
                this.precio = 1;
                break;

            case 8:
                this.app.image(this.mes2, 0, 0);
                this.precio = 2;
                break;

            case 9:
                this.app.image(this.mes3, 0, 0);
                this.precio = 3;
                break;

            case 10:
                this.app.image(this.mes4, 0, 0);
                this.precio = 4;
                break;

            case 11:
                this.app.image(this.mes5, 0, 0);
                this.precio = 5;
                break;

            case 12:
                this.app.image(this.mes6, 0, 0);
                this.precio = 6;
                break;

            case 13:
                this.app.image(this.mes7, 0, 0);
                this.precio = 7;
                break;

            case 14:
                this.app.image(this.mes8, 0, 0);
                this.precio = 8;
                break;

            case 15:
                this.app.image(this.mes9, 0, 0);
                break;

            case 16:
                this.app.image(this.final, 0, 0);
                this.app.textSize(40);
                this.app.text("150.000" + " " + "USD", 270, 570);
                if (this.dineroTotal < 150000) {
                    this.app.fill('rgb(164,2,0)');
                } else if (this.dineroTotal > 150000) {
                    this.app.fill('rgb(0,152,6)');
                }
                this.app.text(this.dineroTotalTxt + " " + "USD", 840, 570);
                this.app.fill(0);

                if (this.dineroTotal <= 150000) {
                    this, this.puntaje = 0;
                }

                if (this.dineroTotal > 150000 && this.dineroTotal < 250000) {
                    this, this.puntaje = ((((this.dineroTotal - 150000) * 100) / 100000) * 200) / 100;
                }

                if (this.dineroTotal >= 250000) {
                    this, this.puntaje = 200;
                }


                this.propiedades.puntaje = this.puntaje;


                break;
            case 17:
                this.app.image(this.instruccion2, 0, 0);
                this.btnJugar.pintar();

                break;

            default:
                break;

        }

        switch (this.precio) {
            case 1:
                this.porcentaje = 12;
                break;

            case 2:
                this.porcentaje = 0;
                break;

            case 3:
                this.porcentaje = -30;
                break;

            case 4:
                this.porcentaje = 30;
                break;

            case 5:
                this.porcentaje = -8;
                break;

            case 6:
                this.porcentaje = 40;
                break;

            case 7:
                this.porcentaje = 22;
                break;

            case 8:
                this.porcentaje = 0;
                break;

            case 9:
                this.porcentaje = -10;
                break;
            default:
                break;
        }

        if (this.pantalla == 3 && this.app.mouseX > 511 && this.app.mouseX < 522 && this.app.mouseY > 339 && this.app.mouseY < 350) {
            this.app.image(this.modal1, 195, 155);
            this.modalB1 = true;
        }

        if (this.pantalla == 3 && this.app.mouseX > 629 && this.app.mouseX < 640 && this.app.mouseY > 130 && this.app.mouseY < 141) {
            this.app.image(this.modal1, 313, 132);
            this.modalB2 = true;
        }

        if (this.pantalla == 3 && this.app.mouseX > 740 && this.app.mouseX < 751 && this.app.mouseY > 370 && this.app.mouseY < 381) {
            this.app.image(this.modal1, 424, 182);
            this.modalB3 = true;
        }

        if (this.pantalla == 3 && this.app.mouseX > 855 && this.app.mouseX < 866 && this.app.mouseY > 258 && this.app.mouseY < 269) {
            this.app.image(this.modal1, 540, 72);
            this.modalB4 = true;
        }

        if (this.pantalla == 3 && this.app.mouseX > 970 && this.app.mouseX < 981 && this.app.mouseY > 154 && this.app.mouseY < 165) {
            this.app.image(this.modal1, 653, 162);
            this.modalB5 = true;
        }

        if (this.pantalla == 3 && this.modalB1 == true && this.modalB2 == true && this.modalB3 == true && this.modalB4 == true && this.modalB5 == true) {
            this.btnNext.pintar();
        }

        if (this.pantalla == 7 || this.pantalla == 8 || this.pantalla == 9 || this.pantalla == 10 || this.pantalla == 11 || this.pantalla == 12 || this.pantalla == 13 || this.pantalla == 14 || this.pantalla == 15) {
            this.app.image(this.meses, 0, 0);
            this.app.textFont(this.fuente);
            this.app.textSize(18);
            this.app.fill('rgb(36,36,36)');
            switch (this.pantalla) {
                case 7:
                    this.app.fill('rgb(36,36,36)');
                    this.app.text("Diciembre", 210, 93);
                    break;
                case 8:
                    this.app.fill('rgb(0,152,6)');
                    this.app.text("Enero", 210, 93);
                    this.app.image(this.flechaVerde, 360, 37);
                    break;
                case 9:
                    this.app.fill('rgb(36,36,36)');
                    this.app.text("Febrero", 210, 93);
                    break;
                case 10:
                    this.app.fill('rgb(164,2,0)');
                    this.app.text("Marzo", 210, 93);
                    this.app.image(this.flechaRoja, 360, 37);
                    break;
                case 11:
                    this.app.fill('rgb(0,152,6)');
                    this.app.text("Abril", 210, 93);
                    this.app.image(this.flechaVerde, 360, 37);
                    break;
                case 12:
                    this.app.fill('rgb(164,2,0)');
                    this.app.text("Mayo", 210, 93);
                    this.app.image(this.flechaRoja, 360, 37);
                    break;
                case 13:
                    this.app.fill('rgb(0,152,6)');
                    this.app.text("Junio", 210, 93);
                    this.app.image(this.flechaVerde, 360, 37);
                    break;
                case 14:
                    this.app.fill('rgb(0,152,6)');
                    this.app.text("Julio", 210, 93);
                    this.app.image(this.flechaVerde, 360, 37);
                    break;
                case 15:
                    this.app.fill('rgb(36,36,36)');
                    this.app.text("Agosto", 210, 93);
                    break;

                default:
                    break;
            }
            this.app.fill('rgb(36,36,36)');
            this.app.text(": " + this.precioBarril.toFixed(0) + " " + "USD por barril", 220, 55);
            this.app.text(": x " + this.cantidadBarrilesTxt, 500, 55);
            this.app.text(": " + this.dineroTxt + " " + "USD", 775, 55);
            this.app.text(": " + this.dineroTotalTxt + " " + "USD", 1030, 55);
            if (this.compra || this.vende) {

                //Ver que botones sirven para la compra

                this.app.textFont(this.fuente);
                this.app.textSize(40);
                this.app.fill('rgb(12,85,117)');

                if (this.compra) {
                    for (let i = 0; i < 20; i++) {
                        if (this.precioBarril.toFixed(0) * (100 + (i * 100)) <= this.dinero) {
                            this.booleansBotones[i] = true;
                        }
                    }
                    this.app.image(this.comprar, 0, 0);
                    this.app.text("x " + this.barrilesComprados, 879, 480);
                    if (this.barrilesComprados == 0) {
                        this.app.image(this.btnComprarDesactivado, 674, 561);
                    } else {
                        this.app.image(this.btnComprarActivado, 674, 561);
                    }

                }
                //Ver que botones sirven para la venta
                else if (this.vende) {
                    for (let i = 0; i < 20; i++) {
                        if (this.cantidadBarriles >= 100 + (i * 100)) {
                            this.booleansBotones[i] = true;
                        }
                    }
                    this.app.image(this.vender, 0, 0);
                    this.app.text("x " + this.barrilesVendidos, 879, 520);
                    if (this.barrilesVendidos == 0) {
                        this.app.image(this.btnVenderDesactivado, 674, 561);
                    } else {
                        this.app.image(this.btnVenderActivado, 674, 561);
                    }
                }

                for (let i = 0; i < 20; i++) {
                    if (this.booleansBotones[i]) {
                        this.botonesActivados[i].pintar();
                    } else {
                        this.botonesDesactivados[i].pintar();
                    }
                }
            }
        }
        //this.app.text("X:" + this.app.mouseX + " " + "Y:" + this.app.mouseY, this.app.mouseX, this.app.mouseY);
    }

    numPunto = 0;
    newText = "";

    convertNumToString(num: number) {
        this.text = num.toString();
        this.largo = this.text.length;
        if (this.largo > 3) {
            this.numPunto = this.text.length - 3;
            this.newText = "";
            for (let i = 0; i < this.text.length; i++) {
                if (i == 0) {
                    this.newText = this.text.charAt(i);
                }
                if (this.numPunto == i) {
                    this.newText = this.newText + ".";
                }
                if (i != 0) {
                    this.newText = this.newText + this.text.charAt(i);
                }
            }
        }
        return this.newText;
    }
}

