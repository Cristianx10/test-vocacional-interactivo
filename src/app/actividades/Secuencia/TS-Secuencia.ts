import { Interaccion } from '../../configuraciones/main';
/*
class Secuencia extends Interaccion {

    elementos: Array<SecuenciaElemento>;
    navegable?: Navegable;
    contenedor?: Contenedor;
    agregado: number;
    actual: number;
    nactual:number;
  
    constructor() {
        super();
        this.elementos = new Array();
        this.agregado = 0;
        this.actual = 0;
        this.nactual = 0;
        this.elemento.className = "secuencia";

        this.setAccionInicialActividad(()=>{
            this.start();
        });

        this.setAccionFinalActividad(()=>{
            this.terminar();
        });
    }

    agregar(element: HTMLElement, tiempo: number) {
        let e = new SecuenciaElemento(this, element, this.agregado, tiempo);
        this.elementos.push(e);
        this.agregado++;
    }

    agregarImg(ruta: string, tiempo: number) {
        let ima = document.createElement("img");
        ima.src = ruta;
        let e = new SecuenciaElemento(this, ima, this.agregado, tiempo);
        this.elementos.push(e);
        this.agregado++;
    }

    terminar() {
        if (this.navegable != null) {
            this.navegable.siguiente();
            this.navegable.ocultarProgreso();
            this.elemento.style.display = "none";
        }
    }


    crearTablero() {
        this.contenedor = new Contenedor();
        let elementos: Array<HTMLElement> = [];
        let tabla = document.createElement('div');
        let total = document.createElement('div');

        this.elementos.forEach((e: SecuenciaElemento) => {
            let ele: any = e.elemento.cloneNode();
            if (this.contenedor != null) {
                this.contenedor.agregar(new Contenido(ele, e, e.tiempo));
            }
            elementos.push(e.contenedor);
        });

        shuffle(elementos);

        elementos.forEach((e: any) => {
            total.append(e);
        });
        tabla.className = "tabla";
        total.className = "tabla__secuencia";
        tabla.append(total);

        this.contenedor.agregarHTML(tabla);

        this.navegable = new Navegable(this.contenedor);

        this.navegable.permitirAll = true;
        this.contenedor.incluirEn(this.elemento);
    
    }

    start() {
        if (this.navegable != null) {
            this.navegable.iniciar();
            this.navegable.colocarProgreso();
            this.navegable.colocarTiempo();
        }

       
    }


}

class SecuenciaElemento extends Interaccion {

    contenedor: HTMLElement;
    orden: number;
    padre: Secuencia;
    tiempo: number;
    seleccionado = false;
    actual:number;

    constructor(padre: Secuencia, elemento: HTMLElement, orden: number, tiempo: number) {
        super();
        this.padre = padre;
        this.tiempo = tiempo;
        this.contenedor = document.createElement("div");
        this.elemento = elemento;
        this.contenedor.append(this.elemento);
        this.contenedor.className = "contenedor__imagen";
        this.orden = orden;
        this.tipoId = "Secuencia";
        this.actual = 0;

        this.elemento.addEventListener("click", (e: any) => {
            let clasname = this.contenedor.className;

            if (this.seleccionado == false) {

                this.contenedor.className = clasname + " selecionado";
                if (this.padre.actual == this.orden) {
                    this.padre.aciertos++;
                    this.padre.intentos++;
                    this.aciertos++;
                    if (this.padre.intentoAcierto != null) {
                        this.padre.intentoAcierto();
                    }
                } else {
                    this.padre.fallos++;
                    this.fallos++;
                    this.padre.intentos++;
                    this.registroOpcional();
                    if (this.padre.intentoFallo != null) {
                        this.padre.intentoFallo();
                    
                    }
                }
                this.padre.actual++;
                console.log(this.padre.actual, this.padre.elementos.length)
                if (this.padre.actual >= this.padre.elementos.length) {

                    let respuesta = false;
                    if (this.padre.aciertos >= this.padre.elementos.length) {
                        respuesta = true;
                        this.padre.valido = true;
                        this.valido = true;
                        this.registroOpcional();

                    }
                  

                    if (this.padre.validacion != null) {
                        this.padre.validacion(respuesta);
                    }

                   
                }
            }
            this.seleccionado = true;
        });
    }


}
*/

