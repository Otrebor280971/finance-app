//import PastelGraphic from PastelGraphic.jsx //TODO: Arreglar esta importación
//import Leyend from Leyend.jsx //TODO: Arreglar esta importación
import { Link } from "react-router-dom";

function GastosRecientes() {
    return (
        <div>
            <h2>Gastos recientes</h2>
            {/*TODO: componente GraficaPastel*/}
            <Link to="/HistorialGastos">
                <p>Ver más</p>
            </Link>
            {/*TODO: componente Leyenda*/}
        </div>
    );
}

export default GastosRecientes;