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
            <h2 className='shadow'>Detalle de tutoria</h2>
            {tutoria && <div className='contenedor-detalleTut'>
                <h3>{tutoria.nombreTutoria}</h3>
                <div className='header-detalleTut shadow'>
                    <p className=''><b>Materia:</b> <br />{tutoria.materia.nombre}</p>
                    <p className=''><b>Modalidad:</b> <br />{tutoria.tipoReunionTutoria}</p>
                    <p className=''><b>Estado:</b> <br />{tutoria.estado}</p>
                    <p><b>Fecha de inicio:</b> <br /> {new Date(tutoria.fechaInicio).toLocaleString()}</p>
                    <p><b>Duración:</b> <br />{new Date(tutoria.fechaFinalizacion).getHours() - new Date(tutoria.fechaInicio).getHours() + 'H'} </p>
                    {tutoria.valoracion && <p><b>Valoracion del estudiante:</b> <br />{[...Array(tutoria.valoracion)].map((star) => {
                        return <FaStar size={20} color={'#ffc107'} />
                    })}</p>}
                </div>
                <div className='main-detalleTut shadow'>
                    <p><b>-Descripción:</b> <br />{tutoria.descripcion}</p>
                    <p><b>-Estudiante:</b> <br />{tutoria.estudiantes.map((estudiante, key) => { return estudiante.persona.nombre + " " + estudiante.persona.apellido + ((key === tutoria.estudiantes.length - 1) ? "" : ", ") })}</p>
                    {tutoria.justificacion && <p><b>-Justificacion:</b> <br />{tutoria.justificacion}</p>}

                    {tutoria.observacionEstudiante && <p><b>-Observación del estudiante:</b> <br />{tutoria.observacionEstudiante}</p>}
                    {tutoria.observacionDocente && <p><b>-Observación del docente:</b> <br />{tutoria.observacionDocente}</p>}
                </div>
                <div className='footer-detalleTut'>
                    <label htmlFor="" className='firma'>
                        <img src={tutoria.docente.persona.firma} alt="firma de docente" width={100} />
                        <label htmlFor=""><b>Firma del docente</b></label>
                    </label>
                    <label htmlFor="" className='firma'>
                        <img src={tutoria.estudiantes[0].persona.firma} alt="firma de docente" width={100} />
                        <label htmlFor=""><b>Firma del estudiante</b></label>
                    </label>
                </div>
            </div>}
        </Modal>
    );
};

export default VModalDetalleTutoria;