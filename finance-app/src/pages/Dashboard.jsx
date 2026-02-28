import GastosRecientes from "../components/GastosRecientes";
import ScoreIndicator from "../components/ScoreIndicator";
import Metas from "../components/Metas";
//import ResumenCard from "../components/ResumenCard.jsx";

const Dashboard = () => {
  return (
    <>
      <h1>Bienvenido Roberto</h1>

      <GastosRecientes></GastosRecientes>
      <ScoreIndicator></ScoreIndicator>
      <Metas></Metas>
    </>
  );

};

export default Dashboard;

