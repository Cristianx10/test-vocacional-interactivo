import Contenedor from '../componentes/Contenedor/Contenedor';
import Clasificar from '../actividades/Clasificar/Clasificar';
import Cortes from '../actividades/Cortes/Cortes';
import { Relacionar } from '../actividades/Relacionar/Relacionar';
import { TarjetasR } from '../actividades/TarjetasR/TarjetasR';

export class actividadContext {

    clasificar?: Clasificar;
    cortes?: Cortes;
    relacionar?: Relacionar;
    tarjetasR?: TarjetasR

    setClasificar(clasificar: Clasificar) {
        this.clasificar = clasificar;
    }

    setRelacionar(relacionar: Relacionar) {
        this.relacionar = relacionar;
    }

    setCorte(cortes: Cortes) {
        this.cortes = cortes;
    }

    setTarjetasR(tarjetasR: TarjetasR) {
        this.tarjetasR = tarjetasR;
    }
}

export var ActividadContext = new actividadContext();

export default ActividadContext;

