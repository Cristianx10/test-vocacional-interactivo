import React from "react";
import Pregunta from "../componentes/Preguntas/Preguntas";
import Contenedor from "../componentes/Contenedor/Contenedor";

/*Titular del Componente* TC */
export class TCTitular extends React.Component {
  render() {
    return React.Children.map(this.props.children, (view, index) => {
      return view;
    });
  }
}

/*Titular del Componente* TC */
export class TCTitular2 extends React.Component {
  render() {
    return React.Children.map(this.props.children, (view, index) => {
      return view;
    });
  }
}

/*Titular del Componente* TC */
export class TCOpcion extends React.Component {
  render() {
    return React.Children.map(this.props.children, (view, index) => {
      return view;
    });
  }
}

export class Tpreguntacajonbotones extends React.Component {
  render() {
    let titular = [];
    let titular2 = [];
    let opciones = [];

    React.Children.map(this.props.children, (view, index) => {
      if (view.type.name === "TCTitular") {
        titular.push(view);
      } else if (view.type.name === "TCTitular2") {
        titular2.push(view);
      } else if (view.type.name === "Opcion") {
        opciones.push(view);
      }
    });

    return (
      <Pregunta orientacion="horizontal">
        <Contenedor width="50%">
          {React.Children.map(titular, (view, index) => {
            return view;
          })}
         
        </Contenedor>
        <Contenedor width="50%" padding="100px 10px">
          <Contenedor orientacion="center">
            {React.Children.map(titular2, (view, index) => {
              return view;
            })}
          </Contenedor>
          <Contenedor grid allType="boton">
            {React.Children.map(opciones, (view, index) => {
              return view;
            })}
          </Contenedor>
        </Contenedor>
      </Pregunta>
    );
  }
}
