import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Ingresos from "./pages/Ingresos";
import Gastos from "./pages/Gastos";
import Metas from "./pages/Metas";
import HistorialGastos from "./pages/HistorialGastos";

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="ingresos" element={<Ingresos />} />
            <Route path="gastos" element={<Gastos />} />
            <Route path="metas" element={<Metas />} />
            <Route path="historial-gastos" element={<HistorialGastos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;