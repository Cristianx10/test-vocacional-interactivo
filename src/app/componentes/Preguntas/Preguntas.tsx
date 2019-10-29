import React, { ReactChild, Children, Component } from "react";

import ManagerStyle from "../../utilidades/AutoClases";

import { resultados, IORestulados, GResultados, ICategoria, IOORestulados, OResultado } from '../../resultados/resultados';

import { tags } from "../../configuraciones/dato";
import { preguntaContext } from '../../comunicacion/PreguntaContext';
import Pantalla from '../Pantalla/Pantalla';
import { IONavegable } from '../../comunicacion/utilEvents';

import NavegadorContext, { navegadorContext } from "../../comunicacion/NavegadorContext";
import PreguntaContext from '../../comunicacion/PreguntaContext';

import "./Preguntas.scss";
import "../Contenedor/Contenedor.scss";
import { contenedorContext } from '../../comunicacion/ContenedorContext';
import ContenedorContext from '../../comunicacion/ContenedorContext';
interface IPropsPregunta {
  children: ReactChild[];
  onInicial: Function;
  onFinal: Function;
  UID?: string;


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


/* Clase encargada de la navegación entre actividades*/
export class Pregunta extends Component<IPropsPregunta> implements IONavegable, IORestulados {

  tipoId: string;
  propiedades: any;
  registro: GResultados;

  navegadorContext: navegadorContext;
  preguntaContext: preguntaContext;
  style: ManagerStyle;
  pantalla?: Pantalla;

  opciones: Opcion[] = [];
  seleccion?: Opcion;

  constructor(props: IPropsPregunta) {
    super(props);

    this.navegadorContext = NavegadorContext;

    if (this.navegadorContext.navegador) {
      this.pantalla = this.navegadorContext.navegador.getAddPantalla();
    }

    this.preguntaContext = PreguntaContext;
    this.preguntaContext.setPregunta(this);

    this.style = new ManagerStyle(props, "pregunta", true);

    if (this.pantalla) {
      this.pantalla.addEventos(this);
    }

    this.tipoId = "Pregunta";
    this.propiedades = {};

    this.registro = resultados.agregar(this);


    this.propiedades.titulares = [];
  }

  onInicial() {

    this.registro.agregar();

    if (this.props.UID) {
      resultados.setUID(this, this.props.UID);
    }


    if (this.props.onInicial) {
      this.props.onInicial().bind(this);
    }
  }

  onFinal() {
    if (this.pantalla) {
      resultados.setTiempo(this, this.pantalla.timer.tiempo + "");
    }

    if (this.props.onFinal) {
      this.props.onFinal().bind(this);
    }

    resultados.evaluar(this);
  }

  seleccionar(seleccion: Opcion) {
    if (this.seleccion != null) {
      this.seleccion.seleccionar(false);
    }
    this.seleccion = seleccion;
    seleccion.seleccionar(true);
    this.imprimir();
  }

  componentDidMount() {
    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    let titulares = contenedor.querySelectorAll(tags.t);

    titulares.forEach((titular: HTMLElement) => {
      let fotos = titular.querySelectorAll("img");

      if (fotos.length > 0) {
        fotos.forEach((f) => {
          this.propiedades.titulares.push({ type: "img", contenido: f.src });
        });
      } else {
        this.propiedades.titulares.push({ type: "text", contenido: titular.innerHTML });
      }
    });

  }

  render() {

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div ref="contenedor" className={className} style={style}>
        {Children.map(this.props.children, (view, index) => {
          return view;
        })}
      </div>
    );
  }

  imprimir() {
    // let container = this.refs.print_container;
  }
}

interface IPropsOpcion {
  children: ReactChild[];
  type: String;
  resultados: Array<ICategoria>;


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


interface IStateOpcion {
  type?: string;
}

export class Opcion extends Component<IPropsOpcion, IStateOpcion> implements IOORestulados {
  tipoId: string;
  propiedades: any;
  registro: OResultado;

  preguntaContext: preguntaContext;
  contenedorContext: contenedorContext;

  pregunta?: Pregunta;
  style: ManagerStyle;

  constructor(props: IPropsOpcion) {
    super(props);

    this.preguntaContext = PreguntaContext;
    this.contenedorContext = ContenedorContext;

    if (this.preguntaContext.pregunta) {
      this.pregunta = this.preguntaContext.pregunta;

      this.pregunta.opciones.push(this);
    }

    this.style = new ManagerStyle(props, "opcion");

    let tipo = "";
    if (this.contenedorContext.contenedor && this.contenedorContext.contenedor.props.allType) {
      tipo = this.contenedorContext.contenedor.props.allType;
    }

    this.state = {
      type: tipo
    };



    /*
    this.comunicador = comunicador;
    this.comunicador.add("opcion").push(this);

    this.pregunta = this.comunicador.getPropiedadActual("pregunta");
    this.contenedor = this.comunicador.getPropiedadActual("contenedor");
*/
    /*
        this.valor = null;
    
  

    /*
    if (this.contenedor) {
      if (this.contenedor.props.allType) {
        this.state = {
          type: this.contenedor.props.allType
        };
      }
    }
    */

    /**Configuracion de resultados */

    this.tipoId = "Opcion";
    this.propiedades = {};

    this.registro = resultados.agregarCondicion(
      this,
      this.pregunta,
      "Seleccion",
      (p: any) => {
        if (this.pregunta && this.pregunta.seleccion === this) {
          return true;
        }
      },
      "Selecciono una opcion",
      []
    );

    this.propiedades.respuestas = [];
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

  onClick() {
    if (this.pregunta) {
      this.pregunta.seleccionar(this);

      if (this.pregunta.pantalla && this.pregunta.pantalla.siguiente) {
        this.pregunta.pantalla.siguiente.habilitar(true);
      }
    }
  }

  componentDidMount() {

    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    let value = this.props.resultados;
    if (value) {
      this.registro.setResultados(value);
    }

    if (this.style.contenedor) {
      let respuestas = this.style.contenedor.querySelectorAll(tags.default);

      respuestas.forEach((t) => {
        let fotos = t.querySelectorAll("img");

        if (fotos.length > 0) {
          fotos.forEach((f) => {
            this.propiedades.respuestas.push({ type: "img", contenido: f.src });
          });
        } else {
          this.registro.setDescripcion("Selecciono: " + t.innerHTML);
          this.propiedades.respuestas.push({ type: "text", contenido: t.innerHTML });
        }
      });
    }


  }

  render() {
    let tipo = this.state.type;

    let style = this.style.getStyle();
    let className = this.style.getClass();

    return (
      <div
        ref="contenedor"
        className={className}
        style={style}
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
