import React, { useEffect, createRef, useState } from "react";
import TS_Laberinto from './TS_Laberinto';
import "./Laberinto.scss";

interface ILaberinto {
    UID: string;
    config: Function;
}

const Laberinto = (props: ILaberinto) => {

    var container = createRef<HTMLDivElement>();

    var [laberinto] = useState(new TS_Laberinto())

    useEffect(() => {
     

        laberinto.size(801.63, 455);
        laberinto.crearLaberinto("/img/laberinto/laberinto-2.png", 801.63, 455, 16, .5);
        laberinto.crearMeta(0, 405, 50, 30);
        laberinto.crearCursor(790, 232);

        laberinto.setIntentoAcierto(() => {
            console.log("Va bien");
        });

        laberinto.setIntentoFallo(() => {
            console.log("Perdio");
            //laberinto.iniciar();
            if (laberinto.cursor) {
                laberinto.cursor.reset()
                if(laberinto.propiedades.vidas <= 0){
                    laberinto.continuar();
                }
            }
        });

        laberinto.setValidacion(() => {
            console.log("Gano");
            laberinto.continuar();
        });

        if (container.current){
            laberinto.incluirEn(container.current);
        }

        laberinto.registro.setUID(props.UID)
        props.config(laberinto.propiedades, laberinto.acciones);
    })
    return <div className="Laberinto">
        <h1>Presiona en el punto para comenzar</h1>
        <div ref={container}></div>
    </div>
}

export default Laberinto;