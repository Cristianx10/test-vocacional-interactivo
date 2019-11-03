import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Processing from "../componentes/Processing/Processing";
import Operando from '../processing/Operando/Operando';


interface IPropsSeccionG {

}

export default class SeccionG extends Component<IPropsSeccionG> {
    constructor(props: IPropsSeccionG) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (<Navegador>
            <Pantalla>
                <Processing UID="" config={()=>{}}>
                    <Operando></Operando>
                </Processing>

            </Pantalla>
            <Pantalla>


            </Pantalla>
        </Navegador>);
    }
}
