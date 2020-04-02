import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Narrativa from '../processing/Narrativa/Narrativa';
import { Re } from '../resultados/resultados';
import Cuadros from "../actividades/Cuadros/Cuadros";
import RelojContador from "../componentes/Navegador/RelojContador";

const S22 = () => {

    const configCuadros = (p: any, action: any) => {
 
        action.validar("Acerto", (props: any, a: any) => {
            if (p.fallos < p.aciertos && p.aciertos >= p.totalAcierto) {
                return true;
            }
        }, "Acerto en todas", [{ id: Re.diseno, valor: 33 }]);

        action.validar("Intento", (props: any, a: any) => {
            if (p.fallos < p.aciertos && p.aciertos >= (p.totalAcierto/2) && p.aciertos < p.totalAcierto) {
                return true;
            }
        }, "Acerto en la mitad de los objetivos, con mas aciertos que fallos", [{ id: Re.diseno, valor: 10 }]);

    }

    return <Navegador>

        <Pantalla time="30">
            <RelojContador />
            <Cuadros UID="2020S1" config={configCuadros} level={1} />
        </Pantalla>

        <Pantalla time="40">
            <RelojContador />
            <Cuadros UID="2020S2" config={configCuadros} level={2} />
        </Pantalla>

        <Pantalla time="50">
            <RelojContador />
            <Cuadros UID="2020S3" config={configCuadros} level={3} />
        </Pantalla>




        <Pantalla>
            {/*<Narrativa UID="2020G1" config={(prop: any, accion: any) => {
                console.log(prop,accion)
                accion.validar("Validacion", (p: any, a: any) => {
                    a.setValor(Re.comunicacion, p.total);
                    return true;
                }, "Porcetaje validado", [{ id: Re.comunicacion, valor: 200 }]);

            }} />

        */}
        </Pantalla>
        <Pantalla>

        </Pantalla>
    </Navegador>
}

export default S22;