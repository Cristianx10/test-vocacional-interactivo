import React, { Component, ReactChild } from "react";
import Pantalla from '../Pantalla/Pantalla';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import ManagerStyle from '../../utilidades/AutoClases';
import Navegador from "../Navegador/Navegador";

interface IProsContinuar {
    children: ReactChild;
    disabled?: boolean;
}

interface IStateContinuar {
    habilitar: boolean;
}

export class Continuar extends Component<IProsContinuar, IStateContinuar> {

    style: ManagerStyle;
    pantalla?: Pantalla
    navegador?: Navegador;

    constructor(props: IProsContinuar) {
        super(props);

        if (NavegadorContext.navegador) {
            this.navegador = NavegadorContext.navegador;
            this.pantalla = this.navegador.getAddPantalla();
            this.pantalla.siguiente = this;
        }

        this.style = new ManagerStyle(props, "boton__navegacion");

        this.state = {
            habilitar: true
        };
    }

    componentDidMount() {
        if (this.props.disabled) {
            this.setState({ habilitar: false });
        }
    }

    habilitar(accion: boolean) {
        this.setState({ habilitar: accion });
    }

    continuar() {
        if (this.navegador) {
            this.navegador.continuar();
        }
    }

    render() {

        let style = this.style.getStyle();
        let className = this.style.getClass();

        return (
            <div ref="a" className={className} style={style}>
                {this.state.habilitar ?
                    <button className="btn__nav"
                        onClick={this.continuar.bind(this)}>
                        {this.props.children ? this.props.children : "Continuar"}
                    </button>
                    :
                    <button className="btn__nav" disabled>
                        {this.props.children ? this.props.children : "Continuar"}
                    </button>
                }
            </div>
        );
    }
}

export default Continuar;