import React, { Component } from "react";
import APizarra from "./TS-Tuberias.ts";
import { matrixImagen } from "../../utilidades/matrices";
import "./Tuberias.scss";

export class Tuberias extends Component {
  constructor() {
    super();
    this.tuberias = new APizarra();
    this.propiedades = this.tuberias.propiedades;
    this.acciones = this.tuberias.acciones;

    this.acciones.validar = (id, accion, descripcion, valorMaximo) => {
      this.tablero.validar(id, accion, descripcion, valorMaximo);
    };

    this.acciones.setIntento = accion => {
      this.tablero.setIntento(accion);
    };
    
    this.acciones.setValidacion = accion => {
      this.tablero.setValidacion(accion);
    };
  }

  componentDidMount() {
    let contenedor = this.refs.contenedor;

    let url = this.props.url;
    let width = parseInt(this.props.width);
    let height = parseInt(this.props.height);
    let filas = parseInt(this.props.filas);
    let columnas = parseInt(this.props.columnas);

    let imagen = matrixImagen(url, width, height, filas, columnas);

    let inicio = 0;
    let final = 0;
    let lider = 0;

    React.Children.map(this.props.children, (view, index) => {
      let left = false;
      let right = false;
      let up = false;
      let down = false;
      let tipo = 0;

      if (view.props.inicio) {
        inicio = index;
      }

      if (view.props.final) {
        final = index;
      }

      if (view.props.lider) {
        lider = index;
      }

      if (view.props.left) {
        left = true;
      }
      if (view.props.right) {
        right = true;
      }
      if (view.props.up) {
        up = true;
      }
      if (view.props.down) {
        down = true;
      }
      if (view.props.static) {
        tipo = 1;
      }

      this.tuberias.agregar(imagen[index], up, down, left, right, index, tipo);
    });

    this.tuberias.inicializar(inicio, final, lider);

    this.tuberias.cargarTablero(filas, columnas, width, height);

    if (this.props.config) {
      this.props.config(this.propiedades, this.acciones);
    }

    this.tuberias.setValidacion(() => {
      console.log("Validado");
      let e = document.querySelector("#tuberia_info");
      //e.innerText = "¡Perfecto! Has completado la tuberia. Dale click a siguiente y probemos tu habilidad";
      //siguiente.disabled = false;
    });

    this.tuberias.setIntentoFallo(() => {
      console.log("Intento");
    });

    this.tuberias.incluirEn(contenedor);
  }

  render() {
    return <div ref="contenedor"></div>;
  }
}

export class Ficha extends Component {
  render() {
    return <div></div>;
  }
}
