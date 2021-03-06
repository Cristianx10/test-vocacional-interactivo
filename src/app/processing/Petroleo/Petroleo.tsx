import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import { Logica } from './src/Logica';
import { GResultados } from '../../resultados/resultados';

interface IPetroleo {

}

export default class Petroleo extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;
    logica?: Logica;
    propiedades: any;
    registro?: GResultados;


    constructor(props: IPetroleo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        if (this.processing) {
            this.processing.juego = this;
            this.app = this.processing.app;
            this.propiedades = this.processing.propiedades;
            this.registro = this.processing.registro;
            this.registro.setId("Petroleo");
            this.registro.setMultiple(true);
        }


    }

    preload() {

    }

    setup() {
        if (this.processing) {
            this.processing.size(1280, 720);
        }
        if (this.app) {
            this.logica = new Logica(this.app);
        }
    }

    draw() {
        if (this.logica){
            this.logica.pintar();
        }
    }

    mousePressed() {
        if (this.logica)
            this.logica.mouse();
    }

    render() {
        return <div className="Petroleo">
            
        </div>;
    }
}

