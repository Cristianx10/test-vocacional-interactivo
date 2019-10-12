import React, { Component } from "react";
import { ViewPregunta } from "./ViewPregunta";
import { ViewAcumulada } from "./ViewCompatorCategorias";
import "./datosUsuario.scss";

export class ViewUsuario extends Component {
  constructor() {
    super();
    this.data = globalDataUser;
  }

  componentDidMount() {
    this.data = globalDataUser;
    let name = cambiarEspacios(this.data.usuario.nombre);
    //history.pushState(null, "", "/usuario/" + name);
    document.title = this.data.usuario.nombre;
  }

  render() {
    let { pruebas, usuario } = this.data;

    let views = [];
    let acumuladoTotal = [];

    let maximosGlobal = [];
    pruebas.forEach(p => {
      p.maximos.forEach(maximo => {
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

    pruebas.forEach(prueba => {
      acumuladoTotal.push(prueba);
      let view = <div>Categoria no encontrada</div>;
      let id = prueba.id;
      if (id === "Pregunta") {
        view = (
          <div className="rv__prueba">
            <ViewPregunta prueba={prueba} />
            <ViewAcumulada
              pruebas={Object.assign([], acumuladoTotal)}
              maximo={maximosGlobal}
            />
          </div>
        );
      }
      views.push(view);
    });

    return (
      <div>
        <ViewUserData usuario={usuario} />
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

export class ViewUserData extends Component {
  render() {
    let usuario = this.props.usuario;
    console.log(usuario);
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

function cambiarEspacios(texto) {
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
