import React from 'react';
import Modal from 'react-modal';
import '../css/VModalDetalleTutoria.css';
import { FaStar } from 'react-icons/fa';

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'grid',
        placeItems: 'center',
    },
};

const VModalDetalleTutoria = ({ tutoria, setModalIsOpen, modalIsOpen }) => {

    const closeModal = () => {
        setModalIsOpen(false);
    };
    console.log(tutoria);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={(closeModal)}
            style={modalStyle}
            contentLabel="Detalles de tutoria"
            className={"contenedor-modal-detalleTut"}
        >
            <h2>Detalle de tutoria</h2>
            {tutoria && <div className='contenedor-detalleTut'>
                <h3>{tutoria.nombreTutoria}</h3>
                <div className='header-detalleTut'>
                    <p>Materia: <br />{tutoria.materia.nombre}</p>
                    <p>Modalidad: <br />{tutoria.tipoReunionTutoria}</p>
                    <p>Estado: <br />{tutoria.estado}</p>
                    <p>Fecha de Inicio: <br /> {new Date(tutoria.fechaInicio).toLocaleString()}</p>
                    <p>Duración: <br />{new Date(tutoria.fechaFinalizacion).getHours() - new Date(tutoria.fechaInicio).getHours() + 'H'} </p>
                    {tutoria.valoracion && <p>Valoracion del estudiante: <br />{[...Array(tutoria.valoracion)].map((star) => {
                        return <FaStar size={20} color={'#ffc107'} />
                    })}</p>}
                </div>
                <div className='main-detalleTut'>
                    <p>Descripción: <br />{tutoria.descripcion}</p>
                    <p>Estudiante: <br />{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</p>
                    {tutoria.justificacion && <p>Justificacion: {tutoria.justificacion}</p>}

                    {tutoria.observacionEstudiante && <p>Observación del estudiante: {tutoria.observacionEstudiante}</p>}
                    {tutoria.observacionDocente && <p>Observación del docente: {tutoria.observacionDocente}</p>}
                </div>
                <div className='footer-detalleTut'>
                    <label htmlFor="">Firma del docente:
                        <img src={tutoria.docente.persona.firma} alt="firma de docente" width={100} />
                    </label>
                    <label htmlFor="">Firma del estudiante:
                        <img src={tutoria.estudiantes[0].persona.firma} alt="firma de docente" width={100} />
                    </label>
                </div>
            </div>}
        </Modal>
    );
};

export default VModalDetalleTutoria;