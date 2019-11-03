import React, { Component, ReactChild, Children } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import TLikertPregunta from "../plantillas/template-likert/TLikertPregunta";
import Formulario, { FormInput } from "../componentes/Formulario/Formulario";
import { shuffle } from '../utilidades/utils';
import { TIntroduccion } from '../plantillas/templete-introduccion';
import Continuar from '../componentes/Continuar/Continuar';
import Contenedor from '../componentes/Contenedor/Contenedor';
import { resultados } from '../resultados/resultados';
import { routes } from '../router';


/**Inicio */


export class Inicio extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }


    componentDidMount() {

    }

    render() {
        return (<Navegador>


            <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
                <h1>Orientacion vocacional</h1>
                <p>Bienvenido a nuestro test vocacional. Rellena todas las preguntas a conciencia, recuerda que es con el proposito de analizar tus habilidades</p>
            </TIntroduccion>


            <Pantalla fondo="/includes/background/oscuro.png" onInicial={() => { resultados.limpiarTodo() }}>
                <h1 style={{ textAlign: "center", color: "white" }}>¿Quién eres?</h1>
                <Formulario width="70%">
                    <FormInput label="Nombre" placeholder="Ingrese su nombre" />
                    <Contenedor orientacion="horizontal">
                        <FormInput width="40%" label="Edad" placeholder="Edad" />
                        <FormInput width="60%" type="boton" label="Genero" placeholder="Edad" opciones={["Mujer", "Hombre"]} />
                    </Contenedor>
                    {/*<FormInput label="Ocupación" placeholder="Ingrese su ocupacion" /> */}

                </Formulario>
            </Pantalla>

            <Pantalla style={{ color: "white" }}>
                <h1>Ahora, continuemos con la siguiente seccion. Haz click en continuar</h1>
                <Continuar url={routes.cuetionarioA}></Continuar>
            </Pantalla>

        </Navegador>);
    }
}

export default Inicio;