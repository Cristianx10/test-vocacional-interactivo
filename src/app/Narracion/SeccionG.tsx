import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import Hablame from "../processing/Hablame/Hablame";
import RelojContador from "../componentes/Navegador/RelojContador";
import { Re } from '../resultados/resultados';
import { TLikertPruebaBefore } from '../plantillas/template-likert/TLikertPregunta';
import formularioPreguntas from './FormPreguntas';

/**Seccion A */


export class SeccionG extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }


    componentDidMount() {

    }

    configHablame(propiedades: any, acciones: any) {

        acciones.evaluar("Empatia", (p: any, a: any) => {
            a.setValor(Re.humanidades, p.empatia);
            return true;
        }, "Puntuacion Obtendida", [{ id: Re.humanidades, valor: 100 }]);
    }

    render() {

        let preguntasA = formularioPreguntas(120);
        let preguntasB = formularioPreguntas(130);

        return (<Navegador>


            {/**Humanidades 1 */}
            <Pantalla time="200">
                <Processing UID="G1" config={this.configHablame}>
                    <Hablame></Hablame>
                </Processing>
                <RelojContador></RelojContador>
               
            </Pantalla>

            
            <TLikertPruebaBefore titulo="Hablando con el señor osos" UID="G11" />

            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}




            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente seccion. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioH}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionG;