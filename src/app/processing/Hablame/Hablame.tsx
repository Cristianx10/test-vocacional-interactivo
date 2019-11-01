import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import Logica from "./src/Logica";

interface IPropsMezclandoConRick {

}

export class Hablame extends Component implements AppProcessing {

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
        this.processing.size(1280, 720);
        this.log = new Logica(this.app);
    }

    draw() {
        this.app.background("white");
        this.app.text(this.app.key, this.app.mouseX, this.app.mouseY);
        if (this.log) {
            this.log.draw();
        }
    }

    mousePressed() {
        if (this.log) {
            this.log.mouseClicked();
        }
    }

    render() {
        return <div></div>;
    }
}

export default Hablame;