import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function GastosRecientes() {
  const { gastos, categorias } = useFinance();

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
          borderWidth: 1,
        }
      ]
    };
  }, [gastosDelMes, categorias]);

  const totalMes = useMemo(() => {
    return gastosDelMes.reduce((acc, g) => acc + Number(g.monto), 0);
  }, [gastosDelMes]);

  return (
    <div className="gastos-card">
      <h2>Gastos recientes</h2>

      <div className="chart-placeholder">
        {gastosDelMes.length > 0 ? (
          <div style={{ width: "200px", height: "200px" }}>
            <Pie
              data={datosGrafica}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  }
                }
              }}
            />
          </div>
        ) : (
          <div className="chart-circle" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", textAlign: "center", padding: "10px" }}>
              Sin gastos este mes
            </span>
          </div>
        )}
      </div>

      <div className="gastos-footer">
        <Link to="/historial-gastos" className="ver-mas">Ver más</Link>

        {/* Leyenda de categorías */}
        {gastosDelMes.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
            {datosGrafica.labels.map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: datosGrafica.datasets[0].backgroundColor[i],
                  flexShrink: 0,
                }} />
                <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 600 }}>{label}</span>
              </div>
            ))}
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", marginTop: "4px" }}>
              Total: ${totalMes.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GastosRecientes;