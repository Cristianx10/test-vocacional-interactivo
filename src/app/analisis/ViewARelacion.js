import React, {Component} from "react";

export class ViewARelacion extends Component{

    render(){
        let prueba = this.props.prueba;
        let {propiedades} = prueba;
        let {captura} = propiedades;
        console.log(prueba);
        return <div>
            <h2>Imagen</h2>
            <img src={captura} alt="Captura pantalla" />
        </div>
    }
}