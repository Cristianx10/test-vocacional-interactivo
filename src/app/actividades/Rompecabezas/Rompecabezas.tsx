import React, { Component, ReactDOM } from "react";

import { Tablero } from "./TS-Rompecabezas";
import { matrixImagen } from "../../utilidades/matrices";

import { resultados, ICategoria, GResultados } from '../../resultados/resultados';
import NavegadorContext, { navegadorContext } from '../../comunicacion/NavegadorContext';
import Pantalla from '../../componentes/Pantalla/Pantalla';


interface IPropsRompecabezas {
  width: number;
  height: number;
  columnas: number;
  filas: number;
  orden: number[];
  imagen: string;
  config?: Function;
  placeholder: string;
  arrastrable: boolean;
  rotacion: boolean;
  UID?: string | number;
}

interface IActionRompecabezas {
  continuar: Function;
  setValidacion: Function;
  setIntento: Function;
  validar: Function;
}

export class Rompecabezas extends Component<IPropsRompecabezas> {

  navegadorContext: navegadorContext;
  pantalla?: Pantalla;
  tablero: Tablero;
  acciones: IActionRompecabezas;
  propiedades: any;
  registro?: GResultados;

  constructor(props: IPropsRompecabezas) {
    super(props);

    this.navegadorContext = NavegadorContext;
    if (this.navegadorContext.navegador) {
      this.pantalla = this.navegadorContext.navegador.getAddPantalla();
      this.pantalla.addEventos(this)
    }

    this.tablero = new Tablero();
    this.registro = this.tablero.registro;

    this.acciones = this.tablero.acciones;
    this.propiedades = this.tablero.propiedades;


    this.acciones.continuar = () => {
      if (this.pantalla) {
        this.pantalla.continuar();
      }
    }

    this.acciones.setValidacion = (acciones: any) => {
      this.tablero.setValidacion(acciones);
    }

    this.acciones.setIntento = (acciones: any) => {
      this.tablero.setIntento(acciones);
    }

    this.acciones.validar = (id: string, acciones: Function, descripcion: string, resultados: ICategoria[]) => {
      this.tablero.validar(id, acciones, descripcion, resultados);
    }

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
      resultados.setTiempo(this.tablero, this.pantalla.timer.tiempo + "");
      this.propiedades.titulares = this.pantalla.titulares;
      this.propiedades.tiempo = this.pantalla.timer.tiempo;
      this.pantalla.capturarPantalla((imagen: string) => {
        this.propiedades.captura = imagen;
      });
    }


    resultados.evaluar(this.tablero);
  }

  componentDidMount() {

    let contenedor: any = this.refs.contenedor;

    let width = 100, columnas = 4, filas = 4;
    let urlImagen = this.props.imagen;

    this.propiedades.columnas = columnas;
    this.propiedades.filas = filas;
    this.propiedades.imagen = urlImagen;
    this.propiedades.total = filas * columnas;


    if (this.props.width) {
      width = parseFloat(this.props.width + "");
    }

    if (this.props.columnas) {
      columnas = parseFloat(this.props.columnas + "");
    }

    if (this.props.filas) {
      filas = parseFloat(this.props.filas + "");
    }

    this.tablero.crearTablero(columnas, filas, width);

    let imagenes = matrixImagen(
      urlImagen,
      width,
      width,
      columnas,
      filas
    );

    let orden = this.props.orden;


    for (let i = 0; i < imagenes.length; i++) {
      let e = imagenes[i];
      if (orden != null || orden != undefined) {
        this.tablero.agregar(e, orden[i], i, 0);
      } else {
        this.tablero.agregar(e, i, i, 0);
      }
    }

    this.tablero.incluirEn(contenedor);
    this.tablero.iniciar();

    if (this.props.rotacion) {
      this.tablero.activarRotacion();
    }

    if (this.props.arrastrable) {
      this.tablero.activarArrastre();
    }



    if (this.props.placeholder) {
      this.tablero.setPlaceholder(this.props.placeholder);
    }

    if (this.props.config) {
      this.props.config(this.propiedades, this.acciones);
    }

  }

  render() {
    return <div ref="contenedor"></div>;
  }
}
