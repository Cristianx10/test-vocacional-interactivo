import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Processing from "../componentes/Processing/Processing";
import Economia from '../processing/Economia/Economia';

interface IPropsSeccionF {

}

export default class SeccionF extends Component<IPropsSeccionF> {
    constructor(props: IPropsSeccionF) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (<Navegador>
            <Pantalla>
                <Processing>
                    <Economia></Economia>
                </Processing>

            </Pantalla>
            <Pantalla>


            </Pantalla>
        </Navegador>);
    }
}
