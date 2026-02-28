import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "./ingresos.css";

const Ingresos = () => {
  const { addIngreso } = useFinance();

  const [fijo, setFijo] = useState({
    concepto: "",
    periodo: "mensual",
    monto: "",
    esBruto: false,
  });

  const [extra, setExtra] = useState({
    concepto: "",
    fecha: "",
    monto: "",
  });

  const handleFijoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFijo({ ...fijo, [name]: type === "checkbox" ? checked : value });
  };

  const handleExtraChange = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const submitFijo = (e) => {
    e.preventDefault();
    if (!fijo.concepto || !fijo.monto) return;

    addIngreso({
      concepto: fijo.concepto,
      monto: Number(fijo.monto),
      periodo: fijo.periodo,
      preImpuestos: fijo.esBruto,
    });

    setFijo({ ...fijo, concepto: "", monto: "", esBruto: false });
    alert("Ingreso fijo guardado");
  };

  const submitExtra = (e) => {
    e.preventDefault();
    if (!extra.concepto || !extra.monto) return;

    addIngreso({
      concepto: extra.concepto,
      monto: Number(extra.monto),
      periodo: "mensual",
      preImpuestos: false,
      fecha: extra.fecha,
    });

    setExtra({ ...extra, concepto: "", monto: "" });
    alert("Ingreso extra guardado");
  };

  return (
    <div className="ingresos-page">
      <div className="header-nav">
        <a href="/" className="back-link">Regresar</a>
      </div>

      <div className="cards-container">
        <div className="card">
          <h2 className="card-title">Configurar ingreso fijo</h2>
          <form onSubmit={submitFijo}>
            <div className="form-group">
              <label>Concepto</label>
              <input
                type="text"
                name="concepto"
                value={fijo.concepto}
                onChange={handleFijoChange}
                className="input-field"
                placeholder="Ej: Sueldo, renta, etc."
              />
            </div>

            <div className="form-group">
              <label>Periodo</label>
              <select
                name="periodo"
                value={fijo.periodo}
                onChange={handleFijoChange}
                className="input-field"
              >
                <option value="semanal">Semanal</option>
                <option value="quincenal">Quincenal</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                name="monto"
                value={fijo.monto}
                onChange={handleFijoChange}
                className="input-field"
                placeholder="0"
                min={0}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>¿Es Bruto? (Calc. ISR)</label>
              <input
                type="checkbox"
                name="esBruto"
                checked={fijo.esBruto}
                onChange={handleFijoChange}
                className="checkbox-box"
              />
            </div>

            <button type="submit" className="btn-save">
              Guardar
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="card-title">Añadir ingreso</h2>
          <form onSubmit={submitExtra}>
            <div className="form-group">
              <label>Concepto</label>
              <input
                type="text"
                name="concepto"
                value={extra.concepto}
                onChange={handleExtraChange}
                className="input-field"
                placeholder="Ej: Venta, prestamo, etc."
              />
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                name="fecha"
                value={extra.fecha}
                onChange={handleExtraChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                name="monto"
                value={extra.monto}
                onChange={handleExtraChange}
                className="input-field"
                placeholder="0"
                min={0}
              />
            </div>

            <div className="spacer"></div>

            <button type="submit" className="btn-save">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ingresos;