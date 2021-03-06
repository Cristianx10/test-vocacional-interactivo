import React from "react";
import Navegador from "../componentes/Navegador/Navegador";

//import { Pregunta, Opcion, Likert } from "../componentes/Preguntas/Preguntas";
//import { Escribir } from "../componentes/Preguntas/Escribir";
import Contenedor from "../componentes/Contenedor/Contenedor";
/*import { Relacionar, Relacion } from "../actividades/Relacionar/Relacionar";
import { RelojContador } from "../componentes/Navegador/RelojContador";
import { TarjetasR, Carta } from "../actividades/TarjetasR/TarjetasR";
import { TIntroduccion } from "../plantillas/templete-introduccion";
*/
import { D } from "../configuraciones/dato";
import { Rompecabezas } from "../actividades/Rompecabezas/Rompecabezas";
//import { Tuberias, Ficha } from "../actividades/Tuberias/Tuberias";*/
import {
  Clasificar,
  Zona,
  Almacen
} from "../actividades/Clasificar/Clasificar";
import { Cortes } from "../actividades/Cortes/Cortes";
import Pantalla from "../componentes/Pantalla/Pantalla";


export class Linguistica extends React.Component {
  configTablero(propiedades, acciones) {
    //console.log("El tablero");
    //console.log(propiedades, acciones);

    acciones.setStyleA(250, 450, "20px Heebo", 170, 25);
    acciones.setStyleB(450, 450, "20px Heebo", 170, 25);
    acciones.distancia(300);

    //console.log("funcion de tablero", o, tablero);

    acciones.validar(
      "Aciertos",
      function(p, a) {
        if (p.aciertos > 2) {
          a.setValor("arte", 37);
          return true;
        }
      },
      "Mas de un acierto",
      [{ id: "arte", valor: "200" }]
    );

    acciones.validar(
      "Aciertos",
      function(p, a) {
        if (p.aciertos > 0) {
          return true;
        }
      },
      "Si completa todas sin errores",
      [{ id: "arte", valor: "100" }]
    );

    acciones.setIntento((p, a) => {
      // console.log(p, a);
    });

    acciones.setIntentoAcierto(p => {
      console.log("bien");
      //acciones.ocultar();
      acciones.habilitarContinuar();
    });

    acciones.setIntentoFallo(() => {
      //acciones.reset();
      console.log("mal");
    });

    acciones.setValidacion(() => {
      console.log("Gano");
      acciones.habilitarContinuar();
    });
  }

  configTarjetas(propiedades, acciones) {
    console.log(propiedades, acciones);

    acciones.validar(
      "Aciertos",
      (p, a) => {
        return false;
      },
      "Logra todas sin errores",
      [{ valor: 10, id: "area" }]
    );

    acciones.validar(
      "Aciertos",
      (p, a) => {
        return false;
      },
      "Logra todas sin errores 2",
      [{ valor: 100, id: "area" }]
    );

    acciones.setIntento((p, a) => {
      console.log("Mis acciones Intento");
    });
    /*
    acciones.setIntentoAcierto((p, a) => {
      console.log("Mis acciones Acierto");
      console.log(p, a);
    });

    acciones.setIntentoFallo((p, a) => {
      console.log("Mis acciones fallo");
      console.log(p, a);
    });*/
  }

  render() {
    return (
      <Navegador width="100%" fondo="/includes/background/claro.png">


      <Pantalla>
        <Cortes></Cortes>
      </Pantalla>

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
                  <Zona tipo="as" >
                    <img
                      className="ima__opcion"
                      src="/img/arte/fragmentoB.png"
                      alt=""
                    />
                  </Zona>
                  <Zona tipo="as"  categoria="ojos">
                    <img
                      className="ima__opcion"
                      src="/img/arte/fragmentoC.png"
                      alt=""
                    />
                  </Zona>
                  <Zona tipo="asd" >
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

        {/**
        <Pantalla>
          <Tuberias
            url="/img/pizarra/tabla_tutorial.png"
            width="110"
            height="110"
            filas="3"
            columnas="5"
          >
            <Ficha static />
            <Ficha down static inicio />
            <Ficha static />
            <Ficha up left />
            <Ficha up down />
            <Ficha left right/>
            <Ficha up down />
            <Ficha down left />
            <Ficha lider />
            <Ficha down left />
            <Ficha up down />
            <Ficha down right />
            <Ficha static />
            <Ficha up static final />
            <Ficha static />
          </Tuberias>
          <Continuar></Continuar>
        </Pantalla>

        <Pantalla fondo="/includes/background/claro.png">
          <Contenedor width="80%" height="15%">
            <h2 className="text-center">
              <D t>
                1. Las palabras están al azar , por favor enlaza una palabra de
                la izquierda con otra palabra de la derecha según sea su
                antónimo.
              </D>
            </h2>
          </Contenedor>
          <Contenedor height="70%">
            <Relacionar width="650" height="450" config={this.configTablero}>
              <Relacion tipo="Facilidad" categoria="Dificultad" />
              <Relacion tipo="Evaporar" categoria="Solidificar" />
              <Relacion tipo="Implícito" categoria="Explícito" />
              <Relacion tipo="Derrumbar" categoria="Construir" />
              <Relacion tipo="Idéntico" categoria="Distinto" />
              <Relacion tipo="Fallido" categoria="Acertado" />
              <Relacion tipo="Orden" categoria="Caos" />
              <Relacion tipo="Denegar" categoria="Acceder" />
              <Relacion tipo="Sabio" categoria="Ignorante" />
              <Relacion tipo="Flexible" categoria="Rígido" />
            </Relacionar>
          </Contenedor>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <h1>
            <D t>Complete esta actividad</D>
          </h1>
          <Rompecabezas
            arrastrable
            width="113"
            colmnas="4"
            filas="4"
            imagen="/img/diseno/rompecabeza2.png"
            orden={[1, 3, 9, 5, 11, 8, 0, 7, 15, 6, 13, 2, 4, 14, 10, 12]}
            config={(propiedades, acciones) => {
              acciones.validar(
                "Intentos",
                (p, a) => {
                  if (p.tiempo < 5000) {
                    return true;
                  }
                },
                "Completo en menos de 5 segundos",
                []
              );

              acciones.validar(
                "Intentos",
                (p, a) => {
                  console.log(p);
                  if (p.tiempo < 10000) {
                    return true;
                  }
                },
                "Completo en menos de 5 segundos",
                [{ id: "Area", valor: 100 }]
              );

              acciones.setValidacion(() => {
                alert("Felicitaciones Ganaste");
              });

              acciones.setIntento((p, a) => {
                // console.log("Sigue intentando: ", p);
              });
            }}
          />
          <br></br>
          <Continuar></Continuar>
        </Pantalla>


        <Pantalla>
          <TarjetasR config={this.configTarjetas}>
            <Carta img="/img/emparejados/card-1.png" posA="0" posB="2"></Carta>
            <Carta img="/img/emparejados/card-2.png" posA="4" posB="5"></Carta>
            <Carta img="/img/emparejados/card-3.png" posA="1" posB="3"></Carta>
          </TarjetasR>
          <Continuar height="15%" align="center"></Continuar>
        </Pantalla>

        <Pantalla fondo="/includes/background/claro.png">
          <Contenedor width="80%" height="15%">
            <h2 className="text-center">
              <D t>
                1. Las palabras están al azar , por favor enlaza una palabra de
                la izquierda con otra palabra de la derecha según sea su
                antónimo.
              </D>
            </h2>
          </Contenedor>
          <Contenedor height="70%">
            <Relacionar width="650" height="450" config={this.configTablero}>
              <Relacion tipo="Facilidad" categoria="Dificultad" />
              <Relacion tipo="Evaporar" categoria="Solidificar" />
              <Relacion tipo="Implícito" categoria="Explícito" />
              <Relacion tipo="Derrumbar" categoria="Construir" />
              <Relacion tipo="Idéntico" categoria="Distinto" />
              <Relacion tipo="Fallido" categoria="Acertado" />
              <Relacion tipo="Orden" categoria="Caos" />
              <Relacion tipo="Denegar" categoria="Acceder" />
              <Relacion tipo="Sabio" categoria="Ignorante" />
              <Relacion tipo="Flexible" categoria="Rígido" />
            </Relacionar>
          </Contenedor>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <TarjetasR config={this.configTarjetas}>
            <Carta img="/img/emparejados/card-1.png" posA="0" posB="2"></Carta>
            <Carta img="/img/emparejados/card-2.png" posA="4" posB="5"></Carta>
            <Carta img="/img/emparejados/card-3.png" posA="1" posB="3"></Carta>
          </TarjetasR>
          <Continuar></Continuar>
        </Pantalla>

        {/** 
        <Pantalla>
          <TarjetasR config={this.configTarjetas}>
            <Carta img="/img/emparejados/card-1.png" posA="0" posB="2"></Carta>
            <Carta img="/img/emparejados/card-2.png" posA="4" posB="5"></Carta>
            <Carta img="/img/emparejados/card-3.png" posA="1" posB="3"></Carta>
          </TarjetasR>
        </Pantalla>

        <Pantalla fondo="/includes/background/claro.png">
          <Contenedor width="80%" height="15%">
            <h2 className="text-center">
              <D t>
                1. Las palabras están al azar , por favor enlaza una palabra de
                la izquierda con otra palabra de la derecha según sea su
                antónimo.
              </D>
            </h2>
          </Contenedor>
          <Contenedor height="70%">
            <Relacionar width="650" height="450" config={this.configTablero}>
              <Relacion tipo="Facilidad" categoria="Dificultad" />
              <Relacion tipo="Evaporar" categoria="Solidificar" />
              <Relacion tipo="Implícito" categoria="Explícito" />
              <Relacion tipo="Derrumbar" categoria="Construir" />
              <Relacion tipo="Idéntico" categoria="Distinto" />
              <Relacion tipo="Fallido" categoria="Acertado" />
              <Relacion tipo="Orden" categoria="Caos" />
              <Relacion tipo="Denegar" categoria="Acceder" />
              <Relacion tipo="Sabio" categoria="Ignorante" />
              <Relacion tipo="Flexible" categoria="Rígido" />
            </Relacionar>
          </Contenedor>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

      
          

        <Pantalla padding="50px" fondo="/includes/background/claro.png">
          <RelojContador></RelojContador>
          <Pregunta padding="30px">
            <h2>
              <D t>
                En el fragmento hay unos cuantos errores de ortografía,
                encuentralos y corrigelos. Cuando sientas que no hay más
                errores, haz click sobre el botón siguiente.
              </D>
            </h2>
            <br></br>
            <Escribir
              original="El hombre no se convierte en hombre más que en una sociedad y solamente por la acción colectiva de la sociedad entera; no se emansipa del llugo de la naturalesa exterior más que por el trabajo colectivo o social y sin esa emancipación material no puede haber emancipación intelectual y moral para nadie. El hombre aislado no puede tener conciencia de su libertad. Ser libre para el hombre sólo es posible por otro hombre, por todos los hombres que le rodean. La libertad no es, pues, un echo de aislamiento, sino de reflección mutua; no de exclución, sino, al contrario, de aliansa, pues la libertad de todo individuo no es otra cosa que el reflejo de su humanidad o de su derecho humano en la consciencia de todos los hombres libres: sus hermanos, sus iguales. No soy verdaderamente libre más que cuando todos los seres humanos que me rodean, hombres y mujeres, son igualmente libres. La libertad de otro, lejos de ser un límite o la negasión de mi libertad, es, al contrario, su condición necesaria y su confirmación. No me ago verdaderamente libre más que por la libertad de los otros... BAKUNIN, M. La Libertad."
              config={function(p, a) {
                a.validar(
                  "Mayusculas",
                  () => {
                    if (p.error_falto === 0) {
                      return true;
                    }
                  },
                  "No tuvo errores con mayuscula",
                  [
                    { id: "area", valor: 5 },
                    { id: "areaB", valor: 5 },
                    { id: "areC", valor: 5 }
                  ]
                );
              }}
            >
              El hombre no se convierte en hombre más que en una sociedad y
              solamente por la acción colectiva de la sociedad entera; no se
              emansipa del llugo de la naturalesa exterior más que por el
              trabajo colectivo o social y sin esa emancipación material no
              puede haber emancipación intelectual y moral para nadie. El hombre
              aislado no puede tener conciencia de su libertad. Ser libre para
              el hombre sólo es posible por otro hombre, por todos los hombres
              que le rodean. La libertad no es, pues, un echo de aislamiento,
              sino de reflección mutua; no de exclución, sino, al contrario, de
              aliansa, pues la libertad de todo individuo no es otra cosa que el
              reflejo de su humanidad o de su derecho humano en la consciencia
              de todos los hombres libres: sus hermanos, sus iguales. No soy
              verdaderamente libre más que cuando todos los seres humanos que me
              rodean, hombres y mujeres, son igualmente libres. La libertad de
              otro, lejos de ser un límite o la negasión de mi libertad, es, al
              contrario, su condición necesaria y su confirmación. No me ago
              verdaderamente libre más que por la libertad de los otros...
              BAKUNIN, M. La Libertad.
            </Escribir>
          </Pregunta>
          <Continuar>Enviar</Continuar>
        </Pantalla>

      
        <Pantalla>
          <Pregunta orientacion="vertical" height="50%">
            <h1 className="titulo">
              <D t>¿What is your name?</D>
            </h1>
            <Likert min="Lo peor" max="Lo mejor" width="60%">
              <Opcion resultados={[{id:"area", valor:10}]}>
                <D>1</D>
              </Opcion>
              <Opcion>
                <D>2</D>
              </Opcion>
              <Opcion>
                <D>3</D>
              </Opcion>
            </Likert>
          </Pregunta>

          <Continuar disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Pregunta orientacion="horizontal">
            <Contenedor>
              <D t>
                <img src="/img/persona-e1533759204552.jpg" alt="" />
              </D>
              <D t>
                <img src="/img/penguin.jpg" alt="" />
              </D>
            </Contenedor>

            <Contenedor height="30%">
              <h1>
                <D t>¿Cuantos años tienes?</D>
              </h1>

              <Contenedor allType="boton" grid>
                <Opcion resultados={[{ id: "Mate", valor: 10 }]}>
                  <D>10</D>
                  <D>
                    <img src="/img/persona-e1533759204552.jpg" alt="" />
                  </D>
                </Opcion>
                <Opcion resultados={[{ id: "Cien", valor: 10 }]}>
                  <D>30</D>
                </Opcion>
                <Opcion>
                  <D>40</D>
                </Opcion>
                <Opcion>
                  <D>60</D>
                </Opcion>
              </Contenedor>
            </Contenedor>
          </Pregunta>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

        <Pantalla fondo="/includes/background/claro.png">
          <Pregunta orientacion="horizontal">
            <Contenedor height="30%">
              <h1>
                <D t>¿Cuantos años tienes?</D>
              </h1>

              <Contenedor allType="boton" grid>
                <Opcion
                  resultados={[
                    { id: "Mate", valor: 10 },
                    { id: "Matematicas", valor: 10 }
                  ]}
                >
                  <D>
                    Un texto mucho mas largo que otros es un problmea cierto
                  </D>
                </Opcion>
                <Opcion resultados={[{ id: "Cein", valor: 10 }]}>
                  <D>30</D>
                </Opcion>
                <Opcion>
                  <D>40</D>
                </Opcion>
                <Opcion>
                  <D>60</D>
                </Opcion>
              </Contenedor>
            </Contenedor>
          </Pregunta>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

        <Pantalla fondo="/includes/background/oscuro.png">
          <Pregunta orientacion="horizontal">
            <Contenedor>
              <D t>
                <img src="/img/persona-e1533759204552.jpg" alt="" />
              </D>
            </Contenedor>

            <Contenedor height="30%">
              <h1>
                <D t>¿Cuantos años tienes?</D>
              </h1>

              <Contenedor allType="boton" grid>
                <Opcion resultados={[{ id: "Mate", valor: 10 }]}>
                  <D>10</D>
                </Opcion>
                <Opcion resultados={[{ id: "Cien", valor: 10 }]}>
                  <D>30</D>
                </Opcion>
                <Opcion>
                  <D>40</D>
                </Opcion>
                <Opcion>
                  <D>60</D>
                </Opcion>
              </Contenedor>
            </Contenedor>
          </Pregunta>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

        <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
          <h1>Inteligencia Lingüística</h1>
          <p>
            En esta sección de la prueba se evaluará tus conocimientos en el
            área Lingüística.
          </p>
        </TIntroduccion>

        

        <Pantalla>
          <Pregunta orientacion="horizontal">
            <Contenedor>
              <img src="/img/persona-e1533759204552.jpg" alt="" />
            </Contenedor>

            <Contenedor height="30%">
              <h1>
                <D t>¿Cuantos años tienes?</D>
              </h1>
              <Likert>
                <Opcion resultados={[{ id: "a", valor: 10 }]}>
                  <D>10</D>
                </Opcion>
                <Opcion resultados={[{ id: "a", valor: 2 }]}>
                  <D>30</D>
                </Opcion>
                <Opcion>
                  <D>40</D>
                </Opcion>
                <Opcion>
                  <D>60</D>
                </Opcion>
              </Likert>
            </Contenedor>
          </Pregunta>
          <Continuar height="15%" align="center"></Continuar>
        </Pantalla>

        <Pantalla>
          <Pregunta orientacion="horizontal">
            <Contenedor>
              <D t>
                <img src="/img/persona-e1533759204552.jpg" alt="" />
              </D>
            </Contenedor>

            <Contenedor height="30%">
              <h1>
                <D t>¿Cuantos años tienes?</D>
              </h1>
              <Contenedor allType="boton" grid>
                <Opcion resultados={[{ id: "a", valor: 10 }]}>
                  <D>10</D>
                </Opcion>
                <Opcion resultados={[{ id: "a", valor: 2 }]}>
                  <D>30</D>
                </Opcion>
                <Opcion>
                  <D>40</D>
                </Opcion>
                <Opcion>
                  <D>60</D>
                </Opcion>
              </Contenedor>
            </Contenedor>
          </Pregunta>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

        <Pantalla
          time="120"
          padding="200px 250px"
          fondo="/includes/background/oscuro-personajes.png"
        >
          <Contenedor align="left" className="introduccion">
            <h1>Inteligencia Lingüística</h1>
            <p>
              <D>
                En esta sección de la prueba se evaluará tus conocimientos en el
                área Lingüística.
              </D>
            </p>
            <Continuar className="left">Comenzar</Continuar>
          </Contenedor>
        </Pantalla>

        <Pantalla>
          <TarjetasR>
            <Carta img="/img/emparejados/card-1.png" posA="0" posB="2"></Carta>
            <Carta img="/img/emparejados/card-2.png" posA="4" posB="5"></Carta>
            <Carta img="/img/emparejados/card-3.png" posA="1" posB="3"></Carta>
          </TarjetasR>
        </Pantalla>
        <Pantalla>
          <TarjetasR>
            <Carta img="/img/emparejados/card-1.png" posA="0" posB="2"></Carta>
            <Carta img="/img/emparejados/card-2.png" posA="6" posB="4"></Carta>
            <Carta img="/img/emparejados/card-3.png" posA="3" posB="8"></Carta>
            <Carta img="/img/emparejados/card-4.png" posA="7" posB="5"></Carta>
            <Carta img="/img/emparejados/card-5.png" posA="9" posB="1"></Carta>
          </TarjetasR>
        </Pantalla>
        <Pantalla>
          <TarjetasR>
            <Carta img="/img/emparejados/card-1.png" posA="0" posB="2"></Carta>
            <Carta img="/img/emparejados/card-2.png" posA="4" posB="6"></Carta>
            <Carta
              img="/img/emparejados/card-3.png"
              posA="10"
              posB="12"
            ></Carta>
            <Carta img="/img/emparejados/card-4.png" posA="18" posB="1"></Carta>
            <Carta img="/img/emparejados/card-5.png" posA="3" posB="17"></Carta>
            <Carta
              img="/img/emparejados/card-6.png"
              posA="11"
              posB="14"
            ></Carta>
            <Carta
              img="/img/emparejados/card-7.png"
              posA="13"
              posB="19"
            ></Carta>
            <Carta img="/img/emparejados/card-8.png" posA="9" posB="5"></Carta>
            <Carta img="/img/emparejados/card-9.png" posA="7" posB="8"></Carta>
            <Carta
              img="/img/emparejados/card-10.png"
              posA="15"
              posB="16"
            ></Carta>
          </TarjetasR>
        </Pantalla>

        
     
          
          
          */}
      </Navegador>
    );
  }
}
