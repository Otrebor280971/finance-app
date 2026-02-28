import React from "react";
import "./Gastos.css";
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function Gastos() {
    const{ categorias, addGasto, addCategoria} = useFinance();
    const [concepto, setConcepto] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [nombreCat, setNombreCat] = useState("");
    const [colorCat, setColorCat] = useState("");
    
    const handleGuardarGasto = () => {
        if (!concepto || !fecha || !categoria || !cantidad) return;
        addGasto({
        concepto,
        fecha,
        categoria,
        monto: Number(cantidad),
        });
        setConcepto("");
        setFecha("");
        setCategoria("");
        setCantidad("");
    };

    const handleGuardarCategoria = () => {
        if (!nombreCat) return;
        addCategoria(nombreCat);
        setNombreCat("");
        setColorCat("");
    };

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
                        <input 
                            className="field-input"     
                            type="text" 
                            value={concepto}
                            onChange={(e)=> setConcepto(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="field-label">Fecha</label>
                        <input 
                            className="field-input" 
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)} 
                        />
                    </div>
                    <div className="field">
                        <label className="field-label">Categoría</label>
                        <select 
                            className="field-input field-select"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value=""></option>
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label className="field-label">Cantidad</label>
                        <input 
                            className="field-input" 
                            type="number" 
                            min="0" 
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                    </div>
                    <button className="btn">Guardar</button>
                </div>
            </div>
            <div className="Tabla2">
                <div className="card">
                    <h2>Crear categoría</h2>
                    <div className="field">
                        <label className="field-label">Nombre</label>
                        <input
                            className="field-input field-input--short"
                            type="text"
                            value={nombreCat}
                            onChange={(e) => setNombreCat(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="field-label">Color</label>
                        <input
                            className="field-input field-input--short"
                            type="text"
                            value={colorCat}
                            onChange={(e) => setColorCat(e.target.value)}
                        />
                    </div>
                <button className="btn" onClick={handleGuardarCategoria}>Guardar</button>
                </div>
            </div>
        </div>
    );
}