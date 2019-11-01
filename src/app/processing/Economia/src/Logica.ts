import p5 from "p5";
import Processing from '../../../componentes/Processing/Processing';
import ProcessingContext from '../../../comunicacion/ProcessingContext';
import { Propiedades } from '../../Culpable/src/derecho/Propiedades';

export default class Logica {


    app: p5;
    finalMalo: boolean;
    finalMedio: boolean;
    finalBueno: boolean;
    finalExcelente: boolean;
    puntuacion: number;
    pantalla: number;
    dinero: number;
    timer: number;
    dia: number;
    felicidad: number;
    luz: number;
    gas: number;
    arriendo: number;
    agua: number;
    amor: number;
    ropa: number;
    viajes: number;
    fiestas: number;
    responsabilidad: number;

    datadinero: number;
    dataluz: number;
    datagas: number;
    dataarriendo: number;
    dataagua: number;
    dataamor: number;
    dataropa: number;
    dataviajes: number;
    datafiestas: number;

    fuente: p5.Font;
    citasimg: p5.Image;
    partyimg: p5.Image;
    viajesimg: p5.Image;
    ropaimg: p5.Image;
    arriendoimg: p5.Image;
    luzimg: p5.Image;
    gasimg: p5.Image;
    aguaimg: p5.Image;
    dineroimg: p5.Image;
    nextimg: p5.Image;
    happy: p5.Image;
    neutral: p5.Image;
    sad: p5.Image;
    sgteimg: p5.Image;
    fondo: p5.Image;
    instrucciones: p5.Image;
    derroche: p5.Image;
    inconforme: p5.Image;
    optimo: p5.Image;
    tacanio: p5.Image;

    propiedades: any;


    constructor(app: p5) {
        if (ProcessingContext.actividad) {
            this.propiedades = ProcessingContext.actividad.propiedades;
            this.propiedades.puntuacion = 0;
        }



        this.app = app;
        this.finalMalo = false;
        this.finalMedio = false;
        this.finalBueno = false;
        this.finalExcelente = false;
        this.puntuacion = 0;
        this.pantalla = 0;
        this.dinero = 100;
        this.timer = 30;
        this.dia = 1;
        this.felicidad = 5;
        this.luz = 50;
        this.gas = 20;
        this.arriendo = 100;
        this.agua = 40;
        this.amor = 30;
        this.ropa = 20;
        this.viajes = 50;
        this.fiestas = 30;
        this.responsabilidad = 10;

        this.datadinero = 430;
        this.dataluz = 0;
        this.datagas = 0;
        this.dataarriendo = 0;
        this.dataagua = 0;
        this.dataamor = 0;
        this.dataropa = 0;
        this.dataviajes = 0;
        this.datafiestas = 0;

        this.fuente = this.app.loadFont("/img/2019/economia/Muli.ttf");
        this.citasimg = this.app.loadImage("/img/2019/economia/like.png");
        this.partyimg = this.app.loadImage("/img/2019/economia/party.png");
        this.viajesimg = this.app.loadImage("/img/2019/economia/plane.png");
        this.ropaimg = this.app.loadImage("/img/2019/economia/shirt.png");
        this.arriendoimg = this.app.loadImage("/img/2019/economia/house.png");
        this.luzimg = this.app.loadImage("/img/2019/economia/idea.png");
        this.gasimg = this.app.loadImage("/img/2019/economia/fire.png");
        this.aguaimg = this.app.loadImage("/img/2019/economia/drop.png");
        this.dineroimg = this.app.loadImage("/img/2019/economia/money.png");
        this.nextimg = this.app.loadImage("/img/2019/economia/next.png");
        this.happy = this.app.loadImage("/img/2019/economia/happy.png");
        this.neutral = this.app.loadImage("/img/2019/economia/neutral.png");
        this.sad = this.app.loadImage("/img/2019/economia/sad.png");
        this.sgteimg = this.app.loadImage("/img/2019/economia/siguiente.png");
        this.fondo = this.app.loadImage("/img/2019/economia/fondo.png");
        this.instrucciones = this.app.loadImage("/img/2019/economia/instruciones.png");
        this.derroche = this.app.loadImage("/img/2019/economia/derroche.png");
        this.inconforme = this.app.loadImage("/img/2019/economia/inconforme.png");
        this.optimo = this.app.loadImage("/img/2019/economia/optimo.png");
        this.tacanio = this.app.loadImage("/img/2019/economia/tacanio.png");


    }

    pintar() {
        if (this.pantalla == 0) {
            this.app.image(this.instrucciones, 0, 0);
            this.app.image(this.sgteimg, 750, 410);
        }
        if (this.pantalla == 1) {
            this.app.image(this.fondo, 0, 0);
            this.app.textFont(this.fuente);
            this.app.noStroke();
            this.app.fill(100, 100, 100);
            this.app.stroke(0);
            this.app.fill(255);
            this.app.noStroke();


            if (this.app.frameCount % 60 == 0 && this.timer >= 0) {
                this.timer--;
                if (this.timer == 0 && this.dia == 1) {
                    this.dia = 2;
                    this.timer = 30;
                    this.dinero += 100;
                    if (this.luz != 0) {
                        this.luz += 30;
                    }
                    if (this.gas != 0) {
                        this.gas += 20;
                    }
                    if (this.arriendo != 0) {
                        this.arriendo += 20;
                    }
                    if (this.agua != 0) {
                        this.agua += 20;
                    }
                    if (this.felicidad < 7) {
                        this.felicidad--;
                    }
                    this.amor = 20;
                    this.ropa = 20;
                    this.viajes = 50;
                    this.fiestas = 30;
                    this.responsabilidad -= 1;

                }
                if (this.timer == 0 && this.dia == 2) {
                    this.dia = 3;
                    this.timer = 30;
                    this.dinero += 100;
                    if (this.luz != 0) {
                        this.luz += 30;
                    }
                    if (this.gas != 0) {
                        this.gas += 20;
                    }
                    if (this.arriendo != 0) {
                        this.arriendo += 20;
                    }
                    if (this.agua != 0) {
                        this.agua += 20;
                    }
                    if (this.felicidad < 7) {
                        this.felicidad--;
                    }
                    this.amor = 20;
                    this.ropa = 20;
                    this.viajes = 50;
                    this.fiestas = 30;
                    this.responsabilidad -= 1;
                }
                if (this.timer == 0 && this.dia == 3) {
                    this.dia = 4;
                    this.timer = 30;
                    this.dinero += 80;
                    if (this.luz != 0) {
                        this.luz += 30;
                    }
                    if (this.gas != 0) {
                        this.gas += 20;
                    }
                    if (this.arriendo != 0) {
                        this.arriendo += 20;
                    }
                    if (this.agua != 0) {
                        this.agua += 20;
                    }
                    if (this.felicidad < 7) {
                        this.felicidad--;
                    }
                    this.amor = 20;
                    this.ropa = 20;
                    this.viajes = 50;
                    this.fiestas = 30;
                }
                if (this.timer == 0 && this.dia == 4) {
                    this.dia = 5;
                    this.timer = 30;
                    this.dinero += 50;
                    if (this.luz != 0) {
                        this.luz += 30;
                    }
                    if (this.gas != 0) {
                        this.gas += 20;
                    }
                    if (this.arriendo != 0) {
                        this.arriendo += 20;
                    }
                    if (this.agua != 0) {
                        this.agua += 20;
                    }
                    if (this.felicidad < 7) {
                        this.felicidad--;
                    }
                    this.amor = 20;
                    this.ropa = 20;
                    this.viajes = 50;
                    this.fiestas = 30;
                }

            }

            this.app.fill(20, 60, 100);
            this.app.rect(835, 23, 70, 33, 5);
            this.app.fill(250, 100, 80);
            this.app.rect(835, 23, this.timer * 2, 33, 5);
            this.app.noFill();
            this.app.fill(255);
            this.app.textAlign(this.app.CENTER);
            this.app.text(this.timer, 850, 50);

            this.app.fill(0);
            this.app.textSize(30);
            this.app.textAlign(this.app.CENTER);
            this.app.text("Dinero = $", this.app.width / 2 - 465, 450);


            this.app.text(this.dinero, 280, 450);


            this.app.text("Día", 50, 40);
            this.app.text("Haz click en los íconos", 490, 85);
            this.app.text("para empezar a invertir", 490, 115);
            this.app.text(this.dia, 85, 40);
            this.app.fill(20, 60, 100);
            this.app.rect(410, 440, 150, 30, 5);
            this.app.fill(250, 100, 80);
            this.app.rect(410, 440, 15 * this.felicidad, 30, 5);
            this.app.fill(0);

            if (this.felicidad >= 8) {
                this.app.text("Felíz", 500, 420);
                this.app.image(this.happy, 570, 440, 30, 30);

            }
            if (this.felicidad >= 5 && this.felicidad <= 7) {
                this.app.text("Inconforme", 500, 420);
                this.app.image(this.neutral, 570, 440, 30, 30);
            }
            if (this.felicidad <= 4) {
                this.app.text("Triste", 500, 420);
                this.app.image(this.sad, 570, 440, 30, 30);
            }

            if (this.responsabilidad >= 8) {
                this.app.text("Responsable", 500, 370);

            }
            if (this.responsabilidad >= 5 && this.responsabilidad <= 7) {
                this.app.text("vago", 500, 370);

            }
            if (this.responsabilidad <= 4) {
                this.app.text("Irresponsable", 500, 370);

            }

            this.app.textAlign(this.app.LEFT);


            this.app.text("CITAS", 100, 200);
            this.app.text(this.amor, 250, 200);
            this.app.text("FIESTAS", 100, 250);
            this.app.text(this.fiestas, 250, 250);
            this.app.text("VIAJES", 100, 300);
            this.app.text(this.viajes, 250, 300);
            this.app.text("ROPA", 100, 350);
            this.app.text(this.ropa, 250, 350);
            this.app.text("ARRIENDO", 750, 200);
            this.app.text(this.arriendo, 920, 200);
            this.app.text("LUZ", 750, 250);
            this.app.text(this.luz, 920, 250);
            this.app.text("GAS", 750, 300);
            this.app.text(this.gas, 920, 300);
            this.app.text("AGUA", 750, 350);
            this.app.text(this.agua, 920, 350);
            this.app.ellipseMode(this.app.CENTER);
            this.app.fill(255);
            this.app.ellipse(50, 188, 40, 40);
            this.app.ellipse(50, 240, 40, 40);
            this.app.ellipse(50, 290, 40, 40);
            this.app.ellipse(50, 340, 40, 40);
            this.app.ellipse(700, 188, 40, 40);
            this.app.ellipse(700, 240, 40, 40);
            this.app.ellipse(700, 290, 40, 40);
            this.app.ellipse(700, 340, 40, 40);

            this.app.noFill();
            this.app.image(this.citasimg, 35, 175, 30, 30);
            this.app.image(this.partyimg, 40, 225, 29, 29);
            this.app.image(this.viajesimg, 35, 275, 29, 29)
            this.app.image(this.ropaimg, 35, 325, 30, 30);
            this.app.image(this.arriendoimg, 685, 170, 30, 30);
            this.app.image(this.luzimg, 683, 220, 35, 35);
            this.app.image(this.gasimg, 685, 275, 30, 30);
            this.app.image(this.aguaimg, 685, 325, 30, 30);


            this.app.image(this.sgteimg, 750, 410);
            this.app.image(this.dineroimg, 40, 420, 50, 50);

            if (this.dia == 1 && this.timer == 0) {
                this.dia = 2;
                this.timer = 60;
                this.dinero += 100;
                this.luz += 30;
                this.gas += 10;
                this.arriendo += 20;
                this.agua += 10;
                this.amor = 30;
                this.ropa = 20;
                this.viajes = 50;
                this.fiestas = 30;
            }
        }
        if (this.pantalla == 2) {

            this.app.image(this.fondo, 0, 0);
            this.app.textFont(this.fuente);
            this.app.fill(0);
            this.app.textSize(30);
            this.app.textAlign(this.app.CENTER);
            this.app.text("Resultados finales", 490, 45);
            this.app.text("Inversiones realizadas", 490, 75);
            this.app.textSize(20);
            this.app.textAlign(this.app.LEFT);
            this.app.text("Dinero restante", 120, 400);
            this.app.text("Gustos", 80, 150);
            this.app.text("Responsabilidades", 790, 150);
            this.app.rectMode(this.app.CORNER);
            this.app.fill(20, 60, 100);
            this.app.rect(90, 175, 110, 30, 5);
            this.app.rect(90, 225, 150, 30, 5);
            this.app.rect(90, 275, 250, 30, 5);
            this.app.rect(90, 325, 100, 30, 5);
            this.app.rect(740, 175, 180, 30, 5);
            this.app.rect(740, 225, 170, 30, 5);
            this.app.rect(740, 275, 100, 30, 5);
            this.app.rect(740, 325, 120, 30, 5);
            this.app.rect(this.app.width / 2 - 390, 420, 430, 30, 5);
            this.app.fill(250, 100, 80);
            this.app.rect(90, 175, this.dataamor, 30, 5);
            this.app.rect(90, 225, this.datafiestas, 30, 5);
            this.app.rect(90, 275, this.dataviajes, 30, 5);
            this.app.rect(90, 325, this.dataropa, 30, 5);
            this.app.rect(740, 175, this.dataarriendo, 30, 5);
            this.app.rect(740, 225, this.dataluz, 30, 5);
            this.app.rect(740, 275, this.datagas, 30, 5);
            this.app.rect(740, 325, this.dataagua, 30, 5);
            this.app.rect(this.app.width / 2 - 390, 420, this.datadinero, 30, 5);

            this.app.ellipseMode(this.app.CENTER);
            this.app.fill(255);
            this.app.ellipse(50, 188, 40, 40);
            this.app.ellipse(50, 240, 40, 40);
            this.app.ellipse(50, 290, 40, 40);
            this.app.ellipse(50, 340, 40, 40);
            this.app.ellipse(660, 188, 40, 40);
            this.app.ellipse(660, 240, 40, 40);
            this.app.ellipse(660, 290, 40, 40);
            this.app.ellipse(660, 340, 40, 40);

            this.app.noFill();
            this.app.image(this.citasimg, 35, 175, 30, 30);
            this.app.image(this.partyimg, 40, 225, 29, 29);
            this.app.image(this.viajesimg, 35, 275, 29, 29)
            this.app.image(this.ropaimg, 35, 325, 30, 30);
            this.app.image(this.arriendoimg, 645, 170, 30, 30);
            this.app.image(this.luzimg, 643, 220, 35, 35);
            this.app.image(this.gasimg, 645, 275, 30, 30);
            this.app.image(this.aguaimg, 645, 325, 30, 30);

            this.app.image(this.sgteimg, 750, 410);
            this.app.image(this.dineroimg, 40, 420, 50, 50);

        }
    }


    seleccionar() {
        if (this.app.dist(50, 190, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.amor) {
            this.dinero -= this.amor;
            this.datadinero -= this.amor;
            this.dataamor += this.amor;
            this.amor = 0;
            if ((this.agua || this.arriendo || this.luz || this.gas) != 0 && this.felicidad + 2 <= 10) {
                this.felicidad += 2;
            } if (this.felicidad + 1 <= 10) {
                this.felicidad += 1;

            }
            this.responsabilidad -= 1;
        }
        if (this.app.dist(50, 240, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.fiestas) {
            this.dinero -= this.fiestas;
            this.datadinero -= this.fiestas;
            this.datafiestas += this.fiestas;
            this.fiestas = 0
            if ((this.agua || this.arriendo || this.luz || this.gas) != 0 && this.felicidad + 2 <= 10) {
                this.felicidad += 2;
            }
            if (this.felicidad + 1 <= 10) {
                this.felicidad += 1;
            }
            this.responsabilidad -= 3;
        }
        if (this.app.dist(50, 290, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.viajes) {
            this.dinero -= this.viajes;
            this.datadinero -= this.viajes;
            this.dataviajes += this.viajes;
            this.viajes = 0
            if ((this.agua || this.arriendo || this.luz || this.gas) != 0 && this.felicidad + 3 <= 10) {
                this.felicidad += 3;
            }
            if (this.felicidad + 2 <= 10) {
                this.felicidad += 2;
            }
            if (this.felicidad + 1 <= 10) {
                this.felicidad += 1;

            }
            this.responsabilidad -= 2;
        }
        if (this.app.dist(50, 340, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.ropa) {
            this.dinero -= this.ropa;
            this.datadinero -= this.ropa;
            this.dataropa += this.ropa;
            this.ropa = 0
            if ((this.agua || this.arriendo || this.luz || this.gas) != 0 && this.felicidad + 2 <= 10) {
                this.felicidad += 2;
            }
            if (this.felicidad + 1 <= 10) {
                this.felicidad += 1;
            }
            this.responsabilidad -= 1;
        }
        if (this.app.dist(700, 190, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.arriendo) {
            this.dinero -= this.arriendo;
            this.datadinero -= this.arriendo;
            this.dataarriendo += this.arriendo;
            this.arriendo = 0
            this.felicidad -= 2;
            if (this.responsabilidad + 3 <= 10) {
                this.responsabilidad += 3;
            }

        }
        if (this.app.dist(700, 240, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.luz) {
            this.dinero -= this.luz;
            this.datadinero -= this.luz;
            this.dataluz += this.luz;
            this.luz = 0
            this.felicidad -= 2;
            if (this.responsabilidad) {
                this.responsabilidad += 1;
            }

        }
        if (this.app.dist(700, 290, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.gas) {
            this.dinero -= this.gas;
            this.datadinero -= this.gas;
            this.datagas += this.gas;
            this.gas = 0
            this.felicidad -= 1;
            if (this.responsabilidad) {
                this.responsabilidad += 1;
            }
        }
        if (this.app.dist(700, 340, this.app.mouseX, this.app.mouseY) < 25 && this.dinero > 0 && this.dinero >= this.agua) {
            this.dinero -= this.agua;
            this.datadinero -= this.agua;
            this.dataagua += this.agua;
            this.agua = 0
            this.felicidad -= 2;
            if (this.responsabilidad) {
                this.responsabilidad += 1;
            }
        }
        if (this.app.mouseX >= 750 && this.app.mouseX <= 1000 && this.app.mouseY >= 410 && this.app.mouseY <= 460 && this.dia == 1 && this.timer != 30) {

            this.dia = 2;
            this.timer = 30;
            this.dinero += 100;
            if (this.luz != 0) {
                this.luz += 30;
            }
            if (this.gas != 0) {
                this.gas += 20;
            }
            if (this.arriendo != 0) {
                this.arriendo += 20;
            }
            if (this.agua != 0) {
                this.agua += 20;
            }
            if (this.felicidad < 7) {
                this.felicidad--;
            }
            this.amor = 20;
            this.ropa = 20;
            this.viajes = 50;
            this.fiestas = 30;
            this.responsabilidad -= 1;

        }

        if (this.app.mouseX >= 750 && this.app.mouseX <= 1000 && this.app.mouseY >= 410 && this.app.mouseY <= 460 && this.dia == 2 && this.timer != 30) {
            this.dia = 3;
            this.timer = 30;
            this.dinero += 100;
            if (this.luz != 0) {
                this.luz += 30;
            }
            if (this.gas != 0) {
                this.gas += 20;
            }
            if (this.arriendo != 0) {
                this.arriendo += 20;
            }
            if (this.agua != 0) {
                this.agua += 20;
            }
            if (this.felicidad < 7) {
                this.felicidad--;
            }
            this.amor = 20;
            this.ropa = 20;
            this.viajes = 50;
            this.fiestas = 30;
            this.responsabilidad -= 1;

        }
        if (this.app.mouseX >= 750 && this.app.mouseX <= 1000 && this.app.mouseY >= 410 && this.app.mouseY <= 460 && this.dia == 3 && this.timer != 30) {
            this.dia = 4;
            this.timer = 30;
            this.dinero += 80;
            if (this.luz != 0) {
                this.luz += 30;
            }
            if (this.gas != 0) {
                this.gas += 20;
            }
            if (this.arriendo != 0) {
                this.arriendo += 20;
            }
            if (this.agua != 0) {
                this.agua += 20;
            }
            if (this.felicidad < 7) {
                this.felicidad--;
            }
            this.amor = 20;
            this.ropa = 20;
            this.viajes = 50;
            this.fiestas = 30;


        }
        if (this.app.mouseX >= 750 && this.app.mouseX <= 1000 && this.app.mouseY >= 410 && this.app.mouseY <= 460 && this.dia == 4 && this.timer != 30) {
            this.dia = 5;
            this.timer = 30;
            this.dinero += 50;
            if (this.luz != 0) {
                this.luz += 30;
            }
            if (this.gas != 0) {
                this.gas += 20;
            }
            if (this.arriendo != 0) {
                this.arriendo += 20;
            }
            if (this.agua != 0) {
                this.agua += 20;
            }
            if (this.felicidad < 7) {
                this.felicidad--;
            }
            this.amor = 20;
            this.ropa = 20;
            this.viajes = 50;
            this.fiestas = 30;


        }

        if (this.app.mouseX >= 750 && this.app.mouseX <= 1000 && this.app.mouseY >= 410 && this.app.mouseY <= 460 && this.dia == 5 && this.timer != 30) {

            this.pantalla = 2;


            if (this.felicidad >= 8 && this.responsabilidad >= 8 && this.arriendo == 0 && this.luz == 0 && this.gas == 0 && this.agua == 0) {
                this.finalExcelente = true;
            }
            if ((this.felicidad >= 8 && this.responsabilidad >= 8) && (this.arriendo != 0) || (this.luz != 0) || (this.gas != 0) || (this.agua != 0)) {
                this.finalBueno = true;
            }
            if (((this.felicidad >= 5 && this.felicidad <= 7) || (this.responsabilidad >= 5 && this.responsabilidad <= 7)) || (this.dinero <= 200)) {
                this.finalMedio = true;
            }
            if (this.dinero >= 200 || this.responsabilidad <= 4 || this.felicidad <= 4) {
                this.finalMalo = true;
            }
            console.log("excelente" + this.finalExcelente);
            console.log("bueno" + this.finalBueno);
            console.log("medio" + this.finalMedio);
            console.log("malo" + this.finalMalo);
            this.evaluacion();
        }

        if (this.app.mouseX >= 750 && this.app.mouseX <= 1000 && this.app.mouseY >= 410 && this.app.mouseY <= 460 && this.pantalla == 0) {
            this.pantalla++;

        }
    }

    evaluacion() {
        //Puntua según el final que haya sacado el usuario
        if (this.finalMalo == true) {
            this.puntuacion = 0;
        }

        if (this.finalMedio == true) {
            this.puntuacion = 50;
        }

        if (this.finalBueno == true) {
            this.puntuacion = 100;
        }

        if (this.finalExcelente == true) {
            this.puntuacion = 200;
        }

        this.propiedades.puntuacion = this.puntuacion;
    }
}