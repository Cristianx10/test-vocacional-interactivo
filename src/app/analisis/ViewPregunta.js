import React from "react";
import "./ViewPregunta.scss";

export class ViewPregunta extends React.Component {
  render() {
    const { propiedades, opciones } = this.props.resultado;

    let text__titulares = [];
    let img__titulares = [];
    let contieneImgT = false;

    propiedades.titulares.forEach(titular => {
      if (titular.type === "img") {
        contieneImgT = TextTrackCueList;
        img__titulares.push(titular.contenido);
      } else {
        text__titulares.push(titular.contenido);
      }
    });
    let viewT;
    if (contieneImgT) {
      viewT = (
        <div className="rv__pregunta__titulares__conimg">
          <div className="rv__pregunta__titulares">
            {React.Children.map(text__titulares, view => {
              return <div>{view}</div>;
            })}
          </div>

          <div className="rv__pregunta__titulares__img">
            {/*
            {React.Children.map(img__titulares, view => {
               
              return <img src={view} alt="foto"></img>;
            })}

        */}
            <VPGaleria img={img__titulares} />
          </div>
        </div>
      );
    } else {
      viewT = (
        <div className="rv__pregunta__titulares__sinimg">
          <div className="rv__pregunta__titulares">
            {React.Children.map(text__titulares, view => {
              return <div>{view}</div>;
            })}
          </div>
        </div>
      );
    }

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

      let classSeleccion = "rv__pregunta__opciones__contenedor";
      if (opcion.validacion && opcion.validacion === true) {
        classSeleccion = "rv__pregunta__opciones__contenedor seleccion";
      }

      if (contieneImg) {
        let view = (
          <div className={classSeleccion}>
            <div className="rv__pregunta__opciones__contenedor__img">
              {React.Children.map(views.img, v => {
                return v;
              })}
            </div>
            <div className="rv__pregunta__opciones__contenedor__text">
              {React.Children.map(views.text, v => {
                return v;
              })}
            </div>
          </div>
        );
        views__opciones.push(view);
      } else {
        let view = (
          <div className={classSeleccion}>
            <div className="rv__pregunta__opciones__contenedor__text">
              {React.Children.map(views.text, v => {
                return v;
              })}
            </div>
          </div>
        );
        views__opciones.push(view);
      }
    });

    let classNamePrincipal = "rv__pregunta";
    if (contieneImgT) {
      classNamePrincipal = "rv__pregunta__img";
    }

    return (
      <div className={classNamePrincipal}>
        {viewT}
        <div className="rv__pregunta__opciones">
          {React.Children.map(views__opciones, view => {
            return view;
          })}
        </div>
      </div>
    );
  }
}

class VPGaleria extends React.Component {
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
