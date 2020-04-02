import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Processing from '../componentes/Processing/Processing';
import Gusanito from '../processing/Gusanito/Gusanito';
import { Re } from '../resultados/resultados';
import Secuencia from "../actividades/Secuencia/Secuencia";
import { TIntroduccion } from "../plantillas/templete-introduccion";
import Bomba from "../actividades/Bomba/Bomba";
import RelojContador from '../componentes/Navegador/RelojContador';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import Laberinto from "../actividades/Laberinto/Laberinto";


const S20 = () => {

    const configGusanito = (props: any, action: any) => {

        action.evaluar("Puntaje", (p: any, a: any) => {
            a.setValor(Re.psicologia, p.puntaje);
            return true;
        }, "Puntuacion del juego", [{ id: Re.psicologia, valor: 200 }]);

    }

    const configScuencia = (p: any, a: any) => {
        a.validar("aciertos", () => {
            if (p.aciertos >= p.cartas) {
                return true
            }
        }, "Acertó en todas los compuestos", [
            { id: Re.ciencias, valor: 33 }
        ]);

        a.validar("aciertos", () => {
            if (p.aciertos >= (p.cartas / 2) && p.aciertos < p.cartas) {
                return true;
            }
        }, "Acertó a la mitad de los compuestos", [
            { id: Re.ciencias, valor: 10 }
        ]);
    }


    return <Navegador>

        <Pantalla>
            <Processing config={(props: any, action: any) => {

                action.evaluar("Puntaje", (p: any, a: any) => {
                    a.setValor(Re.psicologia, p.puntaje);
                    return true;
                }, "Puntuacion del juego", [{ id: Re.psicologia, valor: 200 }]);

            }} UID="2020E1">
                <Gusanito />
            </Processing>
        </Pantalla>


        <Pantalla>
            <Laberinto UID="2020N1" config={(props: any, action: any) => {
                console.log(props, action)

                action.validar("Una vida", (p: any, a: any) => {
                    if (p.vidas == 1 && p.completo == true) { return true }
                }, "Gano sin fallos", [{ id: Re.medicina, valor: 20 }])

                action.validar("Dos vidas", (p: any, a: any) => {
                    if (p.vidas == 2 && p.completo == true) { return true }
                }, "Gano con 1 fallos", [{ id: Re.medicina, valor: 40 }])

                action.validar("Tres vidas", (p: any, a: any) => {
                    if (p.vidas == 3 && p.completo == true) { return true }
                }, "Gano con 2 fallos", [{ id: Re.medicina, valor: 100 }])

            }} />
        </Pantalla>

        <Pantalla time="20">
            <Bomba UID="2020M1" config={(props: any, action: any) => {
                console.log(props, action)

                action.validar("Gano", (p: any, a: any) => {
                    if (p.aciertos >= 5) {
                        return true;
                    }
                }, "Corto todos los cables", [{ id: Re.licenciatura, valor: 100 }]);

                action.validar("intento", (p: any, a: any) => {
                    if (p.aciertos >= 3 && p.aciertos < 5) {
                        return true;
                    }
                }, "Corto 3 de los cables", [{ id: Re.licenciatura, valor: 50 }]);

            }} />
            <RelojContador style={{ position: "absolute", right: "555px", width: "auto" }} />
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