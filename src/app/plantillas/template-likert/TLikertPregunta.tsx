
import dataPreguntas = require("../../../data/queryPreguntas.json");

import React, { Component } from "react";
import Pregunta, { Opcion } from "../../componentes/Preguntas/Preguntas";
import Likert from "../../componentes/Preguntas/Likert/Likert";
import D from "../../configuraciones/dato";
import Continuar from "../../componentes/Continuar/Continuar";
import RelojContador from "../../componentes/Navegador/RelojContador";
import Contenedor from '../../componentes/Contenedor/Contenedor';

interface IPropsTLikertPregunta {
  UID: string;
}

export class TLikertPregunta extends Component<IPropsTLikertPregunta> {

  data: any;
  renderInicial: boolean;

  constructor(props: IPropsTLikertPregunta) {
    super(props);
    this.data;
    this.renderInicial = false;
  }

  componentDidMount() {
  }

  renderizadoInicial() {
    if (this.renderInicial == false) {
      this.renderInicial = true;
      for (let index = 0; index < dataPreguntas.length; index++) {
        let data = dataPreguntas[index];

        if (this.props.UID == data.id) {
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
      let opciones: any[] = [];
      this.data.opciones.forEach((opcion: any) => {
        opciones.push(
          <Opcion resultados={opcion.resultados}>
            <D>{opcion.titulares}</D>
          </Opcion>
        );
      });

     // console.log(this.data)
      view = (
        <>
          <RelojContador style={{
            position: "absolute",
            right: "50px",
            top: "50px"
          }}></RelojContador>

          <Contenedor height="20%"></Contenedor>

          <Pregunta UID={this.data.id} height="60%">

            <Contenedor>
              <h1>
                <D t>{this.data.titulares}</D>
              </h1>
            </Contenedor>
            <Contenedor>
              <Likert min={this.data.minimo} max={this.data.maximo}>
                {React.Children.map(opciones, view => {
                  return view;
                })}
              </Likert>


            </Contenedor>

          </Pregunta>
          <Contenedor height="20%">
            <Continuar disabled></Continuar>

          </Contenedor>
        </ >
      );
    }

    return view;
  }
}


export default TLikertPregunta;