import React from "react";
import './App.css';
import Nanvar from "./componentes/Nanvar";
import { Routes, Route } from 'react-router-dom';
import Inicioview from './componentes/Inicioview';
import InicioSesionView from './componentes/IniciosesionView';
import ListarEstudianteView from './componentes/ListarEstudianteView';
import ListarDocenteView from './componentes/ListarDocenteView';
import { EstaSession } from './utilidades/UseSession';
import CrearCuentaView from './componentes/CrearCuentaView';
import { useLocation, Navigate } from 'react-router-dom';
import Solicitar from './componentes/Solicitar';

function App() {

  const Middleware = ({ children }) => {
    const autenticado = EstaSession();
    const location = useLocation();
    if (autenticado) {
      return children;
    } else {
      return <Navigate to="/" state={location} />
    }
  }
  const MiddlewareSession = ({ children }) => {
    const autenticado = EstaSession();
    //const location = useLocation();
    if (autenticado) {
      return <Navigate to="/Inicio" />;
    } else return children;
  }
 const handleSolicitudTutoria = (data) => {
  // Aquí puedes manejar la lógica para enviar la solicitud al docente
  console.log("Solicitud enviada:", data);
};

  return (
    <div>
      <Nanvar />
      <Routes>
        <Route path='/' element={<MiddlewareSession><InicioSesionView /></MiddlewareSession>}></Route>
        <Route path='/CrearCuenta' element={<MiddlewareSession><CrearCuentaView /></MiddlewareSession>}></Route>
        <Route path='/inicio' element={<Middleware><Inicioview /></Middleware>}></Route>
        <Route path='/estudiante/listar' element={<Middleware><ListarEstudianteView /></Middleware>}></Route>
        <Route path='/docente/listar' element={<Middleware><ListarDocenteView /></Middleware>}></Route>
        <Route path="/solicitar" element={<Solicitar onSubmit={handleSolicitudTutoria}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
