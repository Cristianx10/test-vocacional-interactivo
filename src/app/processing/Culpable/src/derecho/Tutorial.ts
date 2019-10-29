import p5 from "p5";

export default class Tutorial {

	app: p5;
	pantalla: number;
	contadorPantalla: number;
	imgs: p5.Image[];

	constructor(app: p5) {
		this.app = app;
		this.pantalla = 0;
		this.contadorPantalla = 0;
		this.imgs = [];

		for (let i = 0; i < 4; i++) {
			this.imgs.push(app.loadImage("/img/2019/culpable/data/tutorial" + i + ".png"));
		}
	}

	pintar() {

		this.app.image(this.imgs[this.pantalla], 0, 0);
		this.contadorPantalla++;
	}

	interaccionMouse() {
		if (this.contadorPantalla > 30) {
			if (this.pantalla >= 3) {
				return true;
			}
			this.pantalla++;
			this.contadorPantalla = 0;
		}
		return false;
	}
}
