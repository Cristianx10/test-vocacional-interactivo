import React, { Component, Children } from "react";

import { resultados, ICategoria, GResultados } from '../../resultados/resultados';
import NavegadorContext, { navegadorContext } from '../../comunicacion/NavegadorContext';
import Pantalla from '../../componentes/Pantalla/Pantalla';
import ActividadContext, { actividadContext } from '../../comunicacion/ActividadContext';
import { IONavegable } from '../../comunicacion/utilEvents';
import ManagerStyle from '../../utilidades/AutoClases';
import APollitos from "./src/Logica";

interface IPropsPollitos {
    config: Function;
    UID: string;
    width: number;
    height: number;
}

/* Clase encargada de la navegación entre actividades*/
export class Pollitos extends Component<IPropsPollitos> implements IONavegable {

    navegadorContext: navegadorContext;
    actividadContext: actividadContext;
    pantalla?: Pantalla;
    acciones: any = {};


    escenario: APollitos;
    propiedades: any;
    opciones: { tipo: string, categoria: string }[] = [];
    style: ManagerStyle;

    registro: GResultados;

    constructor(props: IPropsPollitos) {
        super(props);

        this.navegadorContext = NavegadorContext;
        this.actividadContext = ActividadContext;

        this.escenario = new APollitos();

        if (this.navegadorContext.navegador) {
            this.pantalla = this.navegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }

        this.actividadContext.setPollitos(this);

        this.acciones = {

            validar: (id: string, accion: Function, descripcion: string, valorMaximo: ICategoria[]) => {
                this.escenario.validar(id, accion, descripcion, valorMaximo);
            },

            setIntento: (acciones: any) => {
                this.escenario.setIntento(acciones);
            },

            setIntentoAcierto: (acciones: any) => {
                this.escenario.setIntentoAcierto(acciones);
            },

            setIntentoFallo: (acciones: any) => {
                this.escenario.setIntentoFallo(acciones);
            },

            setValidacion: (acciones: any) => {
                this.escenario.setValidacion(acciones);
            }
        };


        this.registro = this.escenario.registro;

        this.propiedades = this.escenario.propiedades;

        this.style = new ManagerStyle(props, "actividad__pollitos");



    }

    componentDidMount() {

        let contenedor: any = this.refs.contenedor;
        this.style.setContenedor(contenedor);

        this.escenario.size(this.props.width, this.props.height);

        if (this.props.config) {
            this.props.config(this.propiedades, this.acciones);
        }


        if (this.style.contenedor) {
            this.escenario.incluirEn(this.style.contenedor);
        }

    }

    onInicial() {

        this.registro.agregar();

        if (this.props.UID) {
            this.registro.setUID(this.props.UID + "");
        }


    }

    onFinal() {
        if (this.pantalla) {
            resultados.setTiempo(this.escenario, this.pantalla.timer.tiempo + "");
            this.pantalla.capturarPantalla((imagen: string) => {
                this.propiedades.captura = imagen;
            });
        }

        resultados.evaluar(this.escenario);
    }

    render() {

        let style = this.style.getStyle();
        let className = this.style.getClass();

        return <div ref="contenedor" className={className} style={style}></div>;
    }
}