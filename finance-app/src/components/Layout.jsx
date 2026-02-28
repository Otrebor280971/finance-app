import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/ingresos">Ingresos</Link> |{" "}
        <Link to="/gastos">Gastos</Link> |{" "}
        <Link to="/metas">Metas</Link>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

export default Layout;