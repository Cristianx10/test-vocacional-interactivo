import { IPropsNavegador } from '../componentes/Navegador/Navegador';
import { StandardProperties } from 'csstype';
import Navegador from '../componentes/Navegador/Navegador';

export class ManagerStyle {

  className: string;
  props: IPropsNavegador | any;
  style: StandardProperties<React.ReactText>;
  cargado: boolean;
  contenedor?: HTMLElement;
  initStyle: boolean;
  navegador?: Navegador;

  constructor(props: StandardProperties | any, nombre: string, initStyle?: boolean, style?:StandardProperties) {
    this.props = props;
    this.className = nombre;
    this.style = {};
    this.cargado = false;
    if (initStyle) {
      this.initStyle = initStyle;
    } else {
      this.initStyle = false;
    }
    if(style){
      this.style = style;
    }
  }

  asignar() {
    if (this.cargado === false) {
      this.cargado = true;

      if (this.props.style) {
        this.style = Object.assign(this.style, this.props.style);
      }

      if (this.props.grid) {
        this.style.display = "grid";
        this.style.gridTemplateColumns = "50% 50%";

        if (this.props.grid !== true) {
          this.style.gridTemplateColumns = this.props.grid;
        }
      }

      if (this.props.on != null) {
        this.style.position = "absolute";
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.top = "0px";
        this.style.left = "0px";
      }

      if (this.props.width != null) {
        this.style.width = this.props.width;
      }

      if (this.props.padding != null) {
        this.style.padding = this.props.padding;
      }

      if (this.props.height != null) {
        this.style.height = this.props.height;
      }

      if (this.props.left != null) {
        this.style.left = this.props.left;
      }

      if (this.props.top != null) {
        this.style.top = this.props.top;
      }

      if (this.props.pos) {
        let posi = this.props.pos.split(" ");
        this.style.top = posi[0];
        this.style.left = posi[1];
        this.style.position = "absolute";
      }

      if (this.props.image != null) {
        this.style.backgroundImage = "url('" + this.props.image + "')";
      }

      if (this.navegador) {
        if (this.props.fondo != null) {
          this.style.backgroundImage = "url('" + this.props.fondo + "')";
        }
      }


      if (this.props.className != null) {
        this.className = this.className + " " + this.props.className;
      }

      if (this.props.orientacion != null) {
        this.className = this.className + " " + this.props.orientacion;
      }

      if (this.props.align != null) {
        this.className = this.className + " " + this.props.align;
      }

      if (this.initStyle) {
        if (this.className.includes("horizontal") === false) {
          this.className = this.className + " vertical";
        }
      }
    }
  }

  setContenedor(contenedor: HTMLElement) {
    this.contenedor = contenedor;
  }

  appendChild(contenedor: HTMLElement) {
    if (this.contenedor != null) {
      this.contenedor.appendChild(contenedor);
    }
  }

  removeChild(contenedor: HTMLElement) {
    if (this.contenedor != null && contenedor.parentNode == this.contenedor) {
      this.contenedor.removeChild(contenedor);
    }
  }

  addClass(clase: string) {
    if (this.contenedor != null) {
      this.contenedor.classList.add(clase);
    }
  }

  removeClass(clase: string) {
    if (this.contenedor != null) {
      this.contenedor.classList.remove(clase);
    }
  }

  update() {
    if (this.contenedor != null) {
      this.contenedor.style.backgroundImage = this.style.backgroundImage + "";
    }
  }

  getClass() {
    this.asignar();
    return this.className + "";
  }

  getStyle() {
    this.asignar();
    return Object.assign({}, this.style);
  }

  getProps() {
    return {
      className: this.getClass(),
      style: this.getStyle()
    }
  }

  setStyle(propiedad: string, value: any) {
    if (propiedad === "backgroundImage") {
      this.style.backgroundImage = value;
    }

    this.update();
  }
}

export default ManagerStyle;

export function resizeClass(etiqueta: any, etiquetasClass: string) {
  let className = etiquetasClass;

  let style: any = {};

  if (etiqueta.props.style != null) {
    style = etiqueta.props.style;
  }

  if (etiqueta.props.width != null) {
    style.width = etiqueta.props.width;
  }

  if (etiqueta.props.color != null) {
    style.color = etiqueta.props.color;
  }

  if (etiqueta.props.background != null) {
    style.background = etiqueta.props.background;
  }

  if (etiqueta.props.padding != null) {
    style.padding = etiqueta.props.padding;
  }

  if (etiqueta.props.height != null) {
    style.height = etiqueta.props.height;
  }

  if (etiqueta.props.image != null) {
    style.backgroundImage = "url('" + etiqueta.props.image + "')";
  }

  if (etiqueta.props.className != null) {
    className = className + " " + etiqueta.props.className;
  }

  if (etiqueta.props.orientacion != null) {
    className = className + " " + etiqueta.props.orientacion;
  }

  if (etiqueta.props.horizontal != null) {
    className = className + " horizontal";
  }

  if (etiqueta.props.on != null) {
    className = className + " on_over";
  }

  if (etiqueta.props.align != null) {
    className = className + " " + etiqueta.props.align;
  }


  return {
    className: className,
    style: style
  };
}

class CStyle {
  width?: string;
  height?: string;
  backgroundImage?: string;
  padding?: string;
}
/*
export class ManagerStyle {

  className: string;
  etiqueta: any;
  style: any;
  cargado: boolean;
  contenedor?: HTMLElement;

  constructor(etiqueta: any, nombre: string) {
    this.etiqueta = etiqueta;
    this.className = nombre;
    this.style = new CStyle();
    this.cargado = false;
  }

  asignar() {
    if (this.cargado === false) {
      this.cargado = true;

      if (this.etiqueta.props.width != null) {
        this.style.width = this.etiqueta.props.width;
      }

      if (this.etiqueta.props.padding != null) {
        this.style.padding = this.etiqueta.props.padding;
      }

      if (this.etiqueta.props.height != null) {
        this.style.height = this.etiqueta.props.height;
      }

      if (this.etiqueta.props.image != null) {
        this.style.backgroundImage = "url('" + this.etiqueta.props.image + "')";
      }

      if (this.etiqueta.props.fondo != null) {
        this.style.backgroundImage = "url('" + this.etiqueta.props.fondo + "')";
      }

      if (this.etiqueta.props.className != null) {
        this.className = this.className + " " + this.etiqueta.props.className;
      }

      if (this.etiqueta.props.orientacion != null) {
        this.className = this.className + " " + this.etiqueta.props.orientacion;
      }

      if (this.etiqueta.props.align != null) {
        this.className = this.className + " " + this.etiqueta.props.align;
      }

      if (this.className.includes("horizontal") === false) {
        this.className = this.className + " vertical";
      }
    }
  }

  setContenedor(contenedor:HTMLElement){
    this.contenedor = contenedor;
  }

  appendChild(contenedor:HTMLElement){
    if(this.contenedor != null){
      this.contenedor.appendChild(contenedor);
    }
  }

  removeChild(contenedor:HTMLElement){
    if(this.contenedor != null && contenedor.parentNode == this.contenedor){

      this.contenedor.removeChild(contenedor);
    }
  }

  aplicar(){
    if(this.contenedor != null){
      this.contenedor.style.backgroundImage = this.style.backgroundImage;
    }
  }

  getClass() {
    this.asignar();
    return this.className + "";
  }

  getStyle() {
    this.asignar();
    return Object.assign({}, this.style);
  }

  getProps(){
    return {
      className:this.getClass(),
      style:this.getStyle()
    }
  }

  setStyle(propiedad: string, value: any) {
    if (propiedad === "backgroundImage") {
      this.style.backgroundImage = value;
    }
  }
}
*/
