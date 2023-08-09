import React, { useState } from 'react';
import { aceptarTutoria } from '../hooks/Conexionsw';
import Modal from 'react-modal';


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

const VModalTutoriaDocente = ({setModalIsOpen, externalIdTutoria, modalIsOpen}) => {

    const [fechaActual] = useState(new Date().toISOString().slice(0, 14));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const campos = new window.FormData(event.target);
        const fecha = new Date(campos.get('fecha')).toISOString();
        const tutoria = {
            fecha,
        };
        console.log(new Date(fecha));
        const res = await aceptarTutoria(externalIdTutoria, tutoria);
        if (res) {
            console.log(res);
        }
        setModalIsOpen(false);
        window.location.reload();
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
                <h2>Detalles de tutoria</h2>
                <div>
                    <form action="submit" onSubmit={handleSubmit}>
                        <div className="form-groups">
                            <label htmlFor="fecha">Fecha</label>
                            <input name="fecha" type="datetime-local" className="form-control" id="fecha" min={fechaActual}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button onClick={closeModal} className="btn btn-danger">Cerrar</button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default VModalTutoriaDocente;