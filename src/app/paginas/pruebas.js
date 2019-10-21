import React, { Component } from "react";
import Navegador, { Pantalla } from "../componentes/Navegador/Navegador";
import Contenedor from "../componentes/Contenedor/Contenedor";
import { Clasificar, Almacen, Zona } from "../actividades/Clasificar/Clasificar";

export class Pruebas extends Component {
  render() {
    return (
      <Navegador>
        <Pantalla>
          <h1>Clasificacion</h1>
          <div className="pantalla ppintura" style={{ display: "flex" }}>
            <div className="contenido-pintura">
              <div id="correcto" className="pregunta__pintura">
                <img src="/img/arte/pinturaParcial.png" alt="" />
              </div>

              <div>
                <div className="pregunta_titulo">
                  <h2>Arrastra a la pintura la sección que le hace falta </h2>
                </div>

                <div className="pregunta__opciones">
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
          <Contenedor on width="100%" height="100%">
            <Clasificar width="100%" height="100%">
              <Contenedor orientacion="horizontal">
                <Contenedor width="30%">
                  <Almacen tipo="as" pos="100px 100px" id="cabello"></Almacen>
                </Contenedor>
                <Contenedor width="30%">
                  <Almacen tipo="asd" id="ojos"></Almacen>
                </Contenedor>
                <Contenedor width="30%">
                  <Zona tipo="as" pos="10px 10px" categoria="cabello">
                    <img
                      className="ima__opcion"
                      src="/img/arte/fragmentoA.png"
                      alt=""
                    />
                  </Zona>
                  <Zona tipo="as">
                    <img
                      className="ima__opcion"
                      src="/img/arte/fragmentoB.png"
                      alt=""
                    />
                  </Zona>
                  <Zona tipo="as" categoria="ojos">
                    <img
                      className="ima__opcion"
                      src="/img/arte/fragmentoC.png"
                      alt=""
                    />
                  </Zona>
                  <Zona tipo="asd">
                    <img
                      className="ima__opcion"
                      src="/img/arte/fragmentoD.png"
                      alt=""
                    />
                  </Zona>
                </Contenedor>
              </Contenedor>
            </Clasificar>
          </Contenedor>
        </Pantalla>
      </Navegador>
    );
  }
}
