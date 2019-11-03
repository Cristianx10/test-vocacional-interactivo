import React, { Component, Children } from "react";
import "./Formulario.scss";
import { navegadorContext } from '../../comunicacion/NavegadorContext';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import Pantalla from '../Pantalla/Pantalla';
import { resultados } from '../../resultados/resultados';
import FomularioContext, { fomularioContext } from '../../comunicacion/FormularioContext';
import ManagerStyle from '../../utilidades/AutoClases';
import Contenedor from "../Contenedor/Contenedor";



interface IPropsFormulario {

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

export class Formulario extends Component<IPropsFormulario> {

    navegadorContext: navegadorContext;
    pantalla?: Pantalla;

    nombre?: HTMLInputElement;
    edad?: HTMLInputElement;
    genero?: HTMLElement;
    hombre?: HTMLInputElement;
    mujer?: HTMLInputElement;
    carrera__error?: HTMLInputElement;
    ocuapcion?: HTMLInputElement;
    mano?: HTMLInputElement;
    izquierda?: HTMLInputElement;
    derecha?: HTMLInputElement;
    carrera?: HTMLSelectElement

    fomularioContext: fomularioContext;
    inputArray: FormInput[];
    style: ManagerStyle;

    constructor(props: IPropsFormulario) {
        super(props);
        this.navegadorContext = NavegadorContext;
        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }

        this.fomularioContext = FomularioContext;
        this.fomularioContext.formulario = this;

        this.inputArray = [];

        this.style = new ManagerStyle(props, "formulario__registro");

    }

    onInicial() {

    }

    onFinal() {
        resultados.save();
    }


    onSumit(event: React.FormEvent) {

        event.preventDefault();

        let error = false;
        for (let i = 0; i < this.inputArray.length; i++) {
            let input = this.inputArray[i];

            if (input.getValue() == "") {
                input.setCustomValidity();

                error = true;
                i = this.inputArray.length;
            }

            if (resultados.usuario) {

                switch (input.getLabel()) {
                    case "Nombre":
                        resultados.usuario.nombre = input.getValue();
                        break;
                    case "Edad":
                        resultados.usuario.edad = input.getValue();
                        break;

                    case "Genero":
                        resultados.usuario.genero = input.getValue();
                        break;

                    case "Ocupación":
                        resultados.usuario.genero = input.getValue();
                        break;
                }
            }
        }

        if (!error) {
            console.log(resultados.usuario)
            if (this.pantalla) {
                this.pantalla.continuar();
            }
        }

    }

    render() {

        let className = this.style.getClass();
        let style = this.style.getStyle();

        return (
            <div className={className} style={style}>

                <form onSubmit={this.onSumit.bind(this)}>

                    {Children.map(this.props.children, view => {
                        return view;
                    })}
                    <Contenedor height="150px">
                        <input id="form__usuario__enviar" type="submit" className="defaultValue boton" value="Continuar" />
                    </Contenedor>
                </form>


            </div>
        );
    }
}

export default Formulario;


interface IFromInput {
    label: string;
    placeholder: string;
    error?: string;
    type?: string;
    opciones?: string[];

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

export class FormInput extends Component<IFromInput> {

    fomularioContext: fomularioContext;
    formulario?: Formulario;
    contenedor?: HTMLInputElement;
    error: string;
    style: ManagerStyle;
    opciones: string[];
    viewOpciones: HTMLInputElement[] = [];
    viewInput?: HTMLInputElement;
    viewError?: HTMLSpanElement;


    constructor(props: IFromInput) {
        super(props);
        this.fomularioContext = FomularioContext;

        if (this.fomularioContext.formulario) {
            this.formulario = this.fomularioContext.formulario;

            this.formulario.inputArray.push(this);
        }
        this.error = "Complete este campo por favor.";
        this.style = new ManagerStyle(props, "input__form");
        this.opciones = [];
    }

    componentDidMount() {
        let contenedor: any = (this.refs.contenedor);
        this.style.setContenedor(contenedor);

        if (this.props.error) {
            this.error = this.props.error;
        }

        let input: any = this.refs.input;
        this.viewInput = input;

        if (this.viewInput) {
            this.viewInput.setCustomValidity(this.error);
            this.viewInput.addEventListener("keydown", (event: any) => {
                if (this.viewInput) {

                    if (this.viewInput.value == "") {
                        this.viewInput.setCustomValidity("");
                    }

                }
            })
        }

        let opcionesM: any = this.refs.opciones;
        if (opcionesM) {
            let opciones: any = opcionesM.querySelectorAll(".radial");

            if (opciones) {
                opciones.forEach((opcion: HTMLInputElement) => {

                    this.viewOpciones.push(opcion);
                });
            }
        }

        let errorview: any = this.refs.error;
        this.viewError = errorview;

    }

    setCustomValidity(value?: string) {
        if (this.viewInput) {
            this.viewInput.setCustomValidity(this.error);
        }
        if (this.viewOpciones.length > 0) {
            if (this.viewError) {
                this.viewError.innerText = this.error;
            }
        }
    }


    getValue() {
        let value = "";
        if (this.viewInput) {
            value = this.viewInput.value;
        }
        if (this.props.type) {
            for (let i = 0; i < this.viewOpciones.length; i++) {
                let opcion = this.viewOpciones[i];
                if (opcion.checked) {
                    value = this.opciones[i];
                }
            }
        }
        return value;
    }

    getLabel() {
        return this.props.label;
    }


    render() {

        if (this.props.opciones) {
            this.opciones = this.props.opciones;
        }

        let style = this.style.getStyle();
        let className = this.style.getClass();

        return <div ref="contenedor" className={className} style={style}>
            {this.props.type ? this.props.type == "boton"
                ? <>
                    <h2>{this.props.label}: <span ref="error" className="error"></span></h2>
                    <div ref="opciones" className="horizontal">
                        {this.opciones.map((opcion, indice) => {
                            return <label key={indice}>
                                <input className="radial" type="radio" name={this.props.label} defaultValue={opcion} />
                                <div className="boton">{opcion}</div>
                            </label>;
                        })}

                    </div> </>
                :
                ""
                :
                <label>
                    <h2>{this.props.label}: </h2>
                    <input name={this.props.label} type="text" ref="input" placeholder={this.props.placeholder} />
                </label>}
        </div>;
    }
}



