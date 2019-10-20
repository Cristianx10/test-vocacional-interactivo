import React, { Component, ReactDOM } from "react";

import { Tablero } from "./TS-Rompecabezas";
import { matrixImagen } from "../../utilidades/matrices";

import Names from "../../comunicacion/Names";
import { resultados } from "../../resultados/resultados";
import comunicador from "../../comunicacion/Comunicacion";

export class Rompecabezas extends Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.pantalla = this.comunicador.getPropiedadActual(Names.pantalla);

    this.pantalla.onAddEventos(this);

    this.tablero = new Tablero();

    this.acciones = this.tablero.acciones;
    this.propiedades = this.tablero.propiedades; 
    

    
    this.acciones.continuar = ()=>{
      this.pantalla.continuar();
    }

    this.acciones.setValidacion = (acciones)=>{
      this.tablero.setValidacion(acciones);
    }

    this.acciones.setIntento = (acciones)=>{
      this.tablero.setIntento(acciones);
    }

    this.acciones.validar = (id, acciones, descripcion, resultados)=>{
      this.tablero.validar(id, acciones, descripcion, resultados);
    }
    
  }

  onInicial(){

  }

  onFinal(){
    this.propiedades.titulares = this.pantalla.titulares;
    this.propiedades.tiempo = this.pantalla.tiempo;
    this.pantalla.capturarPantalla((imagen)=>{
      resultados.getPropiedades(this.tablero).captura = imagen;
    });
    
    resultados.setTiempo(this.tablero, this.pantalla.tiempo)
    resultados.evaluar(this.tablero);
  }

  componentDidMount() {
    
    let width = 100, columnas = 4, filas = 4;
    let urlImagen = this.props.imagen;

    this.propiedades.columnas = columnas;
    this.propiedades.filas = filas;
    this.propiedades.imagen = urlImagen;
    this.propiedades.total = filas*columnas;
    

    if(this.props.width){
      width = parseFloat(this.props.width);
    }

    if(this.props.columnas){
      columnas = parseFloat(this.props.columnas);
    }

    if(this.props.filas){
      filas = parseFloat(this.props.filas);
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
      if(orden != null || orden != undefined){
        this.tablero.agregar(e, orden[i], i, 0);
      }else{
        this.tablero.agregar(e, i, i, 0);
      }
    }

    this.tablero.incluirEn(this.refs.contenedor);
    this.tablero.iniciar();

    if(this.props.rotacion){
      this.tablero.activarRotacion();
    }

    if(this.props.arrastrable){
      this.tablero.activarArrastre();
    }

    if(this.props.placeholder){
      tab.setPlaceholder(this.props.placeholder);
    }

    if(this.props.config){
      this.props.config(this.propiedades, this.acciones);
    }

    


    
    
  }

  render() {
    return <div ref="contenedor"></div>;
  }
}
