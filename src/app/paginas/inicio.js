import React from "react";

import Navegador, {
  Pantalla,
  Continuar
} from "../componentes/Navegador/Navegador";
import Contenedor from "../componentes/Contenedor/Contenedor";
import Pregunta, { Opcion, Likert } from "../componentes/Preguntas/Preguntas";
import { Tpreguntacajonbotones } from "../plantillas/templete-preguntas";

import data from "../../data/queryPreguntas.json";
import { TLikertPregunta } from "../plantillas/template-likert/TLikertPregunta";
import Processing from "../componentes/Processing/Processing";
import Juego from "../actividades/Actividad/Actividad";

export class Inicio extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Navegador image="/includes/background/claro.png" width="100%">
        <Pantalla>
          <Processing juego={Juego}></Processing>
        </Pantalla>

        <TLikertPregunta uid="1"></TLikertPregunta>

        <Pantalla fondo="/includes/background/claro.png">
          <Tpreguntacajonbotones>
            <h1>Titulo</h1>

            <Opcion>1</Opcion>
            <Opcion>1</Opcion>
            <Opcion>1</Opcion>
          </Tpreguntacajonbotones>
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

        <Pantalla>
          <Pregunta>
            <h1>¿CUAL ES MI NOMBRE?</h1>
            <Opcion type="boton" width="100%">
              Javier
            </Opcion>
            <Opcion type="boton" width="100%">
              Cristian
            </Opcion>
          </Pregunta>
          <Continuar></Continuar>
        </Pantalla>
      </Navegador>
    );
  }
}
