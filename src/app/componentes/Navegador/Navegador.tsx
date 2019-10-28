import React, { ReactChild, Component, Children } from "react";

import ManagerStyle from "../../utilidades/AutoClases";

import Timer from "../../utilidades/timer";

import "./Navegador.scss";
import { pantallaToImg } from "../../utilidades/utils";
import NavegadorContext, { navegadorContext } from '../../comunicacion/NavegadorContext';
import Pantalla from '../Pantalla/Pantalla';

//import { tags } from "../../configuraciones/dato";


export interface IPropsNavegador {
  children: Array<ReactChild>;

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

/* Clase encargada de la navegación entre actividades*/
export class Navegador extends Component<IPropsNavegador> {

  navegadorContext: navegadorContext;
  style: ManagerStyle;
  actual: number;

  isImprimiendoPantalla = false;
  pantallas: Pantalla[] = [];

  constructor(props: IPropsNavegador) {
    super(props);

    this.navegadorContext = NavegadorContext;
    this.navegadorContext.setNavegador(this);

    this.style = new ManagerStyle(props, "navegacion");
    this.style.navegador = this;
    this.actual = 0;


    document.addEventListener("keypress", e => {
      if (e.key === "a" || e.key === "A") {
        this.atras();
      }

      if (e.key === "s" || e.key === "S") {
        this.continuar();
      }

      if (e.key === "q" || e.key === "Q") {
        //console.log(this.comunicador);
      }
    });
  }

  impresionPantallaCompletada() {
    this.pantallas[this.actual].ocultar();

    if (this.actual + 1 < this.props.children.length) {
      this.actual += 1;
      this.pantallas[this.actual].mostrar();
    } else if (this.actual < this.props.children.length) {
      this.actual += 1;
    }

    this.isImprimiendoPantalla = false;
  }

  continuar() {

    this.pantallas[this.actual].continuoPantalla = true;
    this.pantallas[this.actual].onFinal();

    if (this.isImprimiendoPantalla == false) {
      this.pantallas[this.actual].ocultar();

      if (this.actual + 1 < this.props.children.length) {
        this.actual += 1;

        this.pantallas[this.actual].onChange();
        this.pantallas[this.actual].mostrar();
      } else if (this.actual < this.props.children.length) {
        this.actual += 1;
      }
    }
  }

  atras() {

    if (this.actual < this.props.children.length) {
      this.pantallas[this.actual].ocultar();
    }

    if (this.actual > 0) {
      this.actual -= 1;
    }
    this.pantallas[this.actual].onChange();
    this.pantallas[this.actual].mostrar();
  }

  componentDidMount() {
    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    this.pantallas.forEach((pantalla, index) => {
      pantalla.ocultar();
    });

    this.pantallas[this.actual].mostrar();
    this.pantallas[this.actual].onChange();
  }


  render() {

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div ref="contenedor" className={className} style={style}>
        {Children.map(this.props.children, views => {
          return views;
        })}
      </div>
    );
  }

  getAddPantalla() {
    return this.pantallas[this.pantallas.length - 1];
  }
}

export default Navegador;
