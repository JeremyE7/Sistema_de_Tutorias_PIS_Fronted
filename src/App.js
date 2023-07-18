import logo from './logo.svg';
import './App.css';
import InicioSesion from './componentes/Iniciosesion';
import CabeceraFija from "./componentes/CabeceraFija";
import { Routes,Route } from 'react-router-dom';
import CrearCuenta from './componentes/CrearCuenta';

function App() {
  return (
    <div className="App">
      <CabeceraFija />
      <Routes>
      <Route path="/" element={<InicioSesion/>}></Route>
      <Route path="/CrearCuenta" element={<CrearCuenta/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
