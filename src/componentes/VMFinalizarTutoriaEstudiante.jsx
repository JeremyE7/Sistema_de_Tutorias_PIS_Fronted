import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';
import '../css/VMFinalizarTutoriaEstudiante.css';
import { finalizarTutoriaEstudiante } from '../hooks/Conexionsw';
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




const VMFinalizarTutoriaEstudiante = ({ setModalIsOpen, externalIdTutoria, modalIsOpen }) => {
    const [valoracion, setValoracion] = useState(5);

    const closeModal = () => {
        setModalIsOpen(false);
        setValoracion(5);
    };

    const handleValoracionChange = (newValoracion) => {
        setValoracion(newValoracion);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(externalIdTutoria);
        const campos = new window.FormData(event.target);
        const observacion = campos.get('observacion');
        console.log(externalIdTutoria, valoracion, observacion);
        const res = await finalizarTutoriaEstudiante(externalIdTutoria, valoracion, observacion );
        if(res){
            mensajeOk('Tutoria finalizada con exito').then(() => {
                window.location.reload();
            });
        }
        
        setModalIsOpen(false);
    };

    

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={(closeModal)}
            style={modalStyle}
            contentLabel="Detalles de tutoria"
            className={"tutDocente-modal-open"}
        >
            <h2>
                Finalización de tutoria
            </h2>
            <div>
                <form action="submit"onSubmit={handleSubmit}>
                    <p>Valoración: {valoracion}</p>
                    {[...Array(5)].map((star, k) =>{
                        const valAux = k + 1;
                        return (
                            <label className='input-star' htmlFor="">
                                <input  type="radio" name='rating' value={valAux}/>
                                <FaStar color={valAux <= valoracion ? 'yellow' : ''} className='star' size={50} onClick={() => handleValoracionChange(valAux)}/>
                            </label>
                        )
                    })}
                    <label htmlFor="">
                        Observación(Opcional):
                        <textarea name="observacion" id="observacion" cols="30" rows="10"></textarea>
                    </label>
                    <button>Enviar</button>
                    <button>Cancelar</button>
                </form>
            </div>
        </Modal>
    );
};

export default VMFinalizarTutoriaEstudiante;