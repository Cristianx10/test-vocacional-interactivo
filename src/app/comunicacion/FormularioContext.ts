import Formulario from '../componentes/Formulario/Formulario';


export class fomularioContext {
    formulario?: Formulario;

    setFormulario(formulario: Formulario) {
        this.formulario = formulario;
    }
}

export var FomularioContext = new fomularioContext();

export default FomularioContext;

