import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import Operando from "../processing/Operando/Operando";
import { Re } from '../resultados/resultados';
import { TarjetasR, Carta } from '../actividades/TarjetasR/TarjetasR';

/**Seccion A */


export class SeccionE extends Component<{}> {


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

    configOperando(propiedades: any, acciones: any) {

        acciones.evaluar("Puntuacion", (p: any, a: any) => {
            a.setValor(Re.medicina, p.puntuacion);
            return true;
        }, "Puntuacion Obtendida", [{ id: Re.medicina, valor: 100 }]);
    }

    configTarjetas(propiedades: any, acciones: any) {

        acciones.validar("completo", (p: any, a: any) => {
            if (p.aciertos >= p.total && p.fallos <= p.total / 3) {
                return true;
            }
        }, "Completo todo sin fallos", [{ id: Re.ciencias, valor: 20 }])

        acciones.validar("completo", (p: any, a: any) => {
            if (p.aciertos >= p.total && p.fallos > p.total / 3) {
                return true;
            }
        }, "Completo todo", [{ id: Re.ciencias, valor: 15 }])

        acciones.setValidacion((p: any, a: any) => {
            acciones.habilitar();
        });
    }

    render() {

        let preguntasA = this.formularioPreguntas(80);
        let preguntasB = this.formularioPreguntas(90);

        return (<Navegador>


            {/**Salud */}

            <Pantalla>
                <Processing UID="E1" config={this.configOperando}>
                    <Operando></Operando>
                </Processing>
            </Pantalla>

            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>


            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}


            <Pantalla fondo="/includes/background/claro.png">
                <TarjetasR UID="E3" config={this.configTarjetas}>
                    <Carta img="/img/emparejados/card-1.png" posA={0} posB={2}></Carta>
                    <Carta img="/img/emparejados/card-2.png" posA={4} posB={5}></Carta>
                    <Carta img="/img/emparejados/card-3.png" posA={1} posB={3}></Carta>
                </TarjetasR>
                <Continuar disabled height="15%" align="center"></Continuar>
            </Pantalla>

            <Pantalla fondo="/includes/background/claro.png">
                <TarjetasR UID="E4" config={this.configTarjetas}>
                    <Carta img="/img/emparejados/card-1.png" posA={0} posB={2}></Carta>
                    <Carta img="/img/emparejados/card-2.png" posA={6} posB={4}></Carta>
                    <Carta img="/img/emparejados/card-3.png" posA={3} posB={8}></Carta>
                    <Carta img="/img/emparejados/card-4.png" posA={7} posB={5}></Carta>
                    <Carta img="/img/emparejados/card-5.png" posA={9} posB={1}></Carta>
                </TarjetasR>
                <Continuar disabled height="15%" align="center"></Continuar>
            </Pantalla>

            <Pantalla fondo="/includes/background/claro.png">
                <TarjetasR UID="E5" config={this.configTarjetas}>
                    <Carta img="/img/emparejados/card-1.png" posA={0} posB={2}></Carta>
                    <Carta img="/img/emparejados/card-2.png" posA={4} posB={6}></Carta>
                    <Carta img="/img/emparejados/card-3.png" posA={10} posB={12}></Carta>
                    <Carta img="/img/emparejados/card-4.png" posA={18} posB={1}></Carta>
                    <Carta img="/img/emparejados/card-5.png" posA={3} posB={17}></Carta>
                    <Carta img="/img/emparejados/card-6.png" posA={11} posB={14}></Carta>
                    <Carta img="/img/emparejados/card-7.png" posA={13} posB={19}></Carta>
                    <Carta img="/img/emparejados/card-8.png" posA={9} posB={5}></Carta>
                    <Carta img="/img/emparejados/card-9.png" posA={7} posB={8}></Carta>
                    <Carta img="/img/emparejados/card-10.png" posA={15} posB={16}></Carta>
                </TarjetasR>
                <Continuar disabled height="15%" align="center"></Continuar>
            </Pantalla>



            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente seccion. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioF}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionE;