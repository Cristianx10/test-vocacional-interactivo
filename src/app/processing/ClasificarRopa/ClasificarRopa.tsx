import React, { Component } from "react";
import Pantalla from "../../componentes/Pantalla/Pantalla";
import Contenedor from "../../componentes/Contenedor/Contenedor";
import Continuar from "../../componentes/Continuar/Continuar";
import RelojContador from "../../componentes/Navegador/RelojContador";
import { IPropClasificar } from '../../actividades/Clasificar/Clasificar';
import { Re } from '../../resultados/resultados';

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
    }, "Escogio cabello correcto", [{ id: Re.diseno, valor: 14 }]);

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

    }, "Escogio ojos correcto", [{ id: Re.diseno, valor: 14 }]);

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

    }, "Escogio boca correcto", [{ id: Re.diseno, valor: 14 }]);

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

    }, "Escogio moño correcto", [{ id: Re.diseno, valor: 14 }]);

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

    }, "Escogio carpeta correcto", [{ id: Re.diseno, valor: 14 }]);

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

    }, "Escogio pistola correcto", [{ id: Re.diseno, valor: 14 }]);

    acciones.validar("tipografia", (p: IPropClasificar) => {
      let value = false
      p.informacion.forEach(info => {
        if (info.categoria == "tipografia") {
          info.almacenados.forEach(a => {
            if (a == "tipografia") {
              value = true;
            }
          });
        }
      });
      return value;

    }, "Escogio pistola correcto", [{ id: Re.diseno, valor: 14 }]);




  }

  render() {
    return (
      <>
        <Pantalla fondo="#020963">
          <Contenedor height="100%" width="100%">
            <img style={{ height: "80%" }} src="/img/2019/diseno/partes/instrucciones-1.png"></img>
            <Continuar></Continuar>
          </Contenedor>
        </Pantalla>

        <Pantalla fondo="#020963">
          <Contenedor height="100%" width="100%">
            <img style={{ height: "80%" }} src="/img/2019/diseno/partes/instrucciones-2.png"></img>
            <Continuar></Continuar>
          </Contenedor>
        </Pantalla>

        <Pantalla time="15" fondo="#b2c1e1">
          <RelojContador></RelojContador>

          <div className="tituloCompleta">
            <h2>¡Presta atención a todos los detalles!</h2>
          </div>

          <div id="completa" className="completaImg">
            <img src="/img/2019/diseno/partes/completa.png" alt="" />
          </div>
        </Pantalla>

        <Pantalla time="50">

          <Contenedor height="100%" orientacion="vertical">
            <RelojContador pos="25px -22px"></RelojContador>
            <h1>¿Erez capaz de recordar todo?</h1>

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

            

          </Contenedor>
          <Contenedor on width="100%" height="100%">
            <Clasificar UID="A1" width="100%" height="100%" config={this.configClasificiar.bind(this)}>

              <Almacen tipo="cabello" pos="225px 60px" id="cabello" height="90px" width="150px" style={{ background: "#add8e652" }} reset={(e: HTMLElement) => { e.style.background = "" }} />

              <Almacen tipo="ojos" id="ojos" pos="325px 60px" width="150px" height="40px" style={{ background: "#add8e652", display: "flex", justifyContent: "center" }} reset={(e: HTMLElement) => {
                e.style.background = "";
              }} />

              <Almacen tipo="boca" id="boca" pos="370px 114px" height="30px" width="80px" />

              <Almacen style={{ display: "flex", justifyContent: "center", alignItem: "center" }} tipo="moño" id="moño" pos="416px 95px" height="50px" width="80px" />

              <Almacen tipo="carpeta" id="carpeta" pos="115px 430px" height="40px" width="80px" />

              <Almacen tipo="pistola" id="pistola" pos="410px 270px" height="80px" width="150px" />

              <Almacen tipo="tipografia" id="tipografia" pos="300px 270px" height="110px" width="240px" />

              <Almacen capacidad={4} tipo="moño" id="contenedorMoño" pos="150px 890px" height="200px" width="60px">
                <Zona style={{ position: "", display: "flex", justifyContent: "center", alignItems: "flex-start" }} tipo="moño" categoria="moñoNo1" width="90px" height="50px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/mono1.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "", display: "flex", justifyContent: "center", alignItems: "flex-start" }} tipo="moño" categoria="moñoNo2" width="90px" height="50px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/mono2.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "", display: "flex", justifyContent: "center", alignItems: "flex-start" }} tipo="moño" categoria="moño" width="90px" height="50px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/mono3.png"
                  alt=""
                />
                </Zona>
              </Almacen>

              <Almacen capacidad={4} tipo="boca" id="contenedorBoca" pos="150px 810px" height="200px" width="60px">
                <Zona style={{ position: "", display: "flex", alignItems: "center" }} tipo="boca" categoria="bocaNo1" width="90px" height="40px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/boca1.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "", display: "flex", alignItems: "center" }} tipo="boca" categoria="bocaNo2" width="90px" height="40px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/boca2.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "", display: "flex", alignItems: "center" }} tipo="boca" categoria="boca" width="90px" height="40px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/boca3.png"
                  alt=""
                />
                </Zona>
              </Almacen>

              <Almacen capacidad={4} tipo="carpeta" id="contenedorCarpeta" pos="150px 960px" height="200px" width="100px">
                <Zona style={{ position: "" }} tipo="carpeta" categoria="carpetaNo1" width="90px" height="50px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/carpeta1.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "" }} tipo="carpeta" categoria="carpetaNo2" width="90px" height="50px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/carpeta2.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "" }} tipo="carpeta" categoria="carpetaNo3" width="90px" height="50px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/carpeta3.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "" }} tipo="carpeta" categoria="carpeta" width="90px" height="50px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/carpeta4.png"
                  alt=""
                />
                </Zona>
              </Almacen>

              <Almacen capacidad={3} tipo="ojos" id="contenedorOjos" pos="150px 700px" height="150px" width="100px">
                <Zona style={{ position: "" }} tipo="ojos" categoria="ojoNo1" width="90px" height="50px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/ojos1.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "" }} tipo="ojos" categoria="ojo" width="90px" height="50px"><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/ojos2.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "" }} tipo="ojos" categoria="ojoNo3" width="90px" height="50px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/ojos3.png"
                  alt=""
                />
                </Zona>
              </Almacen>

              <Almacen capacidad={2} tipo="pistola" id="contenedorPistola" pos="150px 1080px" height="150px" width="120px">
                <Zona style={{ position: "", display: "flex", alignItems: "center" }} tipo="pistola" categoria="pistola" width="90px" height="70px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/pistola1.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "", display: "flex", alignItems: "center" }} tipo="pistola" categoria="pistolaNo2" width="90px" height="70px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/pistola2.png"
                  alt=""
                />
                </Zona>
              </Almacen>

              <Almacen capacidad={3} tipo="tipografia" id="contenedorTipografia" pos="330px 700px" height="250px" width="180px">

                <Zona style={{ position: "" }} tipo="tipografia" categoria="tipografia" width="300px" height="50px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/TIPO1.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "" }} tipo="tipografia" categoria="tipografiaNo2" width="300px" height="50px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/TIPO2.png"
                  alt=""
                />
                </Zona>
                <Zona style={{ position: "" }} tipo="tipografia" categoria="tipografiaNo3" width="300px" height="50px" ><img
                  className="ima__opcion"
                  src="/img/2019/diseno/partes/TIPO3.png"
                  alt=""
                />
                </Zona>
              </Almacen>

              <Almacen capacidad={3} tipo="cabello" id="contenedorCabellos" pos="149px 536px" height="425px" width="150px">

                <Zona style={{ position: "" }} tipo="cabello" categoria="cabelloNo" width="146px" height="120px" reset={(e: HTMLElement) => {
                  e.style.position = "relative";
                  e.style.top = "10px";
                  e.style.left = "5px";
                }} >
                  <img className="ima__opcion" src="/img/2019/diseno/partes/cabello1.png" alt="" />
                </Zona>

                <Zona style={{ position: "" }} tipo="cabello" categoria="cabello" width="146px" height="120px" reset={(e: HTMLElement) => {
                  e.style.position = "relative";
                  e.style.top = "20px";
                  e.style.left = "5px";
                }}>
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/cabello2.png"
                    alt=""
                  />
                </Zona>
                <Zona style={{ position: "" }} tipo="cabello" categoria="cabelloNo" width="146px" height="120px" reset={(e: HTMLElement) => {
                  e.style.position = "relative";
                  e.style.top = "30px";
                }}>
                  <img
                    className="ima__opcion"
                    src="/img/2019/diseno/partes/cabello3.png"
                    alt=""
                  />
                </Zona>
              </Almacen>

            </Clasificar>
            <Continuar pos="650px 300px" style={{left:"1200"}}/>
          </Contenedor>
        </Pantalla>
      </>
    );
  }
}

export default ClasificarRopa;