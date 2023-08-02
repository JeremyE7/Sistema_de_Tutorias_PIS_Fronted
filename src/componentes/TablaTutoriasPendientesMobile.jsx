import React from 'react';
import '../css/TablaTutoriasPendientes.css';


const TablaTutoriasPendientesMobile = ({ tutorias, setModalIsOpen, setExternalIdTutoria, handleRechazar }) => {
    return (
        <div>

            <div className='tablaTP-mobile'>
                <div className='tablaTP fila'>
                    <div className='tablaTP columna'>
                        <div className="header">
                            Materia
                        </div>
                        <div className="header">
                            Estado
                        </div>
                        <div className="header">
                            Nombre
                        </div>
                        <div className="header">
                            Descripción
                        </div>
                        <div className="header">
                            Estudiantes
                        </div>
                        <div className="header">
                            Fecha
                        </div>
                        <div className="header">
                            Acciones
                        </div>
                    </div>
                    {tutorias && tutorias.map((tutoria) => (
                        <div className='tablaTP columna' key={tutoria.id}>
                            <div className='tablaTP contenido'>
                                {tutoria.materia.nombre}
                            </div>
                            <div className='tablaTP contenido'>
                                {tutoria.estado}
                            </div>
                            <div className='tablaTP contenido'>
                                {tutoria.nombreTutoria}
                            </div>
                            <div className='tablaTP contenido'>
                                {tutoria.descripcion}
                            </div>
                            <div className='tablaTP contenido'>
                                {tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}
                            </div>
                            <div className='tablaTP contenido'>
                                {tutoria.estado === "Espera" ? "Aun no asignada" : (new Date(tutoria.fechaInicio)).toLocaleString()}
                            </div>
                            <div className='tablaTP contenido'>
                                {tutoria.estado === "Espera" ? (
                                    <>
                                        <button className="btn btn-primary" onClick={() => {
                                            setModalIsOpen(true)
                                            setExternalIdTutoria(tutoria.externalId)
                                        }}>Aceptar</button>
                                        <button className="btn btn-danger" onClick={() => {
                                            setExternalIdTutoria(tutoria.externalId)
                                            handleRechazar()
                                        }}>Rechazar</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-warning" onClick={() => {
                                            setModalIsOpen(true)
                                            setExternalIdTutoria(tutoria.externalId)
                                        }}>Reagendar</button>
                                        <button className="btn btn-danger" onClick={() => {
                                            setExternalIdTutoria(tutoria.externalId)
                                            handleRechazar()
                                        }}>Cancelar</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TablaTutoriasPendientesMobile;