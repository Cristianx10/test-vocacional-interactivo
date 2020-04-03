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
import formularioPreguntas from './FormPreguntas';
import Gusanito from "../processing/Gusanito/Gusanito";
import Cuadros from '../actividades/Cuadros/Cuadros';

/**Seccion A */


export class SeccionG extends Component<{}> {


    constructor(props: {}) {
        super(props);

    }


    componentDidMount() {

    }

    /*
    configHablame(propiedades: any, acciones: any) {

        acciones.evaluar("Empatia", (p: any, a: any) => {
            a.setValor(Re.humanidades, p.empatia);
            return true;
        }, "Puntuacion Obtendida", [{ id: Re.humanidades, valor: 100 }]);
    }*/

    render() {

        let preguntasA = formularioPreguntas(60);
        let preguntasB = formularioPreguntas(65);

        const configCuadros = (p: any, action: any) => {
 
            action.validar("Acerto", (props: any, a: any) => {
                if (p.fallos < p.aciertos && p.aciertos >= p.totalAcierto) {
                    return true;
                }
            }, "Acerto en todas", [{ id: Re.diseno, valor: 33 }]);
    
            action.validar("Intento", (props: any, a: any) => {
                if (p.fallos < p.aciertos && p.aciertos >= (p.totalAcierto/2) && p.aciertos < p.totalAcierto) {
                    return true;
                }
            }, "Acerto en la mitad de los objetivos, con mas aciertos que fallos", [{ id: Re.diseno, valor: 10 }]);
    
        }

        return (<Navegador>





            {/**Humanidades 1 
            <Pantalla time="200">
                <Processing UID="G1" config={this.configHablame}>
                    <Hablame></Hablame>
                </Processing>
                <RelojContador></RelojContador>
               
            </Pantalla>

            
*/}
        

            {Children.map(preguntasA, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}


            <Pantalla time="30">
                <RelojContador />
                <Cuadros UID="2020S1" config={configCuadros} level={1} />
            </Pantalla>

            <Pantalla time="40">
                <RelojContador />
                <Cuadros UID="2020S2" config={configCuadros} level={2} />
            </Pantalla>

            <Pantalla time="50">
                <RelojContador />
                <Cuadros UID="2020S3" config={configCuadros} level={3} />
            </Pantalla>


            {Children.map(preguntasB, view => {
                return <Pantalla width="80%" fondo="/includes/background/claro.png">{view}</Pantalla>;
            })}

            <Pantalla>
                <h1>Ahora, continuemos con la siguiente sección. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioH}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default SeccionG;