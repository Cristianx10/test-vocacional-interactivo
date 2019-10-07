import React from "react";
import { resultados } from "../resultados/resultados";
import { ViewPregunta } from "../analisis/ViewPregunta";

export class Viewregistro extends React.Component {
  render() {

    let views = [];

    const { pruebas } = resultados;

    pruebas.forEach((p)=>{
        let view = <div>Categoria no encontrada</div>;
        if(p.id ==="Pregunta"){
            view = <ViewPregunta resultado={p} />
        }
        views.push(view);
    });

    return <div>
        {React.Children.map(views, view =>{
            return view;
        })}
    </div>;
  }
}
