import React, { Component } from "react";
import { GResultados } from '../resultados/resultados';

interface IPropsViewARelacion {
  prueba: GResultados;
}

export class ViewARelacion extends Component<IPropsViewARelacion> {
  render() {
    let prueba = this.props.prueba;
    let { propiedades } = prueba;
    let {
      captura,
      palabras,
      clasificados,
      aciertos,
      fallos,
      intentos,
      faltantes,
      nOpciones
    } = propiedades;

    let viewListado: any[] = [];

    palabras.forEach((palabra: any) => {
      let viewList: any[] = [];
      palabra.forEach((p: any) => {
        viewList.push(
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginRight: "15px",
                width: "300px",
                textAlign: "center"
              }}
            >
              {p.informacion}
            </div>
            <div>=></div>
            <div
              style={{
                marginRight: "15px",
                width: "300px",
                textAlign: "center"
              }}
            >
              {p.categoria}
            </div>
          </div>
        );
      });
      viewListado.push(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid black"
          }}
        >
          {React.Children.map(viewList, view => {
            return view;
          })}
        </div>
      );
    });

    return (
      <div>
        <div style={{ alignItems: "center" }} className="horizontal">
          <div>
            <h2>Captura de pantalla</h2>
            <img src={captura} alt="Captura pantalla" />
          </div>

          <div style={{ fontSize: "1.5em" }}>
            <div>
              Elementos clasificados: <strong>{clasificados}</strong>
            </div>
            <div>
              Numero de aciertos: <strong>{aciertos}</strong>
            </div>
            <div>
              Numero de fallos: <strong>{fallos}</strong>
            </div>
            <div>
              Numero de intentos: <strong>{intentos}</strong>
            </div>
            <div>
              Elementos faltantes por clasificar: <strong>{faltantes}</strong>
            </div>
            <div>
              Numero total de elementos a clasificar:{" "}
              <strong>{nOpciones}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          {React.Children.map(viewListado, (view, i) => {
            if (i == 0) {
              return (
                <div>
                  <h2>Orden de las palabras</h2>
                  {view}
                </div>
              );
            } else {
              return (
                <div>
                  <h2>Palabras ordenadas</h2>
                  {view}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
