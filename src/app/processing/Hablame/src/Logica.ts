import p5 from "p5";
import ProcessingImg from "../../../componentes/Processing/ProcessingImg";

class Logica {

    escenaFEM: p5.Image;
    escenaFSIM: p5.Image;
    finalfin: p5.Image;
    finalSIMNext: p5.Image;
    ifRes2Next: p5.Image;
    escenaNuevaR1Over: p5.Image;
    escenaNuevaR1FlechaOver: p5.Image;
    escenaFinalSIMOver: p5.Image;
    escenaFinalEMOver: p5.Image;
    escenaNuevaR1Selected: p5.Image;
    escenaNuevaR2Over: p5.Image;
    escenaNuevaR2Selected: p5.Image;
    escenaNuevaR2FlechaOver: p5.Image;
    escenaNueva: p5.Image;
    instruc1: p5.Image;
    instruc1Over: p5.Image;
    instruc2: p5.Image;
    instruc2Over: p5.Image;
    instruc2OverAnterior: p5.Image;
    escena1: p5.Image;
    escena2: p5.Image;
    escena3: p5.Image;
    escena4: p5.Image;
    escena5: p5.Image;
    interR2: p5.Image;
    interR2Over: p5.Image;
    o1r1: p5.Image;
    o1r2: p5.Image;
    o2r1: p5.Image;
    o2r2: p5.Image;
    e1r1Select: p5.Image;
    e1r1Over: p5.Image;
    e1r1OverNext: p5.Image;
    e1r2Select: p5.Image;
    e1r2Over: p5.Image;
    e1r2OverNext: p5.Image;
    empatia: number;
    e2r1Select: p5.Image;
    e2r1Over: p5.Image;
    e2r1OverNext: p5.Image;
    e2r2Select: p5.Image;
    e2r2Over: p5.Image;
    e2r2OverNext: p5.Image;
    tantoxR1: number;
    e3r1Select: p5.Image;
    e3r1Over: p5.Image;
    e3r1OverNext: p5.Image;
    e3r2Select: p5.Image;
    e3r2Over: p5.Image;
    e3r2OverNext: p5.Image;
    tantoxMayorR1: number;
    e4r1Select: p5.Image;
    e4r1Over: p5.Image;
    e4r1OverNext: p5.Image;
    e4r2Select: p5.Image;
    e4r2Over: p5.Image;
    e4r2OverNext: p5.Image;
    tantoy: number;
    e5r1Select: p5.Image;
    e5r1Over: p5.Image;
    e5r1OverNext: p5.Image;
    e5r2Select: p5.Image;
    e5r2Over: p5.Image;
    e5r2OverNext: p5.Image;
    tantoyMayor: number;
    tantoxR2: number;
    tantoxMayorR2: number;
    respuesta: number;

    flechaX: number;
    flechaXMayor: number;
    flechaY: number;
    flechaYMayor: number;

    img: ProcessingImg;
    app: p5;

    constructor(app: p5) {
        this.app = app;
        this.img = new ProcessingImg(this.app);

        this.escenaFEM = this.img.loadImage("/img/2019/hablame/escena final si es empatico.jpg");
        this.escenaFSIM = this.img.loadImage("/img/2019/hablame/escena final si es simpatico.jpg");
        this.escenaNuevaR1Over = this.img.loadImage("/img/2019/hablame/escena nueva r1over.jpg");
        this.finalSIMNext = this.img.loadImage("/img/2019/hablame/ifRes1Next.jpg");
        this.escenaFinalSIMOver = this.img.loadImage("/img/2019/hablame/escena final si es simpatico over.jpg");
        this.escenaFinalEMOver = this.img.loadImage("/img/2019/hablame/escena final si es empatico over.jpg");
        this.escenaNuevaR1FlechaOver = this.img.loadImage("/img/2019/hablame/escena nueva r1 flechaover.jpg");
        this.escenaNuevaR1Selected = this.img.loadImage("/img/2019/hablame/escena nueva r1selected.jpg");
        this.escenaNuevaR2Over = this.img.loadImage("/img/2019/hablame/escena nueva r2over.jpg");
        this.escenaNuevaR2Selected = this.img.loadImage("/img/2019/hablame/escena nueva r2selected.jpg");
        this.escenaNuevaR2FlechaOver = this.img.loadImage("/img/2019/hablame/escena nueva r2 flechaover.jpg");
        this.escenaNueva = this.img.loadImage("/img/2019/hablame/escena nueva.jpg");
        this.instruc1 = this.img.loadImage("/img/2019/hablame/instruc1.jpg");
        this.instruc1Over = this.img.loadImage("/img/2019/hablame/instruc1over.jpg");
        this.ifRes2Next = this.img.loadImage("/img/2019/hablame/ifRes2Next.jpg");
        this.instruc2 = this.img.loadImage("/img/2019/hablame/instruc2.jpg");
        this.instruc2OverAnterior = this.img.loadImage("/img/2019/hablame/instruc2overanterior.jpg");
        this.instruc2Over = this.img.loadImage("/img/2019/hablame/instruc2over.jpg");
        this.escena1 = this.img.loadImage("/img/2019/hablame/1.jpg");
        this.finalfin = this.img.loadImage("/img/2019/hablame/final.jpg");
        this.escena2 = this.img.loadImage("/img/2019/hablame/2.jpg");
        this.escena3 = this.img.loadImage("/img/2019/hablame/3.jpg");
        this.escena4 = this.img.loadImage("/img/2019/hablame/4.jpg");
        this.escena5 = this.img.loadImage("/img/2019/hablame/5.jpg");
        this.interR2Over = this.img.loadImage("/img/2019/hablame/intermedioR2over.jpg");
        this.o1r1 = this.img.loadImage("/img/2019/hablame/escena final si es empatico.jpg");
        this.o1r2 = this.img.loadImage("/img/2019/hablame/ifR2sinflecha.jpg");
        this.o2r1 = this.img.loadImage("/img/2019/hablame/ifR1sinflecha2.jpg");
        this.o2r2 = this.img.loadImage("/img/2019/hablame/ifR2sinflecha2.jpg");
        this.e1r1Select = this.img.loadImage("/img/2019/hablame/p1r1select.jpg");
        this.e1r1Over = this.img.loadImage("/img/2019/hablame/p1r1.jpg");
        this.e1r1OverNext = this.img.loadImage("/img/2019/hablame/p1r1next.jpg");
        this.e1r2Select = this.img.loadImage("/img/2019/hablame/p1r2select.jpg");
        this.e1r2Over = this.img.loadImage("/img/2019/hablame/p1r2.jpg");
        this.e1r2OverNext = this.img.loadImage("/img/2019/hablame/p1r2next.jpg");
        this.tantoxR1 = 341;
        this.e2r1Select = this.img.loadImage("/img/2019/hablame/p2r1select.jpg");
        this.e2r1Over = this.img.loadImage("/img/2019/hablame/p2r1.jpg");
        this.e2r1OverNext = this.img.loadImage("/img/2019/hablame/p2r1next.jpg");
        this.e2r2Select = this.img.loadImage("/img/2019/hablame/p2r2select.jpg");
        this.e2r2Over = this.img.loadImage("/img/2019/hablame/p2r2.jpg");
        this.e2r2OverNext = this.img.loadImage("/img/2019/hablame/p2r2next.jpg");
        this.tantoxMayorR1 = 551;
        this.e3r1Select = this.img.loadImage("/img/2019/hablame/p3r1select.jpg");
        this.e3r1Over = this.img.loadImage("/img/2019/hablame/p3r1.jpg");
        this.e3r1OverNext = this.img.loadImage("/img/2019/hablame/p3r1next.jpg");
        this.e3r2Select = this.img.loadImage("/img/2019/hablame/p3r2select.jpg");
        this.e3r2Over = this.img.loadImage("/img/2019/hablame/p3r2.jpg");
        this.e3r2OverNext = this.img.loadImage("/img/2019/hablame/p3r2next.jpg");
        this.tantoy = 655;
        this.e4r1Select = this.img.loadImage("/img/2019/hablame/p4r1select.jpg");
        this.e4r1Over = this.img.loadImage("/img/2019/hablame/p4r1.jpg");
        this.e4r1OverNext = this.img.loadImage("/img/2019/hablame/p4r1next.jpg");
        this.e4r2Select = this.img.loadImage("/img/2019/hablame/p4r2select.jpg");
        this.e4r2Over = this.img.loadImage("/img/2019/hablame/p4r2.jpg");
        this.e4r2OverNext = this.img.loadImage("/img/2019/hablame/p4r2next.jpg");
        this.tantoyMayor = 705;
        this.e5r1Select = this.img.loadImage("/img/2019/hablame/p5r1select.jpg");
        this.e5r1Over = this.img.loadImage("/img/2019/hablame/p5r1.jpg");
        this.e5r1OverNext = this.img.loadImage("/img/2019/hablame/p5r1next.jpg");
        this.e5r2Select = this.img.loadImage("/img/2019/hablame/p5r2select.jpg");
        this.e5r2Over = this.img.loadImage("/img/2019/hablame/p5r2.jpg");
        this.e5r2OverNext = this.img.loadImage("/img/2019/hablame/p5r2next.jpg");
        this.interR2 = this.img.loadImage("/img/2019/hablame/intermedioR2.jpg");
        this.tantoxR2 = 711;
        this.tantoxMayorR2 = 911;
        this.respuesta = 25;
        this.empatia = 0;
        this.flechaX = 1190;
        this.flechaXMayor = 1241;
        this.flechaY = 660;
        this.flechaYMayor = 705;
    }



    draw() {
        console.log("X: " + this.app.mouseX + " " + "Y: " + this.app.mouseY);
        console.log(this.respuesta);
        console.log("empatia: " + this.empatia);

        switch (this.respuesta) {
            case 0:
                this.app.background(0);
                this.app.image(this.escena1, 0, 0);
                //Mouse sobre respuesta 1
                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e1r1Over, 0, 0);

                }
                //Mouse sobre respuesta 2
                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e1r2Over, 0, 0);
                }
                break;
            case 1:
                //Dieron clic en respuesta 1
                this.app.image(this.e1r1Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e1r1OverNext, 0, 0);

                }


                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e1r2Over, 0, 0);

                }
                break;
            case 2:
                //Dieron clic en respuesta 2
                this.app.image(this.e1r2Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e1r2OverNext, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {

                    this.app.image(this.e1r1Over, 0, 0);

                }

                break;

            case 3:
                this.app.image(this.escena2, 0, 0);

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e2r1Over, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e2r2Over, 0, 0);

                }
                break;

            case 4:

                this.app.image(this.e2r1Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e2r1OverNext, 0, 0);

                }


                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e2r2Over, 0, 0);

                }
                break;

            case 5:

                this.app.image(this.e2r2Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e2r2OverNext, 0, 0);

                }


                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {

                    this.app.image(this.e2r1Over, 0, 0);

                }
                break;

            case 6:

                this.app.image(this.escena3, 0, 0);

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e3r1Over, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e3r2Over, 0, 0);

                }
                break;

            case 7:

                this.app.image(this.e3r1Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e3r1OverNext, 0, 0);

                }


                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e3r2Over, 0, 0);

                }
                break;

            case 8:

                this.app.image(this.e3r2Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e3r2OverNext, 0, 0);

                }


                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {

                    this.app.image(this.e3r1Over, 0, 0);

                }
                break;


            case 9:

                this.app.image(this.escena4, 0, 0);

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e4r1Over, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e4r2Over, 0, 0);

                }
                break;

            case 10:

                this.app.image(this.escena5, 0, 0);

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e5r1Over, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e5r2Over, 0, 0);

                }
                break;

            case 11:

                this.app.image(this.e4r1Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e4r1OverNext, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e4r2Over, 0, 0);

                }
                break;

            case 12:

                this.app.image(this.e4r2Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e4r2OverNext, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e4r1Over, 0, 0);

                }

                break;

            case 13:

                this.app.image(this.escenaFEM, 0, 0);
                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.escenaFinalEMOver, 0, 0);

                }
                break;

            case 14:

                this.app.image(this.o1r2, 0, 0);

                break;

            case 15:

                this.app.image(this.e5r1Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e5r1OverNext, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e5r2Over, 0, 0);

                }

                break;

            case 16:

                this.app.image(this.e5r2Select, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.e5r2OverNext, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.e5r1Over, 0, 0);

                }
                break;

            case 18:

                this.app.image(this.o2r1, 0, 0);
                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.finalSIMNext, 0, 0);

                }
                break;

            case 17:

                this.app.image(this.o2r2, 0, 0);
                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.ifRes2Next, 0, 0);

                }
                break;

            case 20:

                this.app.image(this.interR2, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.interR2Over, 0, 0);

                }


                break;

            case 25:

                this.app.image(this.instruc1, 0, 0);
                if (this.app.mouseX > 614 && this.app.mouseX < 644 && this.app.mouseY > 500 && this.app.mouseY < 538) {
                    this.app.image(this.instruc1Over, 0, 0);
                }
                break;

            case 26:

                this.app.image(this.instruc2, 0, 0);
                if (this.app.mouseX > 614 && this.app.mouseX < 644 && this.app.mouseY > 500 && this.app.mouseY < 538) {
                    this.app.image(this.instruc2Over, 0, 0);
                }

                if (this.app.mouseX > 562 && this.app.mouseX < 591 && this.app.mouseY > 500 && this.app.mouseY < 538) {
                    this.app.image(this.instruc2OverAnterior, 0, 0);
                }
                break;

            case 27:

                this.app.image(this.escenaNueva, 0, 0);

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.escenaNuevaR1Over, 0, 0);

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.escenaNuevaR2Over, 0, 0);

                }
                break;

            case 28:

                this.app.image(this.escenaNuevaR1Selected, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.escenaNuevaR1FlechaOver, 0, 0);

                }
                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.escenaNuevaR2Over, 0, 0);

                }
                break;

            case 29:

                this.app.image(this.escenaNuevaR2Selected, 0, 0);

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.escenaNuevaR2FlechaOver, 0, 0);

                }
                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.app.image(this.escenaNuevaR1Over, 0, 0);

                }
                break;

            case 30:

                this.app.image(this.escenaFSIM, 0, 0);
                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.app.image(this.escenaFinalSIMOver, 0, 0);
                }
                break;


            case 45:

                this.app.image(this.finalfin, 0, 0);

                break;






        }
    }




    mouseClicked() {

        switch (this.respuesta) {
            case 0:
                //dar clic en this.respuesta 1
                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 1; //Em
                }
                //dar clic en this.respuesta 2
                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 2; //Sim
                }
                break;

            case 1:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 3;

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 1; //Em
                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 2; //Sim
                }
                break;

            case 2:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 20;
                    this.empatia += 20;

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 1; //Em
                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 2; //Sim
                }
                break;

            case 3:

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 4;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 5;

                }
                break;

            case 4:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.empatia += 20;
                    this.respuesta = 6;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 5;

                }
                break;

            case 5:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 6;

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 4;

                }
                break;

            case 6:

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 7;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 8;

                }
                break;

            case 7:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.empatia += 20;
                    this.respuesta = 9;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 8;

                }
                break;

            case 8:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 10;

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 7;

                }
                break;

            case 9:

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 11;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 12;

                }
                break;

            case 10:

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 15;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 16;

                }
                break;



            case 11:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.empatia += 20;
                    this.respuesta = 27;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 12;

                }
                break;

            case 12:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 14;

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 11;

                }

                break;

            case 13:
                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 45;

                }
                break;


            case 15:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 18;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 16;

                }
                break;

            case 16:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.empatia += 20;
                    this.respuesta = 17;

                }

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 15;

                }
                break;

            case 17:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {

                    this.respuesta = 45;

                }

                break;
            case 18:
                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 45;

                }
                break;

            case 20:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 3;

                }
                break;

            case 25:

                if (this.app.mouseX > 614 && this.app.mouseX < 644 && this.app.mouseY > 500 && this.app.mouseY < 538) {
                    this.respuesta = 26;
                }
                break;

            case 26:

                if (this.app.mouseX > 562 && this.app.mouseX < 591 && this.app.mouseY > 500 && this.app.mouseY < 538) {
                    this.respuesta = 25;
                }
                if (this.app.mouseX > 614 && this.app.mouseX < 644 && this.app.mouseY > 500 && this.app.mouseY < 538) {
                    this.respuesta = 0;
                }
                break;

            case 27:

                if (this.app.mouseX > this.tantoxR1 && this.app.mouseX < this.tantoxMayorR1 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 28;

                }

                if (this.app.mouseX > this.tantoxR2 && this.app.mouseX < this.tantoxMayorR2 && this.app.mouseY > this.tantoy && this.app.mouseY < this.tantoyMayor) {
                    this.respuesta = 29;

                }
                break;

            case 28:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.respuesta = 30;

                }

                break;

            case 29:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {
                    this.empatia += 20;
                    this.respuesta = 13;

                }


                break;

            case 30:

                if (this.app.mouseX > this.flechaX && this.app.mouseX < this.flechaXMayor && this.app.mouseY > this.flechaY && this.app.mouseY < this.flechaYMayor) {

                    this.respuesta = 45;

                }


                break;


        }
    }
}

export default Logica;