import React, { useEffect, useState } from 'react';
import '../css/TablaTutoriasPendientes.css';
import { aceptarTutoria, cambiarEstadoTutoria, tutoriasPendientes } from '../hooks/Conexionsw';
import Modal from 'react-modal';

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    content: {
        borderRadius: '20px',
        width: '500px',
        height: '620px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        boxSizing: 'border-box',
    },
};

const TablaTutoriasPendientes = () => {


    const [tutorias, setTutorias] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [externalIdTutoria, setExternalIdTutoria] = useState(null);


    useEffect(() => {
        tutoriasPendientes().then((info) => {
            if (info) {
                setTutorias(info.filter(tutoria => tutoria.estado === "Espera"));
            }
        });
    }, []);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleRechazar = async () => {
        const res = await cambiarEstadoTutoria(externalIdTutoria, "Rechazada");
        if (res) {
            console.log(res);
            window.location.reload();
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const campos = new window.FormData(event.target);
        const nombreTutoria = campos.get('nombreTutoria');
        const descripcion = campos.get('descripcion');
        const fecha = new Date(campos.get('fecha')).toISOString();
        const duracion = new Date(`${fecha.split("T")[0] + "T" + campos.get('duracion')}`).toISOString();
        const estado = campos.get('estado');
        const tutoria = {
            nombreTutoria,
            descripcion,
            fecha,
            duracion,
            estado
        };
        console.log(fecha);
        console.log(duracion);
        const res = await aceptarTutoria(externalIdTutoria, tutoria);
        if (res) {
            console.log(res);
        }
        setModalIsOpen(false);
        window.location.reload();
    }


    if (tutorias) return (
        <>
            <div className='contenedor-tablaTP'>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Estado</th>
                            <th>Estudiantes</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorias && tutorias.map((tutoria) => (
                            <tr key={tutoria.id}>
                                <td>{tutoria.materia.nombre}</td>
                                <td>{tutoria.estado}</td>
                                <td>{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {
                                        setModalIsOpen(true)
                                        setExternalIdTutoria(tutoria.externalId)
                                    }}>Aceptar</button>
                                    <button className="btn btn-danger" onClick={() => {
                                        setExternalIdTutoria(tutoria.externalId)
                                        handleRechazar()
                                    }}>Rechazar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={(closeModal)}
                style={modalStyle}
                contentLabel="Detalles de tutoria"
            >
                <h2>Detalles de tutoria</h2>
                <div>
                    <form action="submit" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombreTutoria">Nombre de la tutoria</label>
                            <input name="nombreTutoria" type="text" className="form-control" id="nombreTutoria" placeholder="Nombre de la tutoria" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea name="descripcion" className="form-control" id="descripcion" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input name="fecha" type="date" className="form-control" id="fecha" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duracion">Duración</label>
                            <input name="duracion" type="time" className="form-control" id="duracion" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <select name="estado" className="form-control" id="estado">
                                <option>Realizada</option>
                                <option>Aceptada</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button onClick={closeModal} className="btn btn-danger">Cerrar</button>
                    </form>
                </div>
            </Modal>

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
                            Estudiantes
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
                                {tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}
                            </div>
                            <div className='tablaTP contenido'>
                                <button className="btn btn-primary" onClick={() => {
                                    setModalIsOpen(true)
                                    setExternalIdTutoria(tutoria.externalId)
                                }}>Aceptar</button>
                                <button className="btn btn-danger" onClick={() => {
                                    setExternalIdTutoria(tutoria.externalId)
                                    handleRechazar()
                                }}>Rechazar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TablaTutoriasPendientes;