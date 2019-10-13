import React from "react";

import comunicador from "../../comunicacion/Comunicacion";
import { resizeClass } from "../../utilidades/AutoClases";
import { shuffle } from "../../utilidades/utils";
import Names from "../../comunicacion/Names";

import { ARelacionar } from "./TS-relacionar";
import { resultados } from "../../resultados/resultados";

/* Clase encargada de la navegación entre actividades*/
export class Relacionar extends React.Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add(Names.relacionar).push(this);
    this.pantalla = this.comunicador.getPropiedadActual(Names.pantalla);

    this.pantalla.onAddEventos(this);
    this.opciones = [];

    this.tablero = new ARelacionar();


  }

  componentDidMount() {
    this.tablero.size(this.props.width, this.props.height);

    React.Children.map(this.props.children, view => {
      this.opciones.push({
        tipo: view.props.tipo,
        categoria: view.props.categoria
      });
    });

    if (this.props.config) {
      this.props.config(
        this,
        this.tablero,
        this.tablero.propiedades,
        this.tablero.accion
      );
    }

    let tipos = this.opciones;

    let categorias = [];

    shuffle(tipos);

    for (let i = 0; i < tipos.length; i++) {
      let e = tipos[i];
      this.tablero.baseA.agregar(e.tipo, e.categoria);
      categorias.push(e.categoria);
    }

    shuffle(categorias);

    for (let i = 0; i < categorias.length; i++) {
      let e = categorias[i];
      this.tablero.baseB.agregar(e, e);
    }

    this.tablero.incluirEn(this.refs.contenedor);

    setTimeout(() => {
      this.tablero.update();
    }, 1000);
  }

  onFinal() {
    this.tablero.capturarCanvas();
    resultados.evaluar(this.tablero);
  }

  render() {
    let c = resizeClass(this, "actividad__relacionar");
    return <div ref="contenedor" className={c.className} style={c.style}></div>;
  }
}

/* Clase encargada de la navegación entre actividades*/
export class Relacion extends React.Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.relacionar = this.comunicador.getPropiedadActual(Names.relacionar);
    this.comunicador.add(Names.relacion).push(this);

    this.relacionar.opciones.push(this);
  }
}
