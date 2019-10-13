import React from "react";
import "./Preguntas.scss";
import "./Escribir.css";

import { Texto_validar } from "./TS-Escribir";

import comunicador from "../../comunicacion/Comunicacion";

import { resizeClass } from "../../utilidades/AutoClases";
import { resultados } from "../../resultados/resultados";

/* Clase encargada de la navegación entre actividades*/
export class Escribir extends React.Component {
  constructor() {
    super();

    this.comunicador = comunicador;
    this.comunicador.add("Escribir").push(this);
    this.pregunta = this.comunicador.getPropiedadActual("pregunta");

    this.pregunta.opciones.push(this);

    this.pregunta.onAddEventos(this);

    this.siguiente = null;

    this.valor = null;

    this.state = {
      type: ""
    };

    /**Configuracion de resultados */

    resultados.setId(this.pregunta, "Escritura");
    this.propiedades = {};
    this.acciones = {};

    this.acciones.validar = (id, accion, descripcion, valorMaximo) => {
      this.validar(id, accion, descripcion, valorMaximo);
    };
  }

  onFinal() {
    let editado = this.refs.texto_edit.value;
    let textoAnalisis = new Texto_validar(this.original, editado);

    //Da los errores sin tener encuenta mayusculas o puntuacion y las que faltaron
    this.pregunta.propiedades.error_general = textoAnalisis.getErrores();

    //Da los errores de coincidencia exacta
    this.pregunta.propiedades.error_estricto = textoAnalisis.getErroresStrict();

    //Da los errores de Mayusculas
    this.pregunta.propiedades.error_mayuscula = textoAnalisis.getErroresMayusculas();

    //Da los errores de Puntuacion, solo "," y "."
    this.pregunta.propiedades.error_puntuacion = textoAnalisis.getErroresPuntuacion();

    //Da los errores de palabras que faltaron
    this.pregunta.propiedades.error_falto = textoAnalisis.getErroresFalto();

    //Numero de palabras
    this.pregunta.propiedades.numero_palabras = textoAnalisis.getNumPalabras();

    //Numero de errores de tilde
    this.pregunta.propiedades.error__tilde = textoAnalisis.getErroresTilde();

    if (this.props.onFinal) {
      this.props.onFinal(this.pregunta.propiedades, this.acciones);
    }
  }

  validar(id, accion, descripcion, valorMaximo) {
    resultados.agregarCondicion(
      this,
      this.pregunta,
      id,
      accion,
      descripcion,
      valorMaximo
    );
  }

  componentDidMount() {
    this.original = this.props.original;
    this.pregunta.propiedades.text__original = this.original;
    let area_text = this.refs.texto_edit;

    area_text.addEventListener("change", () => {
      let area_text = this.refs.texto_edit;
      this.pregunta.propiedades.text__usuario = area_text.value;
    });
    this.pregunta.propiedades.text__usuario = area_text.value;
  }

  render() {
    let c = resizeClass(this, "escritura__contenedor");
    return (
      <div className={c.className} style={c.style}>
        <textarea
          ref="texto_edit"
          className="escritura__parrafo"
          defaultValue={this.props.children}
        ></textarea>
      </div>
    );
  }
}
