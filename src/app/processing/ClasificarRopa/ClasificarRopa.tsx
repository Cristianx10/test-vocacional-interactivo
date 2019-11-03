import React, { Component } from "react";
import Navegador from "../../componentes/Navegador/Navegador";
import Pantalla from "../../componentes/Pantalla/Pantalla";
import Contenedor from "../../componentes/Contenedor/Contenedor";
import Continuar from "../../componentes/Continuar/Continuar";
import RelojContador from "../../componentes/Navegador/RelojContador";
import { IPropClasificar } from '../../actividades/Clasificar/Clasificar';
import Cortes from '../../actividades/Cortes/Cortes';
import Clasificar, {
  Almacen,
  Zona, IActionClasificar
} from "../../actividades/Clasificar/Clasificar";


export class ClasificarRopa extends Component {
  configClasificiar(propiedades: IPropClasificar, acciones: IActionClasificar) {

    acciones.setMultiple(true)

    acciones.validar("cabello", (p: IPropClasificar) => {
      let value = false
      p.informacion.forEach(info => {
        if (info.categoria == "cabello") {
          info.almacenados.forEach(a => {
            if (a == "cabello") {
              value = true;
            }
          });
        }

      });
      return value;
    }, "Escogio cabello correcto", []);

    acciones.validar("ojos", (p: IPropClasificar) => {
      let value = false
      p.informacion.forEach(info => {
        if (info.categoria == "ojos") {
          info.almacenados.forEach(a => {
            if (a == "ojos") {
              value = true;
            }
          });
        }
      });
      return value;

    }, "Escogio ojos correcto", []);

    acciones.validar("boca", (p: IPropClasificar) => {
      let value = false
      p.informacion.forEach(info => {
        if (info.categoria == "boca") {
          info.almacenados.forEach(a => {
            if (a == "boca") {
              value = true;
            }
          });
        }
      });
      return value;

    }, "Escogio boca correcto", []);

    acciones.validar("moño", (p: IPropClasificar) => {
      let value = false
      p.informacion.forEach(info => {
        if (info.categoria == "moño") {
          info.almacenados.forEach(a => {
            if (a == "moño") {
              value = true;
            }
          });
        }
      });
      return value;

    }, "Escogio cabello correcto", []);

    acciones.validar("carpeta", (p: IPropClasificar) => {
      let value = false
      p.informacion.forEach(info => {
        if (info.categoria == "carpeta") {
          info.almacenados.forEach(a => {
            if (a == "carpeta") {
              value = true;
            }
          });
        }
      });
      return value;

    }, "Escogio carpeta correcto", []);

    acciones.validar("pistola", (p: IPropClasificar) => {
      let value = false
      p.informacion.forEach(info => {
        if (info.categoria == "pistola") {
          info.almacenados.forEach(a => {
            if (a == "pistola") {
              value = true;
            }
          });
        }
      });
      return value;

    }, "Escogio pistola correcto", []);




  }

  render() {
    return (
      <Navegador>

        <Pantalla>
          <Cortes fondo="/img/cortes/CuerpoB.png" />
        </Pantalla>

        <Pantalla fondo="lightblue">
          <Contenedor height="80%"></Contenedor>
          <Contenedor height="20%" width="100%">
            <Continuar></Continuar>
          </Contenedor>
        </Pantalla>

        <Pantalla time="15" fondo="#B2C1E1">
          <RelojContador></RelojContador>

          <div className="tituloCompleta">
            <h2>¡Presta atención a todos los detalles!</h2>
          </div>

          <div id="completa" className="completaImg">
            <img src="/img/2019/diseno/partes/completa.png" alt="" />
          </div>
        </Pantalla>

        <Pantalla>
          <Contenedor height="100%" orientacion="vertical">
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
          </Contenedor>
          <Contenedor on width="100%" height="100%">
            <Clasificar UID="c200" width="100%" height="100%" config={this.configClasificiar.bind(this)}>

              <Almacen tipo="cabello" pos="215px 60px" id="cabello" height="90px" width="150px" style={{ background: "#add8e652" }} reset={(e: HTMLElement) => { e.style.background = "" }} />

              <Almacen tipo="ojos" id="ojos" pos="300px 60px" width="150px" height="40px" style={{ background: "#add8e652", display: "flex", justifyContent: "center" }} reset={(e: HTMLElement) => {
                e.style.background = "";
              }} />

              <Almacen tipo="boca" id="bocas" pos="350px 118px" height="20px" width="80px" />

              <Almacen tipo="moño" id="moños" pos="385px 116px" height="20px" width="80px" />

              <Almacen tipo="carpeta" id="carpeta" pos="100px 430px" height="40px" width="80px" />

              <Almacen tipo="pistola" id="pistola" pos="410px 270px" height="40px" width="80px" />

              <Zona tipo="cabello" categoria="cabelloNo" width="146px" pos="150px 560px" >
                <img className="ima__opcion" src="/img/2019/diseno/partes/cabello1.png" alt="" />
              </Zona>

              <Zona tipo="cabello" categoria="cabello" width="146px" pos="300px 560px" reset={(e: HTMLElement) => {
                e.style.position = "relative";
                e.style.top = "10px";
                e.style.left = "5px";
              }}>
                <img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/cabello2.png"
                  alt=""
                />
              </Zona>
              <Zona tipo="cabello" categoria="cabelloNo" width="146px" pos="450px 560px" reset={(e: HTMLElement) => {
                e.style.position = "relative";
                e.style.top = "25px";
              }}>
                <img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/cabello3.png"
                  alt=""
                />
              </Zona>
              <Zona tipo="ojos" categoria="ojoNo1" width="90px" height="30px" pos="150px 720px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/ojos1.png"
                alt=""
              />
              </Zona>
              <Zona tipo="ojos" categoria="ojo" width="90px" height="30px" pos="200px 720px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/ojos2.png"
                alt=""
              />
              </Zona>
              <Zona tipo="ojos" categoria="ojoNo3" width="90px" height="30px" pos="250px 720px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/ojos3.png"
                alt=""
              />
              </Zona>
              <Zona tipo="boca" categoria="bocaNo1" width="90px" height="20px" pos="150px 820px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/boca1.png"
                alt=""
              />
              </Zona>
              <Zona tipo="boca" categoria="bocaNo2" width="90px" height="20px" pos="200px 820px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/boca2.png"
                alt=""
              />
              </Zona>
              <Zona tipo="boca" categoria="boca" width="90px" height="20px" pos="250px 820px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/boca3.png"
                alt=""
              />
              </Zona>
              <Zona tipo="moño" categoria="moño" width="90px" height="30px" pos="150px 900px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/mono1.png"
                alt=""
              />
              </Zona>
              <Zona tipo="moño" categoria="moñoNo2" width="90px" height="30px" pos="200px 900px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/mono2.png"
                alt=""
              />
              </Zona>
              <Zona tipo="moño" categoria="moñoNo3" width="90px" height="30px" pos="250px 900px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/mono3.png"
                alt=""
              />
              </Zona>
              <Zona tipo="carpeta" categoria="carpetaNo1" width="90px" height="30px" pos="150px 980px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/carpeta1.png"
                alt=""
              />
              </Zona>
              <Zona tipo="carpeta" categoria="carpetaNo2" width="90px" height="30px" pos="200px 980px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/carpeta2.png"
                alt=""
              />
              </Zona>
              <Zona tipo="carpeta" categoria="carpetaNo3" width="90px" height="30px" pos="250px 980px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/carpeta3.png"
                alt=""
              />
              </Zona>
              <Zona tipo="carpeta" categoria="carpeta" width="90px" height="30px" pos="300px 980px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/carpeta4.png"
                alt=""
              />
              </Zona>
              <Zona tipo="pistola" categoria="pistola" width="90px" height="30px" pos="150px 1080px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/pistola1.png"
                alt=""
              />
              </Zona>
              <Zona tipo="pistola" categoria="pistolaNo2" width="90px" height="30px" pos="200px 1080px"><img
                className="ima__opcion"
                src="/img/2019/diseno/partes/pistola2.png"
                alt=""
              />
              </Zona>

            </Clasificar>
          </Contenedor>
        </Pantalla>
      </Navegador >
    );
  }
}


export default ClasificarRopa;