
import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import { GResultados } from '../../resultados/resultados';

import Logica from "./src/derecho/Logica";

interface IPropsPollo {

}

export default class Culpable extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;

    log?: Logica;
    propiedades: any;

    acciones: any;
    registro?: GResultados;

    constructor(props: IPropsPollo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;

        if (this.processing) {
            this.processing.juego = this;
            this.app = this.processing.app;
            this.propiedades = this.processing.propiedades;
            this.registro = this.processing.registro;
            this.registro.setId("Culpable");
        }
        this.propiedades.puntuacion = 0;
    }

    setup() {
        if (this.processing) {
            this.processing.size(1280, 720);
        }
        if (this.app) {
            this.log = new Logica(this.app);
            this.app.noStroke();
        }
    }

    draw() {
        if (this.log)
            this.log.pintar();
    }

    mouseReleased() {
        if (this.log)
            this.log.soltarMouse();
    }

    render() {
        return <div></div>;
    }
}





/*
import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';

interface IPropsPollo {

}

export default class Pollo extends Component implements AppProcessing {

    processingContext: processingContext;
    processing: Processing;
    app: p5;

    constructor(props: IPropsPollo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        this.processing.juego = this;
        this.app = this.processing.app;
    }

    setup() {

    }

    draw(){

    }

    render() {
        return <div></div>;
    }
}

*/