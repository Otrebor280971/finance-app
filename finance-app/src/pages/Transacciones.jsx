import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import "./Transacciones.css";

export default function Transacciones() {
  const { ingresos, gastos, categorias, totalIngresoMensual, totalGastoMensual, ahorroMensual } = useFinance();

  const [filtroTipo, setFiltroTipo] = useState("todos"); // "todos" | "ingreso" | "gasto"
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // Combinar ingresos y gastos en una sola lista ordenada por fecha
  const todasLasTransacciones = useMemo(() => {
    const listaIngresos = ingresos.map((i) => ({
      id: i.id,
      fecha: i.fecha,
      concepto: i.concepto,
      tipo: "ingreso",
      categoria: i.periodo ? `${i.periodo}` : "—",
      monto: i.montoMensual ?? i.monto ?? 0,
      color: null,
    }));

    const listaGastos = gastos.map((g) => {
      const cat = categorias.find((c) => c.nombre === g.categoria);
      return {
        id: g.id,
        fecha: g.fecha,
        concepto: g.concepto,
        tipo: "gasto",
        categoria: g.categoria || "—",
        monto: Number(g.monto) || 0,
        color: cat?.color || "#999",
      };
    });

    return [...listaIngresos, ...listaGastos].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }, [ingresos, gastos, categorias]);

  // Filtrado
  const transaccionesFiltradas = useMemo(() => {
    return todasLasTransacciones.filter((t) => {
      const pasaTipo =
        filtroTipo === "todos" || t.tipo === filtroTipo;
      const pasaCategoria =
        !filtroCategoria ||
        t.categoria === filtroCategoria ||
        (filtroTipo === "ingreso" && !filtroCategoria);
      return pasaTipo && pasaCategoria;
    });
  }, [todasLasTransacciones, filtroTipo, filtroCategoria]);

  const formatearFecha = (fecha) => {
    if (!fecha) return "—";
    const d = new Date(fecha);
    return d.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const balanceClass =
    ahorroMensual >= 0 ? "positivo" : "negativo";

  return (
    <div className="transacciones-page">
      {/* HEADER */}
      <div className="transacciones-header">
        <Link to="/" className="back-link">← Regresar</Link>
        <h1 className="transacciones-title">Mis Transacciones</h1>
        <div style={{ width: "80px" }} /> {/* spacer */}
      </div>

      {/* SUMMARY STRIP */}
      <div className="summary-strip">
        <div className="summary-chip">
          <span className="summary-chip__label">Total ingresos (mes)</span>
          <span className="summary-chip__value ingreso">
            ${totalIngresoMensual.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Total gastos (mes)</span>
          <span className="summary-chip__value gasto">
            ${totalGastoMensual.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Balance (mes)</span>
          <span className={`summary-chip__value balance ${balanceClass}`}>
            {ahorroMensual >= 0 ? "+" : ""}
            ${ahorroMensual.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* FILTROS */}
      <div className="filtros-row">
        <button
          className={`filtro-btn ${filtroTipo === "todos" ? "activo" : ""}`}
          onClick={() => { setFiltroTipo("todos"); setFiltroCategoria(""); }}
        >
          Todos
        </button>
        <button
          className={`filtro-btn ${filtroTipo === "ingreso" ? "activo" : ""}`}
          onClick={() => { setFiltroTipo("ingreso"); setFiltroCategoria(""); }}
        >
          Ingresos
        </button>
        <button
          className={`filtro-btn ${filtroTipo === "gasto" ? "activo" : ""}`}
          onClick={() => { setFiltroTipo("gasto"); }}
        >
          Gastos
        </button>

        {filtroTipo !== "ingreso" && (
          <select
            className="filtro-select"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* TABLA */}
      <div className="tabla-wrapper">
        {transaccionesFiltradas.length === 0 ? (
          <p className="empty-state">No hay transacciones para mostrar.</p>
        ) : (
          <table className="tabla-transacciones">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Tipo</th>
                <th>Categoría / Periodo</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {transaccionesFiltradas.map((t) => (
                <tr key={`${t.tipo}-${t.id}`}>
                  <td>{formatearFecha(t.fecha)}</td>
                  <td>{t.concepto}</td>
                  <td>
                    <span className={`tipo-badge ${t.tipo}`}>
                      {t.tipo === "ingreso" ? "Ingreso" : "Gasto"}
                    </span>
                  </td>
                  <td>
                    {t.color && (
                      <span
                        className="cat-dot"
                        style={{ backgroundColor: t.color }}
                      />
                    )}
                    {t.categoria}
                  </td>
                  <td className={t.tipo === "ingreso" ? "monto-ingreso" : "monto-gasto"}>
                    {t.tipo === "ingreso" ? "+" : "-"}$
                    {t.monto.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}