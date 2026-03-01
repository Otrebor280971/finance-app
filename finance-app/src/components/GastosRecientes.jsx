import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

function GastosRecientes() {
  const { gastos } = useFinance();

  return (
    <div className="gastos-card">
      <h2>Gastos recientes</h2>

      <div className="chart-placeholder">
        {/* TODO: reemplazar con componente PastelGraphic */}
        <div className="chart-circle" />
      </div>

      <div className="gastos-footer">
        <Link to="/historial-gastos" className="ver-mas">Ver más</Link>
        {/* TODO: reemplazar con componente Leyenda */}
        <div className="legend-box" />
      </div>
    </div>
  );
}

export default GastosRecientes;