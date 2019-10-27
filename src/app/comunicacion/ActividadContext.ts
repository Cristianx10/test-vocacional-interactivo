import Contenedor from '../componentes/Contenedor/Contenedor';
import Clasificar from '../actividades/Clasificar/Clasificar';

export class actividadContext {

    clasificar?: Clasificar;

    setClasificar(clasificar: Clasificar) {
        this.clasificar = clasificar;
    }
}

export var ActividadContext = new actividadContext();

export default ActividadContext;

