import p5 from "p5";
import Logica from './Logica';
import Nino from './Nino';


export default class Nino1 extends Nino {

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

	constructor(log: Logica, x: number, y: number, ancho: number, alto: number) {
		super(log, x, y, ancho, alto);

		this.nino = this.app.loadImage("/img/2019/revoltosos/data/boy_feliz.png");
		this.ninopide = this.app.loadImage("/img/2019/revoltosos/data/boy_pidiendo.png");
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
		this.ninopanal = this.app.loadImage("/img/2019/revoltosos/data/boy_popis.png");
		this.ninopanitos = this.app.loadImage("/img/2019/revoltosos/data/boy_panitos.png");
		this.ninolimpio = this.app.loadImage("/img/2019/revoltosos/data/boy_limpio.png");


	}

	pintar() {
		switch (this.necesidad) {
			case 0: // estado normal
				this.app.image(this.nino, this.x, this.y);
				break;

			case 1:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.uno, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 2: //pa�al

				this.app.image(this.ninopanal, this.x, this.y);
				this.app.image(this.dos, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 22: //sucio

				this.app.image(this.ninopanitos, this.x, this.y);
				this.app.image(this.dosdos, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 23: //limpio pero sin pa�al
				this.app.image(this.ninolimpio, this.x, this.y);
				this.app.image(this.dostres, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 3:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.tres, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 4:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.cuatro, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 5:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.cinco, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 6:
				this.app.image(this.ninopide, this.x, this.y);
				this.app.image(this.seis, this.x + 166, this.y - 22);
				this.barraProgress();
				break;

			case 7: // estado de enojado
				this.app.image(this.ninotriste, this.x - 1, this.y);
				this.barraProgress();
				break;
		}
	}


	barraProgress() {

		this.app.image(this.barra, this.x, this.y - 36);
		this.app.noStroke();
		this.app.fill(this.color.r, this.color.g, this.color.b);
		if (this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12) - this.error >= 0) {
			this.app.rect(this.x + 41, this.y - 27, this.anchobarra - (((this.app.millis() - this.contadorbarra) / 1000) * 12) - this.error, this.altobarra);
			this.error = 0;
		}
	}






}