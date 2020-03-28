import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Formulario, { FormInput } from '../componentes/Formulario/Formulario';
import Tuberias, { Ficha } from '../actividades/Tuberias/Tuberias';
import Contenedor from "../componentes/Contenedor/Contenedor";
import { Re } from '../resultados/resultados';
import formularioPreguntas from './FormPreguntas';

/**Seccion A */


export class SeccionH extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }


    mensaje__tuberia1: HTMLElement | any;
    componentDidMount() {
        this.mensaje__tuberia1 = this.refs.mensaje__tuberia1;

    }
    configTuberia(propiedades: any, acciones: any) {

        acciones.setValidacion(() => {
            console.log(propiedades)
            acciones.habilitar();
            this.mensaje__tuberia1.innerHTML = "Buen trabajo, Ahora continuemos";
        });
    }

    configTuberiasA(propiedades: any, acciones: any) {
        acciones.setValidacion(() => {
            acciones.habilitar();
        });

        acciones.validar("completado", (p: any, a: any) => {
            if (p.valido) {
                return true;
            }
        }, "Completo todo", [{ id: Re.ingenieria, valor: 20 }]);
    }

    render() {

        let preguntasA = formularioPreguntas(140);
        let preguntasB = formularioPreguntas(150);

        return (<Navegador>

            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            {/**Diseño */}
            <Pantalla orientacion="horizontal">
                <Contenedor>
                    <Tuberias
                        UID="H1" config={this.configTuberia.bind(this)}
                        url="/img/pizarra/tabla_tutorial.png"
                        width={110}
                        height={110}
                        filas={3}
                        columnas={5}
                    >
                        <Ficha static />
                        <Ficha down static inicio />
                        <Ficha static />
                        <Ficha up left />
                        <Ficha up down />
                        <Ficha left right />
                        <Ficha up down />
                        <Ficha down left />
                        <Ficha lider />
                        <Ficha down left />
                        <Ficha up down />
                        <Ficha down right />
                        <Ficha static />
                        <Ficha up static final />
                        <Ficha static />
                    </Tuberias>
                    <Continuar disabled></Continuar>
                </Contenedor>
                <Contenedor>
                    <h1 ref="mensaje__tuberia1">Mueves las fichas para completar la secuencia</h1>
                </Contenedor>

            </Pantalla>

            <Pantalla orientacion="vertical">
                <Tuberias
                    UID="H2" config={this.configTuberiasA.bind(this)}
                    url="/img/pizarra/tabla.png"
                    width={110}
                    height={110}
                    filas={5}
                    columnas={4}
                >
                    <Ficha static />
                    <Ficha static />
                    <Ficha static />
                    <Ficha static down inicio />
                    <Ficha static />
                    <Ficha static />
                    <Ficha down right />
                    <Ficha left right />
                    <Ficha up down />
                    <Ficha down left />
                    <Ficha static />
                    <Ficha down right />
                    <Ficha left right />
                    <Ficha up down />
                    <Ficha up left />
                    <Ficha right static final />
                    <Ficha up left />
                    <Ficha left right />
                    <Ficha up left />
                    <Ficha lider />
                </Tuberias>
                <Continuar disabled></Continuar>
            </Pantalla>


            <Pantalla orientacion="vertical">
                <Tuberias
                    UID="H2" config={this.configTuberiasA.bind(this)}
                    url="/img/pizarra/tabla2.png"
                    width={110}
                    height={110}
                    filas={6}
                    columnas={3}
                >

                    <Ficha static />
                    <Ficha up left />
                    <Ficha up right />
                    <Ficha up left />
                    <Ficha up right />
                    <Ficha static />
                    <Ficha final right static />
                    <Ficha left right />
                    <Ficha down right />
                    <Ficha left right />
                    <Ficha left right />
                    <Ficha inicio left static />
                    <Ficha static />
                    <Ficha up left />
                    <Ficha lider />
                    <Ficha left right />
                    <Ficha down right />
                    <Ficha static />
 
                </Tuberias>
                <Continuar disabled></Continuar>
            </Pantalla>






            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla fondo="/includes/background/oscuro.png">
                <h1 style={{ textAlign: "center", color: "white" }}>Nos gustaria saber tu carrera</h1>
                <Formulario width="70%">
                    <FormInput label="Ocupación" placeholder="Ingrese su ocupación" />
                </Formulario>
            </Pantalla>

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente seccion. Haz click en continuar</h1>
                <Continuar url={routes.resultados}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionH;