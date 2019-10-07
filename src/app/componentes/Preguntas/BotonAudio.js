import React from "react";

import comunicador from "../../comunicacion/Comunicacion";
import { resizeClass } from "../../utilidades/AutoClases";

import "./BotonAudio.css";

/* Clase encargada de la navegación entre actividades*/
export class BotonAudio extends React.Component {
  constructor() {
    super();

    this.comunicador = comunicador;
    this.comunicador.add("Escribir").push(this);
    this.pregunta = this.comunicador.getPropiedadActual("pregunta");

  }

  componentDidMount() {

  }

  render() {
    let c = resizeClass(this, "boton__audio");
    return (
      <div className={c.className} style={c.style}>
        
      </div>
    );
  }
}
