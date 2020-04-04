import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Continuar from '../componentes/Continuar/Continuar';


import { TIntroduccion } from '../plantillas/templete-introduccion';
import { routes } from '../router';
import Processing from "../componentes/Processing/Processing";
import Revoltosos from "../processing/Revoltosos/Revoltosos";
import { Re } from '../resultados/resultados';
import { Pollitos } from "../processing/Pollo/Pollitos";
import Contenedor from "../componentes/Contenedor/Contenedor";
import Intentos from '../componentes/Intentos/Intentos';
import RelojContador from '../componentes/Navegador/RelojContador';
import { TLikertPruebaBefore } from '../plantillas/template-likert/TLikertPregunta';
import formularioPreguntas from './FormPreguntas';
import Petroleo from '../processing/Petroleo/Petroleo';

/**Seccion A */


export class SeccionC extends Component<{}> {


    constructor(props: {}) {
        super(props);

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


            <Pantalla fondo="/img/2020/Petroleo/img/fondo.png">
                <Processing config={(props: any, accion: any) => {

                    accion.evaluar("Validacion", (p: any, a: any) => {
                        a.setValor(Re.economia, p.puntaje);
                        return true;
                    }, "Porcetaje validado", [{ id: Re.economia, valor: 200 }]);

                }} UID="2020-1">
                    <Petroleo />
                </Processing>
            </Pantalla>

            <TLikertPruebaBefore titulo="Economia petrolera" UID="2020-1r" />

            {/**
            
          
            <Pantalla fondo="#010947">
                <Processing UID="C1" config={this.configPollo}>
                    <Pollo></Pollo>
                </Processing>
            </Pantalla>


             */}


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

            <TLikertPruebaBefore titulo="Niños revoltosos" UID="C222" />

            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente sección. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioD}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionC;