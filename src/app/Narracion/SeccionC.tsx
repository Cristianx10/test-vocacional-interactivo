import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';

import TLikertPregunta from "../plantillas/template-likert/TLikertPregunta";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import Pollo from "../processing/Pollo/Pollo";
import Revoltosos from "../processing/Revoltosos/Revoltosos";
import { Re } from '../resultados/resultados';
import { Pollitos } from "../processing/Pollo/Pollitos";
import Contenedor from "../componentes/Contenedor/Contenedor";
import Intentos from '../componentes/Intentos/Intentos';
import RelojContador from '../componentes/Navegador/RelojContador';
import { TLikertPruebaBefore } from '../plantillas/template-likert/TLikertPregunta';
import formularioPreguntas from './FormPreguntas';


/**Seccion A */


export class SeccionC extends Component<{}> {


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

    configRevoltosos(propiedades: any, acciones: any) {
        console.log(propiedades, acciones)
        acciones.evaluar("Puntuacion", (p: any, a: any) => {
            a.setValor(Re.licenciatura, p.puntuacion);
            return true;
        }, "puntuacion Obtendida", [{ id: Re.licenciatura, valor: 100 }]);
    }

    render() {

        let preguntasA = formularioPreguntas(20);
        let preguntasB = formularioPreguntas(25);

        return (<Navegador>

            {/**Ingenieria */}
            <Pantalla image="/img/2019/pollo/img/inicio.png" fondo="/img/2019/pollo/img/inicio.png">
                <Continuar pos="630px 550px"></Continuar>
            </Pantalla>

            <Pantalla image="/img/2019/pollo/img/instruc.png" fondo="#020963">
                <Continuar pos="630px 550px"></Continuar>
            </Pantalla>

            <Pantalla fondo="/img/2019/pollo/img/fondo.png" time="120">
                <Contenedor on>
                    <Intentos ref="intentoPollos" pos="100px 100px"></Intentos>
                    <RelojContador pos="100px -70px"></RelojContador>
                    <Pollitos UID="C1" width={1280} height={720} config={this.configPollo}></Pollitos>
                </Contenedor>
            </Pantalla>


            <TLikertPruebaBefore titulo="Pollitos" UID="C11" />



            {/**
            
          
            <Pantalla fondo="#010947">
                <Processing UID="C1" config={this.configPollo}>
                    <Pollo></Pollo>
                </Processing>
            </Pantalla>


             */}


            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}


            {/**Educacion */}
            <Pantalla fondo="#00DED3">
                <Processing UID="C2" config={this.configRevoltosos}>
                    <Revoltosos></Revoltosos>
                </Processing>
            </Pantalla>

            <Pantalla image="/img/2019/revoltosos/data/FINAL.png" fondo="#FFF97C">
                <Continuar pos="370px 930px">Siguiente</Continuar>
            </Pantalla>

            <TLikertPruebaBefore titulo="Revoltosos" UID="C21" />

            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente seccion. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioD}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionC;