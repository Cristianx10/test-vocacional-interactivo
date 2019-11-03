import React from "react";

export function ViewAClasificar(props: any) {
  const { propiedades } = props.prueba;
  const { captura, aciertos, intentos, fallos } = propiedades;

  return (
    <div>
      <div>
        <h2>Numero de aciertos: {aciertos}</h2>
        <h2>Numero de intentos: {intentos}</h2>
        <h2>Numero de fallos: {fallos}</h2>
      </div>
      <table>
        <tbody>
          {propiedades.informacion.map((info: any, i: number) => {
            return (
              <tr key={i}>
                <td>{info.categoria}</td>
                <td>
                  {info.almacenados.map((al: any, j: number) => {
                    return <p key={j}>{al}</p>;
                  })}
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
      <img src={captura} alt="Captura de pantalla" />
    </div>
  );
}

export default ViewAClasificar;