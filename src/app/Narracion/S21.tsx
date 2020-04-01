import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Petroleo from '../processing/Petroleo/Petroleo';
import Processing from '../componentes/Processing/Processing';
import { Re } from '../resultados/resultados';

const S21 = () => {
    return <Navegador>
        <Pantalla>
            <Processing config={(p: any, a: any) => {
                console.log(p, a);

                a.evaluar("Validacion", () => {
                    a.setValor(Re.economia, p.puntaje);
                    return true;
                }, "Porcetaje validado", [{ id: Re.economia, valor: 200 }]);

            }} UID="2020-1">
                <Petroleo />
            </Processing>
        </Pantalla>
        <Pantalla>

        </Pantalla>
    </Navegador>
}

export default S21;