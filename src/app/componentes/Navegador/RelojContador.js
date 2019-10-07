import React from "react";


import "./RelojContador.css";
import comunicador from "../../comunicacion/Comunicacion";
import Names from "../../comunicacion/Names";
import { resizeClass } from "../../utilidades/AutoClases";



/* Clase encargada de la navegación entre actividades*/
export class RelojContador extends React.Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.pantalla = this.comunicador.getPropiedadActual(Names.pantalla);
    this.comunicador.add(Names.contadorTiempo).push(this);

    this.pantalla.onAddEventos(this);

    this.renderizado = false;

    this.deafualTime = 0;
    this.isRenderizado = false;
  }

  onProgress(segundos, minutos) {
    this.deafualTime = "";
    if (this.refs.tiempo) {
    
      let s = segundos;
      let m = minutos;
      if (segundos < 10) {
        s = "0" + segundos;
      }

      if (minutos < 10) {
        m = "0" + minutos;
      }
      this.refs.tiempo.innerHTML = `${m}:${s}`;
    }
  }

  componentDidMount() {}

  renderizadoInicial() {
    if (this.isRenderizado === false) {
      this.isRenderizado = true;

      if (this.pantalla.props.time != null) {
        let segundos = this.pantalla.props.time;
        let s = 0;
        let m = 0;

        if (segundos > 60) {
          m = parseInt(segundos / 60 + "", 10);
          s = segundos % 60;
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

  render() {
    this.renderizadoInicial();
    let c = resizeClass(this, "reloj__contenedor down");
    return (
      <div className={c.className} style={c.style}>
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
