import React, { Component, Children } from "react";

import AClasificar from "./TS-Clasificar";

import ActividadContext, { actividadContext } from '../../comunicacion/ActividadContext';
import NavegadorContext, { navegadorContext } from "../../comunicacion/NavegadorContext";
import Pantalla from '../../componentes/Pantalla/Pantalla';
import ManagerStyle from '../../utilidades/AutoClases';
import { resultados } from '../../resultados/resultados';


var countClasificacion = 0;
var countClasificacionAlmacen = 0;

interface IPropsClasificiar {

}

export default class Clasificar extends Component<IPropsClasificiar> {

  actividadContext: actividadContext;
  navegadorContext: navegadorContext;
  almacenes: Almacen[] = [];
  zonas: Zona[] = [];
  propiedades: any;

  clasificar: AClasificar;
  pantalla?: Pantalla;
  style: ManagerStyle;

  constructor(props: IPropsClasificiar) {
    super(props);

    this.actividadContext = ActividadContext;
    this.actividadContext.setClasificar(this);

    this.navegadorContext = NavegadorContext;
    if (this.navegadorContext.navegador) {
      this.pantalla = this.navegadorContext.navegador.getAddPantalla();
    }

    countClasificacion++;

    this.clasificar = new AClasificar();

    this.propiedades = this.clasificar.propiedades;

    if (this.pantalla) {
      this.pantalla.addEventos(this);
    }

    this.style = new ManagerStyle(props, "clasificar clasificar__id__" + countClasificacion, false, {
      position: "relative"
    });

  }

  componentDidMount() {
    console.log("Logica");

    this.zonas.forEach((zona => {
      if (zona.style.contenedor) {
        this.clasificar.agregar(zona.style.contenedor, zona.props.id);

      }
    }));

    this.clasificar.arrastrables(
      ".elemento__clasificacion_" + countClasificacion,
      ".clasificar__id__" + countClasificacion
    );


    this.clasificar.almacenaje(
      this.almacenes,
      ".elemento__clasificacion_" + countClasificacion
    );


    this.clasificar.setIntentoAcierto(() => {
      console.log("bien");
    });

    this.clasificar.setIntentoFallo(() => {
      console.log("mal");
    });

    this.clasificar.setValidacion(() => { });
  }

  onInicial() { }

  onFinal() {

    if (this.pantalla) {
      this.propiedades.titulares = this.pantalla.titulares;
      this.propiedades.tiempo = this.pantalla.timer.tiempo;

      this.pantalla.capturarPantalla((imagen: string) => {
        this.propiedades.captura = imagen;
      });
      resultados.setTiempo(this.clasificar, this.pantalla.timer.tiempo + "");
    }
    resultados.evaluar(this.clasificar);
  }

  render() {

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div ref="contenedor" className={className} style={style}>
        {Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}

interface IPropsAlmacen {
  accion?: Function;
  categoria: string;
  tipo: string;
  capacidad: number;
  nombre?: string;
  id: string;
}

export class Almacen extends Component<IPropsAlmacen> {

  actividadContext: actividadContext;
  clasificar?: Clasificar;
  idClass: string;
  capacidad: number;
  nombre: string;
  style: ManagerStyle;
  idType: string;
  tipo: string;

  constructor(props: IPropsAlmacen) {
    super(props);
    countClasificacionAlmacen++;
    this.actividadContext = ActividadContext;

    if (this.actividadContext.clasificar) {
      this.clasificar = this.actividadContext.clasificar;
    }

    this.idClass = "almacen__clasificacion_" + countClasificacionAlmacen;

    this.idType = "almacen__clasificacion_" + countClasificacionAlmacen;
    this.tipo = "";

    if (this.clasificar) {
      this.clasificar.almacenes.push(this);
    }


    this.capacidad = 1;
    this.nombre = "";

    this.style = new ManagerStyle(props, this.idClass, false, {
      width: "100px",
      height: "100px",
      position: "absolute",
      background: "red"
    });

  }

  accion(s: HTMLElement) {
    s.style.margin = "0";
    s.style.left = "0";
    s.style.right = "0";
    s.style.top = "0";
  };

  componentDidMount() {

    if (this.props.accion) {
      // this.accion = this.props.accion;
    }

    if (this.props.capacidad) {
      this.capacidad = this.props.capacidad;
    }

    if (this.props.nombre) {
      this.nombre = this.props.nombre;
    }

  }

  render() {

    if (this.props.id) {
      this.idType = this.props.id;
    }

    if (this.props.tipo) {
      this.tipo = this.props.tipo;
    }

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div className={className} id={this.idType} style={style}>
        {Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}

interface IPropsZona {
  id: string;
  categoria: string;
  tipo: string;
}

export class Zona extends Component<IPropsZona> {

  actividadContext: actividadContext;
  clasificar?: Clasificar;
  style: ManagerStyle;
  idClass: string;
  tipo: string;

  constructor(props: IPropsZona) {
    super(props);

    this.actividadContext = ActividadContext;

    if (this.actividadContext.clasificar) {
      this.clasificar = this.actividadContext.clasificar;
    }

    if (this.clasificar) {
      this.clasificar.zonas.push(this);
    }

    this.idClass = "elemento__clasificacion_" + countClasificacion;
    this.tipo = "";

    this.style = new ManagerStyle(props, this.idClass, false, {
      width: "100px",
      height: "100px",
      position: "absolute",
      background: "blue"
    });


    /*
    this.comunicador = comunicador;
    this.comunicador.add(Names.clasificar_zona).push(this);
    this.clasificador = this.comunicador.getPropiedadActual(Names.clasificar);
    this.clasificar = this.clasificador.clasificar;
    */
  }

  componentDidMount() {

    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);
  }
  render() {

    if (this.props.tipo) {
      this.tipo = this.props.tipo;
    }

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div
        ref="contenedor"
        className={className + " " + this.tipo}
        id={this.props.id}
        style={style}
      >
        {React.Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}
