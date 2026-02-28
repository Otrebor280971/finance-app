import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [ingresos, setIngresos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [metas, setMetas] = useState([]);
  const [categorias, setCategorias] = useState([
    "Comida",
    "Transporte",
    "Servicios",
    "Ocio",
  ]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("financeData"));
    if (data) {
      setIngresos(data.ingresos || []);
      setGastos(data.gastos || []);
      setMetas(data.metas || []);
      setCategorias(data.categorias || categorias);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "financeData",
      JSON.stringify({ ingresos, gastos, metas, categorias })
    );
  }, [ingresos, gastos, metas, categorias]);

  const convertirAMensual = (monto, periodo) => {
    switch (periodo) {
      case "semanal":
        return monto * 4.33;
      case "quincenal":
        return monto * 2;
      case "mensual":
      default:
        return monto;
    }
  };

  const calcularNeto = (monto, esPreImpuestos) => {
    const tasaImpuesto = 0.2;
    return esPreImpuestos ? monto * (1 - tasaImpuesto) : monto;
  };

  const addIngreso = (ingreso) => {
    const neto = calcularNeto(ingreso.monto, ingreso.preImpuestos);
    const mensual = convertirAMensual(neto, ingreso.periodo);

    setIngresos([
      ...ingresos,
      { ...ingreso, id: uuidv4(), montoMensual: mensual },
    ]);
  };

  const deleteIngreso = (id) =>
    setIngresos(ingresos.filter((i) => i.id !== id));

  const addGasto = (gasto) => {
    setGastos([...gastos, { ...gasto, id: uuidv4() }]);
  };

  const deleteGasto = (id) =>
    setGastos(gastos.filter((g) => g.id !== id));

  const updateGasto = (updated) => {
    setGastos(
      gastos.map((g) => (g.id === updated.id ? updated : g))
    );
  };

  const addMeta = (meta) => {
    setMetas([...metas, { ...meta, id: uuidv4() }]);
  };

  const deleteMeta = (id) =>
    setMetas(metas.filter((m) => m.id !== id));

  const addCategoria = (categoria) => {
    if (!categorias.includes(categoria)) {
      setCategorias([...categorias, categoria]);
    }
  };

  const totalIngresoMensual = ingresos.reduce(
    (acc, curr) => acc + curr.montoMensual,
    0
  );

  const totalGastoMensual = gastos.reduce(
    (acc, curr) => acc + Number(curr.monto),
    0
  );

  const ahorroMensual = totalIngresoMensual - totalGastoMensual;

  const calcularScore = () => {
    if (totalIngresoMensual === 0) return 0;

    const tasaAhorro = ahorroMensual / totalIngresoMensual;

    let score = 50;

    if (tasaAhorro >= 0.2) score += 30;
    else if (tasaAhorro >= 0.1) score += 15;

    if (totalGastoMensual <= totalIngresoMensual * 0.8) score += 10;

    if (metas.length > 0) score += 10;

    return Math.min(score, 100);
  };

  const score = calcularScore();

  return (
    <FinanceContext.Provider
      value={{
        ingresos,
        gastos,
        metas,
        categorias,
        totalIngresoMensual,
        totalGastoMensual,
        ahorroMensual,
        score,
        addIngreso,
        deleteIngreso,
        addGasto,
        deleteGasto,
        updateGasto,
        addMeta,
        deleteMeta,
        addCategoria,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};