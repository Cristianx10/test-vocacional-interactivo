import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import Logica from "./src/Logica";
import { GResultados } from '../../resultados/resultados';

interface IPropsMezclandoConRick { }

export class MezclandoConRick extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;

    log?: Logica;
    propiedades: any;
    registro?: GResultados;

    constructor(props: IPropsMezclandoConRick) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        if (this.processing) {
            this.processing.juego = this;
            this.app = this.processing.app;
            this.propiedades = this.processing.propiedades;
            this.registro = this.processing.registro;
            this.registro.setId("Mezclando con rick")
        }


        this.propiedades.vidas = 0;
        this.propiedades.puntaje = 0;


    }

    setup() {
        if (this.processing) {
            this.processing.size(1200, 700);
        }
        if (this.app) {
            this.log = new Logica(this.app);
        }
    }

    draw() {
        if (this.app) {
            this.app.background("white");
            this.app.text(this.app.key, this.app.mouseX, this.app.mouseY);
        }
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