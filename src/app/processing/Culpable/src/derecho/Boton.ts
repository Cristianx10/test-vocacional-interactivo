import p5 = require("p5");


export default class Boton {

	app: p5;
	x: number;
	y: number;
	imgs: p5.Image[];

	constructor(app: p5, x: number, y: number, boton: string) {
		this.app = app;
		this.x = x;
		this.y = y;
		this.imgs = [];
		for (let i = 0; i < 3; i++) {
			this.imgs.push(app.loadImage("/img/2019/culpable/data/boton_" + boton + i + ".png"));
		}
	}

	pintar() {
		let mX = this.app.mouseX;
		let mY = this.app.mouseY;

		if (!this.app.mousePressed && mX > this.x && mX < this.x + this.imgs[0].width && mY < this.y + this.imgs[0].height && mY > this.y) {
			this.app.image(this.imgs[1], this.x, this.y);
		} else if (this.app.mousePressed && mX > this.x && mX < this.x + this.imgs[0].width && mY < this.y + this.imgs[0].height && mY > this.y) {
			this.app.image(this.imgs[2], this.x, this.y);
		} else {
			this.app.image(this.imgs[0], this.x, this.y);
		}
	}

	validar() {
		let mX = this.app.mouseX;
		let mY = this.app.mouseY;

		if (mX > this.x && mX < this.x + this.imgs[0].width && mY < this.y + this.imgs[0].height && mY > this.y) {
			return true;
		}
		return false;
	}
}
