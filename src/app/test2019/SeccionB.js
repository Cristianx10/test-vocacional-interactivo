import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Contenedor from "../componentes/Contenedor/Contenedor";
import Continuar from "../componentes/Continuar/Continuar";
import RelojContador from "../componentes/Navegador/RelojContador";
import Clasificar, { Almacen, Zona } from "../actividades/Clasificar/Clasificar";


export class SeccionB extends Component {
  render() {
    return (
      <Navegador>
        <Pantalla>
          <Contenedor height="80%"></Contenedor>
          <Contenedor height="20%" width="100%">
            <Continuar></Continuar>
          </Contenedor>
        </Pantalla>

        <Pantalla time="15">
          <RelojContador></RelojContador>

          <div className="tituloCompleta">
            <h2>¡Presta atención a todos los detalles!</h2>
          </div>

          <div id="completa" className="completaImg">
            <img src="/img/2019/diseno/partes/completa.png" alt="" />
          </div>
        </Pantalla>

        <Pantalla>
          <h1>¿Erez capaz de recordar todo?</h1>
          <div className="pantalla ppintura" style={{ display: "flex" }}>
            <div className="contenido-pintura">
              <div id="correcto" className="pregunta__pintura">
                <img src="/img/2019/diseno/partes/fondo.png" alt="" />
              </div>

              <div>
                <div className="pregunta_titulo">
                  <h2>
                    Completa de nuevo toda la composición en el menor tiempo
                    posible
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <Contenedor on width="100%" height="100%">
            <Clasificar width="100%" height="100%">
              <Contenedor orientacion="horizontal">
                <Contenedor width="30%">
                  <Almacen
                    tipo="cabello2"
                    pos="215px 60px"
                    id="cabello"
                    height="50px"
                    width="130px"
                  ></Almacen>
                </Contenedor>
                <Contenedor width="30%">
                  <Almacen
                    tipo="ojos"
                    id="ojos"
                    pos="300px 90px"
                    height="30px"
                    width="100px"
                  ></Almacen>
                </Contenedor>
                <Contenedor width="30%">
                  <Almacen
                    tipo="boca"
                    id="bocas"
                    pos="350px 118px"
                    height="20px"
                    width="80px"
                  ></Almacen>
                </Contenedor>
                <Contenedor width="30%">
                  <Almacen
                    tipo="moño"
                    id="moños"
                    pos="385px 116px"
                    height="20px"
                    width="80px"
                  ></Almacen>
                </Contenedor>
                <Contenedor width="30%">
                  <Almacen
                    tipo="carpeta"
                    id="carpeta"
                    pos="85px 430px"
                    height="40px"
                    width="80px"
                  ></Almacen>
                </Contenedor>
                <Contenedor width="30%">
                  <Almacen
                    tipo="pistola"
                    id="pistola"
                    pos="410px 270px"
                    height="40px"
                    width="80px"
                  ></Almacen>
                </Contenedor>

                <Zona
                  tipo="cabello2"
                  categoria="cabello"
                  width="146px"
                  pos="150px 560px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/cabello1.png"
                    alt=""
                  />
                </Zona>
                {/*Zona son los arrastrables*/}
                <Zona
                  tipo="cabello2"
                  categoria="cabello"
                  width="146px"
                  pos="300px 560px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/cabello2.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="cabello2"
                  categoria="cabello"
                  width="146px"
                  pos="450px 560px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/cabello3.png"
                    alt=""
                  />
                </Zona>

                <Zona
                  tipo="ojos"
                  categoria="ojo"
                  width="90px"
                  height="30px"
                  pos="150px 720px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/ojos1.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="ojos"
                  categoria="ojo"
                  width="90px"
                  height="30px"
                  pos="200px 720px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/ojos2.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="ojos"
                  categoria="ojo"
                  width="90px"
                  height="30px"
                  pos="250px 720px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/ojos3.png"
                    alt=""
                  />
                </Zona>

                <Zona
                  tipo="boca"
                  categoria="boca"
                  width="90px"
                  height="20px"
                  pos="150px 820px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/boca1.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="boca"
                  categoria="boca"
                  width="90px"
                  height="20px"
                  pos="200px 820px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/boca2.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="boca"
                  categoria="boca"
                  width="90px"
                  height="20px"
                  pos="250px 820px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/boca3.png"
                    alt=""
                  />
                </Zona>

                <Zona
                  tipo="moño"
                  categoria="moño"
                  width="90px"
                  height="30px"
                  pos="150px 900px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/mono1.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="moño"
                  categoria="moño"
                  width="90px"
                  height="30px"
                  pos="200px 900px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/mono2.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="moño"
                  categoria="moño"
                  width="90px"
                  height="30px"
                  pos="250px 900px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/mono3.png"
                    alt=""
                  />
                </Zona>

                <Zona
                  tipo="carpeta"
                  categoria="carpeta"
                  width="90px"
                  height="30px"
                  pos="150px 980px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/carpeta1.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="carpeta"
                  categoria="carpeta"
                  width="90px"
                  height="30px"
                  pos="200px 980px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/carpeta2.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="carpeta"
                  categoria="carpeta"
                  width="90px"
                  height="30px"
                  pos="250px 980px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/carpeta3.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="carpeta"
                  categoria="carpeta"
                  width="90px"
                  height="30px"
                  pos="300px 980px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/carpeta4.png"
                    alt=""
                  />
                </Zona>

                <Zona
                  tipo="pistola"
                  categoria="pistola"
                  width="90px"
                  height="30px"
                  pos="150px 1080px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/pistola1.png"
                    alt=""
                  />
                </Zona>
                <Zona
                  tipo="pistola"
                  categoria="pistola"
                  width="90px"
                  height="30px"
                  pos="200px 1080px"
                >
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/pistola2.png"
                    alt=""
                  />
                </Zona>
              </Contenedor>
            </Clasificar>
          </Contenedor>
        </Pantalla>
      </Navegador>
    );
  }
}
