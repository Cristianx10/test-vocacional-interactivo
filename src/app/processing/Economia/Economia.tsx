
import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import Logica from "./src/Logica";

interface IPropsEconomia {
    puntuacion: number;
}

export interface IPropEconomia {
    puntuacion: number;
}

export default class Economia extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;
    propiedades: any;
    logica?: Logica;

    constructor(props: IPropEconomia) {
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
            this.processing.size(1000, 500);
        }
        if (this.app) {
            this.logica = new Logica(this.app);
        }
    }

    draw() {
        if(this.app){
            this.app.background(255);
        }
        if (this.logica)
            this.logica.pintar();

    }

    mousePressed() {

    }

    mouseDragged() {

    }

    mouseReleased() {
        if (this.logica)
            this.logica.seleccionar();
    }



    render() {
        return <div></div>;
    }
}

