import p5 = require("p5");

export default class Sospechoso {

	app: p5;
	preguntas: string[];
	respuestas: string[];
	pj: p5.Image[];

	constructor(app: p5, numSospechoso: number) {
		this.app = app;
		this.preguntas = this.app.loadStrings("/img/2019/culpable/data/preguntas" + numSospechoso + ".txt");
		this.respuestas = this.app.loadStrings("/img/2019/culpable/data/respuestas" + numSospechoso + ".txt");

		console.log(this.preguntas)
		//this.preguntas[0] = this.preguntas[0].substring(1, this.preguntas[0].length);
		//this.respuestas[0] = this.respuestas[0].substring(1, this.respuestas[0].length);

		this.pj = [];
		this.pj.push(this.app.loadImage("/img/2019/culpable/data/pj" + numSospechoso + ".png"));
		this.pj.push(this.app.loadImage("/img/2019/culpable/data/pj" + numSospechoso + "selected.png"));
	}

	pintar(x: number, y: number) {
		let mX = this.app.mouseX;
		let mY = this.app.mouseY;

		if (mX > x && mX < x + this.pj[0].width && mY < 606 && mY > y) {
			this.app.image(this.pj[1], x, y);
		} else {
			this.app.image(this.pj[0], x, y);
		}
	}

	pintarPjDialogo(x: number, y: number) {
		this.app.image(this.pj[1], x, y);
	}

	validarPj(x: number, y: number) {
		let mX = this.app.mouseX;
		let mY = this.app.mouseY;

		console.log(mX > x && mX < x + this.pj[0].width && mY < 606 && mY > y);
		if (mX > x && mX < x + this.pj[0].width && mY < 606 && mY > y) {
			console.log("Valida");
			return true;
		}

		return false;
	}

	getPreguntas(): string[] {
		return this.preguntas;
	}

	getRespuestas(): string[] {
		return this.respuestas;
	}


}
