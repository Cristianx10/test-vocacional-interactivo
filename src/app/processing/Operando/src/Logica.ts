import ProcessingImg from '../../../componentes/Processing/ProcessingImg';
import p5 = require("p5");
import Processing from '../../../componentes/Processing/Processing';
import ProcessingContext from '../../../comunicacion/ProcessingContext';

export class Logica {
    app: p5;
    img: ProcessingImg;

    pantalla: number;

    corte: boolean = false;
    curar: boolean = false;
    curaHigado: boolean = false;
    colorInicial: number[] = [];
    colorMedio: number[] = [];
    colorFinal: number[] = [];

    parte: string = "";

    mapaBNDeLasPartes: p5.Image;
    fondo: p5.Image;
    cuerpo: p5.Image;
    pielBrazo: p5.Image;
    pielCostilla: p5.Image;
    pielHigado: p5.Image;
    utensilios: p5.Image;
    bisturi: p5.Image;
    venda: p5.Image;
    sutura: p5.Image;
    pinza: p5.Image;
    cura: p5.Image;
    higadoExtraido: p5.Image;
    brazoReparado: p5.Image;
    costillReaparada: p5.Image;
    suturaBrazo: p5.Image;
    suturaCostilla: p5.Image;
    suturaHigado: p5.Image;
    electro: p5.Image;
    bandeja: p5.Image;
    higadoM: p5.Image;
    higadoB: p5.Image;
    vendajeBrazo: p5.Image;
    vendajeTorso: p5.Image;
    instrucciones: p5.Image;
    linea: p5.Image;
    vel: number;
    lineaY: number;

    electroX: number = 0;
    corteBrazo: boolean = false;
    corteCostilla: boolean = false;
    suturar: boolean = false;

    corteHigado: boolean = false;
    curaBrazo: boolean = false;
    curaCostilla: boolean = false;
    brazoSuturado: boolean = false;
    costillaSuturada: boolean = false;
    higadoSuturado: boolean = false;
    higadoFuera: boolean = false;
    bHigadoBueno: boolean = false;
    bHigadoMalo: boolean = false;
    agarrarHigadoMalo: boolean = false;
    agarrarHigadoBueno: boolean = false;
    vendadoTorso: boolean = false;
    vendadoBrazo: boolean = false;

    r: number = 0;
    g: number = 0;
    b: number = 0;



    herramienta: string = "nada";
    CortarCorrectamente: boolean = false;
    curarHigado: boolean = false;
    tiempo: number = 0;
    operacionesRestantes: number = 0;
    tiempoPorTarea: number = 0;
    puntaje: number = 0;
    xInicialDelCorte: number = 0;
    yInicialDelCorte: number = 0;
    yMediaDelCorte: number = 0;
    xMediaDelCorte: number = 0;
    yFinalDelCorte: number = 0;
    xFinalDelCorte: number = 0;
    tiempoHechos = [];
    segundos = 0;

    timer: any;
    time: any;
    electroCardiograma: any;
    elec: any;

    processing?: Processing;
    propiedades: any;

    constructor(app: p5) {
        this.app = app;
        this.img = new ProcessingImg(this.app);

        this.processing = ProcessingContext.actividad;
        if (this.processing) {
            this.propiedades = this.processing.propiedades;
        }

        this.pantalla = 0;

        this.mapaBNDeLasPartes = this.img.loadImage("/img/2019/operacion/img/cuerpoBN.png");
        this.fondo = this.img.loadImage("/img/2019/operacion/img/Escenario.png");
        this.cuerpo = this.img.loadImage("/img/2019/operacion/img/cuerpoHeridas.png");
        this.pielBrazo = this.img.loadImage("/img/2019/operacion/img/pielBrazo.png");
        this.pielCostilla = this.img.loadImage("/img/2019/operacion/img/pielCostilla.png");
        this.pielHigado = this.img.loadImage("/img/2019/operacion/img/pielHigado.png");
        this.utensilios = this.img.loadImage("/img/2019/operacion/img/utensilios.png");
        this.bisturi = this.img.loadImage("/img/2019/operacion/img/bisturi.png");
        this.venda = this.img.loadImage("/img/2019/operacion/img/venda.png");
        this.sutura = this.img.loadImage("/img/2019/operacion/img/sutura.png");
        this.pinza = this.img.loadImage("/img/2019/operacion/img/pinza.png");
        this.cura = this.img.loadImage("/img/2019/operacion/img/cura.png");
        this.higadoExtraido = this.img.loadImage("/img/2019/operacion/img/higadoExtraido.png");
        this.brazoReparado = this.img.loadImage("/img/2019/operacion/img/brazoReparado.png");
        this.costillReaparada = this.img.loadImage("/img/2019/operacion/img/costillaReparada.png");
        this.suturaBrazo = this.img.loadImage("/img/2019/operacion/img/suturaBrazo.png");
        this.suturaCostilla = this.img.loadImage("/img/2019/operacion/img/suturaCostilla.png");
        this.suturaHigado = this.img.loadImage("/img/2019/operacion/img/suturaHigado.png");
        this.electro = this.img.loadImage("/img/2019/operacion/img/electroCardio.png");
        this.bandeja = this.img.loadImage("/img/2019/operacion/img/bandeja.png");
        this.higadoM = this.img.loadImage("/img/2019/operacion/img/higadoMalo.png");
        this.higadoB = this.img.loadImage("/img/2019/operacion/img/higadoBueno.png");
        this.vendajeBrazo = this.img.loadImage("/img/2019/operacion/img/vendajeBrazo.png");
        this.vendajeTorso = this.img.loadImage("/img/2019/operacion/img/vendajeTorso.png");
        this.instrucciones = this.img.loadImage("/img/2019/operacion/img/instrucciones.png");
        this.linea = this.img.loadImage("/img/2019/operacion/img/linea.png");
        this.vel = 3;
        this.lineaY = 19;
        this.app.imageMode(this.app.CENTER);
    }

    setup() {

    }

    draw() {
        this.app.background(0);
        switch (this.pantalla) {
            case 0:
                this.app.image(this.instrucciones, this.app.width / 2, this.app.height / 2)
                this.app.image(this.linea, 215, this.lineaY)

                this.lineaY += this.vel;
                if (this.lineaY < 19 || this.lineaY > 460) {
                    this.vel *= -1;
                }

                break;

            case 1:
                this.app.image(this.electro, this.electroX, 80);
                this.app.image(this.fondo, this.app.width / 2, this.app.height / 2);
                this.app.image(this.bandeja, this.app.width / 2, this.app.height / 2);
                this.app.image(this.utensilios, this.app.width / 2, this.app.height / 2);
                this.app.image(this.cuerpo, this.app.width / 2, this.app.height / 2);

                if (this.corteBrazo == false) {
                    this.app.image(this.pielBrazo, this.app.width / 2, this.app.height / 2);
                }
                if (this.corteCostilla == false) {
                    this.app.image(this.pielCostilla, this.app.width / 2, this.app.height / 2);
                }
                if (this.corteHigado == false) {
                    this.app.image(this.pielHigado, this.app.width / 2, this.app.height / 2);
                }

                if (this.curaBrazo == true) {
                    this.app.image(this.brazoReparado, this.app.width / 2, this.app.height / 2);
                }
                if (this.curaCostilla == true) {
                    this.app.image(this.costillReaparada, this.app.width / 2, this.app.height / 2);
                }

                if (this.brazoSuturado == true) {
                    this.app.image(this.suturaBrazo, this.app.width / 2, this.app.height / 2);
                }
                if (this.costillaSuturada == true) {
                    this.app.image(this.suturaCostilla, this.app.width / 2, this.app.height / 2);
                }

                if (this.higadoSuturado == true) {
                    this.app.image(this.suturaHigado, this.app.width / 2, this.app.height / 2);
                }

                if (this.higadoFuera == true) {
                    this.app.image(this.higadoExtraido, this.app.width / 2, this.app.height / 2);
                }

                if (this.bHigadoBueno == true) {
                    this.app.image(this.higadoB, 140, 315);
                }

                if (this.bHigadoMalo == true) {
                    this.app.image(this.higadoM, 224, 315);
                }


                if (this.agarrarHigadoMalo == true) {
                    this.app.image(this.higadoM, this.app.mouseX, this.app.mouseY);
                }

                if (this.agarrarHigadoBueno == true) {
                    this.app.image(this.higadoB, this.app.mouseX, this.app.mouseY);
                }


                if (this.vendadoTorso == true) {
                    this.app.image(this.vendajeTorso, this.app.width / 2, this.app.height / 2);
                }

                if (this.vendadoBrazo == true) {
                    this.app.image(this.vendajeBrazo, this.app.width / 2, this.app.height / 2);
                }


                switch (this.herramienta) {
                    case "bisturi":
                        this.app.image(this.bisturi, this.app.mouseX + 30, this.app.mouseY - 30);
                        break;

                    case "cura":
                        this.app.image(this.cura, this.app.mouseX, this.app.mouseY);
                        break;

                    case "pinza":
                        this.app.image(this.pinza, this.app.mouseX, this.app.mouseY);
                        break;

                    case "venda":
                        this.app.image(this.venda, this.app.mouseX, this.app.mouseY);
                        break;

                    case "sutura":
                        this.app.image(this.sutura, this.app.mouseX, this.app.mouseY);
                        break;


                }
                this.resultados();
               
                break;
        }
    }

    mousePressed() {
        switch (this.pantalla) {
            case 0:
                this.pantalla++;
                this.tiempo = 0;
                this.operacionesRestantes = 0;
                this.tiempoPorTarea = 0;
                this.CortarCorrectamente = false;
                this.herramienta = "nada";
                this.corteBrazo = false;
                this.corteCostilla = false;
                this.corteHigado = false;
                this.curaBrazo = false;
                this.curaCostilla = false;
                this.curarHigado = false;
                this.higadoFuera = false;
                this.brazoSuturado = false;
                this.costillaSuturada = false;
                this.agarrarHigadoMalo = false;
                this.bHigadoBueno = true;
                this.bHigadoMalo = false;
                this.vendadoBrazo = false;
                this.vendadoTorso = false;
                this.puntaje = 0;
                this.xInicialDelCorte = 0;
                this.yInicialDelCorte = 0;
                this.yMediaDelCorte = 0;
                this.xMediaDelCorte = 0;
                this.yFinalDelCorte = 0;
                this.xFinalDelCorte = 0;
                this.tiempoHechos = [];
                this.electroX = 40;
                this.segundos = 0;
                this.timer = this.getTimer.bind(this);
                this.time = setInterval(this.timer, 1000);
                this.electroCardiograma = this.getElectroCardiograma.bind(this);
                this.elec = setInterval(this.electroCardiograma, 135);
                break;

            case 1:
                this.xInicialDelCorte = this.app.mouseX;
                this.yInicialDelCorte = this.app.mouseY;
                this.sacarHigado();
                this.agarrandoHigadoBueno();
                break;

        }


    }

    mouseReleased() {
        switch (this.pantalla) {
            case 0:

                break;

            case 1:
                this.xFinalDelCorte = this.app.mouseX;
                this.yFinalDelCorte = this.app.mouseY;
                this.soltarHigadoMalo();
                this.transplantarHigadoBueno();
                this.curarHuesos();
                this.suturando();
                if (this.herramienta == "bisturi") {
                    this.evaluarCorte();
                }
                this.seleccionHerramienta();
                this.vendado();
                break;

        }
    }
    vendado() {
        if (this.herramienta == "venda") {
            if (this.brazoSuturado == true) {
                if (this.app.mouseX > 325 && this.app.mouseX < 360 && this.app.mouseY > 318 && this.app.mouseY < 415) {
                    this.puntaje += 9;
                    this.vendadoBrazo = true;
                    this.herramienta = "nada";
                }
            }
            if (this.costillaSuturada == true && this.higadoSuturado == true) {
                if (this.app.mouseX > 370 && this.app.mouseX < 505 && this.app.mouseY > 185 && this.app.mouseY < 355) {
                    this.puntaje += 7;
                    this.vendadoTorso = true;
                    this.herramienta = "nada";
                    if (this.segundos < 30) {
                        this.puntaje += 5;
                    }
                }
            }
        }
    }

    sacarPuntoMedio() {
        this.xMediaDelCorte = (this.xFinalDelCorte + this.xInicialDelCorte) / 2;
        this.yMediaDelCorte = (this.yFinalDelCorte + this.yInicialDelCorte) / 2;
    }

    seleccionHerramienta() {
        if (this.app.mouseX > 700 && this.app.mouseX < 770 && this.app.mouseY > 262 && this.app.mouseY < 318) {
            this.herramienta = "bisturi"
        }
        if (this.app.mouseX > 700 && this.app.mouseX < 770 && this.app.mouseY > 98 && this.app.mouseY < 176) {
            this.herramienta = "cura"
        }
        if (this.app.mouseX > 700 && this.app.mouseX < 770 && this.app.mouseY > 187 && this.app.mouseY < 240) {
            this.herramienta = "venda"
        }
        if (this.app.mouseX > 800 && this.app.mouseX < 870 && this.app.mouseY > 105 && this.app.mouseY < 185) {
            this.herramienta = "pinza"
        }
        if (this.app.mouseX > 800 && this.app.mouseX < 870 && this.app.mouseY > 205 && this.app.mouseY < 325) {
            this.herramienta = "sutura"
        }
    }


    curarHuesos() {
        if (this.herramienta == "cura") {
            this.app.image(this.mapaBNDeLasPartes, this.app.width / 2, this.app.height / 2);
            this.colorFinal = this.app.get(this.xFinalDelCorte, this.yFinalDelCorte);


            for (let i = 1; i < 3; i++) {
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.curar = false;
                switch (i) {
                    case 1:
                        this.r = 194;
                        this.g = 23;
                        this.b = 26;
                        if (this.corteBrazo == true) {
                            this.curar = true;
                        }
                        break;
                    case 2:
                        this.r = 214;
                        this.g = 216;
                        this.b = 40;
                        if (this.corteCostilla == true) {
                            this.curar = true;
                        }
                        break;
                }
                if (this.app.red(this.colorFinal) == this.r && this.app.green(this.colorFinal) == this.g && this.app.blue(this.colorFinal) == this.b) {
                    this.puntaje += 7;
                    switch (i) {
                        case 1:
                            this.curaBrazo = true;
                            this.herramienta = "nada";
                            break;

                        case 2:
                            this.curaCostilla = true;
                            this.herramienta = "nada";
                            break;
                    }

                }
            }
        }

    }
    sacarHigado() {
        if (this.corteHigado == true && this.bHigadoMalo == false) {
            if (this.curarHigado == false) {
                if (this.herramienta == "pinza") {
                    this.app.image(this.mapaBNDeLasPartes, this.app.width / 2, this.app.height / 2);
                    this.colorFinal = this.app.get(this.xInicialDelCorte, this.yInicialDelCorte);
                    this.r = 58;
                    this.g = 76;
                    this.b = 150;
                    if (this.app.red(this.colorFinal) == this.r && this.app.green(this.colorFinal) == this.g && this.app.blue(this.colorFinal) == this.b) {
                        this.agarrarHigadoMalo = true;
                        this.higadoFuera = true;
                        this.herramienta = "nada";
                    }
                }
            }
        }
    }

    resultados() {
        if (this.vendadoBrazo == true && this.vendadoTorso == true) {
            if (this.time != null) {
                clearInterval(this.time);
                this.time = null;
            }
            if (this.elec != null) {
                clearInterval(this.elec)
                this.elec = null;
            }

            console.log("medicina + " + this.puntaje);
            return this.puntaje;
            //agregar el cambio de pantalla
        }
        if (this.segundos == 70) {
            if (this.time != null) {
                clearInterval(this.time);
                this.time = null;
            }
            if (this.elec != null) {
                clearInterval(this.elec)
                this.elec = null;
            }
            console.log("medicina + " + this.puntaje);
            this.propiedades.puntuacion = this.puntaje;
            if(this.processing){
                this.processing.continuar();
            }
            return this.puntaje;

            //agregar el cambio de pantalla
        }
    }

    soltarHigadoMalo() {
        if (this.agarrarHigadoMalo == true && this.app.mouseX > 62 && this.app.mouseX < 312 && this.app.mouseY > 230 && this.app.mouseY < 410) {
            this.agarrarHigadoMalo = false;
            this.bHigadoMalo = true;
            this.puntaje += 7;
        } else if (this.agarrarHigadoMalo == true) {
            this.agarrarHigadoMalo = false;
            this.higadoFuera = false;
        }
    }

    agarrandoHigadoBueno() {
        if (this.app.mouseX > 120 && this.app.mouseX < 170 && this.app.mouseY > 290 && this.app.mouseY < 340) {
            this.agarrarHigadoBueno = true;
            this.bHigadoBueno = false;
        }
    }

    transplantarHigadoBueno() {
        if (this.curarHigado == false) {
            this.app.image(this.mapaBNDeLasPartes, this.app.width / 2, this.app.height / 2);
            this.colorFinal = this.app.get(this.xFinalDelCorte, this.xFinalDelCorte);
            this.r = 34;
            this.g = 34;
            this.b = 33;
            if (this.app.red(this.colorFinal) == this.r && this.app.green(this.colorFinal) == this.g && this.app.blue(this.colorFinal) == this.b) {
                if (this.bHigadoMalo == true) {
                    this.puntaje += 7;
                    this.agarrarHigadoBueno = false;
                    this.higadoFuera = false;
                    this.curarHigado = true;
                }
            } else {
                this.agarrarHigadoBueno = false;
                this.bHigadoBueno = true;
            }
        }
    }

    suturando() {
        if (this.herramienta == "sutura") {
            this.app.image(this.mapaBNDeLasPartes, this.app.width / 2, this.app.height / 2);
            this.colorFinal = this.app.get(this.xFinalDelCorte, this.yFinalDelCorte);
            for (let i = 1; i <= 3; i++) {
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.suturar = false;
                switch (i) {
                    case 1:
                        this.r = 194;
                        this.g = 23;
                        this.b = 26;
                        if (this.curaBrazo == true) {
                            this.suturar = true;
                        }
                        break;
                    case 2:
                        this.r = 214;
                        this.g = 216;
                        this.b = 40;
                        if (this.curaCostilla == true) {
                            this.suturar = true;
                        }
                        break;
                    case 3:
                        this.r = 58;
                        this.g = 76;
                        this.b = 150;
                        if (this.curaHigado == true) {
                            this.suturar = true;
                        }
                        break;
                }
                if (this.app.red(this.colorFinal) == this.r && this.app.green(this.colorFinal) == this.g && this.app.blue(this.colorFinal) == this.b) {
                    this.puntaje += 7;
                    switch (i) {
                        case 1:
                            this.brazoSuturado = true;
                            this.curaBrazo = false;
                            this.herramienta = "nada";
                            break;

                        case 2:
                            this.costillaSuturada = true;
                            this.curaCostilla = false;
                            this.herramienta = "nada";
                            break;


                        case 3:
                            this.higadoSuturado = true;
                            this.curaHigado = false;
                            this.herramienta = "nada";
                            break;
                    }

                }
            }
        }

    }

    evaluarCorte() {
        if (this.xInicialDelCorte != this.xFinalDelCorte || this.yFinalDelCorte != this.yInicialDelCorte) {
            this.sacarPuntoMedio();
            this.app.image(this.mapaBNDeLasPartes, this.app.width / 2, this.app.height / 2);
            this.colorInicial = this.app.get(this.xInicialDelCorte, this.yInicialDelCorte);
            this.colorMedio = this.app.get(this.xMediaDelCorte, this.yMediaDelCorte);
            this.colorFinal = this.app.get(this.xFinalDelCorte, this.yFinalDelCorte);

            for (let i = 1; i <= 3; i++) {
                this.parte = "nada";
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.corte = false;
                switch (i) {
                    case 1:
                        this.r = 194;
                        this.g = 23;
                        this.b = 26;
                        this.parte = "brazo";
                        if (this.corteBrazo == false) {
                            this.corte = true;
                        }
                        break;
                    case 2:
                        this.r = 214;
                        this.g = 216;
                        this.b = 40;
                        this.parte = "costilla";
                        if (this.corteCostilla == false) {
                            this.corte = true;
                        }
                        break;
                    case 3:
                        this.r = 58;
                        this.g = 76;
                        this.b = 150;
                        this.parte = "higado";
                        if (this.corteHigado == false) {
                            this.corte = true;
                        }
                        break;
                }
                if (this.corte) {
                    if (this.app.red(this.colorInicial) == this.r && this.app.green(this.colorInicial) == this.g && this.app.blue(this.colorInicial) == this.b && this.app.red(this.colorFinal) == this.r && this.app.green(this.colorFinal) == this.g && this.app.blue(this.colorFinal) == this.b) {
                        this.puntaje += 10;
                        switch (i) {
                            case 1:
                                this.corteBrazo = true;
                                break;
                            case 2:
                                this.corteCostilla = true;
                                break;
                            case 3:
                                this.corteHigado = true;
                                break;

                        }

                    } else if (this.app.red(this.colorInicial) == this.r && this.app.green(this.colorInicial) == this.g && this.app.blue(this.colorInicial) == this.b && this.app.red(this.colorMedio) == this.r && this.app.green(this.colorMedio) == this.g && this.app.blue(this.colorMedio) == this.b) {
                        this.puntaje += 5;
                        switch (i) {
                            case 1:
                                this.corteBrazo = true;
                                break;
                            case 2:
                                this.corteCostilla = true;
                                break;
                            case 3:
                                this.corteHigado = true;
                                break;

                        }
                    } else if (this.app.red(this.colorMedio) == this.r && this.app.green(this.colorMedio) == this.g && this.app.blue(this.colorMedio) == this.b && this.app.red(this.colorFinal) == this.r && this.app.green(this.colorFinal) == this.g && this.app.blue(this.colorFinal) == this.b) {
                        this.puntaje += 5;
                        switch (i) {
                            case 1:
                                this.corteBrazo = true;
                                break;
                            case 2:
                                this.corteCostilla = true;
                                break;
                            case 3:
                                this.corteHigado = true;
                                break;

                        }
                    }

                }

            }

        }
    }

    getElectroCardiograma() {
        this.electroX--;
    }

    getTimer() {
        this.segundos++;
    }
}