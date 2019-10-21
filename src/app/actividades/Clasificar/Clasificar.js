import React, { Component } from "react";

import { AClasificar } from "./TS-Clasificar";
import comunicador from "../../comunicacion/Comunicacion";
import Names from "../../comunicacion/Names";
import { resizeClass } from "../../utilidades/AutoClases";


var countClasificacion = 0;
var countClasificacionAlmacen = 0;

export class Clasificar extends Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add(Names.clasificar).push(this);
    this.pantalla = this.comunicador.getPropiedadActual(Names.pantalla);
    this.pantalla.onAddEventos(this);
    countClasificacion++;
    this.clasificar = new AClasificar();
    this.almacenes = [];
    this.accionesA = [];
    this.Apropiedad = [];
    this.acciones = this.clasificar.acciones;
    this.propiedades = this.clasificar.propiedades;
  }

  componentDidMount() {
    console.log("Logica");
    let elementos = document.querySelectorAll(
      ".elemento__clasificacion_" + countClasificacion
    );

    this.clasificar.arrastrables(
      ".elemento__clasificacion_" + countClasificacion,
      ".clasificar__id__" + countClasificacion
    );

    console.log(this.almacenes);
    this.clasificar.almacenaje(
      this.almacenes,
      ".elemento__clasificacion_" + countClasificacion,
      this.accionesA,
      this.Apropiedad
    );

    //this.clasificar.setContenedor(".ppintura");

    this.clasificar.setIntentoAcierto(() => {
      console.log("bien");
    });

    this.clasificar.setIntentoFallo(() => {
      console.log("mal");
    });

    this.clasificar.setValidacion(() => {});
  }

  onInicial() {}

  onFinal() {
    this.propiedades.titulares = this.pantalla.titulares;
    this.propiedades.tiempo = this.pantalla.tiempo;
    this.pantalla.capturarPantalla(imagen => {
      resultados.getPropiedades(this.clasificar).captura = imagen;
    });

    resultados.setTiempo(this.clasificar, this.pantalla.tiempo);
    resultados.evaluar(this.clasificar);
  }

  render() {
    let clases = resizeClass(
      this,
      "clasificar clasificar__id__" + countClasificacion
    );

    clases.style.position = "relative";

    return (
      <div ref="contenedor" className={clases.className} style={clases.style}>
        {React.Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}

export class Almacen extends Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add(Names.clasificar_almace).push(this);
    countClasificacionAlmacen++;
    this.clasificador = this.comunicador.getPropiedadActual(Names.clasificar);
    this.clasificar = this.clasificador.clasificar;

    this.clasificador.almacenes.push(
      ".almacen__clasificacion_" + countClasificacionAlmacen
    );
  }

  componentDidMount() {
    let accion = s => {
      s.style.margin = "0";
      s.style.left = "0";
      s.style.right = "0";
      s.style.top = "0";
    };

    if (this.props.accion) {
      this.accion = this.props.accion;
    }

    let nombre = "almacen__clasificacion_" + countClasificacionAlmacen;

    if (this.props.categoria) {
      nombre = this.props.categoria;
    }

    let tipo = "";
    if (this.props.tipo) {
      tipo = this.props.tipo;
    }

    if (this.props.categoria) {
      nombre = this.props.categoria;
    }

    this.clasificador.accionesA.push(accion);
    this.clasificador.Apropiedad.push({
      capacidad: 1,
      nombre: nombre,
      tipo:tipo
    });
  }

  render() {
    let width = "100px";
    let height = "100px";
    let top = "";
    let left = "";
    let position = "absolute";

    if (this.props.width) {
      width = this.props.width;
    }

    if (this.props.height) {
      height = this.props.height;
    }

    if (this.props.left) {
      left = this.props.left;
      position = "absolute";
    }

    if (this.props.top) {
      top = this.props.top;
      position = "absolute";
    }

    if (this.props.pos) {
      let posi = this.props.pos.split(" ");
      top = posi[0];
      left = posi[1];

      position = "absolute";
    }

    return (
      <div
        className={"almacen__clasificacion_" + countClasificacionAlmacen}
        id={this.props.id}
        style={{
          width: width,
          height: height,
          position: position,
          left: left,
          top: top,
          background: "blue"
        }}
      >
        {React.Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}

export class Zona extends Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add(Names.clasificar_zona).push(this);
    this.clasificador = this.comunicador.getPropiedadActual(Names.clasificar);
    this.clasificar = this.clasificador.clasificar;
  }

  componentDidMount() {
    this.clasificar.agregar(this.refs.contenedor, this.props.categoria);
  }
  render() {
    let width = "100px";
    let height = "100px";
    let top = "";
    let left = "";
    let position = "";

    if (this.props.width) {
      width = this.props.width;
    }

    if (this.props.height) {
      height = this.props.height;
    }

    if (this.props.left) {
      left = this.props.left;
      position = "absolute";
    }

    if (this.props.top) {
      top = this.props.top;
      position = "absolute";
    }

    let tipo = "";

    if(this.props.tipo){
      tipo = this.props.tipo;
    }

    if (this.props.pos) {
      let posi = this.props.pos.split(" ");
      top = posi[0];
      left = posi[1];

      position = "absolute";
    }

    return (
      <div
        ref="contenedor"
        className={"elemento__clasificacion_" + countClasificacion + " " + tipo}
        id={this.props.id}
        style={{
          width: width,
          height: height,
          position: position,
          left: left,
          top: top,
          background: "red"
        }}
      >
        {React.Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}
