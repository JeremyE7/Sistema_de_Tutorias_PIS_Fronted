import React, { useEffect, useState } from 'react';
import '../css/TablaTutoriasPendientes.css';
import { cambiarEstadoTutoria, obtenerCuenta, obtenerRolCuenta, obtenerTutorias, tutoriasPendientes } from '../hooks/Conexionsw';
import TablaTutoriasPendientesMobile from './TablaTutoriasPendientesMobile';
import VModalTutoriaDocente from './VModalTutoriaDocente';
import { ObtenerDatos } from '../utilidades/UseSession';
import VModalFinalizarTutoria from './VModalFinalizarTutoria';
import { mensajeOk } from '../utilidades/Mensajes';

const TablaTutoriasPendientes = () => {


    const [tutorias, setTutorias] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalFinalizarIsOpen, setModalFinalizarIsOpen] = useState(false);
    const [externalIdTutoria, setExternalIdTutoria] = useState(null);
    const [tipoRol, setTipoRol] = useState(null);

    const obtTutorias = async () => {
        const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"))
        const rol = await obtenerRolCuenta(ObtenerDatos("ExternalCuenta"))
        if(rol.nombre === "Administrador") return
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
            setTutorias(tutsAux.data.filter(tutoria => tutoria.estado === "Espera" || tutoria.estado === "Aceptada"));
        }
    }



    useEffect(() => {
        obtTutorias();
    }, []);

    const handleRechazar = async (estado, externalIdAux) => {
        console.log(externalIdAux);
        setExternalIdTutoria(externalIdAux)
        const res = await cambiarEstadoTutoria(externalIdAux, estado);
        if (res) {
            console.log(res);
            mensajeOk("Tutoria rechazada correctamente").then(() => window.location.reload());
        }
    }


    if (tutorias) return (
        <>
            <div className='contenedor-tablaTP'>
                <label htmlFor="" className='ttl-tabla'>Tutorias Pendientes</label>
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
                                {tipoRol === "Docente" ? (<td>
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
                                                        handleRechazar("Rechazada", tutoria.externalId)
                                                    }}>Cancelar</button>
                                                </>
                                            )}

                                        </>
                                    )}
                                </td>) : (
                                    <td>
                                        <button className="btn btn-danger" onClick={() => {
                                            setExternalIdTutoria(tutoria.externalId)
                                            handleRechazar("Rechazada", tutoria.externalId)
                                        }}>Cancelar</button>
                                    </td>
                                )}
                            </tr>
                        )) : (
                            <tr style={{ backgroundColor: "#dee2e6" }}>
                                <td colSpan="7">No hay tutorias pendientes</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <VModalTutoriaDocente externalIdTutoria={externalIdTutoria} setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
            <VModalFinalizarTutoria externalIdTutoria={externalIdTutoria} setModalIsOpen={setModalFinalizarIsOpen} modalIsOpen={modalFinalizarIsOpen} />
            <TablaTutoriasPendientesMobile tutorias={tutorias} setModalIsOpen={setModalIsOpen} setExternalIdTutoria={setExternalIdTutoria} handleRechazar={handleRechazar} />
        </>
    )
};

export default TablaTutoriasPendientes;