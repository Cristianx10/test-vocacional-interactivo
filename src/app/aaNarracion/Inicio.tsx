import React, { Component } from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from "../componentes/Pantalla/Pantalla";


/**Inicio */


export class Inicio extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (<Navegador>
            <Pantalla>
                {/**Bienvenida */}
            </Pantalla>
            <Pantalla>
                {/**Bienvenida */}
            </Pantalla>
        </Navegador>);
    }
}