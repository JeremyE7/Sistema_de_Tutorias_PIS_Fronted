import React, { useEffect, useState } from 'react';
import '../css/TablaTutoriasPendientes.css';
import { cambiarEstadoTutoria, obtenerCuenta, obtenerRolCuenta, obtenerTutorias } from '../hooks/Conexionsw';
import VModalTutoriaDocente from './VModalTutoriaDocente';
import { ObtenerDatos } from '../utilidades/UseSession';
import VModalFinalizarTutoria from './VModalFinalizarTutoria';
import { mensajeOk } from '../utilidades/Mensajes';
import VmCancelarTutoria from './VmCancelarTutoria';
import VMFinalizarTutoriaEstudiante from './VMFinalizarTutoriaEstudiante';

const TablaTutoriasPendientes = () => {


    const [tutorias, setTutorias] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalFinalizarIsOpen, setModalFinalizarIsOpen] = useState(false);
    const [modalCancelarIsOpen, setModalCancelarIsOpen] = useState(false);
    const [externalIdTutoria, setExternalIdTutoria] = useState(null);
    const [tipoRol, setTipoRol] = useState(null);
    const [tipoModalTutoriaDocente, setTipoModalTutoriaDocente] = useState(null);
    const [modalFinalizarEstudianteIsOpen, setModalFinalizarEstudianteIsOpen] = useState(false);

    const obtTutorias = async () => {
        const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"))
        const rol = await obtenerRolCuenta(ObtenerDatos("ExternalCuenta"))
        if (rol.nombre === "Administrador") return
        console.log(rol);
        let externalAux;
        if (rol.nombre === "Estudiante") {
            setTipoRol("Estudiante");
            console.log("Es estudiante");
            externalAux = cuenta.data.persona.estudiante.externalId;
        } else {
            setTipoRol("Docente");
            console.log("Es docente");
            externalAux = cuenta.data.persona.docente.externalId;
        }
        const tutsAux = await obtenerTutorias(rol, externalAux)
        if (tutsAux.data) {
            setTutorias(tutsAux.data.filter(tutoria => tutoria.estado === "Espera" || tutoria.estado === "Aceptada" || tutoria.estado === "Semirealizada"));
        }
    }



    useEffect(() => {
        obtTutorias();
    }, []);

    if (tutorias) return (
        <>
            <div className='contenedor-tablaTP'>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Estado</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estudiantes</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorias.length > 0 ? tutorias.map((tutoria) => (
                            <tr key={tutoria.id}>
                                <td>{tutoria.materia.nombre}</td>
                                <td><label htmlFor="" className={'px-2 rounded' +
                                    (tutoria.estado === "Espera" ? ' bg-warning' :
                                        tutoria.estado === "Aceptada" ? ' bg-info' : tutoria.estado === "Semirealizada" ? ' bg-primary' : ' bg-danger')}
                                >{tutoria.estado}</label></td>
                                <td>{tutoria.nombreTutoria}</td>
                                <td>{tutoria.descripcion}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                                <td>{tutoria.estado === "Espera" ? "Aun no asignada" : (new Date(tutoria.fechaInicio)).toLocaleString()}</td>
                                <td>{tutoria.tipoReunionTutoria}</td>
                                {tipoRol === "Docente" ? (<td>
                                    {tutoria.estado === "Espera" ? (
                                        <>
                                            <button className="btn btn-primary" onClick={() => {
                                                setModalIsOpen(true)
                                                setExternalIdTutoria(tutoria.externalId)
                                                console.log(tipoModalTutoriaDocente);

                                            }}>Aceptar</button>
                                            <button className="btn btn-danger" onClick={() => {
                                                setExternalIdTutoria(tutoria.externalId)
                                                setModalCancelarIsOpen(true)
                                            }}>Rechazar</button>
                                        </>
                                    ) : tutoria.estado === "Aceptada" ? (
                                        <>
                                            {(new Date(tutoria.fechaInicio)) <= new Date() ? (
                                                <button className="btn btn-danger" onClick={() => {
                                                    setExternalIdTutoria(tutoria.externalId)
                                                    setModalFinalizarIsOpen(true)
                                                }
                                                }>Finalizar</button>
                                            ) : (
                                                <>
                                                    <button className="btn btn-warning" onClick={() => {
                                                        setModalIsOpen(true)
                                                        console.log(tutoria.externalId);
                                                        setTipoModalTutoriaDocente("Reagendar")
                                                        setExternalIdTutoria(tutoria.externalId)
                                                    }}>Reagendar</button>
                                                    <button className="btn btn-danger mx-10" onClick={() => {
                                                        console.log(tutoria.externalId);
                                                        setExternalIdTutoria(tutoria.externalId)
                                                        setModalCancelarIsOpen(true)
                                                    }}>Cancelar</button>
                                                </>
                                            )}
                                        </>
                                    ) : tutoria.estado === "Semirealizada" && (
                                        <label htmlFor="" className='text-secondary'>Esperando a que estudiante finalize la tutoria</label>
                                    )}
                                </td>) : tutoria.estado !== "Semirealizada" ? (
                                    <td>
                                        <button className="btn btn-danger" onClick={() => {
                                            setExternalIdTutoria(tutoria.externalId)
                                            setModalCancelarIsOpen(true)
                                        }}>Cancelar</button>
                                    </td>
                                ) : (
                                    <td>
                                        <button className='btn btn-secondary px-1' onClick={() =>{                                            
                                            setExternalIdTutoria(tutoria.externalId)
                                            setModalFinalizarEstudianteIsOpen(true)
                                        }}>
                                            Valorar tutoria
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )) : (
                            <tr style={{ backgroundColor: "#dee2e6" }}>
                                <td colSpan="9">No hay tutorias pendientes</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <VModalTutoriaDocente externalIdTutoria={externalIdTutoria} setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} tipo={tipoModalTutoriaDocente} />
            <VModalFinalizarTutoria externalIdTutoria={externalIdTutoria} setModalIsOpen={setModalFinalizarIsOpen} modalIsOpen={modalFinalizarIsOpen} />
            <VmCancelarTutoria setModalIsOpen={setModalCancelarIsOpen} modalIsOpen={modalCancelarIsOpen} externalId={externalIdTutoria} tipoRol={tipoRol} />
            <VMFinalizarTutoriaEstudiante setModalIsOpen={setModalFinalizarEstudianteIsOpen} modalIsOpen={modalFinalizarEstudianteIsOpen} externalIdTutoria={externalIdTutoria}/>
        </>
    )
};

export default TablaTutoriasPendientes;