import React, { Component } from "react";


import "./RelojContador.css";
import NavegadorContext, { navegadorContext } from "../../comunicacion/NavegadorContext";
import Pantalla from '../Pantalla/Pantalla';
import { IONavegable } from '../../comunicacion/utilEvents';
import ManagerStyle from '../../utilidades/AutoClases';


interface IPropsRelojContador {

}

/* Clase encargada de la navegación entre actividades*/
export class RelojContador extends Component<IPropsRelojContador> implements IONavegable {

  navegadorContext: navegadorContext;
  pantalla?: Pantalla;

  renderizado = false;
  deafualTime = 0 + "";
  isRenderizado = false;

  style: ManagerStyle;

  constructor(props: IPropsRelojContador) {
    super(props);
    this.navegadorContext = NavegadorContext;

    this.style = new ManagerStyle(props, "reloj__contenedor down");

    if (this.navegadorContext.navegador) {
      this.pantalla = this.navegadorContext.navegador.getAddPantalla();
    }

    if (this.pantalla) {
      this.pantalla.addEventos(this);
    }


  }

  onInicial() { }

  onFinal() { }

  onProgress(segundos: number, minutos: number) {
    this.deafualTime = "";
    if (this.refs.tiempo) {

      let s = segundos + "";
      let m = minutos + "";
      if (segundos < 10) {
        s = "0" + segundos;
      }

      if (minutos < 10) {
        m = "0" + minutos;
      }

      let viewTiempo: any = this.refs.tiempo;
      if (viewTiempo) {
        viewTiempo.innerHTML = `${m}:${s}`;
      }

    }
  }

  componentDidMount() {

  }

  renderizadoInicial() {
    if (this.isRenderizado === false) {
      this.isRenderizado = true;

      if (this.pantalla) {

        if (this.pantalla.props.time != null) {
          let segundos = this.pantalla.props.time;
          let seconds = parseInt(segundos + "");
          let s: string | number = 0;
          let m: string | number = 0;

          if (segundos > 60) {
            m = parseInt(seconds / 60 + "", 10);
            s = seconds % 60;
          } else {
            s = segundos;
          }

          if (s < 10) {
            s = "0" + s;
          }

          if (m < 10) {
            m = "0" + m;
          }

          this.deafualTime = `${m}:${s}`;
        } else {
          this.deafualTime = "00:00";
        }
      }
    }
  }

  render() {
    this.renderizadoInicial();

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div className={className} style={style}>
        <div className="reloj__contador">
          <img className="reloj__contador__img" src="/img/relog.png" />
          <p ref="tiempo" className="reloj__contador__tiempo">
            {this.deafualTime}
          </p>
        </div>
      </div>
    );
  }
}

export default RelojContador;
