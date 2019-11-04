import React, { Component } from 'react';
import ManagerStyle from '../../utilidades/AutoClases';
import "./Intentos.scss";
import { actividadContext } from '../../comunicacion/ActividadContext';
import ActividadContext from '../../comunicacion/ActividadContext';
import Pantalla from '../Pantalla/Pantalla';
import NavegadorContext from '../../comunicacion/NavegadorContext';

interface IPropsIntentos {
    /* Clases de ManagerStyle */
    style?: Object;
    className?: string;
    grid?: string;
    on?: boolean;
    width?: string;
    height?: string;
    padding?: string;
    left?: string;
    top?: string;
    pos?: string;
    image?: string;
    orientacion?: string;
    align?: string;
}
interface IStateIntentos {
    vidas: number;
}


class Intentos extends Component<IPropsIntentos, IStateIntentos> {

    style: ManagerStyle;
    actividadContext = ActividadContext;
    pantalla?: Pantalla;

    constructor(props: IPropsIntentos) {
        super(props);
        this.state = { vidas: 3 };
        this.style = new ManagerStyle(props, "view__intentos")
        this.actividadContext.setIntentos(this);
        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();

        }
    }

    componentDidMount() {
        let contenedor: any = this.refs.contenedor;
        this.style.setContenedor(contenedor);

    }

    setVidas(number: number) {
        this.setState({ vidas: number });
        if (number <= 0 && this.pantalla) {
            this.pantalla.continuar();
        }
    }

    menosVidas() {
        console.log("Rescto")
        this.setState({ vidas: this.state.vidas - 1 });
        if (this.state.vidas <= 0 && this.pantalla) {
            this.pantalla.continuar();
        }
    }

    setIntentos(number: number) {
        this.setState({ vidas: number });
        if (number <= 0 && this.pantalla) {
            this.pantalla.continuar();
        }
    }

    render() {

        let vidas = [];
        for (let index = 0; index < this.state.vidas; index++) {
            let vida = index;
            vidas.push(vida);
        }

        let className = this.style.getClass();
        let style = this.style.getStyle();

        return <div ref="contenedor" className={className} style={style}>
            <div>Vidas: </div>
            <div>
                {vidas.map((view, i) => {
                    return <img key={i} src="/includes/iconos/cora.png" alt="vida" />
                })}
            </div>
        </div>
    }
}

export default Intentos;