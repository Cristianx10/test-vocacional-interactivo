import React, { Component } from "react";
import dataPreguntas from "../../../data/queryPreguntas.json";
import Pregunta, {
  Likert,
  Opcion
} from "../../componentes/Preguntas/Preguntas.js";
import { Pantalla, Continuar } from "../../componentes/Navegador/Navegador.js";
import { D } from "../../configuraciones/dato.js";

export class TLikertPregunta extends Component {
  constructor() {
    super();
    this.data;
    this.renderInicial = false;
  }

  componentDidMount() {}

  renderizadoInicial() {
    if (this.renderInicial == false) {
      this.renderInicial = true;
      for (let index = 0; index < dataPreguntas.length; index++) {
        let data = dataPreguntas[index];
       
        if (this.props.uid == data.id) {
          this.data = data;
          index = dataPreguntas.length;
        }

      }
    }
  }

  render() {
    this.renderizadoInicial();
    let view;
   
    if (this.data == null) {
      view = <div>No se encontro la pregunta</div>;
    } else {
      let opciones = [];
      this.data.opciones.forEach(opcion => {
        opciones.push(
          <Opcion resultados={opcion.resultados}>{opcion.titulares}</Opcion>
        );
      });

      view = (
        <Pantalla>
          <Pregunta>
            <h1>
              <D>{this.data.titulares}</D>
            </h1>
            <Likert>
              {React.Children.map(opciones, view => {
                return view;
              })}
            </Likert>
          </Pregunta>
          <Continuar disabled></Continuar>
        </Pantalla>
      );
    }

    return view;
  }
}
