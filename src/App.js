import logo from './logo.svg';
import './App.css';
import CabeceraFija from "./componentes/CabeceraFija";
import { Routes,Route } from 'react-router-dom';
import CrearCuenta from './componentes/CrearCuenta';
import Inicioview from './componentes/Inicioview';
import InicioSesionView from './componentes/IniciosesionView';
import ListarEstudianteView from './componentes/ListarEstudianteView';

function App() {
  return (
    <div className="App">
      <CabeceraFija />
      <Routes>
      <Route path="/" element={<InicioSesionView/>}></Route>
      <Route path="/CrearCuenta" element={<CrearCuenta/>}></Route>
      <Route path="/Inicio" element={<Inicioview/>}></Route>
      <Route path="/estudiante/listar" element={<ListarEstudianteView/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
