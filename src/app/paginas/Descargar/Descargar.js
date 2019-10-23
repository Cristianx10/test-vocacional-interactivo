import React, {Component} from "react";
import { resultados } from "../../resultados/resultados";

export class Descargar extends Component{

    componentDidMount(){
        resultados.descargar();
    }

    render(){
        return <div></div>;
    }
}