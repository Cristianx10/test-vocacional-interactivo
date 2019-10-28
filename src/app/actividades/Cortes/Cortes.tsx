import React, { Component, ReactChild } from "react";
import { SalaCirugia, CorteLinea, Coordenada } from './TS-Cortes';
import { actividadContext } from '../../comunicacion/ActividadContext';
import ActividadContext from '../../comunicacion/ActividadContext';
import ManagerStyle from '../../utilidades/AutoClases';
import Children from 'react';
import NavegadorContext, { navegadorContext } from '../../comunicacion/NavegadorContext';
import Pantalla from '../../componentes/Pantalla/Pantalla';
import { IONavegable } from '../../comunicacion/utilEvents';
import { resultados } from '../../resultados/resultados';

interface IPropsCortes {
  fondo: string;
  children?: Array<ReactChild>;
  config?: Function;
}

export interface IPropCortes {
}

export interface IActionCortes {
  agregarLinea: Function;
  agregarCurva: Function;
  agregarCurvaIzquierda: Function;
  agregarCurvaDerecha: Function;
}

export class Cortes extends Component<IPropsCortes> implements IONavegable {

  sala: SalaCirugia;
  actividadContext: actividadContext;
  navegadorContext: navegadorContext;
  style: ManagerStyle;

  propiedades: any;
  acciones: IActionCortes;

  pantalla?: Pantalla;

  constructor(props: IPropsCortes) {
    super(props);
    this.sala = new SalaCirugia();

    this.propiedades = this.sala.propiedades;

    this.actividadContext = ActividadContext;
    this.navegadorContext = NavegadorContext;
    if (this.navegadorContext.navegador) {
      this.pantalla = this.navegadorContext.navegador.getAddPantalla();
      this.pantalla.addEventos(this);
    }

    this.actividadContext.setCorte(this);

    this.acciones = {
      agregarLinea: (coordenadaA: Coordenada, coordenadaB: Coordenada, distancia: number) => {
        this.sala.agregarLinea(coordenadaA, coordenadaB, distancia)
      },
      agregarCurva: (coordenadaA: Coordenada, coordenadaB: Coordenada, frecuencia: number, distancia: number) => {
        this.sala.agregarCurva(coordenadaA, coordenadaB, frecuencia, distancia);
      },
      agregarCurvaIzquierda: (coordenadaA: Coordenada, coordenadaB: Coordenada, distancia: number) => {
        this.sala.agregarCurvaIzquierda(coordenadaA, coordenadaB, distancia);
      },
      agregarCurvaDerecha: (coordenadaA: Coordenada, coordenadaB: Coordenada, distancia: number) => {
        this.sala.agregarCurvaDerecha(coordenadaA, coordenadaB, distancia);
      },
    };

    this.style = new ManagerStyle(props, "cirugia");

  }

  onInicial() {

  }

  onFinal() {
    if (this.pantalla) {
      resultados.setTiempo(this.sala, this.pantalla.timer.tiempo + "");
      this.pantalla.capturarPantalla((imagen: string) => {
        this.propiedades.captura = imagen;
      });
    }
    resultados.evaluar(this.sala);

  }

  componentDidMount() {

    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    this.sala.cargarCuerpo(this.props.fondo);

    this.sala.agregarLinea({ x: 400, y: 350 }, { x: 470, y: 430 }, 10)

    this.sala.agregarCurva({ x: 500, y: 0 }, { x: 500, y: 430 }, 20, 10);

    this.sala.agregarCurvaIzquierda({ x: 600, y: 350 }, { x: 670, y: 430 }, 10);

    if (this.props.config) {
      this.props.config(this.propiedades, this.acciones);
    }

    this.sala.update();

    if (this.style.contenedor) {
      this.sala.incluirEn(this.style.contenedor);
    }
  }

  render() {

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return <div ref="contenedor" className={className} style={style}></div>;
  }
}

interface IPropsCorte {

}

export class Corte extends Component<IPropsCorte> {

  sala?: Cortes;
  constructor(props: IPropsCorte) {
    super(props);

    if (ActividadContext.cortes) {
      this.sala = ActividadContext.cortes;
    }
  }

  componentDidMount() {

  }

  render() {
    return <div></div>;
  }
}


export default Cortes;