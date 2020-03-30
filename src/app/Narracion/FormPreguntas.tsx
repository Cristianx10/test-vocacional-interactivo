import React, { ReactChild } from "react";
import { shuffle } from '../utilidades/utils';
import TLikertPregunta from '../plantillas/template-likert/TLikertPregunta';

export default function formularioPreguntas(indexIniti: number) {
    let numberQuestion = indexIniti;
    let preguntas: ReactChild[] = [];
    let preguntasArray: number[] = [];
    for (let index = 1 + numberQuestion; index <= 5 + numberQuestion; index++) {
        preguntasArray.push(index);
    }
    shuffle(preguntasArray);
    for (let index = 0; index < preguntasArray.length; index++) {
        let indice = preguntasArray[index];
        console.log(indice);
        let view = <TLikertPregunta UID={indice + ""
        }> </TLikertPregunta>;
        preguntas.push(view);
    }
    return preguntas;
}