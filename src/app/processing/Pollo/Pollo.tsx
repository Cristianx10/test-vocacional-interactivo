import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';

import "./stylePollo.scss";
import Contenedor from '../../componentes/Contenedor/Contenedor';
import Logica from './data/Logica';


interface IPropsPollo {

}

export default class Pollo extends Component implements AppProcessing {

    processingContext: processingContext;
    processing?: Processing;
    app?: p5;
    logica?: Logica;
    propiedades: any;


    constructor(props: IPropsPollo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        if (this.processing) {
            this.processing.juego = this;
            this.app = this.processing.app;
            this.propiedades = this.processing.propiedades;
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
        if (this.logica)
            this.logica.draw();
    }

    mousePressed() {
        if (this.logica)
            this.logica.mouseClicked();
    }

    render() {
        return <div className="pollo">
            <Contenedor style={{ position: "absolute" }} top="">
                <h4>ESCOGE TU MOVIMIENTO</h4>
                <ul className="buttons">
                    <li id='oneMissionary'> 1 Pollito </li>
                    <li id='oneCannibal'> 1 Zorro </li>
                    <li id='twoMissionaries'> 2 Pollito </li>
                    <li id='twoCannibals'> 2 Zorros </li>
                    <li id='oneMissionaryOneCannibal'> 1 Pollito y 1 Zorro</li>
                </ul>
                <div className="espacioGo"  >
                    <button className="gogo" id='go'>Enviar</button>
                    <div className="perder"></div>
                </div>
            </Contenedor>
        </div>;
    }
}

