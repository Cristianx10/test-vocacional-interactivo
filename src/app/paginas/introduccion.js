import React from "react";
import Navegador, {
  Pantalla,
  Continuar
} from "../componentes/Navegador/Navegador";
import { Pregunta, Opcion } from "../componentes/Preguntas/Preguntas";
import Contenedor from "../componentes/Contenedor/Contenedor";

import "./introduccion.css";
import {
  Tpreguntacajonbotones,
  TCTitular,
  TCTitular2
} from "../componentes/Template/templete-preguntas";

export class Introduccion extends React.Component {
  render() {
    return (
      <Navegador image="/includes/background/oscuro-personajes.png">
        
        <Pantalla padding="200px 250px">
          <Contenedor align="left" className="introduccion">
            <h1>¡Rompamos el hielo!</h1>
            <p>Queremos conocerte mejor. Sigue las instrucciones usando el mouse y el teclado.</p>
            <Continuar className="left"></Continuar>
          </Contenedor>
        </Pantalla>

        <Pantalla fondo="/includes/background/claro.png">
          <Contenedor orientacion="vertical" padding="100px">
            <Pregunta orientacion="horizontal left" height="90%">
              <h2 className="titulo">
                1. Lee todas las instrucciones antes de realizar algún
                movimiento.
              </h2>
            </Pregunta>
            <Pregunta orientacion="horizontal left">
              <Contenedor width="60%" align="left">
                <h2 className="titulo">2. 2 y 2 son 4. 4 y 2 son 6. 6 y 2 son 8 y 8...?</h2>
              </Contenedor>
              <Contenedor
                width="40%"
                allType="circulo"
                orientacion="horizontal"
              >
                <Opcion>8</Opcion>
                <Opcion>2</Opcion>
                <Opcion>16</Opcion>
                <Opcion>4</Opcion>
              </Contenedor>
            </Pregunta>
            <Pregunta orientacion="horizontal left">
              <Contenedor width="60%" align="left">
                <h2 className="titulo">3. ¿Cual de estos es un colo frio?</h2>
              </Contenedor>
              <Contenedor
                width="40%"
                allType="circulo"
                orientacion="horizontal"
              >
                <Opcion>Verde</Opcion>
                <Opcion>Negro</Opcion>
                <Opcion>Piel</Opcion>
                <Opcion>Violeta</Opcion>
              </Contenedor>
            </Pregunta>
            <Pregunta orientacion="horizontal left">
              <Contenedor width="60%" align="left">
                <h2 className="titulo">4. ¿Cuál de los siguientes números no es par?</h2>
              </Contenedor>
              <Contenedor
                width="40%"
                allType="circulo"
                orientacion="horizontal"
              >
                <Opcion>2</Opcion>
                <Opcion>4</Opcion>
                <Opcion>6</Opcion>
                <Opcion>11</Opcion>
              </Contenedor>
            </Pregunta>
            <Pregunta orientacion="horizontal left">
              <Contenedor width="60%" align="left">
                <h2 className="titulo">5. ¿Cuál de los siguientes numeros es múltiplo de 5?</h2>
              </Contenedor>
              <Contenedor
                width="40%"
                allType="circulo"
                orientacion="horizontal"
              >
                <Opcion>54</Opcion>
                <Opcion>62</Opcion>
                <Opcion>4</Opcion>
                <Opcion>42</Opcion>
              </Contenedor>
            </Pregunta>
            <Pregunta orientacion="horizontal left">
              <Contenedor width="60%" align="left">
                <h2 className="titulo">6. Selecciona el símbolo químico del AGUA</h2>
              </Contenedor>
              <Contenedor
                width="40%"
                allType="circulo"
                orientacion="horizontal"
              >
                <Opcion>8</Opcion>
                <Opcion>2</Opcion>
                <Opcion>16</Opcion>
                <Opcion>4</Opcion>
              </Contenedor>
            </Pregunta>

            <Pregunta orientacion="horizontal left">
              <Contenedor align="left">
                <h2 className="titulo">
                  7. Y ahora que terminaste de leer, debes ignorar las
                  instrucciones anteriores y presionar enviar.
                </h2>
              </Contenedor>
            </Pregunta>
          </Contenedor>

          <Continuar height="10%">Enviar</Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura1.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué técnica es utilizada en esta obra?</h2>
            </TCTitular2>
            <Opcion>Pastel</Opcion>
            <Opcion resultados={[{ id: "Arte", valor: 20 }]}>Acuarela</Opcion>
            <Opcion>Temperatura</Opcion>
            <Opcion>Mixto</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura1.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué sentimiento te genera el observar esta obra?</h2>
            </TCTitular2>
            <Opcion>Tristeza</Opcion>
            <Opcion>Felicidad</Opcion>
            <Opcion>Desesperacion</Opcion>
            <Opcion>Tranquilidad</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura2.png" alt=""></img>
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué técnica es utilizada en esta obra?</h2>
            </TCTitular2>
            <Opcion>Vinilo</Opcion>
            <Opcion>Pastel</Opcion>
            <Opcion resultados={[{ id: "Arte", valor: 20 }]}>Oleo</Opcion>
            <Opcion>Acuarela</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura2.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué sentimiento te genera el observar esta obra?</h2>
            </TCTitular2>
            <Opcion>Tranquilidad</Opcion>
            <Opcion>Felicidad</Opcion>
            <Opcion>Desesperacion</Opcion>
            <Opcion>Nostalgia</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura3.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué técnica es utilizada en esta obra?</h2>
            </TCTitular2>
            <Opcion>Carboncillo</Opcion>
            <Opcion>Mixta</Opcion>
            <Opcion resultados={[{ id: "Arte", valor: 20 }]}>Pastel</Opcion>
            <Opcion>Óleo</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura3.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué sentimiento te genera el observar esta obra?</h2>
            </TCTitular2>
            <Opcion>Desolación</Opcion>
            <Opcion>Esperanza</Opcion>
            <Opcion>Trizteza</Opcion>
            <Opcion>Felicidad</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura4.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué técnica es utilizada en esta obra?</h2>
            </TCTitular2>
            <Opcion>Carboncillo</Opcion>
            <Opcion>Óleo</Opcion>
            <Opcion>Acrilico</Opcion>
            <Opcion resultados={[{ id: "Arte", valor: 20 }]}>Tempera</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura4.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué sentimiento te genera el observar esta obra?</h2>
            </TCTitular2>
            <Opcion>Felicidad</Opcion>
            <Opcion>Esperanza</Opcion>
            <Opcion>Trizteza</Opcion>
            <Opcion>Desolación</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura5.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué técnica es utilizada en esta obra?</h2>
            </TCTitular2>
            <Opcion resultados={[{ id: "Arte", valor: 20 }]}>Mixta</Opcion>
            <Opcion>Tempera</Opcion>
            <Opcion>Vinilo</Opcion>
            <Opcion>Pastel</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>

        <Pantalla>
          <Tpreguntacajonbotones>
            <TCTitular>
              <img className="imagen" src="/img/arte/pintura5.png" alt="" />
            </TCTitular>
            <TCTitular2>
              <h2 className="titulo">¿Qué sentimiento te genera el observar esta obra?</h2>
            </TCTitular2>
            <Opcion>Felicidad</Opcion>
            <Opcion>Esperanza</Opcion>
            <Opcion>Trizteza</Opcion>
            <Opcion>Desolación</Opcion>
          </Tpreguntacajonbotones>
          <Continuar height="70px" disabled></Continuar>
        </Pantalla>
      </Navegador>
    );
  }
}
