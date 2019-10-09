import { resultados, resultados2, Resultados } from './resultados';


export class UnificarResultados {

    resultados: Array<Resultados>;

    constructor() {
        this.resultados = [];
    }

    agregar(resultado: Resultados) {
        this.resultados.push(resultado);
    }

    unificar() {
        let temp__pruebas: any = {};
       
        let numPruebas = 0;

        let temp__acumuladas: any = {};
        let temp__acumuladas__registrada:any = [];
        this.resultados.forEach((resultado, i) => {

            let { pruebas, usuario } = resultado;

            if (pruebas) {
                pruebas.forEach((prueba, j) => {
                    if (temp__pruebas[j] === null || temp__pruebas[j] === undefined) {
                        temp__pruebas[j] = [];
                        numPruebas++;
                        temp__acumuladas__registrada.push({maximos:prueba.maximos, resulados:prueba.result})
                        temp__acumuladas[j] = [];
                        temp__acumuladas[j].push(Object.assign([], temp__acumuladas__registrada));
                    }
                    
                    temp__pruebas[j].push({ usuario: usuario, prueba: prueba });
                });
            }

        });

        let pruebas = [];

        for (let index = 0; index < numPruebas; index++) {
            pruebas.push({pruebas:temp__pruebas[index], acumuladas:temp__acumuladas[index][0]});
        }

        return pruebas;

    }


}