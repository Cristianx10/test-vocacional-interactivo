import React, { Component } from "react";

export class Rompecabezas extends Component {
  constructor() {}

  componentDidMount() {
    let width = 113;
    let columnas = 4;
    let filas = 4;
    var tab = new Tablero(columnas, filas, width);

    let imagenes = matrixImagen(
      "/img/diseno/rompecabeza2.png",
      width,
      width,
      columnas,
      filas
    );

    let orden = [1, 3, 9, 5, 11, 8, 0, 7, 15, 6, 13, 2, 4, 14, 10, 12];

    for (let i = 0; i < imagenes.length; i++) {
      let e = imagenes[i];
      tab.agregar(e, orden[i], i, 0);
    }

    resultados.agregarMaximo([{ area: "diseño", valor: 200 }]);

    tab.iniciar();
    tab.incluirEn(".table__rompecabezas");
    tab.activarArrastre();
    //tab.activarRotacion();
    //tab.setPlaceholder();

    tab.setValidar(() => {
      if (tab.intentos <= 15) {
        resultados.agregarResultados([{ area: "diseño", valor: 100 }]);
      } else if (tab.intentos > 15 && tab.intentos <= 20) {
        resultados.agregarResultados([{ area: "diseño", valor: 75 }]);
      } else if (tab.intentos > 20 && tab.intentos <= 30) {
        resultados.agregarResultados([{ area: "diseño", valor: 50 }]);
      }
    });

    tab.setValidacion(() => {
      alert("Felicitaciones Ganaste");
      siguiente.disabled = false;
    });

    tab.setIntentoFallo(i => {
      console.log("Sigue intentando: " + i);
      if (i > 5) {
      }
    });

    tab.incluirEn(this.refs.contenedor);
  }

  render() {
    return <div ref="contenedor"></div>;
  }
}
