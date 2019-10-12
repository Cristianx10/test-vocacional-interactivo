import React, { Component } from "react";
import "./ViewPregunta.scss";

export class ViewPregunta extends Component {
  render() {
    let prueba = this.props.prueba;
    let { propiedades, opciones, maximos } = prueba;

    let contieneImgT = false;

    propiedades.titulares.forEach(titular => {
      if (titular.type === "img") {
        contieneImgT = true;
        return;
      }
    });

    let arrayMaximos = [];
    let viewMaximos;

    prueba.maximos.forEach(valor => {
      arrayMaximos.push(
        <div className="rv__pregunta__opciones__valor">
          <div className="rv__pregunta__opciones__valor__area">
            {valor.id + ":"}
          </div>
          <div className="rv__pregunta__opciones__valor__valor">
            {valor.valor}
          </div>
        </div>
      );
    });

    viewMaximos = (
      <div>
        {React.Children.map(arrayMaximos, max => {
          return max;
        })}
      </div>
    );

    let classNamePrincipal = "rv__pregunta";
    if (contieneImgT) {
      classNamePrincipal = "rv__pregunta__img";
    }

    return (
      <div className={classNamePrincipal}>
        <VPTitulares prueba={prueba} />
        <div className="rv__pregunta__opciones__contenedor__global">
          <VPOpciones prueba={prueba} />
          <div className="rv__pregunta__maximos"><h2>Maximos:</h2>{viewMaximos}</div>
        </div>
      </div>
    );
  }
}

class VPTitulares extends Component {
  render() {
    let prueba = this.props.prueba;
    let { propiedades, opciones, maximos } = prueba;

    let titulares__img = [];
    let titulares__text = [];
    let contieneImgT = false;

    propiedades.titulares.forEach(titular => {
      if (titular.type === "img") {
        contieneImgT = true;
        titulares__img.push(titular.contenido);
      } else {
        titulares__text.push(titular.contenido);
      }
    });

    let viewImg;

    if (contieneImgT) {
      if (titulares__img.length === 1) {
        viewImg = <img width="500px" src={titulares__img[0]} alt="foto" />;
      } else {
        viewImg = <VPGaleria img={titulares__img} />;
      }
    }

    let viewTotal;

    if (contieneImgT) {
      viewTotal = (
        <div className="rv__pregunta__titulares__conimg">
          <div className="rv__pregunta__titulares">
            {React.Children.map(titulares__text, view => {
              return <div>{view}</div>;
            })}
          </div>
          <div className="rv__pregunta__titulares__img">{viewImg}</div>
        </div>
      );
    } else {
      viewTotal = (
        <div className="rv__pregunta__titulares__sinimg">
          <div className="rv__pregunta__titulares">
            {React.Children.map(titulares__text, view => {
              return <div>{view}</div>;
            })}
          </div>
        </div>
      );
    }
    return viewTotal;
  }
}

class VPOpciones extends Component {
  render() {
    let prueba = this.props.prueba;
    let { propiedades, opciones, maximos } = prueba;

    let views__opciones = [];

    opciones.forEach(opcion => {
      let contieneImg = false;
      let views = {
        img: [],
        text: []
      };
      opcion.propiedades.respuestas.forEach(respuesta => {
        if (respuesta.type === "img") {
          contieneImg = true;
          views.img.push(
            <div className="rv__pregunta__opciones__opcion__img">
              <img src={respuesta.contenido} alt="opcion"></img>
            </div>
          );
        } else {
          views.text.push(
            <div className="rv__pregunta__opciones__opcion__text">
              <p>{respuesta.contenido}</p>
            </div>
          );
        }
      });

      let arrayValor = [];
      opcion.valor.forEach(valor => {
        arrayValor.push(
          <div className="rv__pregunta__opciones__valor">
            <div className="rv__pregunta__opciones__valor__area">
              {valor.id + ":"}
            </div>
            <div className="rv__pregunta__opciones__valor__valor">
              {valor.valor}
            </div>
          </div>
        );
      });

      let classSeleccion = "rv__pregunta__opciones__contenedor__item";
      if (opcion.validacion && opcion.validacion === true) {
        classSeleccion = "rv__pregunta__opciones__contenedor__item seleccion";
      }
      let view;
      if (contieneImg) {
        view = (
          <div className={classSeleccion}>
            <div className="rv__pregunta__opciones__contenedor__item__img">
              {React.Children.map(views.img, v => {
                return v;
              })}
            </div>
            <div className="rv__pregunta__opciones__contenedor__item__text">
              {React.Children.map(views.text, v => {
                return v;
              })}
            </div>
          </div>
        );
        //views__opciones.push(view);
      } else {
        view = (
          <div className={classSeleccion}>
            <div className="rv__pregunta__opciones__contenedor__item__text">
              {React.Children.map(views.text, v => {
                return v;
              })}
            </div>
          </div>
        );
        //views__opciones.push(view);
      }

      let viewT = (
        <div className="rv__pregunta__opciones__contenedor">
          <div>{view}</div>
          <div className="rv__pregunta__opciones__valor__contenedor">
            {React.Children.map(arrayValor, v => {
              return v;
            })}
          </div>
        </div>
      );
      views__opciones.push(viewT);
    });

    return (
      <div className="rv__pregunta__opciones__contenedor__general">
        <div className="rv__pregunta__opciones">
          {React.Children.map(views__opciones, view => {
            return view;
          })}
        </div>
      </div>
    );
  }
}

class VPGaleria extends Component {
  constructor() {
    super();
    this.state = {
      seleccion: ""
    };
  }

  componentDidMount() {
    let imagenes = this.props.img;
    this.setState({ seleccion: imagenes[0] });
  }

  render() {
    let imagenes = this.props.img;
    return (
      <div className="vm__pgaleria">
        <div className="vm__pgaleria__principal">
          <img
            className="vm__pgaleria__principal__img"
            src={this.state.seleccion}
            alt="principal"
          />
        </div>
        <div>
          <div className="vm__pgaleria__opciones">
            {React.Children.map(imagenes, img => {
              return (
                <div
                  className="vm__pgaleria__opciones__opcion"
                  onClick={() => {
                    this.setState({ seleccion: img });
                  }}
                >
                  <img
                    className="vm__pgaleria__opciones__opcion__img"
                    src={img}
                    alt="opcion"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
