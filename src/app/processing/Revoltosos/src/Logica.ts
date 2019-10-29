import p5 from "p5";
import Nino1 from "./Nino1";
import Nina2 from "./Nina2";
import Nina3 from "./Nina3";
import Objeto from "./Objeto";
import Microondas from "./Microondas";

import Main from "./Main";

export default class Logica {

	app: p5;
	nino1: Nino1;
	nina2: Nina2;
	nina3: Nina3;
	objeto?: Objeto;
	micro: Microondas;

	mesa: p5.Image;

	panal1: boolean;
	panal2: boolean;
	panal3: boolean;

	xNino1: number;
	xNino2: number;
	xNino3: number;
	yNino1: number;
	yNino2: number;
	yNino3: number;
	x1: number;
	x22: number;
	x23: number;
	x3: number;
	x4: number;
	x5: number;
	x6: number;
	y1: number;
	y22: number;
	y23: number;
	y3: number;
	y4: number;
	y5: number;
	y6: number;
	xbasura: number;
	ybasura: number;
	widthNino: number;
	heightNino: number;

	anchobarra: number;
	fondobarra: p5.Image;
	main: Main;

	constructor(main: Main) {
		this.main = main;
		this.app = this.main.app;

		this.widthNino = 182;
		this.heightNino = 290;
		this.xNino1 = 294;
		this.yNino1 = 206;
		this.xNino2 = 547;
		this.yNino2 = 138;
		this.xNino3 = 798;
		this.yNino3 = 198;
		this.nino1 = new Nino1(this.app, this, this.xNino1, this.yNino1, this.widthNino, this.heightNino);
		this.nina2 = new Nina2(this.app, this, this.xNino2, this.yNino2, this.widthNino, this.heightNino);
		this.nina3 = new Nina3(this.app, this, this.xNino3, this.yNino3, this.widthNino, this.heightNino);
		this.panal1 = false;
		this.panal2 = false;
		this.panal3 = false;

		this.x1 = 160;
		this.y1 = 630;

		this.x22 = 320;
		this.y22 = 630;

		this.x23 = 480;
		this.y23 = 630;

		this.x3 = 640;
		this.y3 = 630;

		this.x4 = 800;
		this.y4 = 630;

		this.x5 = 960;
		this.y5 = 630;

		this.x6 = 1120;
		this.y6 = 630;

		this.xbasura = 60;

		this.ybasura = 391;

		this.micro = new Microondas(this.app, this);

		this.mesa = this.app.loadImage("/img/2019/revoltosos/data/mesa.png");

		this.anchobarra = 300;
		this.fondobarra = this.app.loadImage("/img/2019/revoltosos/data/fondobarragrande.png");
	}

	pintar() {

		this.app.image(this.fondobarra, 650, 25);
		this.app.fill(255, 153, 0);
		this.app.rect(779, 31, this.anchobarra, 16);

		this.nino1.pintar();
		this.nino1.seleccionarNecesidad();
		this.nina2.pintar();
		this.nina2.seleccionarNecesidad();
		this.nina3.pintar();
		this.nina3.seleccionarNecesidad();

		this.app.image(this.mesa, 454, 360);

		//micro
		this.micro.pintar();

		if (this.objeto != null) {
			this.objeto.pintar();
		}
	}

	mousePressed() {

		//crear objetos desde los iconos-------------------------

		if (this.app.dist(this.x1, this.y1, this.app.mouseX, this.app.mouseY) < 65) {
			this.objeto = new Objeto(this.app, 1, this.app.mouseX, this.app.mouseY);
		}

		if (this.app.dist(this.x22, this.y22, this.app.mouseX, this.app.mouseY) < 65) {
			this.objeto = new Objeto(this.app, 22, this.app.mouseX, this.app.mouseY);
		}

		if (this.app.dist(this.x23, this.y23, this.app.mouseX, this.app.mouseY) < 65) {
			this.objeto = new Objeto(this.app, 23, this.app.mouseX, this.app.mouseY);
		}

		if (this.app.dist(this.x3, this.y3, this.app.mouseX, this.app.mouseY) < 65) {
			this.objeto = new Objeto(this.app, 3, this.app.mouseX, this.app.mouseY);
		}

		if (this.app.dist(this.x4, this.y4, this.app.mouseX, this.app.mouseY) < 65) {
			this.objeto = new Objeto(this.app, 4, this.app.mouseX, this.app.mouseY);
		}

		if (this.app.dist(this.x5, this.y5, this.app.mouseX, this.app.mouseY) < 65) {
			this.objeto = new Objeto(this.app, 5, this.app.mouseX, this.app.mouseY);
		}

		if (this.app.dist(this.x6, this.y6, this.app.mouseX, this.app.mouseY) < 65) {
			this.objeto = new Objeto(this.app, 66, this.app.mouseX, this.app.mouseY);
		}

		//recoger tetero del microondas--------------------------------

		if (this.app.mouseX > this.micro.getX() && this.app.mouseX < this.micro.getX() + 146
			&& this.app.mouseY > this.micro.getY() && this.app.mouseY < this.micro.getY() + 100) {
			if (this.micro.getEstado() == 2) {
				this.objeto = new Objeto(this.app, 6, this.app.mouseX, this.app.mouseY);
			}
		}

		//quitar pa�al a los ni�os---------------------------------

		if (this.app.mouseX > this.xNino1 && this.app.mouseX < this.xNino1 + this.widthNino
			&& this.app.mouseY > this.yNino1 && this.app.mouseY < this.yNino1 + this.heightNino) {
			this.panal1 = true;
		} else {
			this.panal1 = false;
		}

		if (this.app.mouseX > this.xNino2 && this.app.mouseX < this.xNino2 + this.widthNino
			&& this.app.mouseY > this.yNino2 && this.app.mouseY < this.yNino2 + this.heightNino) {
			this.panal2 = true;
		} else {
			this.panal2 = false;
		}

		if (this.app.mouseX > this.xNino3 && this.app.mouseX < this.xNino3 + this.widthNino
			&& this.app.mouseY > this.yNino3 && this.app.mouseY < this.yNino3 + this.heightNino) {
			this.panal3 = true;
		} else {
			this.panal3 = false;
		}
	}


	mouseDragged() {
		if (this.objeto != null) {
			this.objeto.mouseDragged();
		}
		if (this.panal1) {
			this.nino1.arrastrarPanal();
		}

		if (this.panal2) {
			this.nina2.arrastrarPanal();
		}

		if (this.panal3) {
			this.nina3.arrastrarPanal();
		}

	}

	mouseReleased() {

		//soltar en los ni�os---------------------------------------------
		if (this.app.mouseX > this.xNino1 && this.app.mouseX < this.xNino1 + this.widthNino
			&& this.app.mouseY > this.yNino1 && this.app.mouseY < this.yNino1 + this.heightNino) {
			if (this.objeto != null) {
				if (this.objeto.getTipo() == 6) {
					this.setmicro();
				}
				this.nino1.recibir(this.objeto.getTipo());
			}
		}

		if (this.app.mouseX > this.xNino2 && this.app.mouseX < this.xNino2 + this.widthNino
			&& this.app.mouseY > this.yNino2 && this.app.mouseY < this.yNino2 + this.heightNino) {
			if (this.objeto != null) {
				if (this.objeto.getTipo() == 6) {
					this.setmicro();
				}
				this.nina2.recibir(this.objeto.getTipo());
			}
		}

		if (this.app.mouseX > this.xNino3 && this.app.mouseX < this.xNino3 + this.widthNino
			&& this.app.mouseY > this.yNino3 && this.app.mouseY < this.yNino3 + this.heightNino) {
			if (this.objeto != null) {
				if (this.objeto.getTipo() == 6) {
					this.setmicro();
				}
				this.nina3.recibir(this.objeto.getTipo());
			}
		}

		//soltar en el microondas------------------------------------------------

		if (this.app.mouseX > this.micro.getX() && this.app.mouseX < this.micro.getX() + 146
			&& this.app.mouseY > this.micro.getY() && this.app.mouseY < this.micro.getY() + 100) {
			if (this.objeto != null) {
				this.micro.recibir(this.objeto.getTipo());
			}
		}

		this.objeto = undefined;

		//soltar pa�al en la basura---------------------

		this.nino1.soltarPanal();
		this.nina2.soltarPanal();
		this.nina3.soltarPanal();
	}

	barrafelicidad(i: number) {

		if (this.anchobarra == 300) {
			if (i > 0) {
				this.anchobarra += 0;
			} else {
				this.anchobarra += (i * 3);
			}
		} else if (this.anchobarra == 0) {
			this.anchobarra += 0;
		} else {
			this.anchobarra += (i * 3);
		}

	}

	getXbasura() {
		return this.xbasura;
	}

	getYbasura() {
		return this.ybasura;
	}

	setmicro() {
		this.micro.setEstado(0);
	}

	getPantalla() {
		return this.main.getPantalla();
	}

	
	getPuntaje() {
		return this.anchobarra / 3;
		/**Evaluacion --- 0 - 100 */
	}

	getAnchobarra() {
		return this.anchobarra;
	}

	settiemponecesidad(i: number) {
		this.nino1.setTiempopedir(i);
		this.nina2.setTiempopedir(i);
		this.nina3.setTiempopedir(i);

	}

}
