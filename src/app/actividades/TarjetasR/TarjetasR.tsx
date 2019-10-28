import React, { Component } from "react";

import { resultados, ICategoria } from '../../resultados/resultados';

import Tablero_tarjetas from "./TS-TarjetasR";

import "./TarjetasR.scss";
import ActividadContext, { actividadContext } from '../../comunicacion/ActividadContext';
import Pantalla from '../../componentes/Pantalla/Pantalla';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import ManagerStyle from '../../utilidades/AutoClases';

interface IPropsTarjetasR {
  config: Function;
}

interface IActionTarjetasR {
  validar: Function;
  setIntento: Function;
  setIntentoAcierto: Function;
  setIntentoFallo: Function;
  setValidacion: Function;
}

/* Clase encargada de la navegación entre actividades*/
export class TarjetasR extends Component<IPropsTarjetasR> {

  actividadContext: actividadContext;
  pantalla?: Pantalla;
  tablero: Tablero_tarjetas;
  acciones: IActionTarjetasR;
  style: ManagerStyle;
  propiedades: any;

  constructor(props: IPropsTarjetasR) {
    super(props);

    this.actividadContext = ActividadContext;
    this.actividadContext.setTarjetasR(this);
    this.style = new ManagerStyle(props, "tarjetas__contenedor interaccion");

    if (NavegadorContext.navegador) {
      this.pantalla = NavegadorContext.navegador.getAddPantalla();
      this.pantalla.addEventos(this);
    }



    this.tablero = new Tablero_tarjetas();
    this.propiedades = this.tablero.propiedades;

    this.acciones = {
      validar: (id: string, accion: Function, descripcion: string, valorMaximo: ICategoria[]) => {
        this.tablero.validar(id, accion, descripcion, valorMaximo);
      },

      setIntento: (acciones: any) => {
        this.tablero.setIntento(acciones);
      },

      setIntentoAcierto: (acciones: any) => {
        this.tablero.setIntentoAcierto(acciones);
      },

      setIntentoFallo: (acciones: any) => {
        this.tablero.setIntentoFallo(acciones);
      },

      setValidacion: (acciones: any) => {
        this.tablero.setValidacion(acciones);
      }
    };
  }

  onInicial() { }

  onFinal() {
    if (this.pantalla) {
      resultados.setTiempo(this.tablero, this.pantalla.timer.tiempo + "");
      this.pantalla.capturarPantalla((imagen: string) => {
        this.tablero.propiedades.captura = imagen
      });
    }

    resultados.evaluar(this.tablero);
  }

  componentDidMount() {
    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    if (this.style.contenedor) {
      this.tablero.incluirEn(this.style.contenedor);
    }
    this.tablero.iniciar();

    this.props.config(this.propiedades, this.acciones);
  }

  render() {

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div ref="contenedor" className={className} style={style}>
        {React.Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}

interface IPropsCarta {
  img: string;
  posA: number;
  posB: number;
}

/* Clase encargada de la navegación entre actividades*/
export class Carta extends Component<IPropsCarta> {

  tarjetasR?: TarjetasR;

  constructor(props: IPropsCarta) {
    super(props);

    this.tarjetasR = ActividadContext.tarjetasR;
  }

  componentDidMount() {

    let img = this.props.img;
    let posA = this.props.posA;
    let posB = this.props.posB;
    if (this.tarjetasR) {
      this.tarjetasR.tablero.agregar(img, posA, img, posB);
    }
  }

  render() {
    return <div></div>;
  }
}