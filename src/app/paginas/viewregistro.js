import React, { Component } from "react";
import { resultados, resultados2 } from "../resultados/resultados";
import { ViewPregunta } from "../analisis/ViewPregunta";

import { UnificarResultados } from "../resultados/unificador";
import comunicador from "../comunicacion/Comunicacion";
import Names from "../comunicacion/Names";
import { ViewComparadorCategoiras } from "../analisis/ViewCompatorCategorias";

export class Viewregistro extends Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add(Names.dataUser).push(this);

    this.envioData = null;
    this.resultados = new UnificarResultados();
  }

  enviarUsuario(userUID) {
    this.envioData = this.refs.envioData;
    this.envioData.value = JSON.stringify(this.resultados.getUID(userUID));

    this.refs.formadmin.submit();
    this.envioData.value = "";
  }

  onSubmit(event) {
    //event.preventDefault();
    console.log("dato tomado");
  }

  componentDidMount() {
    this.resultados.agregar(resultados);
    this.resultados.agregar(resultados2);
    this.resultados.agregar(Object.assign({}, resultados2));
    this.setState({})
  }

  render() {
    let views = [];

    views.push(<h1>Pruebas</h1>);

    let pruebasResultantes = this.resultados.unificar();

    pruebasResultantes.forEach(resultado => {
      let view = <div>Categoria no encontrada</div>;
      let prueba = resultado.pruebas[0].prueba;
      let id = prueba.id;
      if (id === "Pregunta") {
        view = (
          <div className="rv__prueba">
            <ViewPregunta prueba={prueba} />
            <ViewComparadorCategoiras resultado={resultado} />
          </div>
        );
      }
      views.push(view);
    });

    return (
      <div style={{ padding: "0 30px" }}>
        <form
          ref="formadmin"
          style={{ display: "none" }}
          id="nom"
          target="blank"
          action="/datos_usuario"
          method="POST"
          onSubmit={this.onSubmit.bind(this)}
        >
          <input
            ref="envioData"
            defaultValue=""
            name="prueba"
            type="hidden"
            placeholder="ingrese su texto"
          />

          <input type="submit" value="enviar" />
        </form>
        <div>
          {React.Children.map(views, view => {
            return view;
          })}
        </div>
      </div>
    );
  }
}
