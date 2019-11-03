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


/**Seccion A */


export class SeccionC extends Component<{}> {


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

    configPollo(propiedades: any, acciones: any) {
        console.log(propiedades, acciones)
    }

    configRevoltosos(propiedades: any, acciones: any) {
        console.log(propiedades, acciones)
        acciones.evaluar("Puntuacion", (p: any, a: any) => {
            a.setValor(Re.licenciatura, p.puntuacion);
            return true;
        }, "puntuacion Obtendida", [{ id: Re.licenciatura, valor: 100 }]);
    }

    render() {

        let preguntasA = this.formularioPreguntas(40);
        let preguntasB = this.formularioPreguntas(50);

        return (<Navegador>


            {/**Ingenieria */}

            {/**
            <Pantalla image="/img/2019/pollo/img/inicio.png" fondo="/img/2019/pollo/img/inicio.png">
                <Continuar pos="630px 550px"></Continuar>
            </Pantalla>

            <Pantalla image="/img/2019/pollo/img/instruc.png" fondo="#020963">
                <Continuar pos="630px 550px"></Continuar>
            </Pantalla>

          
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