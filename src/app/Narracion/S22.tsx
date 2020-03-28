import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Narrativa from '../processing/Narrativa/Narrativa';

const S22 = () => {
    return <Navegador>
        <Pantalla>
           <Narrativa></Narrativa>
        </Pantalla>
        <Pantalla>

        </Pantalla>
    </Navegador>
}

export default S22;