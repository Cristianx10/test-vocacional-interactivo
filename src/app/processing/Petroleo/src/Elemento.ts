import p5 from 'p5';
export class Elemento {

  app: p5;
  parte: p5.Image;
  pos: { x: number, y: number, inicial: { x: number, y: number } };

  block = false;

  constructor(app: p5, url: string, x: number, y: number) {
    this.app = app;
    this.parte = this.app.loadImage(url);
    this.pos = {
      x: x,
      y: y,
      inicial: {
        x: x,
        y: y
      }
    };


    this.block = false;
  }

  setposx(x: number) {
    this.pos.x = x;

  }

  pintar() {
    this.app.imageMode(this.app.CENTER);
    this.app.image(this.parte, this.pos.x, this.pos.y);
  }


  isSobre() {

    if (this.app.mouseX > (this.pos.x - (this.parte.width / 2)) && this.app.mouseX < (this.pos.x + (this.parte.width / 2)) &&
      this.app.mouseY > (this.pos.y - (this.parte.height / 2)) && this.app.mouseY < (this.pos.y + (this.parte.height / 2))) {
      return true;
    }
    return false;
  }


}