import React from "react";
import "./Gastos.css";

export default function Gastos() {
  return (
    
    <div className="Gastos">
        <div className="header-nav">
            <a href="/" className="back-link">Regresar</a>
        </div>
        <div className="Tabla1">
            <div className="card">
                <h1>Añadir gastos</h1>
                <div className="field">
                <label className="concepto">Concepto</label>
                <input className="field-input" type="text" />
                </div>
                <div className="field">
                <label className="field-label">Fecha</label>
                <input className="field-input" type="text" />
                </div>
                <div className="field">
                <label className="field-label">Categoría</label>
                <input className="field-input" type="text" />
                </div>
                <div className="field">
                <label className="field-label">Cantidad</label>
                <input className="field-input" type="text" />
                </div>
                <button className="btn">Guardar</button>
          </div>
        </div>
        <div className="Tabla2">
          <div className="card">
            <h2>Crear categoría</h2>
            <div className="field">
              <label className="field-label">Nombre</label>
              <input className="field-input field-input--short" type="text" />
            </div>
            <div className="field">
              <label className="field-label">Color</label>
              <input className="field-input field-input--short" type="text" />
            </div>
            <button className="btn">Guardar</button>
          </div>
        </div>
    </div>
  );
}