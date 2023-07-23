import React, { useEffect, useState } from 'react';
import '../css/TablaTutoriasPendientes.css';
import { aceptarTutoria, cambiarEstadoTutoria, obtenerTutorias, tutoriasPendientes } from '../hooks/Conexionsw';
import Modal from 'react-modal';
import PaginacionTabla from './PaginacionTabla';


const TablaHistorialTutorias = () => {
    const [tutorias, setTutorias] = useState([])
    const [rol, setRol] = useState(undefined)
    const [external, setExternal] = useState(undefined)

    const [pagina, setPagina] = useState(1)
    const itemsPorPagina = 10;
    const ulitmoIndice = pagina * itemsPorPagina;
    const primerIndice = ulitmoIndice - itemsPorPagina;
    const listaTutorias = tutorias.slice(primerIndice, ulitmoIndice);


    useEffect(()=>{
        obtenerTutorias(rol, external).then((info)=>{
            if(info){
                setTutorias(info.filter(tutoria => tutoria.estado === "Finalizado"))
            }
        })
    },[])

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
                                <td>{tutoria.materia.nombre}</td>
                                <td>{tutoria.estado}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginacionTabla totalItems={listaTutorias} itemsPorPagina={itemsPorPagina} paginaActual={pagina} setPagina={setPagina}/>
            </div>
        </>
    )
}

export default TablaHistorialTutorias;