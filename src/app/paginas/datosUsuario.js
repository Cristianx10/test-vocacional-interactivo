import React, { Component } from "react";
import { ViewPregunta } from "../analisis/ViewPregunta";
import { ViewAcumulada } from "../analisis/ViewCompatorCategorias";

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
    let { pruebas } = this.data;

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
