import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Processing from "../componentes/Processing/Processing";
import Culpable from "../processing/Culpable/Culpable";

interface IPropsSeccionC {

}

export default class SeccionD extends Component<IPropsSeccionC> {
    constructor(props: IPropsSeccionC) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return <Navegador>
            <Pantalla>
                <Processing>
                    <Culpable></Culpable>
                </Processing>

            </Pantalla>
            <Pantalla>


            </Pantalla>
        </Navegador>;
    }
}
