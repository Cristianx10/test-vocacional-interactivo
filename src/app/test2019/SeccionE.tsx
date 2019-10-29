import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Processing from "../componentes/Processing/Processing";
import Revoltosos from "../processing/Revoltosos/Revoltosos";

interface IPropsSeccionE {

}

export default class SeccionE extends Component<IPropsSeccionE> {
    constructor(props: IPropsSeccionE) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return <Navegador>
            <Pantalla>
                <Processing>
                    <Revoltosos></Revoltosos>
                </Processing>

            </Pantalla>
            <Pantalla>


            </Pantalla>
        </Navegador>;
    }
}
