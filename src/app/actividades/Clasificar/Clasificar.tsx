import React, { Component, Children } from "react";

import AClasificar from "./TS-Clasificar";

import ActividadContext, { actividadContext } from '../../comunicacion/ActividadContext';
import NavegadorContext, { navegadorContext } from "../../comunicacion/NavegadorContext";
import Pantalla from '../../componentes/Pantalla/Pantalla';
import ManagerStyle from '../../utilidades/AutoClases';
import { resultados, ICategoria } from '../../resultados/resultados';


var countClasificacion = 0;
var countClasificacionAlmacen = 0;

interface IPropsClasificiar {
  config?: Function;

  /* Clases de ManagerStyle */
  style?: Object;
  className?: string;
  grid?: string;
  on?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  left?: string;
  top?: string;
  pos?: string;
  image?: string;
  orientacion?: string;
  align?: string;
}

export interface IActionClasificar {
  setIntentoAcierto: Function;
  setIntentoFallo: Function;
  setValidacion: Function;
  validar: Function;
  setMultiple:Function;
}

export interface IPropClasificar {
  acierto: number;
  fallos: number;
  informacion: Array<{ categoria: string, capacidad: number, almacenados: Array<string> }>;
  intentos: number;
}

export default class Clasificar extends Component<IPropsClasificiar> {

  actividadContext: actividadContext;
  navegadorContext: navegadorContext;
  almacenes: Almacen[] = [];
  zonas: Zona[] = [];
  propiedades: any;
  acciones: IActionClasificar;

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


    this.acciones = {
      setIntentoAcierto: (acciones: Function) => {
        this.clasificar.setIntentoAcierto(acciones);
      },

      setIntentoFallo: (acciones: Function) => {
        this.clasificar.setIntentoFallo(acciones);
      },

      setValidacion: (acciones: Function) => {
        this.clasificar.setValidacion(acciones);
      },

      validar: (id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) => {
        this.clasificar.validar(id, accion, descripcion, valorMaximo);
      },

      setMultiple: (value:boolean) => {
        resultados.setMultiple(this.clasificar, value);
      }

    };



  }

  componentDidMount() {
    console.log("Logica");

    this.zonas.forEach(zona => {
      if (zona.style.contenedor) {
        this.clasificar.agregarElemento(zona);
      }
    });

    this.clasificar.arrastrables(
      ".elemento__clasificacion_" + countClasificacion,
      ".clasificar__id__" + countClasificacion
    );


    this.clasificar.almacenaje(
      this.almacenes,
      ".elemento__clasificacion_" + countClasificacion
    );

    if (this.props.config) {
      this.props.config(this.propiedades, this.acciones);
    }

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
  tipo: string;
  id: string;

  accion?: Function;
  capacidad?: number;
  nombre?: string;
  reset?: Function;

  /* Clases de ManagerStyle */
  style?: Object;
  className?: string;
  grid?: string;
  on?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  left?: string;
  top?: string;
  pos?: string;
  image?: string;
  orientacion?: string;
  align?: string;
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
  resetStyle?: Function;

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
      position: "absolute"
    });

  }

  accion() {
    if (this.resetStyle) {
      this.resetStyle(this.style.contenedor);
    }
  };

  componentDidMount() {

    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    if (this.props.accion) {
      // this.accion = this.props.accion;
    }

    if (this.props.capacidad) {
      this.capacidad = this.props.capacidad;
    }

    if (this.props.nombre) {
      this.nombre = this.props.nombre;
    }

    if (this.props.reset) {
      this.resetStyle = this.props.reset;
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
      <div ref="contenedor" className={className} id={this.idType} style={style}>
        {Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}

interface IPropsZona {
  categoria: string;
  tipo: string;
  reset?: Function;


  /* Clases de ManagerStyle */
  style?: Object;
  className?: string;
  grid?: string;
  on?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  left?: string;
  top?: string;
  pos?: string;
  image?: string;
  orientacion?: string;
  align?: string;
}

export class Zona extends Component<IPropsZona> {

  actividadContext: actividadContext;
  clasificar?: Clasificar;
  style: ManagerStyle;
  idClass: string;
  tipo: string;
  resetStyle?: Function;

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
      position: "absolute"
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

    if (this.props.reset) {
      this.resetStyle = this.props.reset;
    }
  }

  reset() {
    if (this.style.contenedor) {
      this.style.contenedor.style.position = "";
      this.style.contenedor.style.margin = "0";
      this.style.contenedor.style.left = "0";
      this.style.contenedor.style.right = "0";
      this.style.contenedor.style.top = "0";
      if (this.resetStyle) {
        this.resetStyle(this.style.contenedor);
      } else {

      }
    }

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
        id={this.props.categoria}
        style={style}
      >
        {React.Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}
