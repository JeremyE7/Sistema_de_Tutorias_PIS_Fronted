import React from 'react';
import Modal from 'react-modal';
import { mensajeOk } from '../utilidades/Mensajes';
import { cambiarEstadoTutoria } from '../hooks/Conexionsw';

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

const VmCancelarTutoria = ({ externalId, modalIsOpen, setModalIsOpen, tipoRol }) => {

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleRechazar = async (evt) => {
        evt.preventDefault();
        let justificacion = evt.target[0].value;
        if (justificacion === "") justificacion = "No se especificó una justificación";
        console.log(tipoRol);
        if (tipoRol === "Docente") {
            justificacion = "Tutoria cancelada por docente: " + justificacion;
        }else{
            justificacion = "Tutoria cancelada por estudiante: " + justificacion;
        }

        console.log(justificacion);
        const res = await cambiarEstadoTutoria(externalId, "Rechazada", justificacion);
        if (res) {
            console.log(res);
            mensajeOk(tipoRol === "Docente" ? "Tutoria rechazada correctamente" : "Tutoria cancelada correctamente").then(() => window.location.reload());
        }
    }

    return (
        <Modal isOpen={modalIsOpen}
            onRequestClose={(closeModal)}
            style={modalStyle}
            className={"tutDocente-modal-open"}>
            <h1>Cancelar tutoria</h1>
            <form action="submit" onSubmit={handleRechazar}>
                <section>
                    <label htmlFor="">¿Está seguro de que desea cancelar esta tutoría?</label>
                    <label htmlFor="">Escriba la razon por la que cancela esta tutoria</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <button>Cancelar tutoria</button>
                </section>
            </form>
        </Modal>
    );
};

export default VmCancelarTutoria;