export default function Juego(p) {
  let canvas;

  let log;

  p.setup = () => {
    canvas = p.createCanvas(300, 200);
    log = new Logica(p);
  };

  p.draw = () => {
      log.draw();
  };
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
