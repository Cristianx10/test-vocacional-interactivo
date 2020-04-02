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
import Secuencia from "../actividades/Secuencia/Secuencia";
import { Re } from '../resultados/resultados';

/**Seccion A */


export class SeccionA extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }



    componentDidMount() {

    }

    configScuencia(p: any, a: any) {
        a.validar("aciertos", () => {
            if (p.aciertos >= p.cartas) {
                return true
            }
        }, "Acertó en todas los compuestos", [
            { id: Re.ciencias, valor: 33 }
        ]);

        a.validar("aciertos", () => {
            if (p.aciertos >= (p.cartas / 2) && p.aciertos < p.cartas) {
                return true;
            }
        }, "Acertó a la mitad de los compuestos", [
            { id: Re.ciencias, valor: 10 }
        ]);
    }

    render() {

        let preguntasA = formularioPreguntas(0);
        let preguntasB = formularioPreguntas(5);

        return (<Navegador>



            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Responda las preguntas</h1>
                <p>A continuación, encontrarás un cuestionario que permite conocer tus intereses vocacionales.</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            {/**Diseño 
            <ClasificarRopa></ClasificarRopa>
             



            <TLikertPruebaBefore titulo="Clasificar la Ropa" UID="A11" />
            */}

            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Secuencias</h1>
                <p>Completa la secuencia en el orden que se presenta. Primero observar y luego haz click sobre el componente en el orden respectivo.</p>
            </TIntroduccion>


            <Pantalla>
                <Secuencia
                    UID="2020D1"
                    config={this.configScuencia.bind(this)}
                    cartas={
                        [
                            { url: "/img/ciencias/elementos/calcio.png", time: 5000 },
                            { url: "/img/ciencias/elementos/sodio.png", time: 5000 },
                            { url: "/img/ciencias/elementos/potasio.png", time: 5000 }
                        ]
                    } />
            </Pantalla>

            <Pantalla>
                <Secuencia
                    UID="2020D2"
                    config={this.configScuencia.bind(this)}
                    cartas={
                        [
                            { url: "/img/ciencias/elementos/calcio.png", time: 3000 },
                            { url: "/img/ciencias/elementos/sodio.png", time: 3000 },
                            { url: "/img/ciencias/elementos/potasio.png", time: 3000 },
                            { url: "/img/ciencias/elementos/carbon.png", time: 4000 },
                            { url: "/img/ciencias/elementos/oro.png", time: 4000 }
                        ]
                    } />
            </Pantalla>

            <Pantalla>
                <Secuencia
                    UID="2020D3"
                    config={this.configScuencia.bind(this)}
                    cartas={
                        [
                            { url: "/img/ciencias/elementos/calcio.png", time: 2000 },
                            { url: "/img/ciencias/elementos/sodio.png", time: 2000 },
                            { url: "/img/ciencias/elementos/potasio.png", time: 2000 },
                            { url: "/img/ciencias/elementos/carbon.png", time: 3000 },
                            { url: "/img/ciencias/elementos/oro.png", time: 3000 },
                            { url: "/img/ciencias/elementos/fosforo.png", time: 3000 },
                            { url: "/img/ciencias/elementos/radio.png", time: 3000 }
                        ]
                    } />
            </Pantalla>

            <TLikertPruebaBefore titulo="Secuencias" UID="2020D4" />


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