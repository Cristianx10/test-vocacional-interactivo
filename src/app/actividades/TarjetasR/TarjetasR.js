import React from "react";

import comunicador from "../../comunicacion/Comunicacion";
import { resizeClass } from "../../utilidades/AutoClases";
import Names from "../../comunicacion/Names";

import { resultados } from "../../resultados/resultados";

import { Tablero_tarjetas } from "./TS-TarjetasR";

import "./TarjetasR.scss";

/* Clase encargada de la navegación entre actividades*/
export class TarjetasR extends React.Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add(Names.tableroR).push(this);
    this.opciones = [];

    this.tablero = new Tablero_tarjetas();

    resultados.agregar(this);
  }

  onInicial(){

  }

  onFinal(){
    
  }

  componentDidMount() {

    this.tablero.incluirEn(this.refs.contenedor);
    this.tablero.iniciar();

  }

  render() {
    let c = resizeClass(this, "tarjetas__contenedor interaccion");
    return (
      <div ref="contenedor" className={c.className} style={c.style}>
        {React.Children.map(this.props.children, view => {
          return view;
        })}
      </div>
    );
  }
}

/* Clase encargada de la navegación entre actividades*/
export class Carta extends React.Component {
  constructor() {
    super();
    this.comunicador = comunicador;
    this.comunicador.add(Names.carta).push(this);
    this.View_tablero = this.comunicador.getPropiedadActual(Names.tableroR);
    this.tablero = this.View_tablero.tablero;
    //console.log(this.tablero);
    this.View_tablero.opciones.push(this);
  }

  componentDidMount() {
    //console.log("una tarjeta");

    let img = this.props.img;
    let posA = this.props.posA;
    let posB = this.props.posB;

    this.tablero.agregar(img, posA, img, posB);
  }

  render() {
    return <div></div>;
  }
}

/***
 * 
 * this.tablero.setValidacion(() => {
      console.log("gano");
      if (this.tablero.intentos <= 6) {

        resultados.agregarResultados([{ area: "salud", valor: 100 }]);
      } else if (this.tablero.intentos == 7) {
        resultados.agregarResultados([{ area: "salud", valor: 75 }]);
      } else if (this.tablero.intentos == 8) {
        resultados.agregarResultados([{ area: "salud", valor: 50 }]);
      } else if (this.tablero.intentos == 9) {
        resultados.agregarResultados([{ area: "salud", valor: 25 }]);
      } else if (this.tablero.intentos >= 10) {
      }
      setTimeout(() => {
        seguir();
      }, 1000);
    });


 */

/**
 * 
    tableros.push(new Tablero_tarjetas());

    tableros[1].agregar(
      "/img/emparejados/card-1.png",
      0,
      "/img/emparejados/card-1.png",
      2
    );
    tableros[1].agregar(
      "/img/emparejados/card-2.png",
      6,
      "/img/emparejados/card-2.png",
      4
    );
    tableros[1].agregar(
      "/img/emparejados/card-3.png",
      3,
      "/img/emparejados/card-3.png",
      8
    );
    tableros[1].agregar(
      "/img/emparejados/card-4.png",
      7,
      "/img/emparejados/card-4.png",
      5
    );
    tableros[1].agregar(
      "/img/emparejados/card-5.png",
      9,
      "/img/emparejados/card-5.png",
      1
    );

    tableros[1].iniciar();

    tableros.push(new Tablero_tarjetas());

    tableros[2].agregar(
      "/img/emparejados/card-1.png",
      0,
      "/img/emparejados/card-1.png",
      2
    );
    tableros[2].agregar(
      "/img/emparejados/card-2.png",
      4,
      "/img/emparejados/card-2.png",
      6
    );
    tableros[2].agregar(
      "/img/emparejados/card-3.png",
      10,
      "/img/emparejados/card-3.png",
      12
    );
    tableros[2].agregar(
      "/img/emparejados/card-4.png",
      18,
      "/img/emparejados/card-4.png",
      1
    );
    tableros[2].agregar(
      "/img/emparejados/card-5.png",
      3,
      "/img/emparejados/card-5.png",
      17
    );
    tableros[2].agregar(
      "/img/emparejados/card-6.png",
      11,
      "/img/emparejados/card-6.png",
      14
    );
    tableros[2].agregar(
      "/img/emparejados/card-7.png",
      13,
      "/img/emparejados/card-7.png",
      19
    );
    tableros[2].agregar(
      "/img/emparejados/card-8.png",
      9,
      "/img/emparejados/card-8.png",
      5
    );
    tableros[2].agregar(
      "/img/emparejados/card-9.png",
      7,
      "/img/emparejados/card-9.png",
      8
    );
    tableros[2].agregar(
      "/img/emparejados/card-10.png",
      15,
      "/img/emparejados/card-10.png",
      16
    );

    tableros[2].iniciar();

    
    tableros[1].setValidacion(() => {
      console.log("gano");
      if (tableros[1].intentos <= 8) {
        resultados.agregarResultados([{ area: "salud", valor: 100 }]);
      } else if (tableros[1].intentos == 9) {
        resultados.agregarResultados([{ area: "salud", valor: 83 }]);
      } else if (tableros[1].intentos == 10) {
        resultados.agregarResultados([{ area: "salud", valor: 67 }]);
      } else if (tableros[1].intentos == 11) {
        resultados.agregarResultados([{ area: "salud", valor: 50 }]);
      } else if (tableros[1].intentos >= 12) {
      }
      setTimeout(() => {
        seguir();
      }, 1000);
    });

    tableros[2].setValidacion(() => {
      console.log("gano");
      if (tableros[2].intentos <= 10) {
        resultados.agregarResultados([{ area: "salud", valor: 100 }]);
      } else if (tableros[2].intentos == 11) {
        resultados.agregarResultados([{ area: "salud", valor: 90 }]);
      } else if (tableros[2].intentos == 12) {
        resultados.agregarResultados([{ area: "salud", valor: 80 }]);
      } else if (tableros[2].intentos == 13) {
        resultados.agregarResultados([{ area: "salud", valor: 60 }]);
      } else if (tableros[2].intentos >= 14) {
      }
      setTimeout(() => {
        seguir();
      }, 1000);
    });

    resultados.agregarMaximo([{ area: "salud", valor: 300 }]);

    tableros.forEach(t => {
      t.setIntentoAcierto(() => {
        console.log("acierto");
      });

      t.setIntentoFallo(() => {
        console.log("fallo");
      });
    });

 */
