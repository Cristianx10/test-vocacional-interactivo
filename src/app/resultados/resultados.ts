export var Re = {
    /*
    derecho: "derecho",
    ingenieria: "ingenieria",
    humanidades: "humanidades",
    licenciatura: "licenciatura",
    diseno: "diseno",
    medicina: "medicina",
    economia: "economia",
    ciencias: "ciencias",
    psicologia: "psicologia",
*/
    medicina:"medicina",
    ingenieria:"ingenieria",
    diseno:"diseno",
    comunicacion:"comunicacion",
    psicologia:"psicología",
    ciencias:"ciencias",
    economia:"economia",
    licenciatura:"licenciatura"

}




export interface IORestulados {
    tipoId: string;
    propiedades: any;
    registro: GResultados;
}

export interface IOORestulados {
    tipoId: string;
    propiedades: any;
    registro: OResultado;
}

interface IDataUser {
    nombre: string;
    genero: string;
    carrera: string;
    edad: string;
    mano: string;
}

export class Resultados {

    UID = "undefined";
    id: string;
    usuario?: IDataUser;
    pruebas?: Array<GResultados>;

    tiempoInicial?: number;
    tiempoFinal?: number;
    tiempo?: number;

    categorias?: Array<ICategoria>;
    maximos?: Array<ICategoria>;
    ponderacion?: Array<ICategoria>;

    constructor(id: string) {
        this.id = id;
        let reconozido = false;
        let val: any = localStorage.getItem(id);

        if (val) {
            let variables: Resultados = JSON.parse(val);
            this.categorias = variables.categorias;
            this.pruebas = variables.pruebas;
            this.maximos = variables.maximos;
            this.usuario = variables.usuario;
            this.ponderacion = variables.ponderacion;
            this.tiempo = variables.tiempo;
            this.tiempoInicial = variables.tiempoInicial;
            this.tiempoFinal = variables.tiempoFinal;
            reconozido = true;
            console.log("Resultados encontrados")
        }

        if (reconozido === false) {
            console.log("Resultados no encontrados")
            let t = new Date();
            this.tiempoInicial = t.getTime();
            this.tiempo = 0;
            this.tiempoFinal = 0;
            this.categorias = [];
            this.pruebas = [];
            this.maximos = [];
            this.usuario = {
                nombre: "Nombre de usuario",
                genero: "No definido",
                carrera: "Carrera",
                edad: "edad",
                mano: "mano"
            }
            this.ponderacion = [];
        }
    }

    setUID(objeto: any, UID: string) {

        if (this.pruebas) {
            this.pruebas.forEach((p: GResultados, index: number) => {
                if (p.UID === UID) {
                    console.log("elemento duplibado")
                    //encontro = true;

                    if (this.pruebas) {
                        this.pruebas.splice(index, 1);
                    }
                    //refObject = objeto.registro;
                }
            });
        }
        objeto.registro.UID = UID;
    }

    agregar(objeto: any): GResultados {



        let refObject: any = null;
        if (this.pruebas) {
            //  let encontro = false;

            /*
            this.pruebas.forEach((p: GResultados, index: number) => {
                if (p.UID === objeto.registro.UID) {
                    //encontro = true;

                    if (this.pruebas) {
                        this.pruebas.splice(index, 1);
                    }
                    //refObject = objeto.registro;
                }
            });
            */

            //if (encontro === false) {
            refObject = new GResultados(objeto);
            objeto.registro = refObject;
            //this.pruebas.push(refObject);
            // }
        }

        /*
                let refObject = new GResultados(objeto);
                if (this.pruebas) {
                this.pruebas.push(refObject);
                }
                */
        /*
                let refObject:any = null;
                if (this.pruebas) {
                    let encontro = false;
                    this.pruebas.forEach((p) => {
                        if (objeto.registro !== null && p === objeto.registro) {
                            encontro = true;
                            refObject = objeto.registro;
                        }
                    });
        
                    if (encontro === false) {
                        refObject = new GResultados(objeto);
                        objeto.registro = refObject;
                        this.pruebas.push(refObject);
                    }
                }
        */
        return refObject;
    }



    calcularMaximo() {
        this.maximos = [];
        if (this.pruebas) {
            this.pruebas.forEach((prueba) => {
                prueba.maximos.forEach((maximo) => {

                    if (this.maximos != null) {

                        let encontrado = false;
                        this.maximos.forEach((valor) => {
                            if (maximo.id === valor.id) {
                                encontrado = true;

                                valor.valor += maximo.valor * 1;

                            }
                        });
                        if (encontrado === false) {
                            this.maximos.push(Object.assign({}, maximo));
                        }

                    }
                });
            });
            /*
                        this.pruebas.forEach((prueba) => {
                            prueba.maximos.forEach((maximo) => {
                                console.log("valor maximo", maximo)
                            });
                        });
                        */
        }
    }

    calcularValor() {
        this.categorias = [];
        if (this.pruebas) {
            this.pruebas.forEach((prueba) => {

                prueba.result.forEach((resultado) => {
                    if (this.categorias != null) {

                        let encontrado = false;
                        this.categorias.forEach((valor) => {
                            if (resultado.id === valor.id) {
                                encontrado = true;
                                valor.valor += resultado.valor;
                            }
                        });
                        if (encontrado === false) {
                            this.categorias.push(Object.assign({}, resultado));
                        }

                    }
                });
            });
        }
    }

    calcularPonederado() {
        this.ponderacion = [];
        if (this.categorias != null && this.maximos != null && this.ponderacion != null) {

            this.maximos.forEach(maximo => {
                if (this.categorias != null) {
                    let encontro = false;
                    this.categorias.forEach((categoria) => {
                        if (categoria.id === maximo.id) {
                            encontro = true;
                            if (this.ponderacion != null) {
                                let resultado = categoria.valor * 100 / maximo.valor;
                                this.ponderacion.push({ id: categoria.id, valor: (resultado) });
                            }
                        }
                    });
                    if (encontro === false) {
                        if (this.ponderacion != null) {
                            let resultado = 0;
                            this.ponderacion.push({ id: maximo.id, valor: (resultado) });
                        }
                    }
                }

            })


        }
    }

    evaluar(objeto: any) {
        objeto.registro.evaluar();
        this.calcularMaximo();
        this.calcularValor();
        this.calcularPonederado();

        let t = new Date();
        this.tiempoFinal = t.getTime();
        if (this.tiempoInicial != null) {
            this.tiempo = this.tiempoFinal - this.tiempoInicial;
        }

        this.save();
    }

    agregarCondicion(objeto: any, referencia: any, id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) {
        let opcion = referencia.registro.agregarCondicion(id, accion, descripcion, valorMaximo, objeto);
        objeto.registro = opcion;
        return opcion;
    }

    setMultiple(objeto: any, multple: boolean) {
        objeto.registro.setMultiple(multple);
    }

    setId(objeto: any, id: string) {
        //console.log(objeto.registro)
        objeto.registro.id = id;
    }

    getPropiedades(objeto: any) {
        //console.log(objeto.registro)
        return objeto.registro.propiedades;

    }

    setTiempo(objeto: any, tiempo: string) {
        //console.log(objeto.registro)
        objeto.registro.tiempo = tiempo;
    }

    setValor(objeto: any, id: string, valor: number) {
        objeto.registro.setValor(id, valor);
    }

    save() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }

    descargar() {

        var fecha = new Date();
        var nombre = `result_${fecha.getDay()}_${fecha.getHours()}_${fecha.getSeconds()}`;
        var text = JSON.stringify(this),
            blob = new Blob([text], { type: 'text/plain' }),
            anchor = document.createElement('a');

        anchor.download = nombre + ".json";
        anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    }

    limpiarTodo() {
        console.log("Datos reseteados")
        let t = new Date();
        this.tiempoInicial = t.getTime();
        this.tiempo = 0;
        this.tiempoFinal = 0;
        this.categorias = [];
        this.pruebas = [];
        this.maximos = [];
        this.usuario = {
            nombre: "Nombre de usuario",
            genero: "No definido",
            carrera: "Carrera",
            edad: "edad",
            mano: "mano"
        }
        this.ponderacion = [];
        this.save();
    }
}

//localStorage.clear();
export var resultados = new Resultados("resultados1");
export var resultados2 = new Resultados("resultados2");


document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        console.log("Imprimiendo resultados");
        console.log(resultados);
    }

    if (e.key === "p" || e.key === "P") {
        console.log("Imprimiendo Pruebas");
        console.log(resultados.pruebas);
    }
})


export interface ICategoria {
    id: string;
    valor: number;
}
/*
export interface ICategoria__boolean {
    id: string;
    accion: Function;
    descripcion: string;
    valorMaximo: Array<ICategoria>;
    valor: Array<ICategoria>;
    validacion?:boolean;
    setValor:Function;
}*/

export interface IObjectValidable {
    tipoId: string;
    propiedades: any;
    acciones: any;

}


export class GResultados {

    UID: string;
    id: string;
    propiedades: any;

    result: Array<ICategoria>;
    maximos: Array<ICategoria>;
    opciones: Array<OResultado>;
    defaultResult: OResultado;
    seleccion: Array<OResultado>;
    tiempo: any;
    multiple: boolean;

    constructor(objeto: any) {
        this.UID = "";
        if (objeto) {
            if (objeto.tipoId) {
                this.id = objeto.tipoId;
            } else {
                this.id = "defaul";
            }

            if (objeto.UID) {
                this.UID = objeto.UID;
            } else {
                objeto.UID = this.UID;
            }

            if (objeto.multiple) {
                this.multiple = objeto.multiple;
            } else {
                this.multiple = false;
            }

            if (objeto.tiempo) {
                this.tiempo = objeto.tiempo;
            } else {
                this.tiempo = 0;
            }

            if (objeto.propiedades) {

                this.propiedades = objeto.propiedades;
            } else {
                this.propiedades = {};
            }
        } else {
            this.id = "defaul";
            this.multiple = false;
            this.propiedades = {};
            this.tiempo = 0;
        }


        this.result = [];
        this.maximos = [];
        this.opciones = [];
        this.seleccion = [];

        let obj = {};

        this.defaultResult = new OResultado(obj);

        this.seleccion.push(this.defaultResult);

        this.opciones.push(this.defaultResult);
    }

    agregarCondicion(id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>, objeto: any) {

        let valueMaximos: Array<ICategoria> = [];
        valorMaximo.forEach((v) => {
            v.id = v.id.toLowerCase();
            v.valor = parseInt(v.valor + "");

            if (v.valor != 0) {
                valueMaximos.push(v);
            }
        });

        let valores: Array<ICategoria> = [];
        valueMaximos.forEach((v) => {
            valores.push(Object.assign({}, v));
        });

        let opcion = new OResultado(objeto);

        if (id !== "" && id !== null) {
            opcion.id = id;
        }

        opcion.id = id;
        opcion.accion = accion;
        opcion.descripcion = descripcion;
        opcion.valorMaximo = valueMaximos;
        opcion.valor = valores;

        this.opciones.push(opcion);

        return opcion;
    }

    calcularMaximo() {
        this.maximos = [];
        this.opciones.forEach((opcion) => {

            opcion.valorMaximo.forEach((result) => {

                let encontrado = false;

                this.maximos.forEach((valor) => {
                    if (result.id === valor.id) {
                        encontrado = true;
                        if (this.multiple) {
                            valor.valor += result.valor;
                        } else {
                            if (result.valor > valor.valor) {
                                valor.valor = result.valor;
                            }
                        }

                    }
                });

                if (encontrado === false) {
                    this.maximos.push(Object.assign({}, result))

                }

            });

        });
    }

    agregar() {
        if (resultados.pruebas) {
            resultados.pruebas.push(this);
        }
    }

    setUID(UID: string) {

        if (resultados.pruebas) {
            resultados.pruebas.forEach((p: GResultados, index: number) => {
              
                if (p.UID === UID) {
                    console.log("elemento duplibado")
                    //encontro = true;

                    if (resultados.pruebas) {
                        resultados.pruebas.splice(index, 1);
                    }
                    //refObject = objeto.registro;
                }
            });
        }

        this.UID = UID;
    }

    setId(id: string) {
        this.id = id;
    }

    setMultiple(multiple: boolean) {
        this.multiple = multiple;
    }

    evaluar() {
        this.seleccion = [];
        let encontro = false;
        this.opciones.forEach((opcion) => {

            let value = opcion.acciones();
            opcion.setValidacion(value);

            if (value || opcion.validacion === true) {
                encontro = true;
                if (this.multiple) {
                    this.seleccion.push(opcion);
                } else {
                    if (this.seleccion.length > 0) {
                        this.seleccion[0] = opcion;
                    } else {
                        this.seleccion.push(opcion);
                    }

                }
            }
        });

        if (encontro === false) {
            this.seleccion.push(this.defaultResult);
            this.defaultResult.setValidacion(true);
        }
        if (this.multiple) {
            let temporal: Array<ICategoria> = []
            this.seleccion.forEach((select) => {

                select.valor.forEach((s) => {
                    let encontro = false;
                    temporal.forEach((t) => {
                        if (t.id == s.id) {
                            encontro = true;
                            t.valor += s.valor;
                        }
                    });
                    if (encontro == false) {
                        temporal.push(Object.assign({}, s));
                    }
                })
            });

            this.result = Object.assign([], temporal);

        } else {
            this.result = Object.assign([], this.seleccion[0].valor);
        }

        this.calcularMaximo();
    }
}


export class OResultado {
    id: string;
    propiedades: any;
    accion?: Function;
    descripcion: string;
    valorMaximo: Array<ICategoria>;
    valor: Array<ICategoria>;
    validacion: boolean;
    tiempo: any;

    constructor(objeto: any) {

        if (objeto) {
            if (objeto.tipoId) {
                this.id = objeto.tipoId;
            } else {
                this.id = "default";
            }
            if (objeto.tiempo) {
                this.tiempo = objeto.tiempo;
            } else {
                this.tiempo = 0;
            }

            if (objeto.propiedades) {
                this.propiedades = objeto.propiedades;
            } else {
                this.propiedades = {};
            }
        } else {
            this.id = "default";
            this.propiedades = {};
            this.tiempo = 0;
        }

        this.valor = [];
        this.valorMaximo = [];
        this.descripcion = "No se encontro condicion";
        this.validacion = false;
    }

    setDescripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    setValidacion(result: boolean) {
        this.validacion = result;
    }

    setValor(tipo: string, valor: number) {
        tipo = tipo.toLocaleLowerCase();
        valor = parseInt(valor + "");
        this.valor.forEach((v) => {
            if (tipo === v.id) {
                v.valor = valor;
            }
        });
    }

    setResultados(valor: Array<ICategoria>) {

        this.valor = valor;

        let valueMaximos: ICategoria[] = [];
        this.valor.forEach((v) => {
            v.id = v.id.toLowerCase();
            v.valor = parseInt(v.valor + "");

            if (v.valor != 0) {
                valueMaximos.push(v);
            }
        });
        this.valor = valueMaximos;

        let valores: Array<ICategoria> = [];
        this.valor.forEach((v) => {
            valores.push(Object.assign({}, v));
        });

        this.valorMaximo = valores;

    }

    acciones() {
        let val = false;
        if (this.accion) {
            val = this.accion(this.propiedades, this);
        }
        /*
        if (val === false) {
            return val;
        } else {
            return val;
        }
        */
        return val
    }
}

/*
export class Resultados {

    categorias?: Array<ResultadoA>;
    pruebas?: Array<RRegistro>;
    maximos?: Array<ResultadoA>;
    id: string;


    constructor(id: string) {
        this.id = id;
        let reconozido = false;
        let val: any = localStorage.getItem(id);

        if (val) {
            let variables: Resultados = JSON.parse(val)
            this.categorias = variables.categorias;
            this.pruebas = variables.pruebas;
            this.maximos = variables.maximos;
            reconozido = true;
        }

        if (reconozido === false) {
            this.categorias = [];
            this.pruebas = [];
            this.maximos = [];
        }
    }

    save() {
        localStorage.setItem(this.id, JSON.stringify(this))
    }

    agregar(id: string, prueba: Array<RPruebaS>) {
        if (this.pruebas != null) {
            this.pruebas.push({ id: id, pruebas: prueba });
        }
        this.save();
        //console.log({ id: id, pruebas: prueba });
    }

    getAreas(areas: Array<string>) {
        let areasArray = [];
        for (let i = 0; i < areas.length; i++) {
            let a = areas[i];

            if (this.categorias != null) {
                for (let j = 0; j < this.categorias.length; j++) {
                    let c = this.categorias[j];
                    if (a === c.area) {
                        areasArray.push(c);
                        j = this.categorias.length;
                    }
                }
            }
        }
        return areasArray;
    }

    getAreasMaximo(areas: Array<string>) {
        let areasArray = [];
        for (let i = 0; i < areas.length; i++) {
            let a = areas[i];

            if (this.maximos != null) {
                for (let j = 0; j < this.maximos.length; j++) {
                    let c = this.maximos[j];
                    if (a === c.area) {
                        areasArray.push(c);
                        j = this.maximos.length;
                    }
                }
            }
        }
        return areasArray;
    }

    getMaximo(area: string) {
        let max;
        if (this.maximos != null) {
            this.maximos.forEach(e => {
                if (area === e.area) {
                    max = e;
                }
            });
        }
        return max;
    }

    agregarResultados(resultados: Array<ResultadoA>) {

        resultados.forEach((m) => {

            let nombre = m.area.toLowerCase();
            let valor = m.valor;

            let categoria: number = 0;
            let encontrado = false;

            if (this.categorias != null) {
                this.categorias.forEach((c, index) => {
                    if (c.area === nombre) {
                        categoria = index;
                        encontrado = true
                    }
                });

                if (encontrado) {
                    this.categorias[categoria].valor += valor;
                } else {
                    this.categorias.push({ area: nombre, valor: valor });
                }
            }

        });


        this.save();

    }

    sumar(nombre: string, valor: number) {
        nombre = nombre.toLowerCase();
        let categoria: number = 0;
        let encontrado = false;
        if (this.categorias != null) {
            this.categorias.forEach((c, index) => {
                if (c.area === nombre) {
                    categoria = index;
                    encontrado = true
                }
            });

            if (encontrado) {
                this.categorias[categoria].valor += valor;
            } else {
                this.categorias.push({ area: nombre, valor: valor });
            }
        }

        if (nombre === "ciencia") {
            console.log("ciencia: " + valor, "Con un maximo de: " + this.getMaximo(nombre));

        }

        this.save();

    }

    agregarMaximo(maximos: Array<ResultadoA>) {

        maximos.forEach((m) => {

            let nombre = m.area.toLowerCase();
            let valor = m.valor;

            let categoria: number = 0;
            let encontrado = false;

            if (this.maximos != null) {
                this.maximos.forEach((c, index) => {
                    if (c.area === nombre) {
                        categoria = index;
                        encontrado = true
                    }
                });

                if (encontrado) {
                    this.maximos[categoria].valor += valor;
                } else {
                    this.maximos.push({ area: nombre, valor: valor });
                }
            }

        });


        this.save();
    }

    calcularMaximo(valores: Array<Respuesta>) {

        let valorTotal: Array<ResultadoA> = [];

        valores.forEach((v) => {

            for (let i = 0; i < v.valores.length; i++) {
                let val = v.valores[i];
                let encontro: boolean = false;

                for (let j = 0; j < valorTotal.length; j++) {
                    let t = valorTotal[j];
                    let nombre = t.area.toLowerCase();
                    let ref = val.area.toLowerCase();
                    if (ref === nombre) {
                        encontro = true;
                        if (val.valor > t.valor) {
                            t.valor = val.valor;
                        }
                    }
                }
                if (encontro === false) {
                    valorTotal.push({ area: val.area.toLowerCase(), valor: val.valor });
                }
            }

        });


        let categoria: number = 0;

        for (let h = 0; h < valorTotal.length; h++) {
            let v = valorTotal[h];
            let encontrado = false;
            if (this.maximos != null) {
                this.maximos.forEach((c, index) => {
                    if (c.area === v.area) {
                        categoria = index;
                        encontrado = true
                    }
                });

                if (encontrado) {
                    this.maximos[categoria].valor += v.valor;
                } else {
                    this.maximos.push({ area: v.area, valor: v.valor });
                    // console.log({ area: v.area, valor: v.valor });
                }
            }
        }

        this.save();
        return valorTotal;

    }
    /*
    [
        {id:"materia", valor:5},
        {id:"materia2", valor:10},
        {id:"materia3", valor:15},
    ],
    [
        {id:"materia2", valor:5},
        {id:"materia1", valor:10},
        {id:"materia3", valor:15},
    ],



    */
/*

    limpiarTodo() {
        localStorage.clear();
    }

    removerThis() {
        localStorage.removeItem(this.id);
    }

    removerOtro(otro: string) {
        localStorage.removeItem(otro);
    }

    getDatasize() {
        let _lsTotal = 0, _xLen, _x; for (_x in localStorage) { _xLen = ((localStorage[_x].length + _x.length) * 2); _lsTotal += _xLen; console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB") }; console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    }

    descargar() {
        var text = JSON.stringify(this),
            blob = new Blob([text], { type: 'text/plain' }),
            anchor = document.createElement('a');

        anchor.download = "resultadoDictado.json";
        anchor.href = (/*window.webkitURL ||*/ /*window.URL).createObjectURL(blob);
anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
anchor.click();
}

}

*/