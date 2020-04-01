import React, { Component } from "react";
import { resultados, ICategoria } from '../../resultados/resultados';
import { random } from '../../utilidades/utils';
import Pantalla from "../../componentes/Pantalla/Pantalla";
import Navegador from '../../componentes/Navegador/Navegador';
import "./Resultados.scss";
import Continuar from "../../componentes/Continuar/Continuar";
import Contenedor from "../../componentes/Contenedor/Contenedor";

var Knob = require('knob');

interface IPropsVResultados {

}

export class VResultados extends Component<IPropsVResultados> {

    constructor(props: IPropsVResultados) {
        super(props);
    }



    render() {

        let carreras: ICategoria[] = [];

        let { ponderacion } = resultados;
        if (ponderacion) {
            ponderacion.forEach((ponderado, i) => {
                carreras.push(ponderado);
            });
        }

        carreras.sort((a: ICategoria, b: ICategoria) => {
            return b.valor - a.valor;
        })




        return <Navegador image="/includes/background/oscuro-personajes.png">
            <Pantalla style={{ color: "white" }} padding="40px 80px" onFinal={() => { resultados.descargar() }}>

                <h1>Resultados</h1>
                <div className="view__resultados">
                    {carreras.map((carrera, i) => {
                        return <ViewResultado key={i} id={carrera.id} value={carrera.valor} />
                    })}
                </div>
                <Continuar>Continuar</Continuar>
            </Pantalla>
            <Pantalla>
                <Contenedor width="70%" >
                    <h1 style={{ color: "white" }}>Gracias por participar en la prueba</h1>

                    <h3 style={{ textAlign: "center" }}>Si los resultados no se descargaron automaticamente. Por favor da click en descargar y revisa si tienes habilidas las descargas automaticas</h3>
                    <Continuar style={{ margin: "20px" }} onClick={() => { resultados.descargar() }}>Descargar</Continuar>
                </Contenedor>
            </Pantalla>
        </Navegador>
    }
}

interface IPropsViewResultado {
    id: string;
    value: number;
}

var numResultCounter = 0;
class ViewResultado extends Component<IPropsViewResultado> {

    refNumber: number;
    iconos: any = {};
    colores: any = {};
    constructor(props: IPropsViewResultado) {
        super(props);
        numResultCounter++;
        this.refNumber = numResultCounter;


        this.colores["derecho"] = "#5BC5D3";
        this.colores["ingenieria"] = "#6883E4";
        this.colores["humanidades"] = "#FDF441";
        this.colores["licenciatura"] = "#FF7373";
        this.colores["diseno"] = "#BA76F0";
        this.colores["medicina"] = "#FFBF74";
        this.colores["economia"] = "#EF6BAA";
        this.colores["ciencias"] = "#63D1B7";

        this.iconos["derecho"] = "/includes/iconos/educacion.svg";
        this.iconos["ingenieria"] = "/includes/iconos/ingenieria.svg";
        this.iconos["humanidades"] = "/includes/iconos/deporte.svg";
        this.iconos["licenciatura"] = "/includes/iconos/fuerzaspublicas.svg";
        this.iconos["diseno"] = "/includes/iconos/diseno.svg";
        this.iconos["medicina"] = "/includes/iconos/salud.svg";
        this.iconos["economia"] = "/includes/iconos/arte.svg";
        this.iconos["ciencias"] = "/includes/iconos/ciencias.svg";
    }

    componentDidMount() {

        let init = random(0, 360);
        let grafica: any = this.refs.grafica;
        let graficaContenedor: HTMLDivElement = grafica;
        var grafico = Knob({
            min: 0,
            max: 100,
            width: 100,
            height: 100,
            fgColor: this.colores[this.props.id],
            // angleOffset:0,
            thickness: ".25",
            readOnly: true,
            displayInput: false,

            value: this.props.value,
            lineCap: "round",
            angleOffset: init,

        });

        graficaContenedor.appendChild(grafico);

        //<input id="${simpli[0]}" class="porcentaje" type="text" value="${this.valor}" data-linecap=round data-angleOffset = "${this.init}">
    }

    MayusPrimera(palabra: string) {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    }

    render() {

        let value = Math.round(this.props.value);
        return <div className="view__resultado">
            <div className="view__resultado__grafica">
                <div ref="grafica" className="view__resultado__grafica__view"></div>
                <div className="view__resultado__grafica__value">
                    <img src={this.iconos[this.props.id]} alt="" />
                </div>

            </div>
            <div className="view__resultado__informacion">
                <h2 className="view__resultado__informacion__carrera">{this.MayusPrimera(this.props.id)}</h2>
                <div className="view__resultado__informacion__valor">{value}%</div>
            </div>

        </div>;
    }
}




export default VResultados;