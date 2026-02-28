const STORAGE_KEY = "financeAppData";

const initialData = {
  ingresos: [],
  gastos: [],
  metas: [],
};


export const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData;
  } catch (error) {
    console.error("Error cargando datos:", error);
    return initialData;
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error guardando datos:", error);
  }
};


export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY);
};