import Contenedor from '../componentes/Contenedor/Contenedor';

export class contenedorContext {
    contenedor?: Contenedor;

    setContenedor(contenedor: Contenedor) {
        this.contenedor = contenedor;
    }
}

export var ContenedorContext = new contenedorContext();

export default ContenedorContext;

