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

/**Seccion A */


export class SeccionA extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }

    formularioPreguntas(indexIniti: number) {
        let numberQuestion = 10;
        let preguntas: ReactChild[] = [];
        let preguntasArray: number[] = [];
        for (let index = 1 + numberQuestion; index <= 10 + numberQuestion; index++) {
            preguntasArray.push(index);
        }
        shuffle(preguntasArray);
        for (let index = 0; index < preguntasArray.length; index++) {
            let i = preguntasArray[index];
            let view = <TLikertPregunta UID={i + ""}></TLikertPregunta>;
            preguntas.push(view);
        }
        return preguntas;
    }

    componentDidMount() {

    }

    render() {

        let preguntasA = this.formularioPreguntas(0);
        let preguntasB = this.formularioPreguntas(10);

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