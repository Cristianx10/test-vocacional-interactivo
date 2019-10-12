import React, { Component } from "react";
import comunicador from "../comunicacion/Comunicacion";
import Names from "../comunicacion/Names";
import "./ViewCompatorCategoria.scss";
import { ObjectFlags } from "typescript";

export class ViewComparadorCategoiras extends Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.globalResult = this.comunicador.getPropiedadActual(Names.dataUser);
  }

  render() {
    let { pruebas, acumuladas } = this.props.resultado;

    let nRespuestas = [];
    pruebas.forEach((opcionesPrueba, i) => {
      let { usuario, prueba, categorias, ponderacion, UID } = opcionesPrueba;
      let { opciones } = prueba;

      opciones.forEach((opcion, j) => {
        if (nRespuestas[j] === null || nRespuestas[j] === undefined) {
          nRespuestas[j] = {
            nRespuestas: 0,
            ponderacion: [],
            id: opcion.id,
            descripcion: opcion.descripcion
          };
        }
        if (opcion.validacion) {
          nRespuestas[j].nRespuestas += 1;

          ponderacion.sort(function(a, b) {
            return b.valor - a.valor;
          });

          ponderacion.forEach((gCategoria, index) => {
            if (index === 0) {
              let encontro = false;
              nRespuestas[j].ponderacion.forEach(categoria => {
                if (gCategoria.id === categoria.id) {
                  encontro = true;

                  categoria.usuarios.push({ UID: UID, usuario: usuario });

                  categoria.numero++;
                }
              });
              if (encontro === false) {
                nRespuestas[j].ponderacion.push({
                  usuarios: [{ UID: UID, usuario: usuario }],
                  id: gCategoria.id,
                  numero: 1
                });
              }
            }
          });
        }
      });
    });

    //console.log(nRespuestas);

    let viewList = [];
    nRespuestas.forEach((res, i) => {
      let viewPoderacion = [];

      for (let index = 0; index < res.ponderacion.length; index++) {
        let pon = res.ponderacion[index];

        let viewUsuario = [];
        pon.usuarios.forEach(user => {
          viewUsuario.push(
            <div
              onClick={() => {
                this.globalResult.enviarUsuario(user.UID);
              }}
            >
              {user.usuario.nombre}
            </div>
          );
        });

        viewPoderacion.push(
          <div className="rva__ponderacion__opciones__opcion">
            <div className="rva__ponderacion__opciones__opcion__id">
              <div className="rva__ponderacion__opciones__opcion__usuario">
                {pon.id}
              </div>
              <div className="rva__ponderacion__opciones__opcion__usuarios">
                {React.Children.map(viewUsuario, view => {
                  return view;
                })}
              </div>
            </div>
            <div className="rva__ponderacion__opciones__opcion__total">
              {pon.numero}
            </div>
          </div>
        );
      }

      if (res.ponderacion.length === 0) {
        viewPoderacion.push(
          <div className="rva__ponderacion__opciones__opcion">
            <div className="rva__ponderacion__opciones__opcion__id">-</div>
            <div className="rva__ponderacion__opciones__opcion__total">-</div>
          </div>
        );
      }

      let view = (
        <div className="rva__ponderacion">
          <div className="rva__ponderacion__id">{res.id}</div>
          <div className="rva__ponderacion__descripcion">{res.descripcion}</div>
          <div className="rva__ponderacion__nrespuestas">{res.nRespuestas}</div>

          <div className="rva__ponderacion__opciones">
            {React.Children.map(viewPoderacion, view => {
              return view;
            })}
          </div>
        </div>
      );
      viewList.push(view);
    });

    return (
      <div className="rva__ponderacion__global">
        <h1>Vista especifica</h1>
        <div className="rva__ponderacion__cuadro__global">
          <div className="rva__ponderacion__cuadro">
            <div className="rva__ponderacion__titulares">
              <div>Accion</div>
              <div>Descripcion</div>
              <div>Respuestas</div>
              <div>Categorias</div>
              <div>Por Categoria</div>
            </div>

            <div className="rva__ponderacion__resultados">
              {React.Children.map(viewList, view => {
                return view;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class ViewAcumulada extends Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    //this.globalResult = this.comunicador.getPropiedadActual(Names.dataUser);
  }

  render() {
    this.pruebas = Object.assign([], this.props.pruebas);
    let max = Object.assign([], this.props.maximo);

    // console.log(max);
    let maximosGlobal = [];
    let categoriaGlobal = [];

    this.pruebas.forEach(p => {
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

      p.result.forEach(categoria => {
        let encontro = false;
        categoriaGlobal.forEach(categoriaG => {
          if (categoria.id === categoriaG.id) {
            encontro = true;
            categoriaG.valor += categoria.valor;
          }
        });
        if (encontro == false) {
          categoriaGlobal.push(Object.assign({}, categoria));
        }
      });
    });

    let consolidado = [];

    maximosGlobal.forEach(maximo => {
      let encontro = false;
      categoriaGlobal.forEach(categoria => {
        if (categoria.id == maximo.id) {
          encontro = true;
          let found = false;
          consolidado.forEach(c => {
            if (maximo.id == c.maximo.id) {
              found = true;
              c.categoria.valor = categoria.valor;
            }
          });
          if (found == false) {
            consolidado.push({ maximo: maximo, categoria: categoria });
          }
        }
      });
      if (encontro == false) {
        consolidado.push({
          maximo: maximo,
          categoria: { id: maximo.id, valor: 0 }
        });
      }
    });

    let viewList = [];

    consolidado.forEach(c => {
      c.porcetaje = (c.categoria.valor / c.maximo.valor) * 100;
    });

    consolidado.sort(function(a, b) {
      return b.porcetaje - a.porcetaje;
    });

    consolidado.forEach(c => {
      let m = 0;
      let por = 0;
      if (max != null) {
        max.forEach(ma => {
          if (ma.id === c.maximo.id) {
            m = ma.valor;
          }
        });
       // console.log(max);
        por = (c.maximo.valor / m) * 100;
      
      }

      viewList.push(
        <tr>
          <td>
            <div>{c.categoria.id}</div>
          </td>
          <td>
            <div>{c.categoria.valor}</div>
          </td>
          <td>
            <div className="ui__porcentaje">
              <div
                className="ui__porcentaje__barra c_verde"
                style={{ width: `${por}%` }}
              ></div>
              <div className="ui__porcentaje__valor">{c.maximo.valor}</div>
            </div>
          </td>
          <td>
            <div className="ui__porcentaje">
              <div
                className="ui__porcentaje__barra"
                style={{ width: `${c.porcetaje}%` }}
              ></div>
              <div className="ui__porcentaje__valor">{(c.porcetaje).toFixed(2)}%</div>
            </div>
          </td>
        </tr>
      );
    });

    //console.log(consolidado);

    return (
      <div className="rva__ponderacion__global">
        <h1>Vista especifica</h1>
        <div className="rva__acumulado">
          <table border="1px">
            <tbody>
              <tr>
                <td>Categoria:</td>
                <td>Resultado:</td>
                <td>Maximo:</td>
                <td>Porcentaje:</td>
              </tr>

              {React.Children.map(viewList, view => {
                return view;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
