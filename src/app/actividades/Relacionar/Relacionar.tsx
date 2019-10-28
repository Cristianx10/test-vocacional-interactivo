import React, { Component, Children } from "react";
import { shuffle } from "../../utilidades/utils";
import ARelacionar from "./TS-relacionar";
import { resultados, ICategoria } from '../../resultados/resultados';
import NavegadorContext, { navegadorContext } from '../../comunicacion/NavegadorContext';
import Pantalla from '../../componentes/Pantalla/Pantalla';
import ActividadContext, { actividadContext } from '../../comunicacion/ActividadContext';
import { IONavegable } from '../../comunicacion/utilEvents';
import ManagerStyle from '../../utilidades/AutoClases';


interface IPropsRelacionar {
  children?: Relacion[];
  width: number;
  height: number;
  config?: Function;
}

interface IActionRelacionar {

  validar: Function;
  setStyleA: Function;
  setStyleB: Function;
  distancia: Function;
  setIntento: Function;
  setIntentoAcierto: Function;
  setIntentoFallo: Function;
  setValidacion: Function;
  habilitarContinuar: Function;
  ocultar: Function;
  reset: Function;

}

/* Clase encargada de la navegación entre actividades*/
export class Relacionar extends Component<IPropsRelacionar> implements IONavegable {

  navegadorContext: navegadorContext;
  actividadContext: actividadContext;
  pantalla?: Pantalla;
  acciones: IActionRelacionar;

  tablero: ARelacionar;
  propiedades: any;
  opciones: { tipo: string, categoria: string }[] = [];
  style: ManagerStyle;

  constructor(props: IPropsRelacionar) {
    super(props);

    this.navegadorContext = NavegadorContext;
    this.actividadContext = ActividadContext;

    if (this.navegadorContext.navegador) {
      this.pantalla = this.navegadorContext.navegador.getAddPantalla();
      this.pantalla.addEventos(this);
    }

    this.actividadContext.setRelacionar(this);

    this.acciones = {

      validar: (id: string, accion: Function, descripcion: string, valorMaximo: ICategoria[]) => {
        this.tablero.validar(id, accion, descripcion, valorMaximo);
      },

      setStyleA: (width: number, height: number, style: string, h: number, w: number) => {
        this.tablero.setStyleA(width, height, style, h, w);
      },

      setStyleB: (width: number, height: number, style: string, h: number, w: number) => {
        this.tablero.setStyleB(width, height, style, h, w);
      },

      distancia: (distancia: number) => {
        this.tablero.distancia(distancia);
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
      },

      habilitarContinuar: () => {
        if (this.pantalla && this.pantalla.siguiente) {
          this.pantalla.siguiente.habilitar(true);
        }
      },

      ocultar: () => {
        this.tablero.ocultar();
      },

      reset: () => {
        this.tablero.reset();
      }
    };

    this.tablero = new ARelacionar();

    this.propiedades = this.tablero.propiedades;

    this.style = new ManagerStyle(props, "actividad__relacionar");
  }

  componentDidMount() {

    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    this.tablero.size(this.props.width, this.props.height);

    if (this.props.children) {
      Children.map(this.props.children, (view: Relacion) => {
        this.opciones.push({
          tipo: view.props.tipo,
          categoria: view.props.categoria
        });
      });
    }

    if (this.props.config) {
      this.props.config(this.propiedades, this.acciones);
    }

    let tipos = this.opciones;


    let categorias = [];

    shuffle(tipos);

    for (let i = 0; i < tipos.length; i++) {
      let e = tipos[i];
      this.tablero.baseA.agregar(e.tipo, e.categoria);
      categorias.push(e.categoria);
    }

    shuffle(categorias);

    for (let i = 0; i < categorias.length; i++) {
      let e = categorias[i];
      this.tablero.baseB.agregar(e, e);
    }

    if (this.style.contenedor) {
      this.tablero.incluirEn(this.style.contenedor);
    }

    setTimeout(() => {
      this.tablero.update();
    }, 1000);
  }

  onInicial() { }

  onFinal() {
    if (this.pantalla) {
      resultados.setTiempo(this.tablero, this.pantalla.timer.tiempo + "");
      this.pantalla.capturarPantalla((imagen: string) => {
        this.propiedades.captura = imagen;
      });
    }

    resultados.evaluar(this.tablero);
  }

  render() {

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return <div ref="contenedor" className={className} style={style}></div>;
  }
}

interface IPropsRelacion {
  tipo: string;
  categoria: string;
}

/* Clase encargada de la navegación entre actividades*/
export class Relacion extends Component<IPropsRelacion> {

  constructor(props: IPropsRelacion) {
    super(props);
  }
}
