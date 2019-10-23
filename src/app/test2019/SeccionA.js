import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import { TLikertPregunta } from "../plantillas/template-likert/TLikertPregunta";

export class SeccionA extends Component {
  constructor() {
    super();
  }

  render() {
    let views = [];
    for (let index = 0; index < 160; index++) {
        views.push(<TLikertPregunta uid={index+1}></TLikertPregunta>);
        
    }
    return (
      <Navegador>
          {React.Children.map(views, (view)=>{
              return view;
          })}
        
      </Navegador>
    );
  }
}
