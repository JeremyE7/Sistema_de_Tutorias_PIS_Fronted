import React from 'react';
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

const ConfirmarAccion = ({mensaje, accion, modalIsOpen, setModalIsOpen}) => {
    

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Modal isOpen={modalIsOpen}
        onRequestClose={(closeModal)}
        style={modalStyle}
        className={"tutDocente-modal-open"}>
            <h1>Confirmación</h1>
            <p>Esta seguro de que desea realizar esta acción: <br />{mensaje}</p>
            <div>
                <button onClick={accion}>
                    Confirmar
                </button>
                <button onClick={closeModal}>
                    Cancelar
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmarAccion;