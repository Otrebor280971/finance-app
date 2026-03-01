import { useFinance } from "../context/FinanceContext";
import { Link } from "react-router-dom";
import "./MetasComp.css";

function Metas() {
  const { metas } = useFinance();

  const calcularAhorroMensual = (cantidad, fechaObjetivo) => {
    if (!cantidad || !fechaObjetivo) return 0;
    const hoy = new Date();
    const objetivo = new Date(fechaObjetivo);
    const meses =
      (objetivo.getFullYear() - hoy.getFullYear()) * 12 +
      (objetivo.getMonth() - hoy.getMonth());
    if (meses <= 0) return Number(cantidad);
    return Number((Number(cantidad) / meses).toFixed(2));
  };

  return (
    <div className="metas-widget">
      <div className="metas-widget__header">
        <h2>Mis metas</h2>
        <Link to="/metas" className="metas-widget__link">Ver más</Link>
      </div>

      {metas.length === 0 ? (
        <p className="metas-widget__empty">No tienes metas registradas.</p>
      ) : (
        <ul className="metas-widget__list">
          {metas.map((m) => {
            const necesario = calcularAhorroMensual(m.cantidad, m.fechaObjetivo);
            return (
              <li key={m.id} className="metas-widget__item">
                <div className="metas-widget__item-header">
                  <span className="metas-widget__concepto">{m.concepto}</span>
                  <span className="metas-widget__porcentaje">75%</span>
                </div>

                <div className="metas-widget__bar-bg">
                  <div className="metas-widget__bar-fill" style={{ width: "75%" }} />
                </div>

                <span className="metas-widget__label">
                  Ahorra <strong>${necesario.toLocaleString()}</strong> este mes
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Metas;