import React from "react";
import "./HistorialGastos.css";

export default function HistorialGastos() {
  return (
    <div className="historial-page">
      <div className="historial-header">
        <h1 className="historial-title">Historial de gastos</h1>
        <div className="filtro-wrapper">
          <select className="filtro-select">
            <option value="">FILTRAR CATEGORÍAS</option>
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="servicios">Servicios</option>
          </select>
        </div>
      </div>
      <div className="historial-content">
        <div className="mes-card">
          <h2 className="mes-titulo">Enero 2026</h2>
          <div className="mes-circle"></div>
          <div className="mes-rect"></div>
        </div>
        <div className="tabla-wrapper">
          <table className="tabla-gastos">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>CONCEPTO</th>
                <th>CANTIDAD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>28/01/26</td>
                <td>NAVAJA</td>
                <td>$80000</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}