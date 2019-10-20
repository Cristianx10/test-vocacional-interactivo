import React, { Component } from "react";

import { AClasificar } from "./TS-Clasificar";

export class Clasificar extends Component {
  constructor() {
    super();
    this.clasificar = new AClasificar();
  }

  componentDidMount() {
    this.clasificar.incluirEn(this.refs.contenedor);

    let sonidos = document.querySelectorAll(".ima__opcion");
    console.log(sonidos)

    let categoria = ["pintura__casilla1", "mal", "mal", "mal"];
    sonidos.forEach((ele, index) => {
      this.clasificar.agregar(ele, categoria[index]);
    });

    this.clasificar.almacenaje(
      ["#pintura__casilla1"],
      ".pregunta__opciones img"
    );
    this.clasificar.arrastrables(".ima__opcion", ".pregunta__opciones");

    this.clasificar.setResetear(s => {
      s.style.margin = "0";
      s.style.left = "0";
      s.style.right = "0";
      s.style.top = "0";
    });

    // this.clasificar.setContenedor();

    this.clasificar.setIntentoAcierto(() => {
      console.log("bien");
      siguiente.disabled = false;
      seguir();
      //aqui agregar puntaje cuadno seleccione la imagen A
      /*  resultados.agregarResultados([
        {
          area: "Arte",
          valor: 100
        }
      ]);*/
    });

    this.clasificar.setIntentoFallo(() => {});

    this.clasificar.setValidacion(() => {});
  }

  render() {
    return (
      <div ref="contenedor">
        <h1>Clasificacion</h1>
        <div className="pantalla ppintura" style={{ flexDirection: "row" }}>
          <div className="contenido-pintura">
            <div id="correcto" className="pregunta__pintura">
              <img src="/img/arte/pinturaParcial.png" alt="" />
              <div id="pintura__casilla1"></div>
            </div>

            <div>
              <div className="pregunta_titulo">
                <h2>Arrastra a la pintura la sección que le hace falta </h2>
              </div>

              <div className="pregunta__opciones">
                  <h1>Opcoinoes</h1>
                <img
                  className="ima__opcion"
                  src="/img/arte/fragmentoA.png"
                  alt=""
                />
                <img
                  className="ima__opcion"
                  src="/img/arte/fragmentoB.png"
                  alt=""
                />
                <img
                  className="ima__opcion"
                  src="/img/arte/fragmentoC.png"
                  alt=""
                />
                <img
                  className="ima__opcion"
                  src="/img/arte/fragmentoD.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
