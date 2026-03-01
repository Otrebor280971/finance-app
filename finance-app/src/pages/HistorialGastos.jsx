import React, { use, useState } from "react";
import "./HistorialGastos.css";
import { useFinance } from "../context/FinanceContext";

export default function HistorialGastos() {
    const {gastos, categorias, deleteGasto, updateGasto} = useFinance();
    const [filtro, setFiltro] = useState("");
    const [gastoEditando, setGastoEditando] = useState(null);

    const gastosFiltrados = filtro
        ? gastos.filter((g) => g.categoria === filtro)
        : gastos;

    const getMesAntonio = () => {
        const d = gastosFiltrados.length > 0
            ? new Date(gastosFiltrados[0].fecha)
            : new Date();
        return d.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
    };

    const formatearFecha = (fecha) => {
        const d = new Date(fecha);
        return d.toLocaleDateString("es-MX", { day: "2-digit", year: "2-digit"});
    };

    const handleEditar = (gasto) => {
        setGastoEditando({ ...gasto });
    };

    const handleGuardarEdicion = () => {
        if (!gastoEditando.concepto || !gastoEditando.monto) return;
        updateGasto(gastoEditando);
        setGastoEditando(null);
    };

    const handleCancelarEdicion = () => {
        setGastoEditando(null);
    };

    return (
        <div className="historial-page">
            <div className="historial-header">
                <a href="/" className="back-link">Regresar</a>
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
                </table>
                </div>

            </div>
        </div>
    );
}