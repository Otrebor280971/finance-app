import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

const STORAGE_KEY = "financeData";

const initialCategorias = ["Comida", "Transporte", "Servicios"];

export const FinanceProvider = ({ children }) => {
  const [ingresos, setIngresos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [metas, setMetas] = useState([]);
  const [categorias, setCategorias] = useState(initialCategorias);

  // 🔹 CARGAR DATOS
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data) {
        setIngresos(data.ingresos || []);
        setGastos(data.gastos || []);
        setMetas(data.metas || []);
        setCategorias(data.categorias || initialCategorias);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }, []);

  // 🔹 GUARDAR DATOS
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ingresos, gastos, metas, categorias })
    );
  }, [ingresos, gastos, metas, categorias]);

  // 🔹 UTILIDADES

  const obtenerMontoMensualizado = (monto, periodo) => {
    const m = Number(monto) || 0;
    switch (periodo) {
      case "semanal": return m * 4.33;
      case "quincenal": return m * 2;
      case "anual": return m / 12;
      case "mensual":
      default: return m;
    }
  };

  const calcularSueldoNetoMexico = (montoBrutoMensual) => {
    const tablaISR = [
      { limInf: 0.01, cuota: 0.0, porc: 0.0192 },
      { limInf: 746.05, cuota: 14.32, porc: 0.064 },
      { limInf: 6332.06, cuota: 371.83, porc: 0.1088 },
      { limInf: 11128.02, cuota: 893.63, porc: 0.16 },
      { limInf: 12935.83, cuota: 1182.88, porc: 0.1792 },
      { limInf: 15487.72, cuota: 1640.18, porc: 0.2136 },
      { limInf: 31236.5, cuota: 5004.12, porc: 0.2352 },
      { limInf: 49233.01, cuota: 9236.89, porc: 0.3 },
      { limInf: 93993.91, cuota: 22665.17, porc: 0.32 },
      { limInf: 125325.21, cuota: 32691.18, porc: 0.34 },
      { limInf: 375975.62, cuota: 117912.32, porc: 0.35 },
    ];

    const rango = tablaISR.find((r, index) => {
      const next = tablaISR[index + 1];
      return montoBrutoMensual >= r.limInf && (!next || montoBrutoMensual < next.limInf);
    });

    if (!rango) return montoBrutoMensual;

    const excedente = montoBrutoMensual - rango.limInf;
    const isr = excedente * rango.porc + rango.cuota;
    const imss = montoBrutoMensual * 0.027;

    return montoBrutoMensual - isr - imss;
  };

  // 🔹 INGRESOS

  const addIngreso = (ingreso) => {
    setIngresos(prev => {
      const brutoMensual = obtenerMontoMensualizado(
        ingreso.monto,
        ingreso.periodo
      );

      const netoMensual = ingreso.preImpuestos
        ? calcularSueldoNetoMexico(brutoMensual)
        : brutoMensual;

      return [
        ...prev,
        {
          ...ingreso,
          id: uuidv4(),
          fecha: ingreso.fecha || new Date().toISOString(),
          montoMensual: netoMensual,
          montoBrutoOriginal: brutoMensual,
        },
      ];
    });
  };

  const deleteIngreso = (id) =>
    setIngresos(prev => prev.filter(i => i.id !== id));

  // 🔹 GASTOS

  const addGasto = (gasto) => {
    setGastos(prev => [
      ...prev,
      {
        ...gasto,
        id: uuidv4(),
        fecha: gasto.fecha || new Date().toISOString(),
        monto: Number(gasto.monto) || 0,
      },
    ]);
  };

  const deleteGasto = (id) =>
    setGastos(prev => prev.filter(g => g.id !== id));

  const updateGasto = (updated) =>
    setGastos(prev =>
      prev.map(g => (g.id === updated.id ? updated : g))
    );

  // 🔹 METAS

  const addMeta = (meta) =>
    setMetas(prev => [...prev, { ...meta, id: uuidv4() }]);

  const deleteMeta = (id) =>
    setMetas(prev => prev.filter(m => m.id !== id));

  // 🔹 CATEGORÍAS

  const addCategoria = (categoria) => {
    if (!categorias.includes(categoria)) {
      setCategorias(prev => [...prev, categoria]);
    }
  };

  // 🔹 CÁLCULOS

  const totalIngresoMensual = ingresos.reduce(
    (acc, curr) => acc + (curr.montoMensual || 0),
    0
  );

  const totalGastoMensual = gastos.reduce(
    (acc, curr) => acc + (Number(curr.monto) || 0),
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