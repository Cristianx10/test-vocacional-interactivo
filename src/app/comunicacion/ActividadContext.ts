import Contenedor from '../componentes/Contenedor/Contenedor';
import Clasificar from '../actividades/Clasificar/Clasificar';
import Cortes from '../actividades/Cortes/Cortes';
import { Relacionar } from '../actividades/Relacionar/Relacionar';
import { TarjetasR } from '../actividades/TarjetasR/TarjetasR';
import { Pollitos } from '../processing/Pollo/Pollitos';

export class actividadContext {

    clasificar?: Clasificar;
    cortes?: Cortes;
    relacionar?: Relacionar;
    tarjetasR?: TarjetasR
    pollitos?: Pollitos;

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

    setPollitos(pollitos: Pollitos) {
        this.pollitos = pollitos;
    }
}

export var ActividadContext = new actividadContext();

export default ActividadContext;

