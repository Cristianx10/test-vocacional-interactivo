import React, { Component } from "react";
import dataPreguntas from "../../../data/queryPreguntas.json";
import Pregunta, { Opcion } from "../../componentes/Preguntas/Preguntas";
import Likert from "../../componentes/Preguntas/Likert/Likert";
import D from "../../configuraciones/dato";
import Pantalla from "../../componentes/Pantalla/Pantalla";
import Continuar from "../../componentes/Continuar/Continuar";
import RelojContador from "../../componentes/Navegador/RelojContador";

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
          <Opcion resultados={opcion.resultados}>
            <D>{opcion.titulares}</D>
          </Opcion>
        );
      });

      view = (
        <Pantalla>
          <RelojContador></RelojContador>
          <Pregunta>
            <h1>
              <D t>{this.data.titulares}</D>
            </h1>
            <Likert min={this.data.minimo} max={this.data.maximo}>
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
