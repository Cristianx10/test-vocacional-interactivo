import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import Main from './src/Main';
import { GResultados } from '../../resultados/resultados';

interface IPropsRevoltosos {

}

export interface IPropRevoltosos {
    puntuacion: number;
}

export default class Revoltosos extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;
    main?: Main;
    propiedades: any;
    registro?: GResultados;

    constructor(props: IPropsRevoltosos) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        if (this.processing) {
            this.processing.juego = this;
            this.app = this.processing.app;
            this.propiedades = this.processing.propiedades;
            this.registro = this.processing.registro;

            this.registro.setId("Revoltosos");
        }
        this.propiedades.puntuacion = 0;
    }

    settings() {

    }

    setup() {
        if (this.processing) {
            this.processing.size(1280, 720);
        }
        if (this.app) {
            this.main = new Main(this.app);
        }
    }

    draw() {
        if (this.main) {
            this.main.draw();
        }
    }

    mousePressed() {
        if (this.main) {
            this.main.mousePressed();
        }
    }

    mouseDragged() {
        if (this.main) {
            this.main.mouseDragged();
        }
    }

    mouseReleased() {
        if (this.main) {
            this.main.mouseReleased();
        }
    }



    render() {
        return <div></div>;
    }
}