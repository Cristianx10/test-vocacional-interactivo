import React, { Component } from "react";
import Navegador from "../componentes/Navegador/Navegador";
import { TLikertPregunta } from "../plantillas/template-likert/TLikertPregunta";

export default class SeccioA extends Component {
  constructor() {
    super();
    this.views = [];
  }

  componentDidMount() {
    for (let index = 0; index < 3; index++) {
      this.views.push(<TLikertPregunta uid={index + 1}></TLikertPregunta>);
    }
    console.log("bien");
    this.setState({});
  }

  render() {
    let ver;
    if (this.views.length <= 0) {
      ver = <div>Espera</div>;
    } else {
      ver = (
        <Navegador>
          {React.Children.map(this.views, view => {
            return view;
          })}
        </Navegador>
      );
    }

    return ver;
  }
}
