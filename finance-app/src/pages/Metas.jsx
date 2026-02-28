import { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";
import "./metas.css";

const Metas = () => {
  const { metas, addMeta, deleteMeta, updateMeta } = useFinance();

  const [meta, setMeta] = useState({
    id: null,
    concepto: "",
    fechaObjetivo: "",
    cantidad: "",
  });

  const [editando, setEditando] = useState(false);
  const [ahorroCalculado, setAhorroCalculado] = useState(0);

  useEffect(() => {
    if (meta.cantidad && meta.fechaObjetivo) {
      setAhorroCalculado(calcularAhorroMensual(meta.cantidad, meta.fechaObjetivo));
    } else {
      setAhorroCalculado(0);
    }
  }, [meta.cantidad, meta.fechaObjetivo]);

  const handleChange = (e) => {
    setMeta({
      ...meta,
      [e.target.name]: e.target.value,
    });
  };

  const calcularAhorroMensual = (cantidad, fechaObjetivo) => {
    if (!cantidad || !fechaObjetivo) return 0;
    const hoy = new Date();
    const objetivo = new Date(fechaObjetivo);
    const meses =
      (objetivo.getFullYear() - hoy.getFullYear()) * 12 +
      (objetivo.getMonth() - hoy.getMonth());

    if (meses <= 0) return Number(cantidad);
    return (Number(cantidad) / meses).toFixed(2);
  };

  const resetFormulario = () => {
    setMeta({ id: null, concepto: "", fechaObjetivo: "", cantidad: "" });
    setEditando(false);
    setAhorroCalculado(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meta.concepto || !meta.fechaObjetivo || !meta.cantidad) return;

    if (editando) {
       if(updateMeta) updateMeta(meta);
    } else {
      addMeta(meta);
    }
    resetFormulario();
  };

  const handleEdit = (m) => {
    setMeta(m);
    setEditando(true);
  };

  return (
    <div className="metas-page">
      <div className="header-nav">
        <a href="/" className="back-link">Regresar</a>
      </div>

      <div className="cards-container">
        
        <div className="card form-card">
          <h2 className="card-title">
            {editando ? "Editar Meta" : "Nueva Meta"}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Concepto</label>
              <input
                type="text"
                name="concepto"
                value={meta.concepto}
                onChange={handleChange}
                placeholder="Ej: Viaje a Japón"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Fecha Objetivo</label>
              <input
                type="date"
                name="fechaObjetivo"
                value={meta.fechaObjetivo}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Cantidad Objetivo ($)</label>
              <input
                type="number"
                name="cantidad"
                value={meta.cantidad}
                onChange={handleChange}
                min="0"
                placeholder="0.00"
                className="input-field"
              />
            </div>

            <div className="info-box">
              <span>Ahorro mensual necesario:</span>
              <span className="info-amount">${ahorroCalculado}</span>
            </div>

            <button type="submit" className="btn-save">
              {editando ? "Actualizar" : "Crear Meta"}
            </button>

            {editando && (
              <button 
                type="button" 
                onClick={resetFormulario} 
                className="btn-cancel"
              >
                Cancelar Edición
              </button>
            )}
          </form>
        </div>

        <div className="card list-card">
          <h2 className="card-title">Mis Metas</h2>
          
          <div className="metas-list-container">
            {metas.length === 0 ? (
              <p className="empty-msg">No tienes metas registradas aún.</p>
            ) : (
              metas.map((m) => (
                <div key={m.id} className="meta-item">
                  <div className="meta-info">
                    <h3>{m.concepto}</h3>
                    <small>Meta: {m.fechaObjetivo}</small>
                    <p className="meta-total">Obj: ${m.cantidad}</p>
                    <p className="meta-monthly">
                      Mensual: <strong>${calcularAhorroMensual(m.cantidad, m.fechaObjetivo)}</strong>
                    </p>
                  </div>
                  
                  <div className="meta-actions">
                    <button 
                      onClick={() => handleEdit(m)} 
                      className="btn-icon edit"
                      title="Editar"
                    >
                      ✎
                    </button>
                    <button 
                      onClick={() => deleteMeta(m.id)} 
                      className="btn-icon delete"
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Metas;