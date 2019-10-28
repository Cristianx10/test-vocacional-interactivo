import React, { Component, Children } from "react";

import ProcessingContext, {
  processingContext
} from "../../comunicacion/ProcessingContext";
import p5 from "p5";

export interface AppProcessing {
  preload?: Function;
  setup?: Function;
  draw?: Function;
  mousePressed?: Function;
  mouseReleased?: Function;
  mouseDragged?: Function;
}

interface IPropsProcessing {
  sketch?: AppProcessing;
  juego?: AppProcessing;
}

export class Processing extends Component<IPropsProcessing> {

  processingContext: processingContext;
  id: string;
  app: p5;
  juego?: AppProcessing;

  constructor(props: IPropsProcessing) {
    super(props);
    this.processingContext = ProcessingContext;
    this.processingContext.setActividad(this);
    this.id = "processing processing__sckecth__" + this.processingContext.nActividades;


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
  }

  componentDidMount() {


  }

  preload() {
    if (this.app) {
      this.app.createCanvas(1280, 720).parent(this.id);
      if (this.juego && this.juego.preload) {
        this.juego.preload(this.app);
      }
    }
  }

  setup() {
    if (this.app) {
      this.app.createCanvas(1280, 720).parent(this.id);
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
      <div id={this.id}>
        {Children.map(this.props.children, (view) => {
          return view;
        })}
      </div>
    );
  }
}

export default Processing;
