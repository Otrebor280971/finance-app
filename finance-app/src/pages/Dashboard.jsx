import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import GastosRecientes from "../components/GastosRecientes";
import ScoreIndicator from "../components/ScoreIndicator";
import Metas from "../components/Metas";
import ResumenCard from "../components/ResumenCard.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const {
    score,
    totalGastoMensual,
    totalIngresoMensual,
    ahorroMensual,
    metas,
  } = useFinance();

  return (
    <div className="Dashboard">
      {/* ── HEADER ── */}
      <div className="header">
        <h1>Bienvenido, <strong>Roberto</strong></h1>

        <div className="Score">
          <span className="score-label">Score</span>
          <div className="score-row">
            <div className="score-bar">
              <div
                className="score-color"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="score-number">{score}</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="body">
        {/* ── LEFT: Gastos Recientes ── */}
        <GastosRecientes />

        {/* ── RIGHT COLUMN ── */}
        <div className="sndColumn">
          {/* Mis metas */}
          <div className="metas-card">
            <h2>Mis metas</h2>

            {metas.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                Aún no tienes metas registradas.
              </p>
            ) : (
              metas.slice(0, 3).map((meta) => {
                const progreso = Math.min(
                  ((totalIngresoMensual - totalGastoMensual) /
                    Number(meta.cantidad)) *
                    100,
                  100
                );
                return (
                  <div key={meta.id} className="meta-item-dash">
                    <span className="meta-nombre">{meta.concepto}</span>
                    <div className="meta-bar-bg">
                      <div
                        className="meta-bar-fill"
                        style={{ width: `${Math.max(progreso, 5)}%` }}
                      />
                    </div>
                    <span className="meta-valor">{Math.round(progreso)}</span>
                  </div>
                );
              })
            )}

            <Link to="/metas">
              <button className="metas-add-btn">+</button>
            </Link>
          </div>

          {/* Gastos e Ingresos */}
          <div className="summary-row">
            <div className="resumen-card">
              <h3>Gastos</h3>
              <div className="resumen-card-footer">
                <Link to="/gastos" className="resumen-plus">+</Link>
                <span className="resumen-monto monto-gastos">
                  ${totalGastoMensual.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
            <div className="resumen-card">
              <h3>Ingresos</h3>
              <div className="resumen-card-footer">
                <Link to="/ingresos" className="resumen-plus">+</Link>
                <span className="resumen-monto monto-ingresos">
                  ${totalIngresoMensual.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          {/* Balance general — con link a transacciones */}
          <Link to="/transacciones" style={{ textDecoration: "none" }}>
            <div className="balance-card" style={{ cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className="balance-header">Balance general</p>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(26,26,46,0.55)" }}>
                  Ver transacciones →
                </span>
              </div>
              <div className="balance-footer">
                <span className="balance-monto">
                  ${ahorroMensual.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;