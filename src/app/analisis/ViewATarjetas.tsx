import React, { Component } from "react";
import { GResultados } from '../resultados/resultados';

interface IPropsViewATarjetas {
  prueba: GResultados;
}

export class ViewATarjetas extends Component<IPropsViewATarjetas> {
  render() {
    let prueba = this.props.prueba;

    let { propiedades } = prueba;
    let { captura, aciertos, fallos, intentos, total } = propiedades;

    return (
      <div>
        <div>
          <img src={captura} alt="captura de actividad" />
        </div>
        <div>
          <h2>Numero de Aciertos: {aciertos}</h2>
          <h2>Numero de fallos: {fallos}</h2>
          <h2>Numero de intentos: {intentos}</h2>
          <h2>Total tarjetas: {total}</h2>
        </div>
      </div>
    );
  }
}
