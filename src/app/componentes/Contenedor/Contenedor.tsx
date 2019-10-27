import React, { Component } from "react";

import "./Contenedor.scss";

import { resizeClass } from "../../utilidades/AutoClases";
import { comunicador } from "../../comunicacion/Comunicacion";
import ManagerStyle from '../../utilidades/AutoClases';
import { contenedorContext } from '../../comunicacion/ContenedorContext';
import ContenedorContext from '../../comunicacion/ContenedorContext';

interface IPropsContenedor {
  grid?:string;
  allType?:string;
  on?:boolean;
}

/* Clase encargada de la navegación entre actividades*/
export class Contenedor extends Component<IPropsContenedor> {

  style: ManagerStyle;
  contenedorContext:contenedorContext;

  constructor(props: IPropsContenedor) {
    super(props);

    this.contenedorContext = ContenedorContext;
    this.contenedorContext.setContenedor(this);

    this.style = new ManagerStyle(props, "contenedor center");

  }


  render() {

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div className={className} style={style}>
        {React.Children.map(this.props.children, (view, index) => {
          return view;
        })}
      </div>
    );
  }
}

export default Contenedor;
