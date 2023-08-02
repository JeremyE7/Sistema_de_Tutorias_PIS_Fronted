import React, { useEffect, useState } from 'react';
import '../css/TablaTutoriasPendientes.css';
import { cambiarEstadoTutoria, obtenerCuenta, tutoriasPendientes } from '../hooks/Conexionsw';
import TablaTutoriasPendientesMobile from './TablaTutoriasPendientesMobile';
import VModalTutoriaDocente from './VModalTutoriaDocente';
import { ObtenerDatos } from '../utilidades/UseSession';
import VModalFinalizarTutoria from './VModalFinalizarTutoria';

const TablaTutoriasPendientes = () => {


    const [tutorias, setTutorias] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalFinalizarIsOpen, setModalFinalizarIsOpen] = useState(false);
    const [externalIdTutoria, setExternalIdTutoria] = useState(null);

    const obtenerTutorias = async () => {
        const externalId = ObtenerDatos("ExternalCuenta");
        console.log(externalId);
        const cuenta = await obtenerCuenta(externalId);
        console.log(cuenta);
        const tutorias = await tutoriasPendientes(cuenta.data.persona.docente.externalId);
        if (tutorias) {
            setTutorias(tutorias.filter(tutoria => tutoria.estado === "Espera" || tutoria.estado === "Aceptada"));
        }
    }



    useEffect(() => {
        obtenerTutorias();
    }, []);

    const handleRechazar = async (estado, externalIdAux) => {
        console.log(externalIdAux);
        setExternalIdTutoria(externalIdAux)
        const res = await cambiarEstadoTutoria(externalIdAux, estado);
        if (res) {
            console.log(res);
            window.location.reload();
        }
    }
    

    if (tutorias) return (
        <>
            <div className='contenedor-tablaTP'>
                <label htmlFor=""className='ttl-tabla'>Tutorias Pendientes</label>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Estado</th>
                            <th>Nombre de Tutoria</th>
                            <th>Descripcion</th>
                            <th>Estudiantes</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorias.length > 0 ? tutorias.map((tutoria) => (
                            <tr key={tutoria.id}>
                                <td>{tutoria.materia.nombre}</td>
                                <td>{tutoria.estado}</td>
                                <td>{tutoria.nombreTutoria}</td>
                                <td>{tutoria.descripcion}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                                <td>{tutoria.estado === "Espera" ? "Aun no asignada" : (new Date(tutoria.fechaInicio)).toLocaleString()}</td>
                                <td>
                                    {tutoria.estado === "Espera" ? (
                                        <>
                                            <button className="btn btn-primary" onClick={() => {
                                                setModalIsOpen(true)
                                                setExternalIdTutoria(tutoria.externalId)
                                            }}>Aceptar</button>
                                            <button className="btn btn-danger" onClick={() => {
                                                setExternalIdTutoria(tutoria.externalId)
                                                handleRechazar("Rechazada", tutoria.externalId)
                                            }}>Rechazar</button>
                                        </>
                                    ) : (
                                        <>
                                            {(new Date(tutoria.fechaInicio)).toLocaleString() <= new Date().toLocaleString() ? (
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
                                                        setExternalIdTutoria(tutoria.externalId)
                                                    }}>Reagendar</button>
                                                    <button className="btn btn-danger mx-10" onClick={() => {
                                                        console.log(tutoria.externalId);
                                                        setExternalIdTutoria(tutoria.externalId)
                                                        handleRechazar("Rechazada", tutoria.externalIda)
                                                    }}>Cancelar</button>
                                                </>
                                            )}

                                        </>
                                    )}
                                </td>
                            </tr>
                        )): (
                            <tr style={{backgroundColor: "#dee2e6"}}>
                                <td colSpan="7">No hay tutorias pendientes</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <VModalTutoriaDocente externalIdTutoria={externalIdTutoria} setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
            <VModalFinalizarTutoria externalIdTutoria={externalIdTutoria} setModalIsOpen={setModalFinalizarIsOpen} modalIsOpen={modalFinalizarIsOpen}/>
            <TablaTutoriasPendientesMobile tutorias={tutorias} setModalIsOpen={setModalIsOpen} setExternalIdTutoria={setExternalIdTutoria} handleRechazar={handleRechazar} />
        </>
    )
};

export default TablaTutoriasPendientes;