import React from "react";

import "./Contenedor.scss";

import { resizeClass } from "../../utilidades/AutoClases";
import { comunicador } from "../../comunicacion/Comunicacion";

/* Clase encargada de la navegación entre actividades*/
export class Contenedor extends React.Component {

  constructor(){
    super();
    this.comunicador = comunicador;
    this.comunicador.add("contenedor").push(this);

  }


  render() {
    let clas = resizeClass(this, "contenedor center");

    if(clas.className.includes("horizontal") === false){
      clas.className = clas.className + " vertical";
    }

    if (this.props.grid) {
      clas.style.display = "grid";
      clas.style.gridTemplateColumns = "50% 50%";

      if (this.props.grid !== true) {
        clas.style.gridTemplateColumns = this.props.grid;
      }
    }

    return (
      <div className={clas.className} style={clas.style}>
        {React.Children.map(this.props.children, (view, index) => {
          return view;
        })}
      </div>
    );
  }
}

export default Contenedor;
