import React from "react";

import Navegador from "../componentes/Navegador/Navegador";
import Contenedor from "../componentes/Contenedor/Contenedor";
import Pregunta, { Opcion } from "../componentes/Preguntas/Preguntas";


import Pantalla from "../componentes/Pantalla/Pantalla";
import Continuar from '../componentes/Continuar/Continuar';
import Formulario from '../componentes/Formulario/Formulario';

export class Inicio extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <Navegador image="/includes/background/oscuro.png" width="100%">
        <Pantalla>
          <Formulario></Formulario>
          <div></div>
        </Pantalla>

        <Pantalla
          padding="200px 250px"
          image="/includes/background/oscuro-personajes.png"
        >
          <Contenedor align="left" className="introduccion">
            <h1>Orientacion vocacional</h1>
            <p>
              A continuación, encontrarás un cuestionario que permite conocer
              tus intereses vocacionales.
            </p>
            <Continuar className="left"></Continuar>
          </Contenedor>
        </Pantalla>


      </Navegador>
    );
  }
}
