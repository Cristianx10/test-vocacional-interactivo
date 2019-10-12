import { resultados, resultados2, Resultados } from './resultados';
import { UID } from 'createjs-module';

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
        this.resultados.forEach((resultado, i) => {

            let { pruebas, usuario, categorias, ponderacion, maximos, UID } = resultado;

            if (pruebas) {
                pruebas.forEach((prueba, j) => {
                    
                    if (temp__pruebas[j] === null || temp__pruebas[j] === undefined) {
                        temp__pruebas[j] = [];
                        numPruebas++;
                        temp__acumuladas__registrada.push({ maximos: prueba.maximos, resulados: prueba.result, id: prueba.id, usuario: usuario })
                        temp__acumuladas[j] = [];
                        temp__acumuladas[j].push(Object.assign([], temp__acumuladas__registrada));
                    }

                    temp__pruebas[j].push({ UID: UID, usuario: usuario, categorias: categorias, maximos: maximos, ponderacion: ponderacion, prueba: prueba });
                });
            }

        });

        let pruebas = [];

        for (let index = 0; index < numPruebas; index++) {
            pruebas.push({ pruebas: temp__pruebas[index], acumuladas: temp__acumuladas[index][0] });
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