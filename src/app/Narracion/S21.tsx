import React from "react";
import Navegador from '../componentes/Navegador/Navegador';
import Pantalla from '../componentes/Pantalla/Pantalla';
import Petroleo from '../processing/Petroleo/Petroleo';
import Processing from '../componentes/Processing/Processing';
import Gusanito from '../processing/Gusanito/Gusanito';
import Narrativa from '../processing/Narrativa/Narrativa';

const S21 = () => {
    return <Navegador>
        <Pantalla>
            <Processing config={()=>{}} UID="2020-1">
                <Petroleo />
            </Processing>
        </Pantalla>
        <Pantalla>

        </Pantalla>
    </Navegador>
}

export default S21;