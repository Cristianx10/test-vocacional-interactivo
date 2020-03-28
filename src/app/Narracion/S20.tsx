import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Processing from '../componentes/Processing/Processing';
import Gusanito from '../processing/Gusanito/Gusanito';
import { Re } from '../resultados/resultados';


const S20 = () => {

    const configGusanito = (props: any, action: any) => {

        action.evaluar("Puntaje", (p: any, a: any) => {
            a.setValor(Re.psicologia, p.puntaje);
            return true;
        }, "Puntuacion del juego", [{ id: Re.psicologia, valor: 100 }]);
        
    }


    return <Navegador>
        <Pantalla>
            <Processing config={configGusanito} UID="2020-1">
                <Gusanito />
            </Processing>
        </Pantalla>
        <Pantalla>

        </Pantalla>
    </Navegador>
}

export default S20;