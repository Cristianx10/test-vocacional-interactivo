import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import ClasificarRopa from '../processing/ClasificarRopa/ClasificarRopa';
import { TLikertPruebaBefore } from '../plantillas/template-likert/TLikertPregunta';
import formularioPreguntas from './FormPreguntas';

/**Seccion A */


export class SeccionA extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }

    

    componentDidMount() {

    }

    render() {

        let preguntasA = formularioPreguntas(0);
        let preguntasB = formularioPreguntas(10);

        return (<Navegador>



            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Responda las preguntas</h1>
                <p>A continuación, encontrarás un cuestionario que permite conocer tus intereses vocacionales.</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            {/**Diseño */}
            <ClasificarRopa></ClasificarRopa>

            <TLikertPruebaBefore titulo="Clasificar la Ropa" UID="A11" />

            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla fondo="/includes/background/claro.png">
                <h1>Lo has hecho muy bien, continuemos con la siguiente unidad. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioB}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionA;