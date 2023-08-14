import React, { useState } from 'react';
import { aceptarTutoria } from '../hooks/Conexionsw';
import Modal from 'react-modal';
import { mensajeOk } from '../utilidades/Mensajes';


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

const VModalTutoriaDocente = ({ setModalIsOpen, externalIdTutoria, modalIsOpen, tipo }) => {

    const [selectedDateTime, setSelectedDateTime] = useState('');

    const handleDateTimeChange = (event) => {
        setSelectedDateTime(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const campos = new window.FormData(event.target);
        const fecha = new Date(campos.get('fecha')).toISOString();
        const justificacion = "Tutoria reagendada por docente el dia " + (new Date().toLocaleString()) + ": " + campos.get('justificacion');
        if(tipo !== "Reagendar"){
            const tutoria = {
                fecha,
            };
            console.log(new Date(fecha));
            const res = await aceptarTutoria(externalIdTutoria, tutoria);
            if (res) {
                mensajeOk('Tutoria aceptada con exito').then(() => {
                    setModalIsOpen(false);
                    window.location.reload();
                })
            }
        }
        else{
            const tutoria = {
                fecha,
                justificacion
            };
            console.log(new Date(fecha));
            const res = await aceptarTutoria(externalIdTutoria, tutoria);
            if (res) {
                console.log(res);
                mensajeOk('Tutoria reagendada con exito').then(() => {
                    setModalIsOpen(false);
                    window.location.reload();
                })
            }
        }
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedDateTime('');
    };

    console.log(tipo);
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={(closeModal)}
                style={modalStyle}
                contentLabel="Detalles de tutoria"
                className={"tutDocente-modal-open"}
            >
                <h2>Detalles de tutoria</h2>
                <div>
                    <form action="submit" onSubmit={handleSubmit}>
                        <div className="form-groups">
                            <label htmlFor="fecha">Fecha</label>
                            <input min={new Date().toISOString().slice(0, 14)} name="fecha" type="datetime-local" className="form-control" id="fecha" value={selectedDateTime} onChange={handleDateTimeChange} />
                        </div>
                        {tipo === "Reagendar" ? (
                            <label htmlFor="" className='mb-3'>Escriba la razón por la que reagenda esta tutoria:
                                <textarea className='form form-control' name="justificacion" id="justificacion" cols="30" rows="10"></textarea>
                            </label>
                        ) : null} <br />
                        <button type="submit" className="btn btn-primary mr-3" disabled={selectedDateTime.length > 0 ? false : true }>Guardar</button>
                        <button onClick={closeModal} className="btn btn-danger">Cerrar</button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default VModalTutoriaDocente;