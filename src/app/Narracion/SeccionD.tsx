import React, { Component, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import { TLikertPruebaBefore } from "../plantillas/template-likert/TLikertPregunta";
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import { Re } from '../resultados/resultados';
import formularioPreguntas from './FormPreguntas';

import Gusanito from "../processing/Gusanito/Gusanito";
import Laberinto from "../actividades/Laberinto/Laberinto";
import Intentos from "../componentes/Intentos/Intentos";
import { TIntroduccion } from '../plantillas/templete-introduccion';

/**Seccion A */


export class SeccionD extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }

    componentDidMount() {

    }

    /*
    configCulpable(propiedades: any, acciones: any) {
        console.log(propiedades, acciones)
        acciones.evaluar("Puntuacion", (p: any, a: any) => {
            a.setValor(Re.derecho, p.puntuacion);
            return true;
        }, "puntuacion Obtendida", [{ id: Re.derecho, valor: 100 }]);
    }*/

    render() {

        let preguntasA = formularioPreguntas(30);
        let preguntasB = formularioPreguntas(35);

        return (<Navegador>

            <Pantalla fondo="/img/2020/Gusanito/data/fondo.jpg">
                <Processing config={(props: any, action: any) => {

                    action.evaluar("Puntaje", (p: any, a: any) => {
                        a.setValor(Re.psicologia, p.puntaje);
                        return true;
                    }, "Puntuacion del juego", [{ id: Re.psicologia, valor: 200 }]);

                }} UID="2020E1">
                    <Gusanito />
                </Processing>
            </Pantalla>

            <TLikertPruebaBefore titulo="Gusanito de las emociones" UID="2020E11" />


            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}


            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Laberinto</h1>
                <p>Haz click en el punto y sigue el recorrido sin salirse del borde, ten cuidado solo tienes tres vidas.</p>
            </TIntroduccion>

            <Pantalla fondo="/includes/background/claro.png">

                <Laberinto UID="2020N1" config={(props: any, action: any) => {
                    console.log(props, action)

                    action.validar("Una vida", (p: any, a: any) => {
                        if (p.vidas == 1 && p.completo == true) { return true }
                    }, "Gano sin fallos", [{ id: Re.medicina, valor: 20 }])

                    action.validar("Dos vidas", (p: any, a: any) => {
                        if (p.vidas == 2 && p.completo == true) { return true }
                    }, "Gano con 1 fallos", [{ id: Re.medicina, valor: 40 }])

                    action.validar("Tres vidas", (p: any, a: any) => {
                        if (p.vidas == 3 && p.completo == true) { return true }
                    }, "Gano con 2 fallos", [{ id: Re.medicina, valor: 100 }])

                }} />
                <Intentos />
            </Pantalla>

            <TLikertPruebaBefore titulo="Laberintos" UID="2020E11" />
            {/**Derecho
            <Pantalla>
                <Processing UID="D1" config={this.configCulpable}>
                    <Culpable></Culpable>
                </Processing>
            </Pantalla>

            <TLikertPruebaBefore UID="D11" titulo="Culpable"></TLikertPruebaBefore>
 */}
            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente sección. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioE}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionD;