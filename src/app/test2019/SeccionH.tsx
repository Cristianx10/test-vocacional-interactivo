import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Processing from "../componentes/Processing/Processing";
import MezclandoConRick from '../processing/MezclandoConRick/MezclandoConRick';

interface IPropsSeccionH {

}

export default class SeccionH extends Component<IPropsSeccionH> {
    constructor(props: IPropsSeccionH) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (<Navegador>
            <Pantalla>
                <Processing UID="" config={()=>{}}>
                    <MezclandoConRick></MezclandoConRick>
                </Processing>

            </Pantalla>
            <Pantalla>


            </Pantalla>
        </Navegador>);
    }
}
