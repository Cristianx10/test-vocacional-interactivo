import p5 from "p5";
import Logica from "./Logica";

export default class Microondas {

	x: number;
	y: number;
	app: p5;
	log: Logica;
	estado: number;
	contador: number = 0;
	estado1: p5.Image;
	estado2: p5.Image;
	estado3: p5.Image;

	constructor(app: p5, log: Logica) {
		this.app = app;
		this.log = log;
		this.x = 1086;
		this.y = 401;
		this.estado = 0;
		this.estado1 = this.app.loadImage("/img/2019/revoltosos/data/estado1.png");
		this.estado2 = this.app.loadImage("/img/2019/revoltosos/data/estado2.png");
		this.estado3 = this.app.loadImage("/img/2019/revoltosos/data/estado3.png");
	}

	pintar() {
		switch (this.estado) {
			case 0://normal
				this.app.image(this.estado1, 1086, 401);
				break;

			case 1://calentando
				this.app.image(this.estado2, 1086, 401);
				this.tiempo();
				break;

			case 2://listo para entregar
				this.app.image(this.estado3, 1086, 401);
				break;
		}
	}

	recibir(i: number) {
		if (i == 66) {
			this.contador = parseInt(this.app.millis() + "");
			this.estado = 1;
		}
	}

	tiempo() {
		if (this.app.millis() - this.contador >= 2000) {
			this.estado = 2;
		}
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getEstado() {
		return this.estado;
	}

	setEstado(estado: number) {
		this.estado = estado;
	}





}
