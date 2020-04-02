import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Narrativa from '../processing/Narrativa/Narrativa';
import { Re } from '../resultados/resultados';

const S22 = () => {
    return <Navegador>
        <Pantalla>
            <Narrativa UID="2020G1" config={(prop: any, accion: any) => {
                console.log(prop,accion)
                accion.validar("Validacion", (p: any, a: any) => {
                    a.setValor(Re.comunicacion, p.total);
                    return true;
                }, "Porcetaje validado", [{ id: Re.comunicacion, valor: 200 }]);

            }} />
        </Pantalla>
        <Pantalla>

        </Pantalla>
    </Navegador>
}

export default S22;