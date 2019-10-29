import p5 = require("p5");

export default class Objeto {

	app: p5;
	tipo: number;
	x: number;
	y: number;
	uno: p5.Image;
	dosdos: p5.Image;
	dostres: p5.Image;
	tres: p5.Image;
	cuatro: p5.Image;
	cinco: p5.Image;
	seis: p5.Image;
	seisseis: p5.Image;

	constructor(app: p5, tipo: number, x: number, y: number) {
		this.app = app;
		this.tipo = tipo;
		this.x = x;
		this.y = y;
		this.uno = this.app.loadImage("/img/2019/revoltosos/data/1.png");
		this.dosdos = this.app.loadImage("/img/2019/revoltosos/data/22.png");
		this.dostres = this.app.loadImage("/img/2019/revoltosos/data/23.png");
		this.tres = this.app.loadImage("/img/2019/revoltosos/data/3.png");
		this.cuatro = this.app.loadImage("/img/2019/revoltosos/data/4.png");
		this.cinco = this.app.loadImage("/img/2019/revoltosos/data/5.png");
		this.seis = this.app.loadImage("/img/2019/revoltosos/data/66.png");
		this.seisseis = this.app.loadImage("/img/2019/revoltosos/data/66.png");
	}

	pintar() {
		switch (this.tipo) {
			case 1:
				this.app.image(this.uno, this.x, this.y);
				break;

			case 22:
				this.app.image(this.dosdos, this.x, this.y);
				break;

			case 23:
				this.app.image(this.dostres, this.x, this.y);
				break;

			case 3:
				this.app.image(this.tres, this.x, this.y);
				break;

			case 4:
				this.app.image(this.cuatro, this.x, this.y);
				break;

			case 5:
				this.app.image(this.cinco, this.x, this.y);
				break;

			case 6:
				this.app.image(this.seis, this.x, this.y);
				break;

			case 66:
				this.app.image(this.seisseis, this.x, this.y);
				break;
		}
	}

	mouseDragged() {
		this.x = this.app.mouseX - 65;
		this.y = this.app.mouseY - 65;
	}

	public getTipo() {
		return this.tipo;
	}


}