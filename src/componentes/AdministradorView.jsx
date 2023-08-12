import React, { useEffect, useState } from 'react';
import { Docentes, crearMateria } from '../hooks/Conexionsw';
import { mensajeError, mensajeOk } from '../utilidades/Mensajes';
import MateriasAdminView from './AdminViews.jsx/MateriasAdminView';
import '../css/AdminView.css'
import CuentasAdminView from './AdminViews.jsx/CuentasAdminView';

const AdministradorView = () => {
    const [vista, setVista] = useState("materias");

    return (
        <div className='contenedor-Admin'>
            <h3>Ventana de administracion</h3>
            <div className="container-botones-vistas">
                <button onClick={() => {setVista("materias")}}>
                    Materias
                </button>
                <button onClick={() => {setVista("cuentas")}}>
                    Cuentas
                </button>
            </div>
            <div className='vista'>
                {vista === "materias" && <MateriasAdminView/>}
                {vista === 'cuentas' && <CuentasAdminView/>}
            </div>
        </div>    
    )
};

export default AdministradorView;