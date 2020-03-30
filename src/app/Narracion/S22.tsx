import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Narrativa from '../processing/Narrativa/Narrativa';

const S22 = () => {
    return <Navegador>
        <Pantalla>
            <Narrativa UID="2020G1" config={(p: any, a: any) => {
                console.log(p, a);
            }} />
        </Pantalla>
        <Pantalla>

        </Pantalla>
    </Navegador>
}

export default S22;