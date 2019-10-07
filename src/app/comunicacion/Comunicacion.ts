export class Comunicador {

  propiedades:any;

  constructor() {
    this.propiedades = {};
  }

  add(propiedad:string) {
   
    if (this.propiedades[propiedad] == null) {
      this.propiedades[propiedad] = [];
    }
  
    return this.propiedades[propiedad];
  }

  getPropiedadActual(propiedad:string){
    let objetoReferencia = this.propiedades[propiedad];
    let result = null;
    if(objetoReferencia && objetoReferencia.length > 0){
      result = objetoReferencia[objetoReferencia.length -1]
    }
    return result;
  }

  getPropiedad(propiedad:string, index:number){
    let objetoReferencia = this.propiedades[propiedad];
    let result = null;
    if(objetoReferencia && objetoReferencia.length > 0){
      result = objetoReferencia[index]
    }
    return result;
  }
}

export var comunicador = new Comunicador();

export var event_continuar = new Event('continuar');

document.addEventListener("continuar", (e)=>{
  console.log("conotinuo", e)
});


export default comunicador;


