import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Inicio } from "./paginas/inicio";

import { Introduccion } from "./paginas/introduccion";
import { Linguistica } from "./paginas/linguistica";
import { Matematicas } from "./paginas/matematicas";




export class Router extends React.Component {
  //onst Router   = () => {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/introduccion" component={Introduccion} />
          <Route path="/linguistica" component={Linguistica} />
          <Route path="/matematicas" component={Matematicas} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
