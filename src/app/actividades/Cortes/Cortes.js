import React, { Component } from "react";
import { SalaCirugia, CorteLinea } from "./TS-Cortes";
import comunicador from "../../comunicacion/Comunicacion";
import Names from "../../comunicacion/Names";

export class Cortes extends Component {
  constructor() {
    super();
    this.sala = new SalaCirugia();
    this.comunicador= comunicador;
    this.comunicador.add(Names.cortes).push(this);
  }

  componentDidMount() {
    this.sala.cargarCuerpo("../img/cortes/CuerpoB.png");

    let corteA = new CorteLinea(this.sala, 20);
    corteA.trazoCurva({ x: 500, y: 0 }, { x: 500, y: 430 }, 10);

    let corteB = new CorteLinea(this.sala, 10);
    corteB.trazadoLineal({ x: 400, y: 350 }, { x: 470, y: 430 });

    let corteC = new CorteLinea(this.sala, 10);
    corteC.trazadoCurvaIzquierda({ x: 600, y: 350 }, { x: 530, y: 430 });

    this.sala.stage.addChild(corteA.linea, corteB.linea, corteC.linea);
    this.sala.stage.update();

    this.sala.incluirEn(this.refs.contenedor);
  }

  render() {
    return <div ref="contenedor"></div>;
  }
}

export class Corte extends Component {
  constructor() {
      super();
      this.comunicador = comunicador;
      this.comunicador.add(Names.corte).push(this);
  }

  componentDidMount(){

  }

  render() {
    return <div></div>;
  }
}
