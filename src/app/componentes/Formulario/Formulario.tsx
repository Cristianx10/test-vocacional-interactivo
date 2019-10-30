import React, { Component } from "react";
import "./Formulario.scss";
import { navegadorContext } from '../../comunicacion/NavegadorContext';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import Pantalla from '../Pantalla/Pantalla';
import { resultados } from '../../resultados/resultados';

interface IPropsFormulario {

}

export class Formulario extends Component {

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

    constructor(props: IPropsFormulario) {
        super(props);
        this.navegadorContext = NavegadorContext;
        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }

    }

    onInicial() {

    }

    onFinal() {

    }

    normalizar(elemento: any, opciona?: any, opcionb?: any) {
        if (opciona) {
            opciona.addEventListener("click", function () {
                elemento.innerHTML = "";
            });
            if (opcionb) {
                opcionb.addEventListener("click", function () {
                    elemento.innerHTML = "";
                });
            }
        } else {
            elemento.addEventListener("keydown", function () {
                elemento.setCustomValidity("");
            });
        }
    }


    componentDidMount() {

        let nombre: any = this.refs.input__nombre;
        let edad: any = this.refs.input__edad;
        let genero: any = this.refs.span__genero;
        let hombre: any = this.refs.input__hombre;
        let mujer: any = this.refs.input__mujer;
        let carrera__error: any = this.refs.span__carrera;
        let ocupacion: any = this.refs.input__ocupacion;
        let mano: any = this.refs.span__mano;
        let izquierda: any = this.refs.input__izquierda;
        let derecha: any = this.refs.input__derecha;

        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
        this.hombre = hombre;
        this.mujer = mujer;

        this.carrera__error = carrera__error;

        this.ocuapcion = ocupacion;
        this.mano = mano;
        this.izquierda = izquierda;
        this.derecha = derecha;

        if (this.ocuapcion) {
            this.ocuapcion.style.display = "none";
        }

        this.normalizar(nombre);
        this.normalizar(edad);
        this.normalizar(genero, mujer, hombre);
        this.normalizar(ocupacion);
        this.normalizar(mano, izquierda, derecha);


        let carrera: any = this.refs.select__carrera;
        this.carrera = carrera;

        if (this.carrera && this.carrera__error && this.ocuapcion) {


            this.carrera.addEventListener("change", () => {
                let selectedOption = carrera.options[carrera.selectedIndex];
                let info = selectedOption.text;

                if (this.carrera__error && this.ocuapcion) {

                    if (info == "Elige una opción") {
                        this.carrera__error.innerHTML = "Selecione una carrera, por favor";
                        this.ocuapcion.value = "";
                    } else if (info == "Otra") {
                        this.carrera__error.innerHTML = "Selecione una carrera, por favor";
                        this.ocuapcion.value = "";
                        this.ocuapcion.style.display = "flex";
                    } else {
                        this.carrera__error.innerHTML = "";
                        this.ocuapcion.style.display = "none";
                        this.ocuapcion.value = info;
                    }
                }
            });
        }
    }

    onSumit(event: React.FormEvent) {
        event.preventDefault();

        if (this.nombre && this.edad && this.ocuapcion && this.hombre && this.mujer && this.genero && this.carrera__error && this.mano && this.izquierda && this.derecha) {


            if (this.nombre.value == "") {
                this.nombre.setCustomValidity("Ingresa su nombre, por favor");
            } else if (this.edad.value == "" || isNaN(parseInt(this.edad.value))) {
                this.edad.setCustomValidity("Ingresa una edad valida");
            } else if (this.hombre.checked == false && this.mujer.checked == false) {
                this.genero.innerHTML = "Selecione su genero, por favor";
            } else if (this.ocuapcion.value == "") {
                this.carrera__error.innerHTML = "Selecione una carrera, por favor";
                this.ocuapcion.setCustomValidity("Ingresa su ocupación, por favor");
            } else if (this.izquierda.checked == false && this.derecha.checked == false) {
                this.mano.innerHTML = "Selecione una orientacion, por favor";
            } else {
                if (resultados.usuario) {
                    resultados.usuario.nombre = this.nombre.value;
                    resultados.usuario.edad = this.edad.value;

                    if (this.hombre.checked) {
                        resultados.usuario.genero = "hombre";
                    } else {
                        resultados.usuario.genero = "mujer";
                    }
                    resultados.usuario.carrera = this.ocuapcion.value;
                    if (this.izquierda.checked) {
                        resultados.usuario.mano = "izquierda";
                    } else {
                        resultados.usuario.mano = "derecha";
                    }
                }

                //seguir();
                if(this.pantalla && this.pantalla.siguiente){
                    this.pantalla.siguiente.continuar();
                }
            }
        }
       
    }

    render() {
        return (
            <div className="formulario__registro">
                <h1>¿Quién eres?</h1>

                <form onSubmit={this.onSumit.bind(this)}>

                    <label>
                        <h2>Nombre:</h2>
                        <input ref="input__nombre" id="form__usuario__nombre" type="text" placeholder="Ingresa tu nombre"
                            required />
                    </label>

                    <div className="horizontal">
                        <label>
                            <h2>Edad:</h2>
                            <input ref="input__edad" id="form__usuario__edad" type="text" placeholder="Tu edad" />
                        </label>

                        <div className="vertical">
                            <h2>Genero: <span ref="span__genero" id="form__usuario__genero" className="error"></span></h2>
                            <div className="horizontal">
                                <label>
                                    <input ref="input__hombre" id="form__usuario__genero__hombre" className="radial" type="radio" name="genero" defaultValue="1" />
                                    <div className="boton">Hombre</div>
                                </label>
                                <label>
                                    <input ref="input__mujer" id="form__usuario__genero__mujer" className="radial" type="radio" name="genero" defaultValue="2" />
                                    <div className="boton">Mujer</div>
                                </label>
                            </div>

                        </div>
                    </div>


                    <label>
                        <h2>Carrera: <span ref="span__carrera" id="form__usuario__carrera" className="error"></span></h2>

                        <select defaultValue="0" ref="select__carrera" id="form-carrera" name="carrera">
                            <option value="0"> Elige una opción </option>
                            <optgroup label="Ingenieria">
                                <option value="1">Ing. de Sistemas</option>
                                <option value="2">Ing. Telematica</option>
                                <option value="3">Ing. Industrial</option>
                                <option value="4">Ing. Bioquímica</option>
                            </optgroup>
                            <optgroup label="Diseño">
                                <option value="10">Diseño de Medios</option>
                                <option value="11">Diseño Industrial</option>
                                <option value="12">Diseño Grafico</option>
                                <option value="9">Diseño de Modas</option>
                            </optgroup>
                            <optgroup label="Deporte">
                                <option value="5">Natación</option>
                                <option value="6">Tenis</option>
                                <option value="7">Kung Fu</option>
                                <option value="8">Ciclismo</option>
                            </optgroup>
                            <optgroup label="C. De la Salud">
                                <option value="10">Odontología</option>
                                <option value="11">Medicina general</option>
                                <option value="12">Enfermería</option>
                                <option value="13">Cirugía</option>
                            </optgroup>
                            <optgroup label="Ciencias">
                                <option value="14">Farmaceutica</option>
                                <option value="15">Biología</option>
                                <option value="16">Química</option>
                            </optgroup>
                            <optgroup label="Artes">
                                <option value="17">Visuales</option>
                                <option value="18">Literatura</option>
                                <option value="19">Música</option>
                            </optgroup>
                            <optgroup label="Ciencias sociales">
                                <option value="20">Antropologia</option>
                                <option value="21">Ciencia Politica</option>
                                <option value="22">Derecho</option>
                                <option value="23">Psicologia</option>
                                <option value="24">Sociologia</option>
                                <option value="25">Musica</option>
                            </optgroup>
                            <optgroup label="Ciencias administrativas y eco.">
                                <option value="26">Administracion de empresas</option>
                                <option value="27">Economia</option>
                                <option value="28">Mercadeo y Publicidad</option>
                                <option value="29">Economia</option>
                                <option value="30">Finanzas</option>
                            </optgroup>
                            <optgroup label="Ciencias de la educacion">
                                <option value="20">Lic. Basica Primaria</option>
                                <option value="20">Lic. Literatura</option>
                                <option value="20">Lic. Artes</option>
                                <option value="20">Lic. Lenguas</option>
                                <option value="20">Lic. Ciencias Naturales</option>
                                <option value="20">Lic. Ciencias Sociales</option>
                            </optgroup>
                            <optgroup label="Otro">
                                <option value="20">Otra</option>
                            </optgroup>span__mano
                            </select>
                        <input ref="input__ocupacion" id="form__usuario__ocupacion" type="text" placeholder="Mi carrera es:" />

                    </label>

                    <div>
                        <h2>Mano preferencia: <span ref="span__mano" id="form__usuario__mano" className="error"></span></h2>
                        <div className="horizontal">
                            <label>
                                <input ref="input__izquierda" id="form__usuario__mano__izquierda" className="radial" type="radio" name="mano" defaultValue="1" />
                                <div className="boton">Zurdo</div>
                            </label>
                            <label>
                                <input ref="input__derecha" id="form__usuario__mano__derecha" className="radial" type="radio" name="mano" defaultValue="2" />
                                <div className="boton">Derecho</div>
                            </label>
                        </div>
                    </div>
                    <input id="form__usuario__enviar" type="submit" className="defaultValue" value="Continuar" />
                </form>


            </div>
        );
    }
}

export default Formulario;





