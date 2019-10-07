import React from "react";
import Navegador, {
  Pantalla,
  Continuar
} from "../componentes/Navegador/Navegador";
import { Pregunta, Opcion, Likert } from "../componentes/Preguntas/Preguntas";
import { Escribir } from "../componentes/Preguntas/Escribir";
import Contenedor from "../componentes/Contenedor/Contenedor";
import {
  Relacionar,
  Relacion
} from "../actividades/Relacionar/Relacionar";
import { RelojContador } from "../componentes/Navegador/RelojContador";
import { TarjetasR, Carta } from "../actividades/TarjetasR/TarjetasR";

export class Linguistica extends React.Component {
  render() {
    return (
      <Navegador width="100%" image="/includes/background/claro.png">

        <Pantalla>
          <TarjetasR>
            <Carta> </Carta>
          </TarjetasR>
        </Pantalla>

        <Pantalla padding="50px">
          <RelojContador></RelojContador>
          <Pregunta padding="30px">
            <h2>
              En el fragmento hay unos cuantos errores de ortografía,
              encuentralos y corrigelos. Cuando sientas que no hay más errores,
              haz click sobre el botón siguiente.
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
              <h1>¿Cuantos años tienes?</h1>
              <Likert>
                <Opcion resultados={[{ id: "a", valor: 10 }]}>10</Opcion>
                <Opcion resultados={[{ id: "a", valor: 2 }]}>30</Opcion>
                <Opcion>40</Opcion>
                <Opcion>60</Opcion>
              </Likert>
            </Contenedor>
          </Pregunta>
          <Continuar height="15%" align="center"></Continuar>
        </Pantalla>

        <Pantalla>
          <Pregunta orientacion="horizontal">
            <Contenedor>
              <img src="/img/persona-e1533759204552.jpg" alt="" />
            </Contenedor>

            <Contenedor height="30%">
              <h1>¿Cuantos años tienes?</h1>
              <Contenedor allType="boton" grid>
                <Opcion resultados={[{ id: "a", valor: 10 }]}>10</Opcion>
                <Opcion resultados={[{ id: "a", valor: 2 }]}>30</Opcion>
                <Opcion>40</Opcion>
                <Opcion>60</Opcion>
              </Contenedor>
            </Contenedor>
          </Pregunta>
          <Continuar height="15%" align="center" disabled></Continuar>
        </Pantalla>

        <Pantalla fondo="/includes/background/claro.png">
          <Contenedor width="80%" height="15%">
            <h2 className="text-center">
              1. Las palabras están al azar , por favor enlaza una palabra de la
              izquierda con otra palabra de la derecha según sea su antónimo.
            </h2>
          </Contenedor>
          <Contenedor height="70%">
            <Relacionar
              width="650"
              height="450"
              config={function(o, tablero) {
                tablero.setStyleA(250, 450, "20px Heebo", 170, 25);
                tablero.setStyleB(450, 450, "20px Heebo", 170, 25);
                tablero.distancia(300);

                tablero.validar(
                  "Aciertos",
                  function(p, a) {
                    if (p.aciertos > 3) {
                      console.log(a);
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
                      console.log(a);
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
              }}
            >
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

        <Pantalla
          time="120"
          padding="200px 250px"
          fondo="/includes/background/oscuro-personajes.png"
        >
          <Contenedor align="left" className="introduccion">
            <h1>Inteligencia Lingüística</h1>
            <p>
              En esta sección de la prueba se evaluará tus conocimientos en el
              área Lingüística.
            </p>
            <Continuar className="left">Comenzar</Continuar>
          </Contenedor>
        </Pantalla>

        <Pantalla>
          <Pregunta orientacion="vertical" height="50%">
            <h1 className="titulo">¿What is your name?</h1>
            <Likert min="Lo peor" max="Lo mejor" width="60%">
              <Opcion>1</Opcion>
              <Opcion>2</Opcion>
              <Opcion>3</Opcion>
            </Likert>
          </Pregunta>

          <Continuar></Continuar>
        </Pantalla>
      </Navegador>
    );
  }
}
