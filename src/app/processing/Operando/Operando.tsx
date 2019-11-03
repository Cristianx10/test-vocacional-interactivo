import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import { Logica } from './src/Logica';

interface IPropsRevoltosos {

}

export interface IPropRevoltosos {
    puntuacion: number;
}

export default class Operando extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;
    propiedades: any;
    log?: Logica;


    constructor(props: IPropsRevoltosos) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        if (this.processing) {
            this.processing.juego = this;
            this.app = this.processing.app;
            this.propiedades = this.processing.propiedades;
        }
        this.propiedades.puntuacion = 0;
    }

    settings() {

    }

    setup() {
        if (this.processing) {
            this.processing.size(1000, 480);
        }
        if (this.app) {
            this.log = new Logica(this.app);
        }
    }

    draw() {
        if (this.log) {
            this.log.draw();
        }
    }

    mousePressed() {
        if (this.log) {
            this.log.mousePressed();
        }
    }

    mouseReleased() {
        if (this.log) {
            this.log.mouseReleased();
        }
    }



    render() {
        return <div></div>;
    }
}