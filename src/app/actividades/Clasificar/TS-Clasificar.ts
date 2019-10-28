import { Interaccion } from '../../configuraciones/main';

import $ from "jquery";
import 'jquery-ui-bundle';
import { Almacen, Zona } from './Clasificar';
/*
interface ElementoClacificable {
    clasificado: boolean;
    categoria: string;
    elemento: HTMLElement;
    acerto: number;
    fallos: number;
    intentos: number;

    contenedor?: Almacenamiento;

    padre?: AClasificar;
}
/*
class Clasificar_elemento implements ElementoClacificable {
    elemento: HTMLElement;
    validado: boolean;
    clasificado = false;
    padre?: AClasificar;
    categoria: string;
    contenedor: any;

    acerto: number;
    fallos: number;
    intentos: number;




    constructor(url: string, categoria: string) {
        this.elemento = document.createElement('div');
        let img = document.createElement('img');
        this.categoria = categoria;

        this.validado = true;
        this.elemento.append(img);
        img.className = "recurso";

        img.src = url;
        this.elemento.style.marginTop = Math.floor((Math.random() * 40) + 1) + "px";
        this.elemento.style.marginBottom = Math.floor((Math.random() * 40) + 1) + "px";
        this.elemento.style.marginRight = Math.floor((Math.random() * 62) + 1) + "px";
        this.elemento.style.marginLeft = Math.floor((Math.random() * 62) + 1) + "px";


        this.elemento.addEventListener("mousedown", () => {
            if (this.padre != null) {
                this.padre.seleccion = this;

            }
        });

        this.acerto = 0;
        this.fallos = 0;
        this.intentos = 0;;

    }

    validar() {
        this.clasificado = true;
    }
}
*/
class Clasificar_elemento {

    elemento: HTMLElement;
    validado: boolean;
    clasificado = false;
    padre?: AClasificar;
    categoria: string;
    contenedor?: Almacenamiento;

    acerto: number;
    fallos: number;
    intentos: number;


    actionresetStyle?: Function;



    constructor(elemento: HTMLElement, categoria: string) {
        this.elemento = document.createElement('div');

        this.categoria = categoria;

        this.validado = true;
        this.elemento = elemento;

        this.elemento.addEventListener("mousedown", () => {
            if (this.padre != null) {
                this.elemento.style.zIndex = "100";
                this.padre.seleccion = this;
            }
        });

        this.elemento.addEventListener("mouseup", () => {
            this.elemento.style.zIndex = "0";
        });

        this.acerto = 0;
        this.fallos = 0;
        this.intentos = 0;

    }

    validar() {
        this.clasificado = true;
    }

    resetStyle() {
        if (this.actionresetStyle) {
            this.actionresetStyle(this.elemento);
        }
    }

    setResetStyle(actionresetStyle: Function) {
        this.actionresetStyle = actionresetStyle;
    }

}


class Almacenamiento {
    categoria: string;
    contenedor: JQuery;
    elementos: Array<Clasificar_elemento>;
    acciones: Function;
    nombre: string;
    padre: AClasificar;
    accept: string;
    capacidad: number;
    almacen: Almacen;

    constructor(almacen: Almacen, clasificar: AClasificar) {
        this.almacen = almacen;
        this.accept = almacen.idType;
        this.padre = clasificar;
        this.categoria = almacen.tipo;
        this.contenedor = $("." + almacen.idClass);

        this.elementos = [];
        this.capacidad = almacen.capacidad;
        this.nombre = almacen.nombre;
        this.acciones = almacen.accion;
        this.almacenar();
    }

    resetStyle() {
        if (this.almacen.style.contenedor) {
            this.acciones(this.almacen.style.contenedor);
        }
    }

    almacenar() {

        this.contenedor.droppable({
            accept: ("." + this.categoria),
            drop: (event: any, ui: any) => {
                if (this.capacidad > 0) {
                    this.capacidad--;

                    this.deleteImage(ui.draggable, this.contenedor, this.acciones);

                    if (this.capacidad <= 0) {
                        this.contenedor.droppable("option", "disabled", true);
                    }
                }

            }
        });
    }


    deleteImage($item: any, t: any, accion: Function) {
        $item.fadeIn(() => {
            $item.appendTo(t);
            //$item.find(zonas).css("left", "0px");
            this.padre.clasificados++;
            //this.padre.propiedades.intentos++;

            if (this.padre.seleccion != null) {
                if (this.padre.seleccion.contenedor != null) {

                    if (this.padre.seleccion.contenedor !== this) {
                        let indiceDelete =
                            this.padre.seleccion.contenedor.elementos.indexOf(this.padre.seleccion);
                        if (indiceDelete != -1) {
                            this.padre.seleccion.contenedor.elementos.splice(indiceDelete, 1);
                        }

                        this.padre.seleccion.contenedor.capacidad++;
                        this.padre.seleccion.contenedor.contenedor.droppable("option", "disabled", false);
                    }
                }
                this.padre.seleccion.contenedor = this;
                this.elementos.push(this.padre.seleccion);

                this.padre.getCategorias();
                if (this.padre.validarelemento(t[0].id)) {

                    this.padre.seleccion.fallos = 0;

                    if (this.padre.seleccion.acerto == 0) {
                        this.padre.seleccion.acerto = 1;
                    }

                    this.padre.updateData();

                    if (this.padre.seleccion.acerto == 1) {
                        this.padre.seleccion.acerto = 2;
                        this.padre.doIntentoAcierto();
                    }

                } else {

                    this.padre.seleccion.acerto = 0;

                    if (this.padre.seleccion.fallos == 0) {
                        this.padre.seleccion.fallos = 1;
                    }

                    this.padre.updateData();

                    if (this.padre.seleccion.fallos == 1) {
                        this.padre.seleccion.fallos = 2;

                        this.padre.doIntentoFallo();
                    }

                    /*
                                        this.padre.propiedades.fallos++;
                                        this.padre.seleccion.acerto = 0;
                    */
                }
                this.padre.doIntento();
                this.padre.propiedades.intentos++;


                this.almacen.accion();
                this.padre.seleccion.resetStyle();


                /*
                if (this.resetear != null) {
                    this.resetear(this.seleccion.elemento);

                } else {
                    this.reset();
                }
                */
            }

            if (this.padre.clasificados >= this.elementos.length) {
                if (this.padre.validacion != null) {
                    this.padre.valido = true;
                    this.padre.validacion();
                }
            }
        });
    }
}
export default class AClasificar extends Interaccion {

    almacenes: Array<Almacenamiento>;
    elementos: Array<Clasificar_elemento>;
    seleccion?: Clasificar_elemento;
    resetear?: Function;
    zona = "";
    clasificados = 0;
    contenedores: Array<any>;

    constructor() {
        super();
        this.elementos = new Array();
        this.tipoId = "Clasificacion";

        if (this.registro) {
            this.registro.setId(this.tipoId);
        }

        this.propiedades.intentos = 0;
        this.propiedades.aciertos = 0;
        this.propiedades.fallos = 0;
        this.propiedades.informacion = [];

        this.contenedores = [];
        this.almacenes = [];

    }

    agregarImagen(elemento: Clasificar_elemento) {

        elemento.padre = this;
        this.elementos.push(elemento);
        this.elemento.append(elemento.elemento);
    }

    updateData() {
        this.propiedades.aciertos = 0;
        this.propiedades.fallos = 0;

        this.almacenes.forEach((almacen) => {
            almacen.elementos.forEach(elemento => {

                if (elemento.acerto >= 1) {
                    this.propiedades.aciertos += 1;
                }

                if (elemento.fallos >= 1) {
                    this.propiedades.fallos += 1;
                }

            })
        });
    }

    agregarElemento(zona: Zona) {
        if (zona.style.contenedor) {
            let element = new Clasificar_elemento(zona.style.contenedor, zona.props.categoria);
            element.padre = this;
            element.setResetStyle(zona.reset.bind(zona));
            this.elementos.push(element);
        }

        //this.elemento.append(element.elemento);
    }

    agregar(elemento: HTMLElement, categoria: string) {
        let element = new Clasificar_elemento(elemento, categoria);
        element.padre = this;
        this.elementos.push(element);
        //this.elemento.append(element.elemento);
    }



    reset(style?: Function) {
        if (style == null) {
            if (this.seleccion != null) {
                this.seleccion.elemento.style.left = "0";
                this.seleccion.elemento.style.top = "0";
                this.seleccion.elemento.style.margin = "15px";
            }

        } else {

            if (this.seleccion != null) {
                style(this.seleccion.elemento);
            }

        }
    }

    validarelemento(comparacion: string) {
        if (this.seleccion != null) {
            this.seleccion.clasificado = true;

            if (this.seleccion.categoria == comparacion) {

                return true;
            } else {
                return false;
            }
        }

    }

    getCategorias() {
        let informacion: any = [];
        this.almacenes.forEach((almacen) => {
            let categorias: Array<string> = [];
            almacen.elementos.forEach((e) => {
                categorias.push(e.categoria);
            });
            informacion.push({
                categoria: almacen.categoria,
                capacidad: almacen.capacidad,
                almacenados: categorias
            });
        })
        this.propiedades.informacion = informacion;
        console.log(this.propiedades)
    }


    valida() {
        let num = 0;
        this.elementos.forEach((b) => {
            if (b.clasificado) {
                num++;
            }
        });
        if (num >= this.elementos.length) {
            return true;
        } else {
            return false;
        }

    }

    almacenaje(alamcenes: Almacen[], allow: string) {

        /* lugares: Array<string>, div: string, acciones: Array<Function>, props: Array<any> */

        alamcenes.forEach((refAlmacen, i) => {
            //element, con, acciones[i], props[i], this, div
            let almacen = new Almacenamiento(refAlmacen, this);
            this.almacenes.push(almacen);
        });

    }


    arrastrables(tipo: string, padre: string) {
        let elementos = $(padre);

        $(tipo, elementos).draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            // helper: "clone",
            cursor: "move"
        });
    }

    setResetear(t: Function) {
        this.resetear = t;

    }


}