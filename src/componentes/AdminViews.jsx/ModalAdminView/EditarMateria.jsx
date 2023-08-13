import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../../../css/VMSolicitarTutoria.css'
import { editarMateria } from '../../../hooks/Conexionsw';
import { mensajeOk } from '../../../utilidades/Mensajes';


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

const EditarMateria = ({ materia, setModalIsOpen, modalIsOpen, docentes, getMaterias }) => {

    const [selectedDocente, setSelectedDocente] = useState(null);
    console.log(selectedDocente);

    useEffect(() => {
        if(materia){
            setSelectedDocente(materia.docente.persona.nombre + " " + materia.docente.persona.apellido);
        }
    }, [materia]);

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedDocente(null);
    };

    const handleTypedDocente = (event) => {
        const docenteNombre = event.target.value;

        const docenteEncontrado = docentes.find((docente) => {
            return docente.persona.nombre + " " + docente.persona.apellido === docenteNombre;
        });

        if (docenteEncontrado) {
            setSelectedDocente(docenteEncontrado);
            console.log(docenteEncontrado);
        }else{  
            setSelectedDocente(null)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const campos = new window.FormData(event.target);
        const nombre = campos.get('nombre');
        const docenteAux = campos.get('docente');
        const docenteId = docentes.find((docente) => docente.persona.nombre + " " + docente.persona.apellido === docenteAux).externalId;
        console.log(nombre, docenteId);
        const materiaAux = {
            nombre: nombre,
            external_id_docente: docenteId
        }

        const materiaEditada = await editarMateria(materia.externalId, materiaAux);
        if (materiaEditada) {
            console.log(materiaEditada);
            mensajeOk("Materia editada correctamente").then(() => getMaterias());
            
        }
        closeModal();
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={(closeModal)}
            style={modalStyle}
            className={"tutDocente-modal-open"}
        >
            <h1>Editar Materia</h1>
            {materia && <form action="submit" onSubmit={handleSubmit}>
                <label htmlFor="">Nombre de Materia: <br />
                    <input type="text" name="nombre" id='nombre' defaultValue={materia.nombre} />
                </label>
                <label htmlFor="">Docente: <br />
                    <input type="text" name="docente" id='docente' list='docentes' autoComplete='off' defaultValue={materia.docente.persona.nombre + " " + materia.docente.persona.apellido} onInput={handleTypedDocente} />
                </label>
                <datalist id='docentes'>
                    {docentes && docentes.map((docente) => (
                        <option key={docente.externalId} value={docente.persona.nombre + " " + docente.persona.apellido} />
                    ))}
                </datalist>
                <button className = 'btn btn-warning' type='submit' disabled={selectedDocente ? false : true}> Editar </button>
                <button className='btn btn-danger' onClick={closeModal}>Cancelar</button>
            </form>}
        </Modal>
    );
};

export default EditarMateria;