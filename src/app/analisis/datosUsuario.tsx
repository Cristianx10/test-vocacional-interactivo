import React, { Component } from "react";
import { ViewPregunta, ViewPreguntaEscritura } from "./ViewPregunta";
import {
  ViewAcumulada,
  ViewComparadorOpciones
} from "./ViewCompatorCategorias";
import "./datosUsuario.scss";
import { ViewARelacion } from "./ViewARelacion";
import { ViewATarjetas } from "./ViewATarjetas";

interface IPropsViewUsuario {

}

declare var globalDataUser: any;


export class ViewUsuario extends Component<IPropsViewUsuario> {
  data: any;
  constructor(props: IPropsViewUsuario) {
    super(props);
    this.data = globalDataUser;
  }

  componentDidMount() {
    this.data = globalDataUser;
    let name = cambiarEspacios(this.data.usuario.nombre);
    //history.pushState(null, "", "/usuario/" + name);
    document.title = this.data.usuario.nombre;
  }

  render() {
    let { pruebas, usuario, tiempo } = this.data;


    pruebas = pruebas.sort((a: any, b: any) => {
      return a.UID - b.UID;
    });

    let views: any[] = [];
    let acumuladoTotal: any[] = [];

    let maximosGlobal: any[] = [];
    pruebas.forEach((p: any) => {
      p.maximos.forEach((maximo: any) => {
        let encontro = false;
        maximosGlobal.forEach(maximoG => {
          if (maximo.id === maximoG.id) {
            encontro = true;
            maximoG.valor += maximo.valor;
          }
        });
        if (encontro == false) {
          maximosGlobal.push(Object.assign({}, maximo));
        }
      });
    });

    pruebas.forEach((prueba: any) => {
      acumuladoTotal.push(prueba);
      let view = <div>Categoria no encontrada</div>;
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
      }


      view = (
        <div className="rv__prueba">
          {viewTitulo}
          <h3>Tiempo: {prueba.tiempo}</h3>
          {viewPrueba}
          <ViewComparadorOpciones prueba={prueba} />
          <ViewAcumulada pruebas={[prueba]} />
          <ViewAcumulada pruebas={Object.assign({}, acumuladoTotal)} maximo={maximosGlobal} />
        </div>
      );

      /*
      if (id === "Pregunta") {
        view = (
          <div className="rv__prueba">
            <ViewPregunta prueba={prueba} />
            <ViewComparadorOpciones prueba={prueba} />
            <ViewAcumulada pruebas={[prueba]} />
            <ViewAcumulada pruebas={acumuladoTotal} maximo={maximosGlobal} />
          </div>
        );
      } else if (id === "Likert") {
        view = (
          <div className="rv__prueba">
            <h2>Pregunta Likert</h2>
            <ViewPregunta prueba={prueba} />
            <ViewComparadorOpciones prueba={prueba} />
            <ViewAcumulada pruebas={[prueba]} />
            <ViewAcumulada pruebas={acumuladoTotal} maximo={maximosGlobal} />
          </div>
        );
      } else if (id === "Escritura") {
        view = (
          <div className="rv__prueba">
            <h2>Pregunta Escritura</h2>
            <ViewPreguntaEscritura prueba={prueba} />
            <ViewComparadorOpciones prueba={prueba} />
            <ViewAcumulada pruebas={[prueba]} />
            <ViewAcumulada pruebas={acumuladoTotal} maximo={maximosGlobal} />
          </div>
        );
      } else if (id === "Relacionar_Palabras") {
        view = (
          <div className="rv__prueba">
            <h2>Pregunta Relaciona Palabras</h2>
            <ViewARelacion prueba={prueba} />
            <ViewComparadorOpciones prueba={prueba} />
            <ViewAcumulada pruebas={[prueba]} />
            <ViewAcumulada pruebas={acumuladoTotal} maximo={maximosGlobal} />
          </div>
        );
      }*/

      views.push(view);
    });

    return (
      <div>
        <ViewUserData usuario={usuario} />
        <h2>Tiempo total de la prueba: {tiempo}</h2>
        <h3>Ver datos de usuario</h3>
        <div>
          <ViewAcumulada pruebas={Object.assign([], pruebas)} />
        </div>
        {React.Children.map(views, view => {
          return view;
        })}
      </div>
    );
  }
}

interface IPropsViewUserData {
  usuario: any;
}

export class ViewUserData extends Component<IPropsViewUserData> {
  render() {
    let usuario = this.props.usuario;

    return (
      <div className="horizontal">
        <div>
          <img width="200px" src="/includes/user/icon-user.png" />
        </div>
        <div>
          <h2>Nombre: {usuario.nombre}</h2>
          <h2>Genero: {usuario.genero}</h2>
          <h2>Edad: {usuario.edad}</h2>
          <h2>Mano: {usuario.mano}</h2>
          <h2>Carrera: {usuario.carrera}</h2>

        </div>
      </div>
    );
  }
}

function cambiarEspacios(texto: any) {
  var contenido = "";
  let palabra = texto;
  for (let i = 0; i < palabra.length; i++) {
    let letra = palabra.charAt(i) + "";
    if (letra.includes(" ")) {
      letra = letra.replace(" ", "_");
    }
    contenido = contenido + letra;
  } //fin del for
  return contenido;
}
