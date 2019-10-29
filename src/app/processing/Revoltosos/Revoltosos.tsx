import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import Logica from './src/Logica';
import Main from './src/Main';

interface IPropsRevoltosos {

}

export default class Revoltosos extends Component implements AppProcessing {

    processingContext: processingContext;
    processing: Processing;
    app: p5;

    main?: Main;


    constructor(props: IPropsRevoltosos) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        this.processing.juego = this;
        this.app = this.processing.app;

    }

    settings() {

    }

    setup() {
        this.main = new Main(this.app);
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