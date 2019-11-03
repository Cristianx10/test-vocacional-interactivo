import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Inicio from "./Narracion/Inicio";
import RegistroActividad from './paginas/RegistroActividad';
import { ViewUsuario } from './analisis/datosUsuario';
import Descargar from "./Narracion/Descargar";
import SeccionA from './Narracion/SeccionA';
import SeccionB from './Narracion/SeccionB';
import SeccionC from './Narracion/SeccionC';
import SeccionD from './Narracion/SeccionD';
import SeccionE from './Narracion/SeccionE';
import SeccionF from './Narracion/SeccionF';
import SeccionG from './Narracion/SeccionG';
import SeccionH from './Narracion/SeccionH';
import VResultados from './Narracion/Resultados/VResultados';




export var routes = {
  cuetionarioA: "/cuestionarioa",
  cuetionarioB: "/cuestionariob",
  cuetionarioC: "/cuestionarioc",
  cuetionarioD: "/cuestionariod",
  cuetionarioE: "/cuestionarioe",
  cuetionarioF: "/cuestionariof",
  cuetionarioG: "/cuestionariog",
  cuetionarioH: "/cuestionarioh",
  cuetionarioI: "/cuestionarioi",
  cuetionarioJ: "/cuestionarioj",
  descargar: "/descargar",
  resultados: "/resultados",
  registro: "/registro"
}


export class Router extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path="/" component={Inicio} />

          <Route exact path={routes.cuetionarioA} component={SeccionA} />
          <Route exact path={routes.cuetionarioB} component={SeccionB} />
          <Route exact path={routes.cuetionarioC} component={SeccionC} />
          <Route exact path={routes.cuetionarioD} component={SeccionD} />
          <Route exact path={routes.cuetionarioE} component={SeccionE} />
          <Route exact path={routes.cuetionarioF} component={SeccionF} />
          <Route exact path={routes.cuetionarioG} component={SeccionG} />
          <Route exact path={routes.cuetionarioH} component={SeccionH} />

          {/**Pendiente */}
          <Route exact path={routes.resultados} component={VResultados} />

          <Route exact path={routes.descargar} component={Descargar} />

          <Route exact path={routes.registro} component={RegistroActividad} />
          <Route path="/datos_usuario" component={ViewUsuario} />


        </Switch>
      </BrowserRouter>
    );
  }
}



export default Router;





/**
 *
 *
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
          <Route exact path="/seccione" component={SeccionE} />
          <Route exact path="/seccionh" component={SeccionH} />
          <Route exact path="/seccionf" component={SeccionF} />
          <Route exact path="/secciong" component={SeccionG} />
          <Route exact path="/seccionj" component={SeccionJ} />
 */
