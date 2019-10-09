import React from "react";
import Navegador, {
  Pantalla,
  Continuar
} from "../componentes/Navegador/Navegador";
import { Pregunta, Opcion, Likert } from "../componentes/Preguntas/Preguntas";
import { Escribir } from "../componentes/Preguntas/Escribir";
import Contenedor from "../componentes/Contenedor/Contenedor";
import { Relacionar, Relacion } from "../actividades/Relacionar/Relacionar";
import { RelojContador } from "../componentes/Navegador/RelojContador";
import { TarjetasR, Carta } from "../actividades/TarjetasR/TarjetasR";
import { TIntroduccion } from "../plantillas/templete-introduccion";
import { D } from "../configuraciones/dato";

export class Linguistica extends React.Component {
  configTablero(o, tablero) {
    tablero.setStyleA(250, 450, "20px Heebo", 170, 25);
    tablero.setStyleB(450, 450, "20px Heebo", 170, 25);
    tablero.distancia(300);

    console.log("funcion de tablero", o, tablero)

    tablero.validar(
      "Aciertos",
      function(p, a) {
        if (p.aciertos > 3) {
          a.setValor("arte", 15);
          return true;
        }
      },
      "Si no termina la prueba",
      [{ id: "arte", valor: "200" }],
      tablero
    );

    tablero.validar(
      "Aciertos",
      function(p, a) {
        if (p.aciertos > 0) {
          a.setValor("arte", 5);

          return true;
        }
      },
      "Si completa todas sin errores",
      [{ id: "arte", valor: "100" }]
    );

    tablero.setIntento((p, a) => {
      // console.log(p, a);
    });

    tablero.setIntentoAcierto(p => {
      console.log("bien");
      //tablero.ocultar();
      o.pantalla.continuar.habilitar();
    });

    tablero.setIntentoFallo(() => {
      //tablero.reset();
      console.log("mal");
    });

    tablero.setValidacion(() => {
      console.log("Gano");
      o.pantalla.continuar.habilitar();
    });
  }

  render() {
    return (
      <Navegador width="100%">
        <Pantalla>
          <Pregunta orientacion="horizontal">

            <Contenedor height="30%">
              <h1>
                <D t>¿Cuantos años tienes?</D>
              </h1>

              <Contenedor allType="boton" grid>
                <Opcion resultados={[{ id: "a", valor: 10 }]}>
                  <D>10</D>
                </Opcion>
                <Opcion resultados={[{ id: "b", valor: 2 }]}>
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
                <Opcion resultados={[{ id: "b", valor: 2 }]}>
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
                <Opcion resultados={[{ id: "a", valor: 10 }]}>
                  <D>10</D>
                  <D>
                    <img src="/img/persona-e1533759204552.jpg" alt="" />
                  </D>
                </Opcion>
                <Opcion resultados={[{ id: "b", valor: 2 }]}>
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
              onFinal={function(p, a) {
                console.log(p, a);
                a.validar(
                  "Mayusculas",
                  () => {
                    if (p.error_falto === 0) {
                      return true;
                    }
                  },
                  "No tuvo errores con mayuscula",
                  [{ id: "area", valor: 5 }]
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
          <Pregunta orientacion="vertical" height="50%">
            <h1 className="titulo">
              <D>¿What is your name?</D>
            </h1>
            <Likert min="Lo peor" max="Lo mejor" width="60%">
              <Opcion>
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

          <Continuar></Continuar>
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
      </Navegador>
    );
  }
}
