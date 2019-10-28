import React, { Component } from "react";

import { matrixImagen } from "../../utilidades/matrices";
import "./Tuberias.scss";
import { ICategoria } from '../../resultados/resultados';
import APizarra from './TS-Tuberias';


interface IPropsTuberias {
  url: string;
  width: number;
  height: number;
  filas: number;
  columnas: number;
  children: Ficha[];
  config: Function;
}

interface IActionTuberias {
  validar: Function;
  setIntento: Function;
  setValidacion: Function;
}

export class Tuberias extends Component<IPropsTuberias> {

  tuberias: APizarra;
  propiedades: any;
  acciones: IActionTuberias;

  constructor(props: IPropsTuberias) {
    super(props);


    this.tuberias = new APizarra();
    this.propiedades = this.tuberias.propiedades;
    this.acciones = this.tuberias.acciones;

    this.acciones.validar = (id: string, accion: Function, descripcion: string, valorMaximo: ICategoria[]) => {
      this.tuberias.validar(id, accion, descripcion, valorMaximo);
    };

    this.acciones.setIntento = (acciones: any) => {
      this.tuberias.setIntento(acciones);
    };

    this.acciones.setValidacion = (acciones: any) => {
      this.tuberias.setValidacion(acciones);
    };
  }

  componentDidMount() {
    let contenedor: any = this.refs.contenedor;

    let url = this.props.url;
    let width = parseInt(this.props.width + "");
    let height = parseInt(this.props.height + "");
    let filas = parseInt(this.props.filas + "");
    let columnas = parseInt(this.props.columnas + "");

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

interface IPropsFicha {
  inicio: number;
  final: number;
  lider: number;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  static: boolean;
}

export class Ficha extends Component<IPropsFicha> {
  render() {
    return <div></div>;
  }
}
