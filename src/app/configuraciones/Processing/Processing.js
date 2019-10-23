import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import comunicador from "../../comunicacion/Comunicacion";
import Names from "../../comunicacion/Names";

export class Processing extends Component {
  constructor() {
    super();
    this.comunicador = comunicador.add(Names.processing).push(this);
    this.propiedades ={};
  }

  componentDidMount(){
  
  }

  render() {
    
    return (
      <P5Wrapper ref="juego"
        sketch={this.props.sketch || this.props.juego}
      ></P5Wrapper>
    );
  }
}

export default Processing;
