import React, { Component, Children } from "react";
import ProcessingContext, {
  processingContext
} from "../../comunicacion/ProcessingContext";
import p5 from "p5";
import { GResultados, resultados, IORestulados, ICategoria } from '../../resultados/resultados';
import Pantalla from '../Pantalla/Pantalla';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import { IONavegable } from '../../comunicacion/utilEvents';
import ManagerStyle from '../../utilidades/AutoClases';

export interface AppProcessing {
  preload?: Function;
  setup?: Function;
  draw?: Function;
  mousePressed?: Function;
  mouseReleased?: Function;
  mouseDragged?: Function;
  propiedades: any;


}

interface IPropsProcessing {
  sketch?: AppProcessing;
  juego?: AppProcessing;
  UID: string;
  config: Function;
}


export class Processing extends Component<IPropsProcessing> implements IONavegable {

  processingContext: processingContext;
  pantalla?: Pantalla;
  id: string;
  app: p5;
  juego?: AppProcessing;
  registro: GResultados;
  propiedades: any;
  acciones: any;
  addEvents: IONavegable[];
  canvas?: p5.Renderer;
  style: ManagerStyle;
  config?: Function;


  constructor(props: IPropsProcessing) {
    super(props);
    this.processingContext = ProcessingContext;
    this.processingContext.setActividad(this);
    this.id = "processing processing__sckecth__" + this.processingContext.nActividades;
    this.addEvents = [];

    this.style = new ManagerStyle(props, this.id);

    this.registro = resultados.agregar(this);
    this.propiedades = this.registro.propiedades;
    this.acciones = {};

    if (NavegadorContext.navegador) {
      this.pantalla = NavegadorContext.navegador.getAddPantalla();
      this.pantalla.addEventos(this);
    }

    this.app = new p5((app: p5) => {
      this.app = app;

      app.preload = () => {
        this.preload();
      }

      app.setup = () => {
        this.setup();
      }

      app.draw = () => {
        this.draw();
      }

      app.mousePressed = () => {
        this.mousePressed();
      }

      app.mouseReleased = () => {
        this.mouseReleased();
      }

      app.mouseDragged = () => {
        this.mouseDragged();
      }

    });

    this.acciones.evaluar = (id: string, accion: Function, descripcion: string, resultados: ICategoria[]) => {
      this.evaluar(id, accion, descripcion, resultados);
    }

  }

  componentDidMount() {
    let contenedor: any = this.refs.contenedor;
    this.style.setContenedor(contenedor);

    if (this.props.config) {
      this.config = this.props.config;
    }

    if (this.config) {
      this.config(this.propiedades, this.acciones);
    }

  }

  onInicial() {

    this.addEvents.forEach(event => {
      event.onInicial();
    });


    this.registro.agregar();
    
    if (this.props.UID) {
      this.registro.setUID(this.props.UID);
    }

    

    /*
    if (this.props.UID) {
      this.registro.setUID(this.props.UID);
    }
    */



 



  }

  onProgress(segundos: number, minutos: number) {
    this.addEvents.forEach(event => {
      if (event.onProgress) {
        event.onProgress(segundos, minutos);
      }
    });
  }

  evaluar(id: string, accion: Function, descripcion: string, resultados: ICategoria[]) {
    this.registro.agregarCondicion(id, accion, descripcion, resultados, this);
  }


  onFinal() {

    this.addEvents.forEach(event => {
      event.onFinal();
    });

    this.app.noLoop();
    if (this.pantalla) {
      resultados.setTiempo(this, this.pantalla.timer.tiempo + "");
      this.pantalla.capturarPantalla((imagen: string) => {
        this.propiedades.captura = imagen;
      });
    }
    resultados.evaluar(this);
  }

  continuar() {
    if (this.pantalla) {
      this.pantalla.continuar();
    }
  }

  size(width: number, height: number) {
    this.canvas = this.app.createCanvas(width, height);

    if (this.canvas && this.style.contenedor) {
      this.canvas.parent(this.style.contenedor);

      let canvas: any = this.canvas;
      canvas.canvas.style.visibility = "visible";
    }
  }

  preload() {
    if (this.app) {

      if (this.juego && this.juego.preload) {
        this.juego.preload(this.app);
      }
    }
  }

  setup() {
    if (this.app) {

      if (this.juego && this.juego.setup) {
        this.juego.setup(this.app);
      }
    }
  }

  draw() {
    if (this.juego && this.juego.draw) {
      this.juego.draw(this.app);
    }
  }

  mousePressed() {
    if (this.juego && this.juego.mousePressed) {
      this.juego.mousePressed(this.app);
    }
  }

  mouseReleased() {
    if (this.juego && this.juego.mouseReleased) {
      this.juego.mouseReleased(this.app);
    }
  }

  mouseDragged() {
    if (this.juego && this.juego.mouseDragged) {
      this.juego.mouseDragged(this.app);
    }
  }


  render() {
    return (
      <div ref="contenedor" id={this.id}>
        {Children.map(this.props.children, (view) => {
          return view;
        })}
      </div>
    );
  }
}

export default Processing;
