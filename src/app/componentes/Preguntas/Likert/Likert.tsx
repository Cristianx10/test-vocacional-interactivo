import React, { Component, ReactChild } from 'react';
import Slider from "@material-ui/core/Slider";
import { withStyles } from '@material-ui/core/styles';
import Pregunta from '../Preguntas';
import PreguntaContext from '../../../comunicacion/PreguntaContext';
import { resultados } from '../../../resultados/resultados';
import ManagerStyle from '../../../utilidades/AutoClases';

import "./Likert.scss";

const PrettoSlider = withStyles({
    root: {
        color: "#00DED3",
        height: 8
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -5,
        marginLeft: -12,
        "&:focus,&:hover,&$active": {
            boxShadow: "inherit"
        }
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)"
    },
    track: {
        height: 15,
        borderRadius: 10
    },
    rail: {
        color: "#C5E0E8",
        height: 15,
        borderRadius: 10
    }
})(Slider);



interface IPropsLikert {
    min: string;
    max: string;
    children: ReactChild[];

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

interface IStateLikert {
    value: number;
}

export class Likert extends Component<IPropsLikert, IStateLikert> {

    pregunta?: Pregunta;
    style: ManagerStyle;

    constructor(props: IPropsLikert) {
        super(props);

        this.pregunta = PreguntaContext.pregunta;
        this.style = new ManagerStyle(props, "likert");
        /*
        this.comunicador = comunicador;
        this.comunicador.add("likert").push(this);
        this.pregunta = this.comunicador.getPropiedadActual("pregunta");
        this.opciones = this.pregunta.opciones;
*/

        if (this.pregunta) {
            resultados.setId(this.pregunta, "Likert");
        }

        this.state = {
            value: -1
        }

    }

    seleccionar(estado: boolean) {
        if (this.style.contenedor) {
            if (estado) {
                this.style.contenedor.classList.add("seleccionado");
            } else {
                this.style.contenedor.classList.remove("seleccionado");
            }
        }
    }

    componentDidMount() {
        let contenedor: any = this.refs.contenedor;
        this.style.setContenedor(contenedor);

        let max = this.props.children.length - 1;
        let valor = Math.round(max / 2);

        if (this.pregunta) {
            this.pregunta.seleccion = this.pregunta.opciones[valor];
        }
    }

    onChange(event: React.ChangeEvent<{}>, value: any) {
        if (value !== this.state.value || this.state.value === -1) {
            this.setState({ value: value });
            if (this.pregunta) {
                this.pregunta.seleccion = this.pregunta.opciones[value];
                if (this.pregunta.pantalla && this.pregunta.pantalla.siguiente) {
                    this.pregunta.pantalla.siguiente.habilitar(true);
                }
            }
        }
    }

    render() {

        let max = this.props.children.length - 1;
        let valor = Math.round(max / 2);

        let style = this.style.getStyle();
        let className = this.style.getClass();

        return (

            <div ref="contenedor" className={className} style={style}>
                <div className="likert__min">{this.props.min}</div>
                <div className="likert__progreso">
                    <div className="likert__barra">
                        <PrettoSlider
                            onChange={this.onChange.bind(this)}
                            defaultValue={valor}
                            max={max} />
                    </div>
                    <div className="likert__opciones">
                        {React.Children.map(this.props.children, (view, index) => {
                            return view;
                        })}
                    </div>
                </div>
                <div className="likert__max">{this.props.max}</div>
            </div>

        );
    }
}

export default Likert;