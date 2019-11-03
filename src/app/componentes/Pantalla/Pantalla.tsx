import React, { Component, ReactChild, ReactNode, Children } from 'react';
import Timer from '../../utilidades/timer';
import Navegador from '../Navegador/Navegador';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import Continuar from '../Continuar/Continuar';
import ManagerStyle from '../../utilidades/AutoClases';
import { IONavegable } from '../../comunicacion/utilEvents';
import { pantallaToImg } from '../../utilidades/utils';
import { tags } from '../../configuraciones/dato';
import "./Pantalla.scss";

interface IETitular {
    type: string;
    contenido: string
}

interface IPropsPantalla {
    fondo?: string;
    imagen?: string;
    children?: ReactChild | Array<ReactChild> | any;
    time?: string | number;
    onInicial?: Function;
    onFinal?: Function;

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

/* Clase encargada de almacenar cada una de las actividades*/
export class Pantalla extends Component<IPropsPantalla> {

    iniciada = false;
    finalizada = false;
    continuoPantalla = false;
    titulares: IETitular[] = [];

    timer: Timer;
    style: ManagerStyle;
    navegador?: Navegador;
    siguiente?: Continuar;
    eventsObject: IONavegable[];

    constructor(props: IPropsPantalla) {
        super(props);

        this.style = new ManagerStyle(props, "pantalla__contenedor");

        if (NavegadorContext.navegador) {
            this.navegador = NavegadorContext.navegador;
            this.navegador.pantallas.push(this);
        }

        this.iniciada = false;
        this.finalizada = false;

        this.timer = new Timer();

        this.timer.setFinal(() => {
            if (this.continuoPantalla == false) {
                if (this.navegador) {
                    this.navegador.continuar();
                }
            }
        });

        this.timer.setProgreso((segundos: number, minutos: number) => {
            this.onProgress(segundos, minutos);
        });

        this.eventsObject = [];
    }

    addEventos(objeto: IONavegable) {
        this.eventsObject.push(objeto);
    }

    onProgress(segundos: number, minutos: number) {
        this.eventsObject.forEach(propiedad => {
            if (propiedad.onProgress) {
                propiedad.onProgress(segundos, minutos);
            }
        });
    }

    onInicial() {
        if (this.iniciada == false) {
            this.iniciada = true;
            console.log("Inicio la aplicacion");

            if (this.props.time) {
                let seconds = parseInt(this.props.time + "");
                this.timer.iniciarEn(seconds);
                this.timer.temporizador();
            } else {
                this.timer.iniciar();
            }

            if (this.props.onInicial) {
                this.props.onInicial();
            }

            this.eventsObject.forEach(propiedad => {
                propiedad.onInicial();
            });
        }
    }

    onChange() {
     
        if (this.navegador && this.props.fondo) {
            this.navegador.style.setStyle("fondo", this.props.fondo);
        }
    }

    onFinal() {
        if (this.finalizada == false) {
            this.finalizada = true;

            if (this.timer.isDetenido === false) {
                this.timer.detener();
            }

            console.log("Tiempo de pantalla", this.timer.tiempo / 1000);


            if (this.props.onFinal) {
                this.props.onFinal();
            }

            this.eventsObject.forEach(propiedad => {
                propiedad.onFinal();
            });

        }
    }

    mostrar() {
        this.onInicial();
        if (this.style.contenedor && this.navegador) {
            this.style.contenedor.classList.remove("ocultar");

            this.navegador.style.appendChild(this.style.contenedor);
        }
    }

    ocultar() {
        console.log("Oculto")
        if (this.style.contenedor && this.navegador) {
            this.style.contenedor.classList.add("ocultar");
            this.navegador.style.removeChild(this.style.contenedor);
        }
    }

    componentDidMount() {
        let contenedor: any = this.refs.contenedor;
        this.style.setContenedor(contenedor);

        if (this.style.contenedor) {
            this.style.contenedor.classList.add("ocultar");

            let titulares = contenedor.querySelectorAll(tags.t);

            titulares.forEach((titular: HTMLElement) => {
                let fotos = titular.querySelectorAll("img");

                if (fotos.length > 0) {
                    fotos.forEach(f => {
                        this.titulares.push({ type: "img", contenido: f.src });
                    });
                } else {
                    this.titulares.push({
                        type: "text",
                        contenido: titular.innerHTML
                    });
                }
            });
        }
    }

    capturarPantalla(capturando: Function) {
        if (this.navegador) {
            this.navegador.isImprimiendoPantalla = true;
            pantallaToImg(this.refs.contenedor, capturando, this.navegador);
        }
    }

    habilitarContinuar() {
        if (this.siguiente) {
            this.siguiente.habilitar(true);
        }
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
            <div ref="contenedor" className="pantalla">
                <div className={className} style={style}>
                    {this.props.children ?
                        Array.isArray(this.props.children) ?
                            Children.map(this.props.children, (view, index) => { return view; })
                            : this.props.children
                        : ""
                    }
                </div>
            </div>
        );
    }
}

export default Pantalla;