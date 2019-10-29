import React, { Component } from "react";
import { resultados, resultados2 } from "../resultados/resultados";
import { ViewPregunta, ViewPreguntaEscritura } from "../analisis/ViewPregunta";

import { UnificarResultados } from "../resultados/unificador";
import comunicador from "../comunicacion/Comunicacion";
import Names from "../comunicacion/Names";
import { ViewComparadorCategoiras } from "../analisis/ViewCompatorCategorias";
import { ViewARelacion } from "../analisis/ViewARelacion";
import { ViewATarjetas } from "../analisis/ViewATarjetas";
import { ViewAClasificar } from "../analisis/ViewClasificar";

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

  leerArchivo(e) {
    var archivos = e.target.files;

    for (let i = 0; i < archivos.length; i++) {
      let archivo = archivos[i];

      if (!archivo) {
        return;
      }

      let lector = new FileReader();
      lector.readAsText(archivo);

      lector.onload = e => {
        let contenido = e.target.result;
        let datos = JSON.parse(contenido);
        this.resultados.agregar(datos);
        this.setState({});
      };
    }
  }

  componentDidMount() {
    this.resultados.agregar(resultados);
    //this.resultados.agregar(resultados2);
    //this.resultados.agregar(Object.assign({}, resultados2));
    this.setState({});
  }

  render() {
    let views = [];

    views.push(<h1>Pruebas</h1>);

    let pruebasResultantes = this.resultados.unificar();

    pruebasResultantes.forEach(resultado => {
      let view = <div>Categoria no encontrada</div>;
      let prueba = resultado.pruebas[0].prueba;
      let id = prueba.id;

      let viewPrueba = null;
      let viewTitulo = null;

      if (id === "Pregunta") {
        viewTitulo = <h2>Pregunta General</h2>;
        viewPrueba = <ViewPregunta prueba={prueba} />;
      } else if (id === "Likert") {
        viewTitulo = <h2>Pregunta Likert</h2>;
        viewPrueba = <ViewPregunta prueba={prueba} />;
      } else if (id === "Escritura") {
        viewTitulo = <h2>Pregunta Escritura</h2>;
        viewPrueba = <ViewPreguntaEscritura prueba={prueba} />;
      } else if (id === "Relacionar_Palabras") {
        viewTitulo = <h2>Pregunta Relaciona Palabras</h2>;
        viewPrueba = <ViewARelacion prueba={prueba} />;
      } else if (id === "Tarjetas__relacion") {
        viewTitulo = <h2>Tarjetas escondidas</h2>;
        viewPrueba = <ViewATarjetas prueba={prueba} />;
      } else if (id === "Clasificacion") {
        viewTitulo = <h2>Clasificacion</h2>;
        viewPrueba = <ViewAClasificar prueba={prueba} />;
      }

      view = (
        <div className="rv__prueba">
          {viewTitulo}
          <h3>Tiempo: {prueba.tiempo}</h3>
          <h3>UID de la prueba: {prueba.UID}</h3>
          {viewPrueba}
          <ViewComparadorCategoiras resultado={resultado} />
        </div>
      );

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
          <input type="file" onChange={this.leerArchivo.bind(this)} multiple />
        </div>
        <div>
          {React.Children.map(views, view => {
            return view;
          })}
        </div>
      </div>
    );
  }
}
