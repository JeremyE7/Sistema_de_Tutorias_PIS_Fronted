import React from "react";
import './App.css';
import CabeceraFija from "./componentes/CabeceraFija";
import { Routes, Route } from 'react-router-dom';
import Inicioview from './componentes/Inicioview';
import InicioSesionView from './componentes/IniciosesionView';
import ListarEstudianteView from './componentes/ListarEstudianteView';
import ListarDocenteView from './componentes/ListarDocenteView';
import { EstaSession } from './utilidades/UseSession';
import CrearCuentaView from './componentes/CrearCuentaView';
import { useLocation, Navigate } from 'react-router-dom'

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
  return (
    <div>
      <CabeceraFija />
      <Routes>
        <Route path='/' element={<MiddlewareSession><InicioSesionView /></MiddlewareSession>}></Route>
        <Route path='/CrearCuenta' element={<MiddlewareSession><CrearCuentaView /></MiddlewareSession>}></Route>
        <Route path='/Inicio' element={<Middleware><Inicioview /></Middleware>}></Route>
        <Route path='/estudiante/listar' element={<Middleware><ListarEstudianteView /></Middleware>}></Route>
        <Route path='/docente/listar' element={<Middleware><ListarDocenteView /></Middleware>}></Route>
      </Routes>
    </div>
  );
}

export default App;
