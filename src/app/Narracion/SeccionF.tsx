import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import Economia from "../processing/Economia/Economia";
import { Re } from '../resultados/resultados';
import { TLikertPruebaBefore } from '../plantillas/template-likert/TLikertPregunta';
import formularioPreguntas from './FormPreguntas';
import Petroleo from '../processing/Petroleo/Petroleo';
import Narrativa from '../processing/Narrativa/Narrativa';
import ClasificarRopa from '../processing/ClasificarRopa/ClasificarRopa';

/**Seccion A */


export class SeccionF extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }


    configEconomia(propiedades: any, acciones: any) {

        acciones.evaluar("Puntos", (p: any, a: any) => {
            a.setValor(Re.economia, p.puntuacion);
            return true;
        }, "Puntuacion Obtendida", [{ id: Re.economia, valor: 100 }]);
    }

    render() {

        let preguntasA = formularioPreguntas(50);
        let preguntasB = formularioPreguntas(55);

        return (<Navegador>


            {/**Ingenieria 
             * 

            <Pantalla>
                <Processing UID="F1" config={this.configEconomia}>
                    <Economia></Economia>
                </Processing>
            </Pantalla>
            <TLikertPruebaBefore titulo="Manejar el presupuesto" UID="F11" />
            */}



            <Pantalla>
                <Narrativa UID="2020G1" config={(prop: any, accion: any) => {
                    console.log(prop, accion)
                    accion.validar("Validacion", (p: any, a: any) => {
                        a.setValor(Re.comunicacion, p.total);
                        return true;
                    }, "Porcetaje validado", [{ id: Re.comunicacion, valor: 200 }]);

                }} />
            </Pantalla>

            <TLikertPruebaBefore titulo="Narrativa" UID="2020G2" />


            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <ClasificarRopa></ClasificarRopa>

            <TLikertPruebaBefore titulo="Clasificar la Ropa" UID="A11" />

            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente sección. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioG}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionF;