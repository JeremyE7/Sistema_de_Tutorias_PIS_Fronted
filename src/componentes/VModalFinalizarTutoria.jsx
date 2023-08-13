import React, { useState } from 'react';
import { aceptarTutoria, finalizarTutoria } from '../hooks/Conexionsw';
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

const VModalFinalizarTutoria = ({setModalIsOpen, externalIdTutoria, modalIsOpen}) => {

    const [fechaActual] = useState(new Date().toISOString().slice(0, 14));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const campos = new window.FormData(event.target);
        const fechaFinalizacion = new Date(campos.get('fecha')).toISOString();
        const observacion = campos.get('observacion');
        console.log(observacion);
        console.log(new Date(fechaFinalizacion));
        const res = await finalizarTutoria(externalIdTutoria, fechaFinalizacion, observacion);
        if (res) {
            console.log(res);
            mensajeOk("Tutoria finalizada correctamente").then(() => window.location.reload());
        }
        setModalIsOpen(false);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={(closeModal)}
                style={modalStyle}
                contentLabel="Detalles de tutoria"
                className={"tutDocente-modal-open"}
            >
                <h2>Finalización de tutoria</h2>
                <div>
                    <form action="submit" onSubmit={handleSubmit}>
                        <div className="form-groups">
                            <label htmlFor="fechaFinalizacion">Fecha de finalización</label>
                            <input name="fecha" type="datetime-local" className="form-control" id="fecha" min={fechaActual}/>
                            <label htmlFor="">Observaciones:
                                <textarea name="observacion" id="observacion" cols="30" rows="10"></textarea>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button onClick={closeModal} className="btn btn-danger">Cerrar</button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default VModalFinalizarTutoria;