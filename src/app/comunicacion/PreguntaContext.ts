import Pregunta from '../componentes/Preguntas/Preguntas';

export class preguntaContext {
    pregunta?: Pregunta;

    setPregunta(pregunta: Pregunta) {
        this.pregunta = pregunta;
    }
}

export var PreguntaContext = new preguntaContext();

export default PreguntaContext;

