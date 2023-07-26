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
            const rol = await obtenerRolCuenta(ObtenerDatos("ExternalCuenta"))
            setRol(rol.nombre)
            const externalAux = cuenta.data.persona.docente.externalId;
            const tutsAux = await obtenerTutorias(rol, externalAux)
            if (tutsAux.data) {
                setTutorias(tutsAux.data.filter(tutoria => tutoria.estado !== "Espera"))
            }
        }

        getRol()
    }, [])

    return (
        <>
            <div className='contenedor-tablaTP'>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Estado</th>
                            <th>Estudiantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTutorias && listaTutorias.map((tutoria) => (
                            <tr key={tutoria.id}>
                                {console.log(tutoria)}
                                <td>{tutoria.materia.nombre}</td>
                                <td>{tutoria.estado}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginacionTabla totalItems={listaTutorias} itemsPorPagina={itemsPorPagina} paginaActual={pagina} setPagina={setPagina} />
            </div>
        </>
    )
}

export default TablaHistorialTutorias;