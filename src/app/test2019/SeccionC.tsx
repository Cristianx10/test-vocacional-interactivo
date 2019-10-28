import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Processing from "../componentes/Processing/Processing";
import Pollo from "../processing/Pollo/Pollo";

interface IPropsSeccionC {

}

export class SeccionC extends Component<IPropsSeccionC> {
    constructor(props: IPropsSeccionC) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return <Navegador>
            <Pantalla>
                <Processing>
                    <Pollo></Pollo>
                </Processing>

            </Pantalla>
            <Pantalla>


            </Pantalla>
        </Navegador>;
    }
}
