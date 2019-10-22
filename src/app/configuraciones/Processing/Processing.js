import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

export class Processing extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <P5Wrapper
        sketch={this.props.sketch || this.props.juego}
      ></P5Wrapper>
    );
  }
}

export default Processing;
