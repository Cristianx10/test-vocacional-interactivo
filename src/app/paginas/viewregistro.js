import React from "react";
import { resultados, resultados2 } from "../resultados/resultados";
import { ViewPregunta } from "../analisis/ViewPregunta";

import { UnificarResultados } from "../resultados/unificador";

export class Viewregistro extends React.Component {
  render() {
    let views = [];

    views.push(<h1>Pruebas</h1>);
    /*
    let results = [resultados, resultados2];

    let rpruebas = [];
    results.forEach((result, index) => {
      const { pruebas } = result;
      rpruebas.push(pruebas);
    });
*/

    let result = new UnificarResultados();

    result.agregar(resultados);
    result.agregar(resultados2);

    let pruebasResultantes = result.unificar();
   

    pruebasResultantes.forEach(resultado => {
      let view = <div>Categoria no encontrada</div>;
      let id = resultado.pruebas[0].prueba.id;
      if (id === "Pregunta") {
        view = <ViewPregunta resultado={resultado} />
      }
       views.push(view);
    });

    return (
      <div>
        {React.Children.map(views, view => {
          return view;
        })}
      </div>
    );
  }
}
