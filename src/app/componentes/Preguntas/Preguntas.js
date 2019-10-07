import React from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from '@material-ui/core/styles';

import comunicador from "../../comunicacion/Comunicacion";

import { resizeClass, ManagerStyle } from "../../utilidades/AutoClases";

import { resultados } from "../../resultados/resultados";

import "./Preguntas.scss";


/* Clase encargada de la navegación entre actividades*/
export class Pregunta extends React.Component {
  constructor() {
    super();

    this.comunicador = comunicador;
    this.comunicador.add("pregunta").push(this);
    this.pantalla = this.comunicador.getPropiedadActual("pantallas");

    this.styleManager = new ManagerStyle(this, "pregunta");

    this.opciones = [];

    this.pantalla.onAddEventos(this);
    this.seleccion = null;

    this.tipoId = "Pregunta";
    this.propiedades = {};

    this.registro = resultados.agregar(this);

    this.onStateObject = [];
  }

  onAddEventos(objeto) {
    this.onStateObject.push(objeto);
  }

  onInicial() {
    this.onStateObject.forEach(propiedad => {
      if (propiedad.onInicial) propiedad.onInicial();
    });
    if (this.props.onInicial) {
      this.props.onInicial().bind(this);
    }
  }

  onFinal() {
    this.onStateObject.forEach(propiedad => {
      if (propiedad.onFinal) propiedad.onFinal();
    });
    if (this.props.onFinal) {
      this.props.onFinal().bind(this);
    }
    resultados.evaluar(this);
  }

  seleccionar(seleccion) {
    if (this.seleccion != null) {
      this.seleccion.seleccionar(false);
    }
    this.seleccion = seleccion;
    seleccion.seleccionar(true);
    this.imprimir();
  }

  render() {

    let style = this.styleManager.getProps();

    return (
      <div ref="print_container" className={style.className} style={style.style}>
        {React.Children.map(this.props.children, (view, index) => {
          //return <div className="pregunta__bloque">{view}</div>;

          return view;
        })}
      </div>
    );
  }

  imprimir() {
    // let container = this.refs.print_container;
  }
}

export class Opcion extends React.Component {
  constructor() {
    super();

    this.comunicador = comunicador;
    this.comunicador.add("opcion").push(this);
    this.pregunta = this.comunicador.getPropiedadActual("pregunta");
    this.contenedor = this.comunicador.getPropiedadActual("contenedor");

    this.pregunta.opciones.push(this);
    this.siguiente = null;

    this.valor = null;

    this.state = {
      type: ""
    };

    if (this.contenedor) {
      if (this.contenedor.props.allType) {
        this.state = {
          type: this.contenedor.props.allType
        };
      }
    }

    /**Configuracion de resultados */

    this.tipoId = "Opcion";
    this.propiedades = {};

    resultados.agregarCondicion(
      this,
      this.pregunta,
      "Seleccion",

      (p, r) => {
        if (this.pregunta.seleccion === this) {
          return true;
        }
      },
      "Selecciono una opcion",
      []
    );
  }

  seleccionar(estado) {
    let contenedor = this.refs.contenedor;
    if (estado) {
      contenedor.classList.add("seleccionado");
    } else {
      contenedor.classList.remove("seleccionado");
    }
  }

  onClick() {
    this.pregunta.seleccionar(this);
    if (this.siguiente != null) {
      this.siguiente.habilitar();
    }
  }

  componentDidMount() {
    this.value = this.props.resultados;
    if (this.value) {
      this.registro.setResultados(this.value);
    }
  }

  render() {
    let size = resizeClass(this, "opcion");
    let tipo = this.state.type;

    if (this.props.type) {
      tipo = this.props.type;
    }

    return (
      <div
        ref="contenedor"
        className={size.className}
        style={size.style}
        onClick={this.onClick.bind(this)}
      >
        {React.Children.map(this.props.children, (view, index) => {
          if (tipo === "boton") {
            return <div className="opcion__boton">{view}</div>;
          } else if (tipo === "circulo") {
            return <div className="opcion__circulo">{view}</div>;
          } else if (tipo === "radio") {
            return (
              <div className="opcion__radio">
                <div className="opcion__radio__marcador"></div>
                {view}
              </div>
            );
          } else {
            return <div className="opcion__bloque">{view}</div>;
          }
        })}
      </div>
    );
  }
}

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


export class Likert extends React.Component {
  constructor() {
    super();

    this.comunicador = comunicador;
    this.comunicador.add("likert").push(this);
    this.pregunta = this.comunicador.getPropiedadActual("pregunta");
    this.opciones = this.pregunta.opciones;

    this.valueInit = 0;

    this.state = {
      value: -1,
      iniciado: false
    };
  }

  seleccionar(estado) {
    let contenedor = this.refs.contenedor;
    if (estado) {
      contenedor.classList.add("seleccionado");
    } else {
      contenedor.classList.remove("seleccionado");
    }
  }

  componentDidMount() {
    this.pregunta.seleccion = this.opciones[this.valueInit];
  }

  onChange(event, value) {
    if (value !== this.state.value || this.state.value === -1) {
      this.setState({ value: value });
      this.pregunta.seleccion = this.opciones[value];
    }
  }

  render() {
    let c = resizeClass(this, "likert");
    let max = this.props.children.length - 1;
    let valor = Math.round(max / 2);
    this.valueInit = valor;

    return (
      <div>
        <div className={c.className} style={c.style}>
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
      </div>
    );
  }
}

export default Pregunta;

//Variables

/**
 * id: resultados
 *
 * Tiempo
 *
 * Opciones
 *
 * max
 *
 * Argumentos
 */

/**
 *
 * Inicio de la actividad
 *
 * Finalizacion de la actividad
 *
 * Registro
 */
