import React, { Component } from "react";
import "./Secuencia.scss";
import NavegadorContext from '../../comunicacion/NavegadorContext';
import Pantalla from '../../componentes/Pantalla/Pantalla';
import { Interaccion } from '../../configuraciones/main';
import { IONavegable } from '../../comunicacion/utilEvents';
import { shuffle } from '../../utilidades/utils';
import { resultados, GResultados, ICategoria } from '../../resultados/resultados';

class Secuencia__Carta {
    url: string;
    time: number;
    validado: boolean;

    constructor(cart: { url: string, time: number }) {
        this.url = cart.url;
        this.time = cart.time;
        this.validado = false;
    }
}

interface ISecuencia {
    cartas: { url: string, time: number }[];
    config: Function;
    UID: string;
}
interface SSecuencia {
    currentUrl: string;
    index: number;
    cartas: Secuencia__Carta[];
    objetos: Secuencia__Carta[];
    intentos: number;
    fallos: number;
    aciertos: number;
}

class Secuencia extends Component<ISecuencia, SSecuencia> implements IONavegable {

    pantalla?: Pantalla;

    registro: GResultados;
    propiedades: any;
    acciones: any;

    constructor(props: ISecuencia) {
        super(props);

        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }


        var stateObjetos: Secuencia__Carta[] = [];
        var objetos: { url: string, time: number }[] = shuffle(Object.assign([], this.props.cartas));

        objetos.forEach((o) => {
            stateObjetos.push(new Secuencia__Carta(o));
        })

        var stateCartas: Secuencia__Carta[] = [];

        this.props.cartas.forEach((o) => {
            stateCartas.push(new Secuencia__Carta(o));
        })

        this.state = {
            currentUrl: "", index: -2, cartas: stateCartas,
            intentos: 0, fallos: 0, aciertos: 0, objetos: stateObjetos
        }

        this.registro = resultados.agregar(this);
        this.registro.setMultiple(true);
        this.registro.setId("Secuencia")

        this.propiedades = this.registro.propiedades;
        this.acciones = {
            validar: (id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) => {
                this.validar(id, accion, descripcion, valorMaximo);
            }
        };

    }

    siguiente(time: number) {

        const { index, cartas, objetos } = this.state;

        const acciones = () => {
            if (index >= -1 && index + 1 < objetos.length) {
                var card = cartas[index + 1];
                this.setState({ currentUrl: card.url, index: index + 1 });
                this.siguiente(card.time);
            } else if (index === -2) {
                this.setState({ currentUrl: "", index: index + 1 });
                this.siguiente(1);
            } else {
                this.setState({ currentUrl: "", index: 0 });
            }
        }


        setTimeout(() => {
            acciones();
        }, time);


    }

    onInicial() {
        const { cartas, objetos } = this.state;
        if (objetos[0]) {
            this.siguiente(1);
            // this.siguiente(this.objetos[0].time);
        }


    }

    onFinal() {
        resultados.evaluar(this);

    }

    onProgress() {

    }

    validar(id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) {
        if (this.registro !== undefined) {
            this.registro.agregarCondicion(id, accion, descripcion, valorMaximo, this);
        }
    }

    componentDidMount() {
        this.registro.setUID(this.props.UID);
        this.props.config(this.propiedades, this.acciones);
    }


    render() {

        let { intentos, fallos, aciertos } = this.state;

        this.propiedades.intentos = intentos;
        this.propiedades.fallos = fallos;
        this.propiedades.aciertos = aciertos;
        this.propiedades.cartas = this.props.cartas.length;

        if (fallos > 0 || aciertos >= this.props.cartas.length) {
            if (this.pantalla) {
                this.pantalla.continuar();
            }
        }

        const { } = this.props;
        var { currentUrl, index, cartas, objetos } = this.state;

        return (<div ref="contendor" className="Secuencia">

            {currentUrl != "" ?
                <div className="Secuencia__individual">
                    <img src={currentUrl} alt="" />
                </div>
                : <></>
            }

            {(currentUrl == "" && index > -1) ?
                <div className="Secuencia__grupal">
                    {objetos.map((o, i) => {

                        var classItem = "Secuencia__grupal__item";

                        if (o.validado) {
                            classItem = classItem + " validado"
                        }

                        return <div className={classItem} onClick={() => {
                            if (index < objetos.length) {
                                if (!o.validado) {
                                    const { aciertos, fallos, intentos } = this.state;
                                    var acierto = 0;
                                    var fallo = 0;
                                    var intento = 1;

                                    var card = cartas[index];

                                    if (o.url === card.url) {
                                        //Acierto
                                        acierto = 1;
                                        console.log("Acerto")
                                    } else {
                                        //Fallo
                                        fallo = 1;
                                        console.log("Fallo")
                                    }

                                    o.validado = true;

                                    this.setState({
                                        cartas: cartas,
                                        objetos: objetos,
                                        index: index + 1,
                                        aciertos: aciertos + acierto,
                                        fallos: fallos + fallo,
                                        intentos: intentos + intento,
                                    })
                                }
                            }
                        }}>
                            <img src={o.url} alt="" />
                        </div>
                    })
                    }
                </div> :
                <></>
            }

        </div>);

    }

}

export default Secuencia;