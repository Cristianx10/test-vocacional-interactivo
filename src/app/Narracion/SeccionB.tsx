import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta, { TLikertPruebaBefore } from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import MezclandoConRick from "../processing/MezclandoConRick/MezclandoConRick";
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { Re } from '../resultados/resultados';
import Pregunta, { Opcion } from "../componentes/Preguntas/Preguntas";
import D from '../configuraciones/dato';
import Likert from '../componentes/Preguntas/Likert/Likert';
import Contenedor from "../componentes/Contenedor/Contenedor";

/**Seccion A */


export class SeccionB extends Component<{}> {


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

    configRickMezclas(propiedades: any, acciones: any) {

        acciones.evaluar("Intentos", (p: any, a: any) => {
            if (p.vidas >= 3) {
                return true;
            }
        }, "Nunca fallo", []);
        acciones.evaluar("Intentos", (p: any, a: any) => {
            if (p.vidas == 2) {
                return true;
            }
        }, "Fallo 1 vez", []);

        acciones.evaluar("Intentos", (p: any, a: any) => {
            if (p.vidas == 1) {
                return true;
            }
        }, "Fallo 2 veces", []);

        acciones.evaluar("Intentos", (p: any, a: any) => {
            if (p.vidas == 10) {
                return true;
            }
        }, "Fallo 3 veces y perdio", []);

        acciones.evaluar("Intentos", (p: any, a: any) => {
            if (p.vidas == 10) {
                return true;
            }
        }, "Fallo 3 veces y perdio", []);

        acciones.evaluar("Puntaje", (p: any, a: any) => {

            a.setValor(Re.ciencias, p.puntaje);

            return true;

        }, "Puntuacion segun el numero de compuestos", [{ id: Re.ciencias, valor: 100 }]);

    }

    render() {

        let preguntasA = this.formularioPreguntas(20);
        let preguntasB = this.formularioPreguntas(30);

        return (<Navegador >



            <Pantalla style={{ position: "relative" }} image="/img/2019/ciencias/imgs/instrucciones.png" fondo="#56988D">
                <Continuar pos="550px 1000px"></Continuar>
            </Pantalla>

            <Pantalla style={{ position: "relative" }} image="/img/2019/ciencias/imgs/compuestosinicio.png" fondo="#6E978C">
                <Continuar pos="550px 1000px"></Continuar>
            </Pantalla>

            {/**Ciencias */}
            <Pantalla fondo="#8CBFB2" time="90">
                <Processing UID="B1" config={this.configRickMezclas}>
                    <MezclandoConRick />
                </Processing>
            </Pantalla>

            <TLikertPruebaBefore titulo="Mezclando Compuestos" UID="B11" />



            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>

            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente sección. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioC}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionB;