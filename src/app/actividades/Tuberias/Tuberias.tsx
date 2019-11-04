import React, { Component, ReactChild } from "react";

import { matrixImagen } from "../../utilidades/matrices";
import "./Tuberias.scss";
import { ICategoria, GResultados, resultados } from '../../resultados/resultados';
import APizarra from './TS-Tuberias';
import Pantalla from '../../componentes/Pantalla/Pantalla';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import ManagerStyle from '../../utilidades/AutoClases';


interface IPropsTuberias {
  url: string;
  width: number;
  height: number;
  filas: number;
  columnas: number;
  children?: ReactChild[];
  config: Function;
  UID?: string | number;
}

interface IActionTuberias {
  validar: Function;
  setIntento: Function;
  setValidacion: Function;
  continuar: Function;
  habilitar: Function;
}

export class Tuberias extends Component<IPropsTuberias> {

  tuberias: APizarra;
  propiedades: any;
  acciones: IActionTuberias;
  pantalla?: Pantalla;
  registro?: GResultados;
  style: ManagerStyle;

  constructor(props: IPropsTuberias) {
    super(props);
    this.style = new ManagerStyle(props, "actividad__tuberias");

    this.tuberias = new APizarra();
    this.propiedades = this.tuberias.propiedades;
    this.acciones = this.tuberias.acciones;
    if (NavegadorContext.navegador) {
      this.pantalla = NavegadorContext.navegador.getAddPantalla();
      this.pantalla.addEventos(this);
    }

    this.acciones.validar = (id: string, accion: Function, descripcion: string, valorMaximo: ICategoria[]) => {
      this.tuberias.validar(id, accion, descripcion, valorMaximo);
    };

    this.acciones.setIntento = (acciones: any) => {
      this.tuberias.setIntento(acciones);
    };

    this.acciones.setValidacion = (acciones: any) => {
      this.tuberias.setValidacion(acciones);
    };

    this.acciones.continuar = () => {
      if (this.pantalla) {
        this.pantalla.continuar();
      }
    }

    
    this.acciones.habilitar = () => {
      if (this.pantalla) {
        this.pantalla.habilitarContinuar();
      }
    }
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

    React.Children.map(this.props.children, (view: any, index) => {
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

    this.tuberias.incluirEn(contenedor);
  }

  onInicial() {
    if (this.registro) {
      this.registro.agregar();

      if (this.props.UID) {
        this.registro.setUID(this.props.UID + "");
      }
    }

  }

  onFinal() {
    if (this.pantalla) {
      resultados.setTiempo(this.tuberias, this.pantalla.timer.tiempo + "");
      this.pantalla.capturarPantalla((imagen: string) => {
        this.tuberias.propiedades.captura = imagen
      });
    }

    resultados.evaluar(this.tuberias);
  }

  render() {
    let className = this.style.getClass();


    return <div ref="contenedor" className={className} ></div>;
  }
}

interface IPropsFicha {
  inicio?: boolean;
  final?: boolean;
  lider?: boolean;
  left?: boolean;
  right?: boolean;
  up?: boolean;
  down?: boolean;
  static?: boolean;
}

export class Ficha extends Component<IPropsFicha> {

  constructor(props: IPropsFicha) {
    super(props)
  }

  render() {
    return <div></div>;
  }
}


export default Tuberias;