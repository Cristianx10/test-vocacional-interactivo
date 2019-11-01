import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import Pantalla from "../componentes/Pantalla/Pantalla";
import Processing from "../componentes/Processing/Processing";
import Hablame from '../processing/Hablame/Hablame';


interface IPropsSeccionJ {

}

export default class SeccionJ extends Component<IPropsSeccionJ> {
    constructor(props: IPropsSeccionJ) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (<Navegador>
            <Pantalla>
                <Processing>
                    <Hablame />
                </Processing>

            </Pantalla>
            <Pantalla>


            </Pantalla>
        </Navegador>);
    }
}
