import React, { useState } from "react";
import "./Gastos.css";
import { useFinance } from "../context/FinanceContext";

export default function Gastos() {
    const { categorias, addGasto, addCategoria } = useFinance();
    
    const [concepto, setConcepto] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [cantidad, setCantidad] = useState("");

    const [nombreCat, setNombreCat] = useState("");
    const [colorCat, setColorCat] = useState("#345B68");

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

        addCategoria(nombreCat, colorCat);

        setNombreCat("");
        setColorCat("#345B86")
    };

    return (
        <div className="gastos-page">
            <div className="header-nav">
                <a href="/" className="back-link">Regresar</a>
            </div>

            <div className="cards-container">
                
                <div className="card">
                    <h1>Añadir gastos</h1>
                    
                    <div className="field">
                        <label>Concepto</label>
                        <input 
                            className="field-input"     
                            type="text" 
                            value={concepto}
                            onChange={(e)=> setConcepto(e.target.value)}
                            placeholder="Ej. Comida, Uber..."
                        />
                    </div>

                    <div className="field">
                        <label>Fecha</label>
                        <input 
                            className="field-input" 
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)} 
                        />
                    </div>

                    <div className="field">
                        <label>Categoría</label>
                        <select 
                            className="field-input"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">-- Seleccionar --</option>
                            {categorias.map((cat) => (
                            <option key={cat.id} value={cat.nombre}>
                                {cat.nombre}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label>Cantidad</label>
                        <input 
                            className="field-input" 
                            type="number" 
                            min="0" 
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            placeholder="$ 0.00"
                        />
                    </div>

                    <button className="btn" onClick={handleGuardarGasto}>Guardar Gasto</button>
                </div>

                <div className="card">
                    <h2>Crear categoría</h2>
                    
                    <div className="field">
                        <label>Nombre</label>
                        <input
                            className="field-input"
                            type="text"
                            value={nombreCat}
                            onChange={(e) => setNombreCat(e.target.value)}
                            placeholder="Ej. Entretenimiento"
                        />
                    </div>

                    <div className="field">
                        <label>Color</label>
                        <div className="color-picker-wrapper">
                            <input
                                type="color"
                                value={colorCat}
                                onChange={(e) => setColorCat(e.target.value)}
                                title="Selecciona un color"
                            />
                        </div>
                    </div>

                    <button className="btn" onClick={handleGuardarCategoria}>Guardar Categoría</button>
                </div>
            </div>
        </div>
    );
}