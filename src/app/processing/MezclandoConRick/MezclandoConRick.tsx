import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import Logica from "./src/Logica";

interface IPropsMezclandoConRick {

}

export class MezclandoConRick extends Component implements AppProcessing {

    processingContext: processingContext;
    processing: Processing;
    app: p5;

    log?: Logica;
    propiedades: any;

    constructor(props: IPropsMezclandoConRick) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        this.processing.juego = this;
        this.app = this.processing.app;
        
    }

    setup() {
        this.log = new Logica(this.app);
    }

    draw() {
        this.app.background("white");
        this.app.text(this.app.key, this.app.mouseX, this.app.mouseY);
        if (this.log) {
            this.log.pintar();
        }
    }

    mousePressed() {
        if (this.log) {
            this.log.mouse();
        }
    }

    mouseReleased() {
        if (this.log) {
            this.log.mouseReleased();
        }
    }


    mouseDragged() {
        if (this.log) {
            this.log.mouseDragged();
        }
    }

    render() {
        return <div></div>;
    }
}

export default MezclandoConRick;