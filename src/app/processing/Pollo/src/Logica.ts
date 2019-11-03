import { Actividad } from '../../../configuraciones/main';
import * as createjs from 'createjs-module';

class APollitos extends Actividad {
    personajes: Personaje[]
    carga: createjs.LoadQueue;

    barca: Barca;
    constructor() {
        super();
        this.personajes = [];
        this.carga = new createjs.LoadQueue(true);

        createjs.Ticker.addEventListener("tick", this.stage);
        this.agregar("pollito", { x: 100, y: 100 });
        this.agregar("pollito", { x: 100, y: 100 });
        this.agregar("pollito", { x: 100, y: 100 });
        this.agregar("", { x: 100, y: 100 });
        this.agregar("", { x: 100, y: 100 });
        this.agregar("", { x: 100, y: 100 });
        this.barca = new Barca(this);
    }

    agregar(tipo: string, pos: { x: number, y: number }) {
        if (tipo == "pollito") {
            let person = new Personaje(this, tipo);
            this.personajes.push(person);

        } else {
            let person = new Personaje(this);
            this.personajes.push(person);
        }

    }
}


class Personaje {

    vista: createjs.Bitmap;
    escenario: APollitos;
    stage: createjs.Stage;
    carga: createjs.LoadQueue;
    type: string;

    constructor(escenario: APollitos, type?: string) {
        if (type) {
            this.type = type;
            this.vista = new createjs.Bitmap("/img/2019/pollo/img/pollo.png");
        } else {
            this.type = "zorro";
            this.vista = new createjs.Bitmap("/img/2019/pollo/img/zorro.png");
        }
        this.escenario = escenario;
        this.stage = this.escenario.stage;
        this.carga = this.escenario.carga;

        this.stage.addChild(this.vista);
        this.stage.update();
    }

    setPos(pos: { x: number, y: number }) {
        this.vista.x = pos.x;
        this.vista.y = pos.y;
    }
}

class Barca {

    vista: createjs.Bitmap;
    escenario: APollitos;
    stage: createjs.Stage;
    carga: createjs.LoadQueue;

    constructor(escenario: APollitos) {
        this.escenario = escenario;
        this.stage = this.escenario.stage;
        this.carga = this.escenario.carga;
        this.vista = new createjs.Bitmap("/img/2019/pollo/img/barca.png")
        this.vista.x = 100;
        this.vista.y = 100;
        this.stage.addChild(this.vista);
        this.stage.update();
    }
}

export default APollitos;