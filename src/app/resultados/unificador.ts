import { Resultados } from './resultados';

var nPrueba = 0;
export class UnificarResultados {

    resultados: Array<Resultados>;

    constructor() {
        this.resultados = [];
    }

    agregar(resultado: Resultados) {
        nPrueba++;
        let result: any = resultado;
        result.UID = nPrueba + "";
        this.resultados.push(result);
    }

    unificar() {
        let temp__pruebas: any = {};

        let numPruebas = 0;

        let temp__acumuladas: any = {};
        let temp__acumuladas__registrada: any = [];

        let dataUID: any = [];
        this.resultados.forEach((resultado, i) => {

            let { pruebas, usuario, categorias, ponderacion, maximos, UID } = resultado;

            if (pruebas) {
                pruebas.forEach((prueba, j) => {
                    console.log("mIN UUISUF", prueba.UID)

                    if (temp__pruebas[prueba.UID] === null || temp__pruebas[prueba.UID] === undefined) {
                        dataUID.push(prueba.UID);
                        temp__pruebas[prueba.UID] = [];
                        numPruebas++;
                        temp__acumuladas__registrada.push({ maximos: prueba.maximos, resulados: prueba.result, id: prueba.id, usuario: usuario });
                        temp__acumuladas[prueba.UID] = [];
                        temp__acumuladas[prueba.UID].push(Object.assign([], temp__acumuladas__registrada));
                    }

                    temp__pruebas[prueba.UID].push({ UID: UID, usuario: usuario, categorias: categorias, maximos: maximos, ponderacion: ponderacion, prueba: prueba });

                    /*
                    //Por Indice

                    if (temp__pruebas[j] === null || temp__pruebas[j] === undefined) {
                        temp__pruebas[j] = [];
                        numPruebas++;
                        temp__acumuladas__registrada.push({ maximos: prueba.maximos, resulados: prueba.result, id: prueba.id, usuario: usuario })
                        temp__acumuladas[j] = [];
                        temp__acumuladas[j].push(Object.assign([], temp__acumuladas__registrada));
                    }

                    temp__pruebas[j].push({ UID: UID, usuario: usuario, categorias: categorias, maximos: maximos, ponderacion: ponderacion, prueba: prueba });
                */
                });
            }

        });

        let pruebas = [];

        /*
        for (let index = 0; index < numPruebas; index++) {
            pruebas.push({ pruebas: temp__pruebas[index], acumuladas: temp__acumuladas[index][0] });
        }
        */

        dataUID.sort();

        for (let index = 0; index < dataUID.length; index++) {
            let idBase = dataUID[index];
            pruebas.push({ pruebas: temp__pruebas[idBase], acumuladas: temp__acumuladas[idBase][0] });
        }

        return pruebas;

    }

    getUID(UID: string) {
        let encontro = null;
        this.resultados.forEach(result => {
            if (result.UID === UID) {
                encontro = result;
            }
        })
        return encontro;
    }
}