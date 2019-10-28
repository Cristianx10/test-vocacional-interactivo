
import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';

import Logica from "./src/derecho/Logica";

interface IPropsPollo {

}

export default class Culpable extends Component implements AppProcessing {

    processingContext: processingContext;
    processing: Processing;
    app: p5;

    log?: Logica;
    propiedades: any;
    acciones: any;

    constructor(props: IPropsPollo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        this.processing.juego = this;
        this.app = this.processing.app;
    }

    setup() {
        this.log = new Logica(this.app);
        this.app.noStroke();
    }

    draw() {
        if(this.log)
        this.log.pintar();
    }

    mouseReleased() {
        if(this.log)
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