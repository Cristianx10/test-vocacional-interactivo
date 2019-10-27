import Pantalla from "../componentes/Pantalla/Pantalla";
import Navegador from '../componentes/Navegador/Navegador';

export class navegadorContext {
    navegador?:Navegador;

    setNavegador(navegador:Navegador){
        this.navegador = navegador;
    }
}

export var NavegadorContext = new navegadorContext();

export default NavegadorContext;

