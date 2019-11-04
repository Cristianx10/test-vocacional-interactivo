import Personaje from "./Personaje";
import APollitos, { Coordenada } from "./Logica";
import * as createjs from 'createjs-module';

class Zona {
    personajes: Personaje[];
    escenario: APollitos;
    pos: Coordenada;
    stage: createjs.Stage;

    constructor(escenario: APollitos, pos: Coordenada) {
        this.escenario = escenario;
        this.stage = this.escenario.stage;
        this.pos = pos;
        this.personajes = [];
    }

    acomodar() {
        this.personajes.forEach((p, i) => {
            p.setPos(this.pos.x + (i * 60), this.pos.y);
        })
        this.stage.update();
    }

    agregar(personaje: Personaje) {
        this.personajes.push(personaje);
        personaje.setPos(this.pos.x + ((this.personajes.length - 1) * 60), this.pos.y);
        //this.acomodar();
    }

    agregarAnim(personaje: Personaje) {
        this.personajes.push(personaje);
        personaje.setPosAnim(this.pos.x + ((this.personajes.length - 1) * 60), this.pos.y);
        // this.acomodar();
       
    }

    quitar(personaje: Personaje) {

        let index = this.personajes.indexOf(personaje);
        if (index != -1) {
            this.personajes.splice(index, 1);
        }
        this.acomodar();
    }

    evaluar() {
        let nZorros = 0;
        let nPollos = 0;
        
        this.personajes.forEach((p) => {
            if (p.type == "pollito") {
                nPollos++;
            } else {
                nZorros++;
            }
        });

        if (this.escenario.zonaActiva == this) {
            this.escenario.barca.personajes.forEach((p) => {
                if (p.type == "pollito") {
                    nPollos++;
                } else {
                    nZorros++;
                }
            });
        }
  
        
        if (nZorros > nPollos && nPollos != 0) {
            this.escenario.propiedades.fallos++;
            this.escenario.propiedades.vidas--;
            this.escenario.doIntentoFallo();
        } else {
            this.escenario.propiedades.aciertos++;
            this.escenario.doIntentoAcierto();
        }

        if(this.escenario.zonaActiva == this.escenario.zonaB){
            if(this.escenario.personajes.length == (nZorros + nPollos)){
                this.escenario.propiedades.validado = true;
                this.escenario.doValidacion();
            }
        }
    }

    reset() {
        this.personajes = [];
    }
}

export default Zona;