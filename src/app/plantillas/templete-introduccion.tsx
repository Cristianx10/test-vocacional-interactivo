import React from "react";

import Contenedor from "../componentes/Contenedor/Contenedor";
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

interface IPropsTIntroduccion {
  fondo?: string;
}

export class TIntroduccion extends React.Component<IPropsTIntroduccion> {
  render() {
    let view = null;

    if (this.props.fondo) {
      view = (
        <Pantalla padding="200px 250px" fondo={this.props.fondo}>
          <Contenedor align="left" className="introduccion">
            {React.Children.map(this.props.children, view => {
              return view;
            })}
            <Continuar className="left"></Continuar>
          </Contenedor>
        </Pantalla>
      );
    } else {
      view = (
        <Pantalla padding="200px 250px">
          <Contenedor align="left" className="introduccion">
            {React.Children.map(this.props.children, view => {
              return view;
            })}
            <Continuar className="left"></Continuar>
          </Contenedor>
        </Pantalla>
      );
    }

    return view;
  }
}
