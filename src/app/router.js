import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Inicio } from "./paginas/inicio";

import { Introduccion } from "./paginas/introduccion";
import { Linguistica } from "./paginas/linguistica";
import { Matematicas } from "./paginas/matematicas";
import { Viewregistro } from "./paginas/viewregistro";
import { ViewUsuario } from "./analisis/datosUsuario";
import { Pruebas } from "./paginas/pruebas";
import { Descargar } from "./paginas/Descargar/Descargar";
import { SeccionA } from "./test2019/SeccionA";
import { SeccionB } from "./test2019/SeccionB";
import { SeccionC } from "./test2019/SeccionC";
import SeccionD from "./test2019/SeccionD";
import SeccionE from "./test2019/SeccionE";





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
          <Route path="/datos_usuario" component={ViewUsuario} />
          <Route path="/verregistro" component={Viewregistro} />
          <Route exact path="/descargar" component={Descargar} />

          <Route exact path="/pruebas" component={Pruebas} />

          <Route exact path="/seccion" component={SeccionA} />
          <Route exact path="/seccionb" component={SeccionB} />
          <Route exact path="/seccionc" component={SeccionC} />
          <Route exact path="/secciond" component={SeccionD} />
          <Route exact path="/seccionE" component={SeccionE} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
