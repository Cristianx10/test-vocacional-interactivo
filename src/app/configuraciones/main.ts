import * as createjs from 'createjs-module';

import { IObjectValidable, GResultados, ICategoria, resultados } from '../resultados/resultados';



/*--------------------------------------------------------------
## Interaccion
*Se ocupa de las interacciones hechas en HTML que NO usan canvas
--------------------------------------------------------------*/
 var init_arrastrables:number = 0;

 export function addAgregarRegistroArrastrable(){
    init_arrastrables += 1;
    return init_arrastrables + 0;
}

export class Interaccion implements IObjectValidable {

    propiedades: any;
    acciones: any;

    elemento: HTMLElement;
/*
    puntos: number;
    aciertos: number;
    fallos: number;
    intentos: number;*/
    valido: boolean;

    validacion?: Function;
    intentoFallo?: Function;
    intentoAcierto?: Function;
    intento?: Function;


    tipoId: string;

    registro?:GResultados;


    constructor() {
        /*
        this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;
        this.puntos = 0;*/

        this.valido = true;
        this.elemento = document.createElement('div');
        this.elemento.className = "interaccion";
        this.tipoId = "pregunta";

        this.acciones = {};
        this.propiedades = {};
        let tempRegister = resultados.agregar(this);
        if (tempRegister !== null) {
            this.registro = tempRegister;
        }
    }

    /**Metodos de accion */

    doIntento() {
        if (this.intento) {
            this.intento(this.propiedades, this.acciones);
        }
    }

    doIntentoAcierto() {
        if (this.intentoAcierto) {
            this.intentoAcierto(this.propiedades, this.acciones);
        }
    }

    doIntentoFallo() {
        if (this.intentoFallo) {
            this.intentoFallo(this.propiedades, this.acciones);
        }
    }

    doValidacion() {
        if (this.validacion) {
            this.validacion(this.propiedades, this.acciones);
        }
    }

    validar(id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) {
        if(this.registro !== undefined){
            this.registro.agregarCondicion(id, accion, descripcion, valorMaximo, this);
        }
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

    setIntento(intento: Function) {
        this.intento = intento;
    }

    setIntentoFallo(intentoFallo: Function) {
        this.intentoFallo = intentoFallo;
    }

    setIntentoAcierto(intentoAcierto: Function) {
        this.intentoAcierto = intentoAcierto;
    }

/*
    setValidar(validar: Function) {
        this.validar = validar;
    }
    */

    incluirEnEtiqueta(ubicacion: string) {
        let u: any = document.querySelector(ubicacion);
        u.append(this.elemento);
    }

    incluirEn(ubicacion: HTMLElement) {
        ubicacion.append(this.elemento);
    }

    getElemento() {
        return this.elemento;
    }



}

/*--------------------------------------------------------------
## Interaccion
*Se ocupa de las interacciones hechas en HTML que usan canvas
--------------------------------------------------------------*/

export class Actividad implements IObjectValidable {


    stage: createjs.Stage;
    contenedor: createjs.Container;
    canvas: HTMLCanvasElement;
    elemento: HTMLElement;

    // aciertos: number;
    // fallos: number;
    // intentos: number;
    valido: boolean;

    validacion?: Function;
    intentoFallo?: Function;
    intentoAcierto?: Function;
    intento?: Function;

    tipoId: string;

    propiedades: any;
    acciones: any;

    registro: GResultados;


    constructor() {
        this.canvas = document.createElement("canvas");
        this.stage = new createjs.Stage(this.canvas);
        this.contenedor = new createjs.Container();
        this.stage.addChild(this.contenedor);
        this.elemento = document.createElement('div');
        this.elemento.className = "actividad";
        this.elemento.append(this.canvas);

        /*this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;*/
        this.valido = true;
        this.tipoId = "Interaccion";
        this.propiedades = {};

        this.acciones = {};

        this.registro = resultados.agregar(this);
        

        this.acciones.validar = (id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) => {
            this.validar(id, accion, descripcion, valorMaximo);
        };
    }

    validar(id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) {
        if(this.registro !== undefined){
            this.registro.agregarCondicion(id, accion, descripcion, valorMaximo, this);
        }
    }

    update() {
        this.stage.update();
    }

    size(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    incluirEn(lugar?: HTMLElement) {
        if(lugar)
        lugar.append(this.elemento);
        this.update();
    }

    /**Metodos de accion */

    doIntento() {
        if (this.intento) {
            this.intento(this.propiedades, this.acciones);
        }
    }

    doIntentoAcierto() {
        if (this.intentoAcierto) {
            this.intentoAcierto(this.propiedades, this.acciones);
        }
    }

    doIntentoFallo() {
        if (this.intentoFallo) {
            this.intentoFallo(this.propiedades, this.acciones);
        }
    }

    doValidacion() {
        if (this.validacion) {
            this.validacion(this.propiedades, this.acciones);
        }
    }

    /**Cambio de comportamientos */


    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

    setIntento(intento: Function) {
        this.intento = intento;
    }

    setIntentoFallo(intentoFallo: Function) {
        this.intentoFallo = intentoFallo;
    }

    setIntentoAcierto(intentoAcierto: Function) {
        this.intentoAcierto = intentoAcierto;
    }

    capturarCanvas(){
        this.propiedades.captura = this.canvas.toDataURL('image/png');
    }


    getElemento(id?: string) {
        if (id != null) {
            this.elemento.id = id;
        }
        return this.elemento;
    }

}


/*--------------------------------------------------------------
## goTo

*Permite cargar un bloque html de otra actividad que este ubicada en un html distinto
*NOTA: Requiere de la libreria de Jquery.JS
--------------------------------------------------------------*/
export function goTo(url: string) {
    window.location.href = url;
}







/**
 *  Obtener el tamaño de los divs
 *
 *  var ti = this.refs.conten;

    setTimeout(()=>{
      console.log("width" ,ti.clientWidth, "height",ti.clientHeight);
      console.log("posX", ti.getBoundingClientRect().x ,"posY", ti.getBoundingClientRect().y );
      let r = document.createElement("div");

      ti.parentNode.style.position = "relative";
      r.style.position = "absolute";
      r.style.top = ti.getBoundingClientRect().y - ti.parentNode.getBoundingClientRect().y + "px";
      r.style.left = ti.getBoundingClientRect().x - ti.parentNode.getBoundingClientRect().x + "px";
      r.style.width = "50px";
      r.style.height = "50px";


      r.style.background = "red";

      ti.appendChild(r);
      console.log();

    }, 1000);


 */