import React, { useState, useMemo } from "react";
import "./HistorialGastos.css";
import { useFinance } from "../context/FinanceContext";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HistorialGastos() {
  const { gastos, categorias } = useFinance();

  const [filtro, setFiltro] = useState("");

  const ahora = new Date();
  const mesActual = ahora.getMonth();
  const anioActual = ahora.getFullYear();

  const gastosDelMes = useMemo(() => {
    return gastos.filter(g => {
      const fecha = new Date(g.fecha);
      return (
        fecha.getMonth() === mesActual &&
        fecha.getFullYear() === anioActual
      );
    });
  }, [gastos, mesActual, anioActual]);

  const gastosFiltrados = useMemo(() => {
    if (!filtro) return gastosDelMes;
    return gastosDelMes.filter(g => g.categoria === filtro);
  }, [gastosDelMes, filtro]);

  const totalMes = useMemo(() => {
    return gastosDelMes.reduce(
      (acc, g) => acc + Number(g.monto),
      0
    );
  }, [gastosDelMes]);

  const datosGrafica = useMemo(() => {
    const agrupado = {};

    gastosDelMes.forEach(g => {
      if (!agrupado[g.categoria]) {
        agrupado[g.categoria] = 0;
      }
      agrupado[g.categoria] += Number(g.monto);
    });

    const labels = Object.keys(agrupado);

    const data = labels.map(label => agrupado[label]);

    const colores = labels.map(label => {
      const cat = categorias.find(c => c.nombre === label);
      return cat?.color || "#999999";
    });

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colores,
          borderWidth: 1
        }
      ]
    };
  }, [gastosDelMes, categorias]);

  const formatearFecha = (fecha) => {
    const d = new Date(fecha);
    return d.toLocaleDateString("es-MX");
  };

  return (
    <div className="historial-page">
      <div className="historial-header">
        <a href="/" className="back-link">Regresar</a>

        <h1 className="historial-title">Historial de gastos</h1>

        <div className="filtro-wrapper">
          <select
            className="filtro-select"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="historial-content">

        <div className="mes-card">
          <h2>
            {ahora.toLocaleDateString("es-MX", {
              month: "long",
              year: "numeric"
            })}
          </h2>

          <div
            style={{
              width: "250px",
              height: "250px",
              margin: "0 auto"
            }}
          >
            {gastosDelMes.length > 0 ? (
              <Pie
                data={datosGrafica}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            ) : (
              <p style={{ textAlign: "center" }}>
                No hay gastos este mes
              </p>
            )}
          </div>

          <h3>Total: ${totalMes.toFixed(2)}</h3>
        </div>

        <div className="tabla-wrapper">
          <table className="tabla-gastos">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {gastosFiltrados.map(g => (
                <tr key={g.id}>
                  <td>{formatearFecha(g.fecha)}</td>
                  <td>{g.concepto}</td>
                  <td>{g.categoria}</td>
                  <td>${Number(g.monto).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {gastosFiltrados.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No hay gastos para esta categoría
            </p>
          )}
        </div>

      </div>
    </div>
  );
}