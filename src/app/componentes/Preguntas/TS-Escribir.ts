
class Texto_palabra {

    palabra: string;
    validado: boolean;
    coincidencia: boolean;
    coincidencia_strict: boolean;
    coincidencia_mayus: boolean;
    puntuacion: boolean;
    tildes: boolean;

    constructor(palabra: string) {
        this.palabra = palabra;
        this.validado = false;
        this.coincidencia = false;
        this.coincidencia_strict = false;
        this.coincidencia_mayus = false;
        this.puntuacion = true;
        this.tildes = true;
    }
}

export class Texto_validar {

    original: string;
    texto: string;
    palabras_texto: Array<Texto_palabra>;
    palabras_original: Array<Texto_palabra>;
    coincidencias: number;
    coincidencias_strict: number;
    coincidencias_mayusculas: number;
    erroresPuntuacion: number;
    erroresTildes: number;
    noEncontradas: Array<Texto_palabra>;

    constructor(original: string, texto: string) {
        this.original = original.replace("  ", " ").replace("  ", " ");
        this.texto = texto.replace("  ", " ").replace("  ", " ");
        this.coincidencias = 0;
        this.coincidencias_strict = 0;
        this.coincidencias_mayusculas = 0;
        this.erroresPuntuacion = 0;
        this.erroresTildes = 0;

        this.noEncontradas = [];

        this.palabras_original = [];
        this.palabras_texto = [];

        let palabras_o = this.original.split(" ");
        let palabras_t = this.texto.split(" ");

        palabras_o.forEach((p) => {
            this.palabras_original.push(new Texto_palabra(p));
        });

        palabras_t.forEach((p) => {
            this.palabras_texto.push(new Texto_palabra(p));
        });

        this.getCoincidencias();
        this.getCoincidenciasStrict();
        this.getErroresMayus();
        this.getErroresTildeF();
    }

    private getCoincidencias() {

        for (let i = 0; i < this.palabras_texto.length; i++) {
            let p = this.palabras_texto[i];

            for (let j = 0; j < this.palabras_original.length; j++) {
                let o = this.palabras_original[j];

                if (o.coincidencia === false) {
                    let temp_p = p.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");
                    let temp_o = o.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");

                    temp_p = temp_p.replace(".", "");
                    temp_o = temp_o.replace(".", "");

                    if (temp_p.toLowerCase() === temp_o.toLowerCase()) {

                        o.coincidencia = true;
                        p.coincidencia = true;

                        if ((o.puntuacion && ((o.palabra.includes(",") && p.palabra.includes(",") === false) || (p.palabra.includes(",") && o.palabra.includes(",") === false))) ||
                            (o.puntuacion && ((o.palabra.includes(".") && p.palabra.includes(".") === false) || (p.palabra.includes(".") && o.palabra.includes(".") === false)))) {
                            p.puntuacion = false;
                            o.puntuacion = false;
                        }

                        j = this.palabras_original.length;
                    }
                }
            }
        }

        let puntos = 0;
        let coincidencia = 0;
        this.palabras_texto.forEach(p => {

            if (p.coincidencia) {
                coincidencia++;
            } else {
                this.noEncontradas.push(p);
            }

            if (p.puntuacion === false) {
                puntos++;
            }
        });

        this.erroresPuntuacion = puntos;
        this.coincidencias = coincidencia;

    }


    private getCoincidenciasStrict() {

        for (let i = 0; i < this.palabras_texto.length; i++) {
            let p = this.palabras_texto[i];

            for (let j = 0; j < this.palabras_original.length; j++) {
                let o = this.palabras_original[j];

                if (o.coincidencia_strict === false && p.palabra === o.palabra) {
                    o.coincidencia_strict = true;
                    p.coincidencia_strict = true;
                    j = this.palabras_original.length;
                }
            }
        }

        let coincidencia = 0;
        this.palabras_texto.forEach(p => {

            if (p.coincidencia_strict) {
                coincidencia++;
            }
        });

        this.coincidencias_strict = coincidencia;

    }

    private getErroresMayus() {
        for (let i = 0; i < this.palabras_texto.length; i++) {
            let p = this.palabras_texto[i];

            for (let j = 0; j < this.palabras_original.length; j++) {
                let o = this.palabras_original[j];
                let pa:string = p.palabra[0].replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u") + "";

                let oa:string = o.palabra[0].replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u") + "";


                if (o.coincidencia_mayus === false) {
                    if (pa === oa) {
                        p.coincidencia_mayus = true;
                        o.coincidencia_mayus = true;
                        j = this.palabras_original.length;
                    }
                }
            }
        }

        let erroresMayus = 0;
        let erroresTilde = 0;

        this.palabras_texto.forEach(p => {

            if (p.coincidencia_mayus === false) {
                erroresMayus++;
            }

            if (p.tildes === false) {
                erroresTilde++;
            }
        });
        this.erroresTildes = erroresTilde;

        this.coincidencias_mayusculas = erroresMayus - this.noEncontradas.length;

    }


    getErroresTildeF() {
        for (let i = 0; i < this.palabras_texto.length; i++) {
            let p = this.palabras_texto[i];

            for (let j = 0; j < this.palabras_original.length; j++) {
                let o = this.palabras_original[j];

                let pa = p.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");

                let oa = o.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");

                if (o.tildes && pa.toLowerCase() === oa.toLowerCase()) {
                    if (((o.palabra.includes("Á") && p.palabra.includes("Á") === false) || (p.palabra.includes("Á") && o.palabra.includes("Á") === false))
                        || ((o.palabra.includes("É") && p.palabra.includes("É") === false) || (p.palabra.includes("É") && o.palabra.includes("É") === false))
                        || ((o.palabra.includes("Í") && p.palabra.includes("Í") === false) || (p.palabra.includes("Í") && o.palabra.includes("Í") === false))
                        || ((o.palabra.includes("Ó") && p.palabra.includes("Ó") === false) || (p.palabra.includes("Ó") && o.palabra.includes("Ó") === false))
                        || ((o.palabra.includes("Ú") && p.palabra.includes("Ú") === false) || (p.palabra.includes("Ú") && o.palabra.includes("Ú") === false))
                        || ((o.palabra.includes("á") && p.palabra.includes("á") === false) || (p.palabra.includes("á") && o.palabra.includes("á") === false))
                        || ((o.palabra.includes("é") && p.palabra.includes("é") === false) || (p.palabra.includes("é") && o.palabra.includes("é") === false))
                        || ((o.palabra.includes("í") && p.palabra.includes("í") === false) || (p.palabra.includes("í") && o.palabra.includes("í") === false))
                        || ((o.palabra.includes("ó") && p.palabra.includes("ó") === false) || (p.palabra.includes("ó") && o.palabra.includes("ó") === false))
                        || ((o.palabra.includes("ú") && p.palabra.includes("ú") === false) || (p.palabra.includes("ú") && o.palabra.includes("ú") === false))
                    ) {
                        o.tildes = false;
                        p.tildes = false;
                    }
                }
            }
        }

        let erroresTilde = 0;

        this.palabras_texto.forEach(p => {

            if (p.tildes == false) {
                erroresTilde++;
            }

        });

        this.erroresTildes = erroresTilde;
    }

    getErrores() {
        return this.palabras_original.length - this.coincidencias;
    }

    getErroresStrict() {
        return this.palabras_original.length - this.coincidencias_strict;
    }

    getErroresTilde() {
        return this.erroresTildes;
    }

    getErroresMayusculas() {
        return this.coincidencias_mayusculas;
    }
    getErroresPuntuacion() {
        return this.erroresPuntuacion;
    }
    getErroresFalto() {
        return this.palabras_original.length - this.palabras_texto.length;
    }

    getNumPalabras() {
        return this.palabras_original.length;
    }
}