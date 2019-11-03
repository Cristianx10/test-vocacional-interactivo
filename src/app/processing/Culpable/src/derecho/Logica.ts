import p5 from "p5";
import Tutorial from "./Tutorial";
import Sospechoso from "./Sospechoso";
import Boton from "./Boton";
import Processing from '../../../../componentes/Processing/Processing';
import ProcessingContext from '../../../../comunicacion/ProcessingContext';

export default class Logica {

	app: p5;
	pantalla: number;
	heebo: p5.Font;
	muli: p5.Font;

	caso: p5.Image;
	ganar: p5.Image;
	perder: p5.Image;
	gusto: p5.Image;

	fondo: p5.Image;
	menu: p5.Image;
	confirmacion: p5.Image;
	mouseCulpar: p5.Image;

	sospechosos: Sospechoso[];
	botones: Boton[];
	reportes: p5.Image[];
	contadorBoton: number;
	culpar: number;
	sElegido: number;
	dialogo: string;
	indexDialogo: number;
	tutorial: Tutorial;
	puntos: number;

	processing?: Processing;
	propiedades: any;

	constructor(app: p5) {
		this.app = app;

		this.processing = ProcessingContext.actividad;
		if (this.processing) {
			this.propiedades = this.processing.propiedades ;
		}

		this.app.background(212);
		this.heebo = this.app.loadFont("/img/2019/culpable/data/Heebo-Bold.ttf");
		this.app.textAlign(this.app.CENTER);
		this.app.textFont(this.heebo);
		this.app.text("Cargando", this.app.width / 2, this.app.height / 2);

		this.muli = this.app.loadFont("/img/2019/culpable/data/Muli-Regular.ttf");
		this.sospechosos = [];
		this.reportes = [];
		for (let i = 0; i < 4; i++) {
			this.sospechosos.push(new Sospechoso(this.app, i));
			this.reportes.push(this.app.loadImage("/img/2019/culpable/data/pj" + i + "reporte.png"));
		}
		this.botones = [];
		this.botones.push(new Boton(this.app, 418, 637, "culpar"));
		this.botones.push(new Boton(this.app, 418, 637, "hablar"));
		this.botones.push(new Boton(this.app, 25, 637, "volver"));
		this.botones.push(new Boton(this.app, 418, 637, "continuar"));

		this.caso = this.app.loadImage("/img/2019/culpable/data/pantallaCaso.png");
		this.fondo = this.app.loadImage("/img/2019/culpable/data/fondo.png");
		this.menu = this.app.loadImage("/img/2019/culpable/data/barra.png");
		this.confirmacion = this.app.loadImage("/img/2019/culpable/data/confirmacion.png");
		this.mouseCulpar = this.app.loadImage("/img/2019/culpable/data/mouseCulpar.png");
		this.dialogo = "";
		this.indexDialogo = 0;

		this.culpar = 2;
		this.sElegido = 0;
		this.contadorBoton = 0;
		this.pantalla = 0;
		this.puntos = 0;

		this.tutorial = new Tutorial(app);
		this.ganar = this.app.loadImage("/img/2019/culpable/data/ganar.png");
		this.perder = this.app.loadImage("/img/2019/culpable/data/perder.png");
		this.gusto = this.app.loadImage("/img/2019/culpable/data/gusto.png");

	}

	//------------------------------------------------------------- PINTAR
	pintar() {

		this.contadorBoton++;
		switch (this.pantalla) {

			case 0:

				this.tutorial.pintar();

				break;
			case 1:
				this.app.image(this.caso, 0, 0);
				break;

			case 2:
				this.app.image(this.fondo, 0, 0);

				this.pintarSospechosos();

				this.app.image(this.menu, 0, 606);

				if (this.culpar == 0) {
					this.app.cursor("/img/2019/culpable/data/mouseCulpar.png");
				} else {
					this.app.cursor(this.app.ARROW);
				}
				break;

			case 3:
				this.app.image(this.reportes[0], 0, 0);
				break;

			case 4:
				this.app.image(this.reportes[1], 0, 0);
				break;

			case 5:
				this.app.image(this.reportes[2], 0, 0);
				break;

			case 6:
				this.app.image(this.reportes[3], 0, 0);
				break;

			case 7:
				this.pintarDialogo(0);
				break;

			case 8:
				this.pintarDialogo(1);
				break;

			case 9:
				this.pintarDialogo(2);
				break;

			case 10:
				this.pintarDialogo(3);
				break;

			case 11:
				this.app.image(this.ganar, 0, 0);
				this.app.image(this.menu, 0, 606);
				break;

			case 12:
				this.app.image(this.perder, 0, 0);
				this.app.image(this.menu, 0, 606);
				break;

			case 13:
				if (this.processing) {
					this.processing.continuar();
				}
				this.propiedades.puntuacion = this.terminarJuego();
				this.app.image(this.gusto, 0, 0);
				break;
		}

		this.pintarBotones();


		if (this.culpar == 1) {
			this.app.fill(0, 120);
			this.app.rect(0, 0, this.app.width, this.app.height);
			this.app.fill(0);
			this.app.imageMode(this.app.CENTER);
			this.app.image(this.confirmacion, this.app.width / 2, this.app.height / 2);
			this.app.imageMode(this.app.CORNER);
		}

		let mX = this.app.mouseX;
		let mY = this.app.mouseY;
		//this.app.text("X: " + mX + "   Y: " + mY, mX + 20, mY);
	}

	//----------------------------------------------- MOUSE
	soltarMouse() {
		let mX = this.app.mouseX;
		let mY = this.app.mouseY;



		switch (this.pantalla) {

			case 0:
				if (this.tutorial.interaccionMouse()) {
					this.pantalla++;
				}
				break;
			case 1:
				if (mX > 418 && mX < 862 && mY < 689 && mY > 637 && this.contadorBoton > 30) {
					this.contadorBoton = 0;
					this.pantalla++;

				}
				break;

			case 2:
				if (this.culpar == 2) {
					for (let i = 0; i < this.sospechosos.length; i++) {

						let x = 21 + (i * 307);
						let y = 83;

						switch (i) {
							case 1:
								x = i * 307;
								y = 99;
								break;

							case 2:
								y = 133;
								break;

							case 3:
								y = 128;
						}

						if (this.sospechosos[i].validarPj(x, y)) {
							this.pantalla = 3 + i;
						}
					}

					if (this.botones[2].validar() && this.contadorBoton > 30) {
						this.pantalla = 1;
						this.contadorBoton = 0;
					}

					if (this.botones[0].validar() && this.contadorBoton > 30) {
						this.culpar = 0;
						this.contadorBoton = 0;
					}

				} else if (this.culpar == 0) {
					for (let i = 0; i < this.sospechosos.length; i++) {

						let x = 21 + (i * 307);
						let y = 83;

						switch (i) {
							case 1:
								x = i * 307;
								y = 99;
								break;

							case 2:
								y = 133;
								break;

							case 3:
								y = 128;
						}

						if (this.sospechosos[i].validarPj(x, y) && this.contadorBoton > 30) {
							this.sElegido = i;
							this.culpar = 1;
							this.contadorBoton = 0;
						}
					}
				} else if (this.culpar == 1) {
					if (mX > 427 && mX < 564 && mY > 375 && mY < 438) {
						if (this.sElegido == 3) {
							this.pantalla = 11;
							this.puntos += 100;
						} else {
							this.pantalla = 12;
						}

						let tiempo = (this.app.millis() / 1000);
						let minutos = (tiempo / 60);
						if (minutos < 5) this.puntos += 50 - (minutos * 10);
						this.culpar = 2;
					} else if (mX > 717 && mX < 853 && mY > 375 && mY < 437) {
						this.culpar = 2;
					}
				}

				break;

			case 3:
				if (this.botones[1].validar() && this.contadorBoton > 30) {
					this.pantalla = 7;
					this.contadorBoton = 0;
				}
				break;

			case 4:
				if (this.botones[1].validar() && this.contadorBoton > 30) {
					this.pantalla = 8;
					this.contadorBoton = 0;
				}
				break;

			case 5:
				if (this.botones[1].validar() && this.contadorBoton > 30) {
					this.pantalla = 9;
					this.contadorBoton = 0;
				}
				break;

			case 6:
				if (this.botones[1].validar() && this.contadorBoton > 30) {
					this.pantalla = 10;
					this.contadorBoton = 0;
				}
				break;

			case 7:
				if (this.botones[2].validar() && this.contadorBoton > 30) {
					this.pantalla = 3;
					this.contadorBoton = 0;
					this.indexDialogo = 0;
					this.dialogo = "";
				}
				this.clickearDialogo(0);
				break;

			case 8:
				if (this.botones[2].validar() && this.contadorBoton > 30) {
					this.pantalla = 4;
					this.contadorBoton = 0;
					this.indexDialogo = 0;
					this.dialogo = "";
				}
				this.clickearDialogo(1);
				break;

			case 9:
				if (this.botones[2].validar() && this.contadorBoton > 30) {
					this.pantalla = 5;
					this.contadorBoton = 0;
					this.indexDialogo = 0;
					this.dialogo = "";
				}
				this.clickearDialogo(2);
				break;

			case 10:
				if (this.botones[2].validar() && this.contadorBoton > 30) {
					this.pantalla = 6;
					this.contadorBoton = 0;
					this.indexDialogo = 0;
					this.dialogo = "";
				}

				this.clickearDialogo(3);
				break;

			case 13:
				if (mX > 214 && mX < 538 && mY > 585 && mY < 635) {
					this.puntos += 50;

				} else if (mX > 742 && mX < 1065 && mY > 585 && mY < 635) {

				}
				break;
		}

		if (this.pantalla > 2 && this.pantalla <= 6 && this.botones[2].validar() && this.contadorBoton > 30) {
			this.pantalla = 2;
			this.contadorBoton = 0;
			this.indexDialogo = 0;
			this.dialogo = "";
		}

		if ((this.pantalla == 11 || this.pantalla == 12) && this.botones[3].validar()) {
			this.pantalla = 13;
		}
	}

	pintarBotones() {

		if (this.pantalla == 2) {
			this.botones[0].pintar();
		} else if ((this.pantalla > 2 && this.pantalla <= 6)) {
			this.botones[1].pintar();
		}
		if (this.pantalla == 11 || this.pantalla == 12) {
			this.botones[3].pintar();
		}

		if (this.pantalla > 1 && this.pantalla != 11 && this.pantalla != 12) this.botones[2].pintar();
	}

	pintarSospechosos() {

		for (let i = 0; i < this.sospechosos.length; i++) {
			let x = 21 + (i * 307);
			let y = 83;

			switch (i) {
				case 1:
					x = i * 307;
					y = 99;
					break;

				case 2:
					y = 133;
					break;

				case 3:
					y = 128;
			}

			this.sospechosos[i].pintar(x, y);
		}
	}

	pintarDialogo(index: number) {
		this.app.image(this.fondo, 0, 0);
		let s: Sospechoso = this.sospechosos[index];

		if (index < 2) {
			s.pintarPjDialogo(100, 120);
			this.app.fill(255);
			this.app.rect(500, 80, 600, 200, 20);

			this.app.fill(0);
			if (this.dialogo.length < s.getRespuestas()[this.indexDialogo].length) {
				this.dialogo += (s.getRespuestas()[this.indexDialogo].charAt(this.dialogo.length));
			}

			this.app.textFont(this.muli);
			this.app.text(this.dialogo.toString(), 510, 100, 580, 200);


			for (let i = 0; i < s.getPreguntas().length; i++) {
				this.app.fill(255);
				this.app.rect(500, 290 + (50 * i), 600, 40, 10);

				this.app.fill(0);
				this.app.text(s.getPreguntas()[i], 800, 320 + (50 * i));
			}

			this.app.textFont(this.heebo);
		} else {
			s.pintarPjDialogo(890, 120);

			this.app.fill(255);
			this.app.rect(100, 80, 600, 200, 20);

			this.app.fill(0);
			if (this.dialogo.length < s.getRespuestas()[this.indexDialogo].length) {
				this.dialogo += (s.getRespuestas()[this.indexDialogo].charAt(this.dialogo.length));
			}

			this.app.textFont(this.muli);
			this.app.text(this.dialogo.toString(), 110, 100, 580, 200);


			for (let i = 0; i < s.getPreguntas().length; i++) {
				this.app.fill(255);
				this.app.rect(100, 290 + (50 * i), 600, 40, 10);

				this.app.fill(0);
				this.app.text(s.getPreguntas()[i], 400, 320 + (50 * i));
			}
		}


		this.app.image(this.menu, 0, 606);
	}

	clickearDialogo(index: number) {
		let s: Sospechoso = this.sospechosos[index];

		let mX = this.app.mouseX;
		let mY = this.app.mouseY;

		if (index < 2) {

			for (let i = 0; i < s.getPreguntas().length; i++) {
				if (mX > 500 && mX < 1100 && mY > 290 + (50 * i) && mY < 330 + (50 * i)) {
					this.dialogo = "";
					this.indexDialogo = i + 1;
				}
			}

		} else {

			for (let i = 0; i < s.getPreguntas().length; i++) {
				if (mX > 100 && mX < 700 && mY > 290 + (50 * i) && mY < 330 + (50 * i)) {
					this.dialogo = "";
					this.indexDialogo = i + 1;
				}
			}
		}
	}

	terminarJuego() {
		//this.app.stop();
		return this.puntos;
	}
}
