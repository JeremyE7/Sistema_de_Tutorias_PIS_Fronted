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
import Solicitar from './componentes/Solicitar';
import RolCrear from "./componentes/RolCrear";
import RegistroTutorias from "./componentes/RegistoTutorias";
import AdministradorView from "./componentes/AdministradorView";
import CrearValoresDefecto from "./componentes/CrearValoresDefecto";
import ReportePDFView from "./componentes/ReportePDFView";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEstudiante, setIsEstudiante] = useState(false);

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
  if (isEstudiante) {
    return children;
  } else {
    return <Navigate to="/" state={location} />
  }
}

  return (
    <div>
      <Nanvar isAdmin={isAdmin} isEstudiante={isEstudiante}/>
      <Routes>
        <Route path='/' element={<MiddlewareSession><InicioSesionView /></MiddlewareSession>}></Route>
        <Route path='/CrearCuenta' element={<MiddlewareSession><CrearCuentaView /></MiddlewareSession>}></Route>
        <Route path='/Rol' element={<MiddlewareSession><RolCrear /></MiddlewareSession>}></Route>
        <Route path='/inicio' element={<Middleware><Inicioview setIsAdmin={setIsAdmin} setIsEstudiante={setIsEstudiante}/></Middleware>}></Route>
        <Route path='/estudiante/listar' element={<Middleware><ListarEstudianteView /></Middleware>}></Route>
        <Route path='/docente/listar' element={<Middleware><ListarDocenteView /></Middleware>}></Route>
        <Route path='/tutoria/registros' element={<Middleware><MiddlewareEstudiante><RegistroTutorias/></MiddlewareEstudiante></Middleware>}></Route>
        <Route path="/solicitar" element={<Solicitar onSubmit={handleSolicitudTutoria}/>}></Route>
        <Route path='/reporte/pdf' element={<Middleware><MiddlewareEstudiante><ReportePDFView/></MiddlewareEstudiante></Middleware>}></Route>
        <Route path="/administracion" element={<MiddlewareAdmin><AdministradorView/></MiddlewareAdmin>}></Route>
        <Route path="/valoresDefecto" element={<CrearValoresDefecto/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
