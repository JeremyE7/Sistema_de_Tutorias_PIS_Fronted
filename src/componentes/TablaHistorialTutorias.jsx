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
            if(rol.nombre === "Administrador") return
            console.log(rol);
            setRol(rol.nombre)
            let externalAux;
            if(rol.nombre === "Estudiante"){ 
                console.log("Es estudiante");
                externalAux = cuenta.data.persona.estudiante.externalId;
            }else{
                console.log("Es docente");
                externalAux = cuenta.data.persona.docente.externalId;
            }
            const tutsAux = await obtenerTutorias(rol, externalAux)
            if (tutsAux.data) {
                setTutorias(tutsAux.data.filter(tutoria => tutoria.estado !== "Espera" && tutoria.estado !== "Aceptada" && tutoria.estado !== "Semirealizada").reverse())
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
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Estudiantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTutorias.length > 0 ? listaTutorias.map((tutoria) => (
                            <tr key={tutoria.id} className='tr-historial'>
                                <td>{tutoria.materia.nombre}</td>
                                <td><label htmlFor="" className={'px-2 rounded' +
                                    (tutoria.estado === "Espera" ? ' bg-warning' :
                                        tutoria.estado === "Realizada" ? ' bg-success' : tutoria.estado === "Semirealizada" ? ' bg-info' : ' bg-danger')}
                                >{tutoria.estado}</label></td>
                                <td>{tutoria.nombreTutoria}</td>
                                <td>{tutoria.descripcion}</td>
                                <td>{tutoria.estado === "Rechazada" ? "Rechazada" : (new Date(tutoria.fechaInicio)).toLocaleString()}</td>
                                <td>{tutoria.tipoReunionTutoria}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                            </tr>
                        )):(
                            <tr style={{backgroundColor: "#dee2e6"}}>
                                <td colSpan="7">Historial de tutorias vacio</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* <PaginacionTabla totalItems={listaTutorias} itemsPorPagina={itemsPorPagina} paginaActual={pagina} setPagina={setPagina} /> */}
            </div>
        </>
    )
}

export default TablaHistorialTutorias;