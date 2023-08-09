import React, { useEffect, useState } from 'react';
import '../css/TablaTutoriasPendientes.css';
import {aceptarTutoria, cambiarEstadoTutoria, obtenerCuenta, obtenerRolCuenta, obtenerTutorias, tutoriasPendientes } from '../hooks/Conexionsw';
import Modal from 'react-modal';
import PaginacionTabla from './PaginacionTabla';
import { ObtenerDatos, ObtenerSession } from '../utilidades/UseSession';


const TablaRegistroTutorias = ({listTutorias}) => {
    const [tutorias, setTutorias] = useState([])
    const [rol, setRol] = useState(undefined)
    const [external, setExternal] = useState(undefined)

    const [pagina, setPagina] = useState(1)
    const itemsPorPagina = 10;
    const ulitmoIndice = pagina * itemsPorPagina;
    const primerIndice = ulitmoIndice - itemsPorPagina;
    const listaTutorias = tutorias.slice(primerIndice, ulitmoIndice);

    return (
        <>
            <div className='contenedor-tablaTP'>
                <label htmlFor="" className='ttl-tabla'>Reporte</label>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th style={{width:'20%'}}>Fecha</th>
                            <th style={{width:'10%'}}>Tiempo empleado</th>
                            <th style={{width:'20%'}}>Estudiantes</th>
                            <th style={{width:'25%'}}>Tema de la tutoria</th>
                            <th style={{width:'25%'}}>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTutorias.length > 0 ? listTutorias.map((tutoria) => (
                            <tr key={tutoria.id}>
                                <td>{(new Date(tutoria.fechaInicio)).toLocaleString()}</td>
                                <td>{(new Date(tutoria.fechaFinalizacion)).getHours()-(new Date(tutoria.fechaInicio)).getHours()+" Horas"}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                                <td>{tutoria.nombreTutoria}</td>
                                <td>{tutoria.descripcion}</td>
                            </tr>
                        )):(
                            <tr style={{backgroundColor: "#dee2e6"}}>
                                <td colSpan="7">Reporte vacio</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <PaginacionTabla totalItems={listaTutorias} itemsPorPagina={itemsPorPagina} paginaActual={pagina} setPagina={setPagina} />
            </div>
        </>
    )
}

export default TablaRegistroTutorias;