import comunicador from "../../comunicacion/Comunicacion";
import Names from "../../comunicacion/Names";

export default function Juego (p) {
  let canvas;

  let log;
  let comunicacion;
  let actividad;
  
  
  p.setup = () => {
    canvas = p.createCanvas(300, 200);
    log = new Logica(p);
    comunicacion = comunicador;
    actividad = comunicador.getPropiedadActual(Names.processing);
    actividad.propiedades.x = log.x;
    
  };

  p.draw = () => {
      log.draw();
  };

  p.mousePressed = () => {
    actividad.propiedades.x = log.x;
    console.log(actividad)
  }
}

class Logica {
  constructor(p) {
    this.app = p;
    this.x = 0;
    this.app.noStroke();
  }

  draw() {
    this.app.background("orangered");
    this.app.ellipse(this.x, 100, 100, 100);
    this.x++;
  }
}
