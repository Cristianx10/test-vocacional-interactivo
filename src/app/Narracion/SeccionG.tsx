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

/**Seccion A */


export class SeccionG extends Component<{}> {


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

    configHablame(propiedades: any, acciones: any) {
        
        acciones.evaluar("Empatia", (p: any, a: any) => {
            a.setValor(Re.humanidades, p.empatia);
            return true;
        }, "Puntuacion Obtendida", [{ id: Re.humanidades, valor: 100 }]);
    }

    render() {

        let preguntasA = this.formularioPreguntas(120);
        let preguntasB = this.formularioPreguntas(130);

        return (<Navegador>


            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            {/**Humanidades 1 */}
            <Pantalla time="300">
                <Processing UID="G1" config={this.configHablame}>
                    <Hablame></Hablame>
                </Processing>
                <RelojContador></RelojContador>
            </Pantalla>

            <TLikertPruebaBefore titulo="Hablando con el señor osos" UID="G11" />

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