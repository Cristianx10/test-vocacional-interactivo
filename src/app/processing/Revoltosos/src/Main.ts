import p5 = require("p5");
import Logica from "./Logica";

export default class Main {

    app: p5;
    log: Logica;
    fondo1: p5.Image;
    fondo11: p5.Image;
    fondo2: p5.Image;
    fondo22: p5.Image;
    fondo3: p5.Image;
    fondo4: p5.Image;
    fondo44: p5.Image;
    pantalla: number;
    contador: number;
    activartiempo: boolean;

    constructor(app: p5) {
        this.app = app;
        this.log = new Logica(this);
        this.pantalla = 1;
        this.contador = 0;
        this.activartiempo = true;
        this.fondo1 = this.app.loadImage("/img/2019/revoltosos/data/INICIO.png");
        this.fondo11 = this.app.loadImage("/img/2019/revoltosos/data/INICIO2.png");
        this.fondo2 = this.app.loadImage("/img/2019/revoltosos/data/INSTRUCCIONES.png");
        this.fondo22 = this.app.loadImage("/img/2019/revoltosos/data/INSTRUCCIONES2.png");
        this.fondo3 = this.app.loadImage("/img/2019/revoltosos/data/fondo.jpg");
        this.fondo4 = this.app.loadImage("/img/2019/revoltosos/data/FINAL.png");
        this.fondo44 = this.app.loadImage("/img/2019/revoltosos/data/FINAL2.png");
    }


    draw() {
        switch (this.pantalla) {
            case 1:
                this.app.image(this.fondo1, 0, 0);
                break;

            case 2:
                this.app.image(this.fondo2, 0, 0);
                break;

            case 3:
                if (this.activartiempo) {
                    this.contador = this.app.millis();
                    this.activartiempo = false;
                }
                this.app.image(this.fondo3, 0, 0);
                this.log.pintar();
                this.tiempo();
                this.cambiartiemponecesidad();
                break;

            case 4:
                this.app.image(this.fondo4, 0, 0);
                console.log("Puntaje:" + this.log.getPuntaje());
                console.log("Ancho barra:" + this.log.getAnchobarra());
                break;
        }
    }

    tiempo() {
        if (parseInt(this.app.millis() + "") - this.contador >= 120000) {
            this.pantalla = 4;
        }
    }

    cambiartiemponecesidad() {
        if (parseInt(this.app.millis() + "") - this.contador >= 30000) {
            this.log.settiemponecesidad(4000);
        }
        if (parseInt(this.app.millis() + "") - this.contador >= 60000) {
            this.log.settiemponecesidad(3000);
        }
        if (parseInt(this.app.millis() + "") - this.contador >= 90000) {
            this.log.settiemponecesidad(2000);
        }
    }


    mousePressed() {
        this.log.mousePressed();
        if (this.pantalla == 1) {
            if (this.app.mouseX > 151 && this.app.mouseX < 322 && this.app.mouseY > 360 && this.app.mouseY < 421) {
                this.pantalla = 2;
            }
        }

        if (this.pantalla == 2) {
            if (this.app.mouseX > 1057 && this.app.mouseX < 1222 && this.app.mouseY > 29 && this.app.mouseY < 101) {
                this.pantalla = 3;
            }
        }
    }

    mouseDragged() {
        this.log.mouseDragged();
    }

    mouseReleased() {
        this.log.mouseReleased();
    }

    getPantalla() {
        return this.pantalla;
    }
}