import React, { useEffect, useState } from 'react';
import '../css/TablaTutoriasPendientes.css';
import {aceptarTutoria, cambiarEstadoTutoria, obtenerCuenta, obtenerRolCuenta, obtenerTutorias, tutoriasPendientes } from '../hooks/Conexionsw';
import Modal from 'react-modal';
import PaginacionTabla from './PaginacionTabla';
import { ObtenerDatos, ObtenerSession } from '../utilidades/UseSession';


const TablaHistorialTutorias = () => {
    const [tutorias, setTutorias] = useState([])
    const [rol, setRol] = useState(undefined)
    const [external, setExternal] = useState(undefined)

    const [pagina, setPagina] = useState(1)
    const itemsPorPagina = 10;
    const ulitmoIndice = pagina * itemsPorPagina;
    const primerIndice = ulitmoIndice - itemsPorPagina;
    const listaTutorias = tutorias.slice(primerIndice, ulitmoIndice);

    useEffect(() => {
        const getRol = async () => {
            const cuenta =  await obtenerCuenta(ObtenerDatos("ExternalCuenta"))
            setRol(cuenta.data.rol.nombre)
            const externalAux = (cuenta.data.rol.nombre === "DOCENTE") ? cuenta.data : cuenta.data.persona.estudiante.externalId;
            const tutsAux = await obtenerTutorias(rol, externalAux)
            if (tutsAux) {
                setTutorias(tutsAux.data.filter(tutoria => tutoria.estado !== "Espera" && tutoria.estado !== "Aceptada").reverse())
            }
        }

        getRol()
    }, [])

    return (
        <>
            <div className='contenedor-tablaTP'>
                <label htmlFor="" className='ttl-tabla'>Historial de tutorias</label>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Estado</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Estudiantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTutorias.length > 0 ? listaTutorias.map((tutoria) => (
                            <tr key={tutoria.id}>
                                {console.log(tutoria)}
                                <td>{tutoria.materia.nombre}</td>
                                <td>{tutoria.estado}</td>
                                <td>{tutoria.nombreTutoria}</td>
                                <td>{tutoria.descripcion}</td>
                                <td>{tutoria.estado === "Rechazada" ? "Rechazada" : (new Date(tutoria.fechaInicio)).toLocaleString()}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                                
                            </tr>
                        )):(
                            <tr style={{backgroundColor: "#dee2e6"}}>
                                <td colSpan="7">Historial de tutorias vacio</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <PaginacionTabla totalItems={listaTutorias} itemsPorPagina={itemsPorPagina} paginaActual={pagina} setPagina={setPagina} />
            </div>
        </>
    )
}

export default TablaHistorialTutorias;