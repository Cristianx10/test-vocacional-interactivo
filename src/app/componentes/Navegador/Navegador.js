import React from "react";

import { comunicador } from "../../comunicacion/Comunicacion";
import Names from "../../comunicacion/Names";

import { resizeClass, ManagerStyle } from "../../utilidades/AutoClases";

import { Timer } from "../../utilidades/timer";

import "./Navegador.scss";

/* Clase encargada de la navegación entre actividades*/
export class Navegador extends React.Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add("navegador").push(this);

    this.renderizado = false;
  }

  continuar() {
    let actual = this.state.actual;

    let pantallaActual = this.comunicador.getPropiedad("pantallas", actual);
    pantallaActual.onFinal();

    if (actual > this.props.children.length) {
    } else {
      actual += 1;
    }

    this.setState({ actual });

    //console.log("Resultados", JSON.stringify(resultados));
  }

  capturarPantalla() {
    pantallaToImg(this.refs.contenedor);
  }

  componentDidMount() {}

  renderizadoInicial() {
    if (this.renderizado === false) {
      this.renderizado = true;
      this.propiedades = new ManagerStyle(this, "navegacion");
      this.state = {
        actual: 0,
        style: this.propiedades.getStyle(),
        className: this.propiedades.className
      };
    }
  }

  render() {
    this.renderizadoInicial();

    if (this.state.actual === 0) {
      return React.Children.map(this.props.children, (view, index) => {
        if (index === this.state.actual) {
          return (
            <div
              ref="contenedor"
              className={this.state.className}
              style={this.state.style}
              key={this.state.actual}
            >
              {view}
            </div>
          );
        }
      });
    } else {
      let contenido = null;
      if (this.state.actual < this.props.children.length) {
        contenido = this.props.children[this.state.actual];
      }
      return (
        <div
          ref="contenedor"
          className={this.state.className}
          style={this.state.style}
          key={this.state.actual}
        >
          {contenido}
        </div>
      );
    }
  }
}

/* Clase encargada de almacenar cada una de las actividades*/
export class Pantalla extends React.Component {
  constructor() {
    super();

    this.comunicador = comunicador;
    this.comunicador.add("pantallas").push(this);
    this.navegador = this.comunicador.getPropiedadActual(Names.navegador);
    this.continuar = null;

    this.finalizada = false;

    /**
     * Variables fijas requeridas para la comunicacion
     */

    this.timer = new Timer();

    this.timer.setFinal(() => {
      this.navegador.continuar();
    });

    this.timer.setProgreso((segundos, minutos) => {
      this.onProgress(segundos, minutos);
    });

    /**
     * Fin de variables fijas para la comunicacion
     */

    this.onStateObject = [];
  }

  onAddEventos(objeto) {
    this.onStateObject.push(objeto);
  }

  onProgress(segundos, minutos) {
    this.onStateObject.forEach(propiedad => {
      if (propiedad.onProgress) propiedad.onProgress(segundos, minutos);
    });
  }

  onInicial() {
    console.log("Inicio la aplicacion");

    if (this.props.time) {
      this.timer.iniciarEn(this.props.time);
      this.timer.temporizador();
    } else {
      this.timer.iniciar();
    }

    this.onStateObject.forEach(propiedad => {
      if (propiedad.onInicial) propiedad.onInicial();
    });

    if (this.props.onInicial) {
      this.props.onInicial().bind(this);
    }
  }

  onFinal() {
    if (this.finalizada == false) {
      this.finalizada = true;

      if (this.timer.isDetenido === false) {
        this.timer.detener();
      }
      console.log("Tiempo de pantalla", this.timer.tiempo / 1000);

      this.onStateObject.forEach(propiedad => {
        if (propiedad.onFinal) propiedad.onFinal();
      });
      if (this.props.onFinal) {
        this.props.onFinal().bind(this);
      }
    }
  }

  ocultar() {
    let contenedor = this.refs.contenedor;
    contenedor.classList.add("ocultar");
  }

  componentDidMount () {
    this.onInicial();
    if (this.navegador && this.props.fondo) {
      let temStyle = this.navegador.propiedades;
      temStyle.setStyle("backgroundImage", "url(" + this.props.fondo + ")");
      this.navegador.setState({ style: temStyle.getStyle() });
    }
  };

  render() {
    let c = resizeClass(this, "pantalla__contenedor");
    return (
      <div ref="contenedor" className="pantalla">
        <div className={c.className} style={c.style}>
          {React.Children.map(this.props.children, (view, index) => {
            // return <div className="pantalla__bloque">{view}</div>;

            return view;
          })}
        </div>
      </div>
    );
  }
}

/*       <Button color="primary" variant="outlined" onClick={this.comunicador.navegador.continuar.bind(this.comunicador.navegador)}>
        Continuar
        </Button> */

export class Continuar extends React.Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.navegador = this.comunicador.getPropiedadActual("navegador");
    this.pantalla = this.comunicador.getPropiedadActual(Names.pantalla);
    this.pantalla.continuar = this;

    /**Control de opciones de pregunta */

    this.actualPregunta = this.comunicador.getPropiedadActual("pregunta");
    if (this.actualPregunta != null) {
      this.actualPregunta.opciones.forEach(opcion => {
        opcion.siguiente = this;
      });
    }

    this.state = {
      disabled: false,
      color: "#FFFF00"
    };

    this.componentInit = false;
  }

  componentDidMount() {
    if (this.props.disabled) {
      this.setState({ disabled: this.props.disabled });
    }
  }

  habilitar() {
    this.setState({ disabled: false });
  }

  onClick() {
    this.navegador.continuar.bind(this.navegador);
  }

  render() {
    let c = resizeClass(this, "boton__navegacion");

    let contenido = "Continuar";
    if (this.props.children) {
      contenido = this.props.children;
    }

    let contenedor = null;

    if (this.state.disabled) {
      contenedor = (
        <button className="btn__nav" disabled onClick={this.onClick}>
          {contenido}
        </button>
      );
    } else {
      contenedor = (
        <button
          className="btn__nav"
          onClick={this.navegador.continuar.bind(this.navegador)}
        >
          {contenido}
        </button>
      );
    }

    return (
      <div className={c.className} style={c.style}>
        {contenedor}
      </div>
    );
  }
}

export default Navegador;
