import Processing from '../componentes/Processing/Processing';

export class processingContext {
    actividad?: any;
    nActividades: number = 0;

    setActividad(actividad: Processing) {
        this.nActividades++;
        this.actividad = actividad;
    }
}

export var ProcessingContext = new processingContext();

export default ProcessingContext;

