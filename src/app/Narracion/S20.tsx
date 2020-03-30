import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Processing from '../componentes/Processing/Processing';
import Gusanito from '../processing/Gusanito/Gusanito';
import { Re } from '../resultados/resultados';
import Secuencia from "../actividades/Secuencia/Secuencia";
import { TIntroduccion } from "../plantillas/templete-introduccion";


const S20 = () => {

    const configGusanito = (props: any, action: any) => {

        action.evaluar("Puntaje", (p: any, a: any) => {
            a.setValor(Re.psicologia, p.puntaje);
            return true;
        }, "Puntuacion del juego", [{ id: Re.psicologia, valor: 100 }]);

    }

    const configScuencia = (p: any, a: any) => {
        a.validar("aciertos", () => {
            if (p.aciertos >= p.cartas) {
                return true
            }
        }, "Acerto en todas los compuestos", [
            { id: Re.ingenieria, valor: 35 }
        ]);
    }


    return <Navegador>

        <Pantalla>
            <Processing config={configGusanito} UID="2020E1">
                <Gusanito />
            </Processing>
        </Pantalla>


        <TIntroduccion fondo="/includes/background/oscuro-personajes.png">
            <h1>Secuencias</h1>
            <p>Completa la secuencia en el orden que se presenta. Primero observar y luego haz click sobre el componente en el orden respectivo.</p>
        </TIntroduccion>


        <Pantalla>
            <Secuencia
                UID="2020D1"
                config={configScuencia}
                cartas={
                    [
                        { url: "/img/ciencias/elementos/calcio.png", time: 5000 },
                        { url: "/img/ciencias/elementos/sodio.png", time: 5000 },
                        { url: "/img/ciencias/elementos/potasio.png", time: 5000 }
                    ]
                } />
        </Pantalla>

        <Pantalla>
            <Secuencia
                UID="2020D2"
                config={configScuencia}
                cartas={
                    [
                        { url: "/img/ciencias/elementos/calcio.png", time: 3000 },
                        { url: "/img/ciencias/elementos/sodio.png", time: 3000 },
                        { url: "/img/ciencias/elementos/potasio.png", time: 3000 },
                        { url: "/img/ciencias/elementos/carbon.png", time: 4000 },
                        { url: "/img/ciencias/elementos/oro.png", time: 4000 }
                    ]
                } />
        </Pantalla>

        <Pantalla>
            <Secuencia
                UID="2020D3"
                config={configScuencia}
                cartas={
                    [
                        { url: "/img/ciencias/elementos/calcio.png", time: 2000 },
                        { url: "/img/ciencias/elementos/sodio.png", time: 2000 },
                        { url: "/img/ciencias/elementos/potasio.png", time: 2000 },
                        { url: "/img/ciencias/elementos/carbon.png", time: 3000 },
                        { url: "/img/ciencias/elementos/oro.png", time: 3000 },
                        { url: "/img/ciencias/elementos/fosforo.png", time: 3000 },
                        { url: "/img/ciencias/elementos/radio.png", time: 3000 }
                    ]
                } />
        </Pantalla>







        {/*
            <Processing config={configGusanito} UID="2020-1">
                <Gusanito />
            </Processing>
            */}

    </Navegador>
}

export default S20;