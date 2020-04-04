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
import formularioPreguntas from './FormPreguntas';
import Contenedor from '../componentes/Contenedor/Contenedor';
import Intentos from '../componentes/Intentos/Intentos';
import RelojContador from '../componentes/Navegador/RelojContador';
import { Pollitos } from '../processing/Pollo/Pollitos';
import { TLikertPruebaBefore } from '../plantillas/template-likert/TLikertPregunta';
import Bomba from "../actividades/Bomba/Bomba";

/**Seccion A */


export class SeccionE extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }

    configPollo(propiedades: any, acciones: any) {
        console.log(propiedades, acciones)

        acciones.setIntentos(3);

        acciones.setIntentoFallo(() => {
            //acciones.reset();
            acciones.menosVidas();
        });

        acciones.setValidacion(() => {
            //acciones.reset();
            acciones.continuar();
        });

        acciones.validar("Gano", (p: any, a: any) => {
            if (p.validado && p.fallos == 0) {
                return true;
            }
        }, "Gano con 0 intentos", [{ id: Re.ingenieria, valor: 100 }]);

        acciones.validar("Gano", (p: any, a: any) => {
            if (p.validado && p.fallos == 1) {
                return true;
            }
        }, "Gano con 1 intento", [{ id: Re.ingenieria, valor: 75 }]);

        acciones.validar("Gano", (p: any, a: any) => {
            if (p.validado && p.fallos == 2) {
                return true;
            }
        }, "Gano con 2 intento", [{ id: Re.ingenieria, valor: 50 }]);

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

        let preguntasA = formularioPreguntas(40);
        let preguntasB = formularioPreguntas(45);

        return (<Navegador>

            {/**Salud */}

            <Pantalla fondo="#EBEBEB">
                <Processing UID="E1" config={this.configOperando}>
                    <Operando></Operando>
                </Processing>
            </Pantalla>

            <TLikertPruebaBefore titulo="Operando" UID="E15" />


            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}



            {/**Ingenieria */}
            <Pantalla image="/img/2019/pollo/img/inicio.png" fondo="/img/2019/pollo/img/inicio.png">
                <Continuar pos="630px 550px"></Continuar>
            </Pantalla>

            <Pantalla image="/img/2019/pollo/img/instruc.png" fondo="#020963">
                <Continuar pos="630px 550px"></Continuar>
            </Pantalla>

            <Pantalla fondo="/img/2019/pollo/img/fondo.png" time="180">
                <Contenedor on>
                    <Intentos ref="intentoPollos" pos="100px 100px"></Intentos>
                    <RelojContador pos="100px -70px"></RelojContador>
                    <Pollitos UID="C1" width={1280} height={720} config={this.configPollo}></Pollitos>
                </Contenedor>
            </Pantalla>


            <TLikertPruebaBefore titulo="Pollitos" UID="C11" />


            
            {/**

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


 * 
 */}
            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente sección. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioF}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionE;