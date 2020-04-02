import React, { useEffect, useState, createRef } from "react";
import TS_Bomba from './TS_Bomba';

import "./Bomba.scss";

interface IBomba {
    UID: string;
    config: Function;

}

const Bomba = (props: IBomba) => {

    var [ts_bomba] = useState(new TS_Bomba());
    var refContainer = createRef<HTMLDivElement>();
    var refInstruccion = createRef<HTMLDivElement>();

    useEffect(() => {

        ts_bomba.agregarCable("Azul", "red", "blue");
        ts_bomba.agregarCable("Verde", "orange", "green");
        ts_bomba.agregarCable("Naranja", "blue", "orange");
        ts_bomba.agregarCable("Amarrillo", "green", "yellow");
        ts_bomba.agregarCable("Rojo", "yellow", "red");


        if (refContainer.current && refInstruccion.current) {
            ts_bomba.mesclar(refInstruccion.current);
            ts_bomba.incluirEn(refContainer.current)
        }

        props.config(ts_bomba.propiedades, ts_bomba.acciones);
        ts_bomba.setUIDa(props.UID)


    }, [])
    return <div className="Bomba" >
        <h1>Corta solo los cables indicados</h1>
        <div ref={refContainer}></div>
        <div ref={refInstruccion} className="instruccion"></div>
    </div >
}

export default Bomba;