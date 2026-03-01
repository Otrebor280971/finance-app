import GastosRecientes from "../components/GastosRecientes";
import HistorialGastos from "./HistorialGastos.jsx";
import ScoreIndicator from "../components/ScoreIndicator";
import Metas from "../components/Metas";
import ResumenCard from "../components/ResumenCard.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="header"> 
        <h1>Bienvenido Roberto</h1>
        <ScoreIndicator/>
      </div>
      <div className="body">
        <div className="card"> <GastosRecientes/> </div>
        <div className="sndColumn"> 
          <div className="card"> <Metas/> </div>
          <div className="card"> <ResumenCard titulo="Ingresos" pagina="/Ingresos" className="element"/> </div>
          <div className="card"> <ResumenCard titulo="Gastos" pagina="/Gastos" className="element"/> </div>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;

