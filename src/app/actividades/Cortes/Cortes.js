import React, { Component } from "react";
import { SalaCirugia, CorteLinea } from "./TS-Cortes";

export class Cortes extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let sala = new SalaCirugia();

    sala.cargarCuerpo("../img/cortes/CuerpoB.png");

    let corteA = new CorteLinea(sala, 20);
    corteA.trazoCurva({ x: 500, y: 100 }, { x: 500, y: 430 }, 20, 20);

    let corteB = new CorteLinea(sala, 10);
    corteB.trazadoLineal({ x: 400, y: 350 }, { x: 470, y: 430 });

    let corteC = new CorteLinea(sala, 10);
    corteC.trazadoCurvaIzquierda({ x: 600, y: 350 }, { x: 530, y: 430 });

    sala.stage.addChild(corteA.linea, corteB.linea, corteC.linea);
    sala.stage.update();

    sala.incluirEn(this.refs.contenedor);
  }

  render() {
    return <div ref="contenedor"></div>;
  }
}
