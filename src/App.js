import React, { useState } from "react";
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
import RolCrear from "./componentes/RolCrear";
import RegistroTutorias from "./componentes/RegistoTutorias";
import AdministradorView from "./componentes/AdministradorView";
import CrearValoresDefecto from "./componentes/CrearValoresDefecto";
import ReportePDFView from "./componentes/ReportePDFView";
import CuentaView from "./componentes/CuentaView";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEstudiante, setIsEstudiante] = useState(false);
  const [isDocente, setIsDocente] = useState(false);

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

const MiddlewareAdmin = ({ children }) => {
  const location = useLocation();
  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" state={location} />
  }
}

const MiddlewareEstudiante = ({ children }) => {
  const location = useLocation();
  console.log(isEstudiante);
  if (isEstudiante) {
    console.log("awdawd");
    return children;
  } else {
    return <Navigate to="/" state={location} />
  }
}

const MiddlewareDocente = ({ children }) => {
  const location = useLocation();
  console.log(isDocente);
  if (isDocente) {
    return children;
  } else {
    return <Navigate to="/" state={location} />
  }
}

  return (
    <div>
      <Nanvar isAdmin={isAdmin} isEstudiante={isEstudiante} isDocente={isDocente}/>
      <Routes>
        <Route path='/' element={<MiddlewareSession><InicioSesionView /></MiddlewareSession>}></Route>
        <Route path='/CrearCuenta' element={<MiddlewareSession><CrearCuentaView /></MiddlewareSession>}></Route>
        <Route path='/Rol' element={<MiddlewareSession><RolCrear /></MiddlewareSession>}></Route>
        <Route path='/inicio' element={<Middleware><Inicioview setIsAdmin={setIsAdmin} setIsEstudiante={setIsEstudiante} esDocente={isDocente} setDocente={setIsDocente} esEstudiante={isEstudiante}/></Middleware>}></Route>
        <Route path='/estudiante/listar' element={<Middleware><ListarEstudianteView /></Middleware>}></Route>
        <Route path='/docente/listar' element={<Middleware><ListarDocenteView /></Middleware>}></Route>
        <Route path='/tutoria/registros' element={<Middleware><MiddlewareDocente><RegistroTutorias/></MiddlewareDocente></Middleware>}></Route>
        <Route path='/reporte/pdf' element={<Middleware><ReportePDFView/></Middleware>}></Route>
        <Route path="/administracion" element={<MiddlewareAdmin><AdministradorView/></MiddlewareAdmin>}></Route>
        <Route path="/valoresDefecto" element={<CrearValoresDefecto/>}></Route>
        <Route path="/cuenta" element={<Middleware><CuentaView/></Middleware>}></Route>
      </Routes>
    </div>
  );
}

export default App;
