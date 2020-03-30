import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta, { TLikertPruebaBefore } from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import Culpable from '../processing/Culpable/Culpable';
import { Re } from '../resultados/resultados';
import formularioPreguntas from './FormPreguntas';

/**Seccion A */


export class SeccionD extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }

    componentDidMount() {

    }

    configCulpable(propiedades: any, acciones: any) {
        console.log(propiedades, acciones)
        acciones.evaluar("Puntuacion", (p: any, a: any) => {
            a.setValor(Re.derecho, p.puntuacion);
            return true;
        }, "puntuacion Obtendida", [{ id: Re.derecho, valor: 100 }]);
    }

    render() {

        let preguntasA = formularioPreguntas(30);
        let preguntasB = formularioPreguntas(35);

        return (<Navegador>



            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            {/**Derecho */}
            <Pantalla>
                <Processing UID="D1" config={this.configCulpable}>
                    <Culpable></Culpable>
                </Processing>
            </Pantalla>

            <TLikertPruebaBefore UID="D11" titulo="Culpable"></TLikertPruebaBefore>

            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente seccion. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioE}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionD;