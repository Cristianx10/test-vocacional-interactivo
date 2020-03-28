import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import Logica from "./src/Logica";
import { GResultados } from '../../resultados/resultados';

interface IGusanito { }

export class Gusanito extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;

    log?: Logica;
    propiedades: any;
    registro?: GResultados;

    constructor(props: IGusanito) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        if (this.processing) {
            this.processing.juego = this;
            this.app = this.processing.app;
            this.propiedades = this.processing.propiedades;
            this.registro = this.processing.registro;
            this.registro.setId("Gusanito")
        }
    }

    setup() {
        if (this.processing) {
            this.processing.size(1280, 720);
        }
        if (this.app) {
            this.log = new Logica(this.app);
        }
    }

    draw() {
        if (this.app) {
            this.app.background(0);
        }
        if (this.log) {
            this.log.pintar();
        }
    }

    mousePressed() {
        if (this.log) {
            this.log.click();
        }
    }

    mouseReleased() {
        if (this.log) {
            this.log.soltar();
        }
    }


    mouseDragged() {
        if (this.log) {
            this.log.arrastre();
        }
    }

    

    render() {
        return <div className="Gusanito"></div>;
    }
}

export default Gusanito;