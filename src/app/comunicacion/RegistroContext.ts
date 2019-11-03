import RegistroActividad from '../paginas/RegistroActividad';

export class registroContext {
    registro?: any;

    setRegistro(registro: RegistroActividad) {
        this.registro = registro;
    }
}

export var RegistroContext = new registroContext();

export default RegistroContext;

