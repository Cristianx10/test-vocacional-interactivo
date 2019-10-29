import p5 = require('p5');
import Logica from './Logica';


export default class Nina3 {

	necesidad: number;
	app: p5;
	contador: number;
	tiempopedir: number = 0;

	x: number;
	y: number;

	ancho: number;
	alto: number;

	xpanal: number = 0;
	ypanal: number = 0;

	log: Logica;
	r: number;
	g: number;
	b: number;

	anchobarra: number;
	altobarra: number;

	contadorbarra: number;

	error: number;

	nino: p5.Image;
	ninopide: p5.Image;
	ninotriste: p5.Image;
	barra: p5.Image;
	ninopanal: p5.Image;
	ninopanitos: p5.Image;
	ninolimpio: p5.Image;
	uno: p5.Image;
	dos: p5.Image;
	dosdos: p5.Image;
	dostres: p5.Image;
	tres: p5.Image;
	cuatro: p5.Image;
	cinco: p5.Image;
	seis: p5.Image;
	panalsucio: p5.Image;

	iniciarcontador: boolean;

	constructor(app: p5, log: Logica, x: number, y: number, ancho: number, alto: number) {
		this.app = app;
		this.log = log;
		this.x = x;
		this.y = y;
		this.ancho = ancho;
		this.alto = alto;
		this.necesidad = 0;
		this.contador = 0;
		this.iniciarcontador = true;
		this.r = 0;
		this.g = 222;
		this.b = 211;
		this.anchobarra = 96;
		this.altobarra = 12;
		this.contadorbarra = 0;
		this.error = 0;
		this.nino = this.app.loadImage("/img/2019/revoltosos/data/girl_morena_feliz.png");
		this.ninopide = this.app.loadImage("/img/2019/revoltosos/data/girl_morena_pidiendo.png");
		this.ninotriste = this.app.loadImage("/img/2019/revoltosos/data/boy_llorando.png");
		this.barra = this.app.loadImage("/img/2019/revoltosos/data/barraindividual.png");
		this.dos = this.app.loadImage("/img/2019/revoltosos/data/necesidad_panalsucio.png");
		this.uno = this.app.loadImage("/img/2019/revoltosos/data/necesidad_cancion.png");
		this.dosdos = this.app.loadImage("/img/2019/revoltosos/data/necesidad_panitos.png");
		this.dostres = this.app.loadImage("/img/2019/revoltosos/data/necesidad_panal.png");
		this.tres = this.app.loadImage("/img/2019/revoltosos/data/necesidad_juguetes.png");
		this.cuatro = this.app.loadImage("/img/2019/revoltosos/data/necesidad_medicam.png");
		this.cinco = this.app.loadImage("/img/2019/revoltosos/data/necesidad_leer.png");
		this.seis = this.app.loadImage("/img/2019/revoltosos/data/necesidad_comida.png");
		this.ninopanal = this.app.loadImage("/img/2019/revoltosos/data/girl_morenita_popis.png");
		this.ninopanitos = this.app.loadImage("/img/2019/revoltosos/data/girl_morenita_panitos.png");
		this.ninolimpio = this.app.loadImage("/img/2019/revoltosos/data/girl_morenita_limpia.png");

		this.panalsucio = this.app.loadImage("/img/2019/revoltosos/data/panalsucio.png");
	}

	pintar() {
		switch (this.necesidad) {
			case 0: // estado normal
				this.app.image(this.nino, this.x, this.y);
				break;

			case 1:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.uno, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 2: //pa�al

				this.app.image(this.ninopanal, this.x, this.y);
				this.app.image(this.dos, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 22: //sucio

				this.app.image(this.ninopanitos, this.x, this.y);
				this.app.image(this.dosdos, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 23: //limpio pero sin pa�al
				this.app.image(this.ninolimpio, this.x, this.y);
				this.app.image(this.dostres, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 3:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.tres, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 4:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.cuatro, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 5:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.cinco, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 6:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.seis, this.x + 185, this.y - 22);
				this.barraProgress();
				break;

			case 7: // estado de enojado
				this.app.image(this.ninotriste, this.x - 1, this.y);
				this.barraProgress();
				break;
		}
	}

	seleccionarNecesidad() {//---------------------------------------------------------------------------------------------
		if (this.log.getPantalla() == 3) {
			if (this.iniciarcontador) {
				this.contador = this.app.millis();
				this.iniciarcontador = false;
				let randomtiempo = parseInt(this.app.random(2, 6) + "");
				this.tiempopedir = randomtiempo * 1000;
			}
			let aleatorio = parseInt(this.app.random(5000, 10000) + "");
			if (this.necesidad == 0) {
				console.log("Nina3 tiempo:" + this.tiempopedir);
				if (parseInt(this.app.millis() + "") - this.contador >= this.tiempopedir) {
					this.necesidad = parseInt(this.app.random(1, 7) + "");
					this.contadorbarra = this.app.millis();
				}
			}
		}
	}

	recibir(i: number) {
		if (i == this.necesidad) {
			if (this.necesidad == 22) {
				this.necesidad = 23;
			} else {
				//System.out.println("Correcto");
				this.necesidad = 0;
				this.contador = this.app.millis();
				this.error = -1;
				this.calcularfelicidad();
			}
		} else {
			this.error = 1;
			this.calcularfelicidad();
			//System.out.println("Incorrecto");
		}
	}

	barraProgress() {

		this.app.image(this.barra, this.x + 30, this.y - 36);
		this.app.noStroke();
		this.app.fill(this.r, this.g, this.b);
		if (this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12) - this.error >= 0) {
			this.app.rect(this.x + 71, this.y - 27, this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12) - this.error, this.altobarra);
			this.error = 0;
		}
	}

	arrastrarPanal() {
		if (this.necesidad == 2) {
			this.xpanal = this.app.mouseX - 41;
			this.ypanal = this.app.mouseY - 36;
			this.app.image(this.panalsucio, this.xpanal, this.ypanal);
		}
	}

	soltarPanal() {
		if (this.necesidad == 2) {
			//System.out.println("tiene pa�al sucioooooooooooooooooooooooooo");
			if (this.xpanal + 41 > this.log.getXbasura() && this.xpanal + 41 < this.log.getXbasura() + 71
				&& this.ypanal + 36 > this.log.getYbasura() && this.ypanal + 36 < this.log.getYbasura() + 121) {
				//System.out.println("solto pa�aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal");
				this.necesidad = 22;
				this.xpanal = this.x + this.ancho / 2;
				this.ypanal = this.y + this.alto / 2;
			} else {
				this.xpanal = this.x + this.ancho / 2;
				this.ypanal = this.y + this.alto / 2;
			}
		}
	}

	calcularfelicidad() {
		if (this.error == 1) {
			this.log.barrafelicidad(-4);
		} else {
			if (((this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12)) / 12) >= 5) {
				//System.out.println("envi� feliiiz");
				this.log.barrafelicidad(4);
			} else if (((this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12)) / 12) >= 1) {
				//System.out.println("envi� normaaaal");
				this.log.barrafelicidad(0);
			} else if (((this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12)) / 12) <= 0) {
				//System.out.println("envi� tristeeee");
				this.log.barrafelicidad(-4);
			}
		}
	}

	setTiempopedir(tiempopedir: number) {
		this.tiempopedir = tiempopedir;
	}



}