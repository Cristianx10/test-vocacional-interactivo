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

/**Seccion A */


export class SeccionD extends Component<{}> {


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

    configCulpable(propiedades: any, acciones: any) {
        console.log(propiedades, acciones)
        acciones.evaluar("Puntuacion", (p: any, a: any) => {
            a.setValor(Re.derecho, p.puntuacion);
            return true;
        }, "puntuacion Obtendida", [{ id: Re.derecho, valor: 100 }]);
    }

    render() {

        let preguntasA = this.formularioPreguntas(60);
        let preguntasB = this.formularioPreguntas(70);

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