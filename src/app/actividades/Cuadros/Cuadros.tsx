import React, { useEffect, createRef, useState } from "react";
import "./Cuadros.scss";
import Pantalla from "../../componentes/Pantalla/Pantalla";
import NavegadorContext from '../../comunicacion/NavegadorContext';
import { GResultados, resultados, ICategoria } from '../../resultados/resultados';


class TS_Cuadros {
    intentos = 0;
    fallos = 0;
    aciertos = 0;
    total = 0;
    totalAcierto = 0;

    pantalla?: Pantalla;
    registro: GResultados;
    acciones: any;

    constructor() {
        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }
        this.registro = resultados.agregar(this);

        this.registro.setId("Cuadros");

        this.update();

        this.acciones = {
            validar: (id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) => {
                this.validar(id, accion, descripcion, valorMaximo);
            }
        };
    }

    update() {
        this.registro.propiedades.intentos = this.intentos;
        this.registro.propiedades.fallos = this.fallos;
        this.registro.propiedades.aciertos = this.aciertos;
        this.registro.propiedades.total = this.total;
        this.registro.propiedades.totalAcierto = this.totalAcierto;
    }

    validar(id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) {
        if (this.registro !== undefined) {
            this.registro.agregarCondicion(id, accion, descripcion, valorMaximo, this);
        }
    }

    onInicial() {

    }

    onFinal() {
        this.registro.agregar();
        resultados.evaluar(this);
    }
}

interface ICuadros {
    level: number;
    UID: string;
    config: Function;
}

const Cuadros = (props: ICuadros) => {

    var container = createRef<HTMLDivElement>();
    var [ts_cuadros] = useState(new TS_Cuadros());

    const onBien = (e: HTMLElement) => {

        if (e.className.includes("validado") == false) {
            e.classList.add("validado");
            console.log("Bien")
            ts_cuadros.aciertos++;
            evaluar();
        }

    }

    const onMal = (e: HTMLElement) => {

        if (e.className.includes("validado") == false) {
            e.classList.add("validado");
            console.log("Mal")
            ts_cuadros.fallos--;
            evaluar();
        }

    }

    const evaluar = () => {
        ts_cuadros.intentos++;
        ts_cuadros.update();
        if(ts_cuadros.intentos >= ts_cuadros.totalAcierto){
            if(ts_cuadros.pantalla){
                ts_cuadros.pantalla.continuar();
            }
        }
    }

    useEffect(() => {
        var HTMLContenedor = container.current;
        if (HTMLContenedor) {
            var etiquetas = HTMLContenedor.querySelectorAll<HTMLDivElement>("div");
            ts_cuadros.total = etiquetas.length;

            etiquetas.forEach((e) => {
                if (e.className === "a") {
                    ts_cuadros.totalAcierto++;
                    e.addEventListener("click", () => { onBien(e) });
                } else {
                    e.addEventListener("click", () => { onMal(e) });
                }
            });

            ts_cuadros.update();
        }

        ts_cuadros.registro.setUID(props.UID)
        props.config(ts_cuadros.registro.propiedades, ts_cuadros.acciones);

    }, []);

    return <div className="Cuadros">
        <div className="Cuadros__titulo">
            <h1>Selecciona los cuadros que notes diferentes en la secuencia de colores.</h1>
        </div>
        <div className="Cuadros__container">
            <div ref={container} className={"Cuadros__container__board" + " level" + props.level}>
                {props.level === 1 ?
                    <>
                        <div /><div className="a" /><div /><div />
                        <div /><div /><div className="a" /><div />
                        <div className="a" /><div /><div /><div />
                        <div /><div /><div /><div className="a" />
                    </>
                    : <></>}

                {props.level === 2 ?
                    <>
                        <div /><div /><div /><div /><div /><div />
                        <div /><div className="a" /><div /><div /><div className="a" /><div />
                        <div /><div /><div /><div /><div /><div />
                        <div /><div className="a" /><div /><div /><div /><div />
                        <div /><div /><div className="a" /><div /><div /><div className="a" />
                        <div className="a" /><div /><div /><div /><div /><div />
                    </>
                    : <></>}

                {props.level === 3 ?
                    <>
                        <div className="a" /><div /><div /><div /><div /><div /><div /><div />
                        <div /><div /><div /><div /><div /><div /><div /><div className="a" />
                        <div /><div /><div /><div className="a" /><div /><div /><div /><div />
                        <div /><div /><div /><div /><div /><div /><div className="a" /><div />
                        <div className="a" /><div /><div /><div /><div /><div /><div /><div />
                        <div /><div /><div /><div /><div /><div /><div className="a" /><div />
                        <div /><div /><div /><div /><div /><div /><div /><div />
                        <div /><div className="a" /><div /><div /><div /><div className="a" /><div /><div />
                    </>
                    : <></>}

            </div>

        </div>

    </div>
}

export default Cuadros;