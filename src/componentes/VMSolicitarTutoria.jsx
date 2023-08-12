import React, { useEffect, useState } from 'react';
import { Docentes, obtenerCuenta, solicitarTutoria } from '../hooks/Conexionsw';
import Modal from 'react-modal';
import { ObtenerDatos } from '../utilidades/UseSession';
import '../css/VMSolicitarTutoria.css'
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

const VModalSolicitarTutoria = ({ setModalIsOpen, externalIdTutoria, modalIsOpen }) => {

    const [docentes, setDocentes] = useState([]);
    const [selectedDocente, setSelectedDocente] = useState(null);
    const [selectedMateria, setSelectedMateria] = useState(null);

    useEffect(() => {
        const obtDocentes = async () => {
            const res = await Docentes();
            if (res) {
                setDocentes(res.data);
                console.log(res.data);
            }
        }
        obtDocentes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"))
        const external = cuenta.data.persona.estudiante.externalId
        const campos = new window.FormData(event.target);
        const nombreTutoria = campos.get('nombreTutoria');
        const descripcion = campos.get('descripcion');
        console.log(external, selectedDocente.externalId, selectedMateria.externalId, nombreTutoria, descripcion);
        const tutoria = {
            nombreTutoria: nombreTutoria,
            descripcion: descripcion,
            external_id_docente: selectedDocente.externalId,
            external_id_materia: selectedMateria.externalId
        }

        const res = await solicitarTutoria(external, tutoria);
        if (res) {
            console.log(res);
            mensajeOk("Tutoria solicitada correctamente").then(() => window.location.reload());
        }
        setModalIsOpen(false);
        setSelectedDocente(null);
        setSelectedMateria(null);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedDocente(null);
        setSelectedMateria(null);
    };

    const handleTypedDocente = (event) => {
        const docenteNombre = event.target.value;

        const docenteEncontrado = docentes.find((docente) => {
            return docente.persona.nombre + " " + docente.persona.apellido === docenteNombre;
        });

        if (docenteEncontrado) {
            setSelectedDocente(docenteEncontrado);
            console.log(docenteEncontrado);

        }
    }

    const handleTypedMateria = (event) => {
        const materiaNombre = event.target.value;

        const materiaEncontrada = selectedDocente.materia.find((materia) => {
            return materia.nombre === materiaNombre;
        });

        if (materiaEncontrada) {
            setSelectedMateria(materiaEncontrada);
            console.log(materiaEncontrada);
            
        }
    }

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
                        <div className="form-group">
                            <label>
                                Docente: <br />
                                <input type="text" id='docente' list='docentes' onInput={handleTypedDocente} />
                            </label>
                            <datalist id='docentes'>
                                {docentes && docentes.map((docente) => (
                                    <option value={docente.persona.nombre + " " + docente.persona.apellido} />
                                ))}
                            </datalist>
                                <label>
                                    Materia: <br />
                                    <input autocomplete="off" onInput={handleTypedMateria} id='materia' type="text" list='materias' disabled={selectedDocente ? false : true} placeholder={selectedDocente ? '' : 'Escoga un docente valido'} />
                                </label>
                                <datalist id='materias'>
                                    {selectedDocente && selectedDocente.materia && selectedDocente.materia.map((materia) => (
                                        <option value={materia.nombre} />
                                    ))}
                                </datalist>
                                <label>
                                    Nombre: <br />
                                    <input type="text" name="nombreTutoria" autocomplete="off" id='nombreTutoria' disabled={selectedMateria ? false : true} placeholder={selectedMateria ? '' : 'Escoga una materia valida'}/>
                                </label>
                                <label>
                                    Descripción: <br />
                                    <input type="text" name="descripcion" autocomplete="off" id='descripcion' disabled={selectedMateria ? false : true} placeholder={selectedMateria ? '' : 'Escoga una materia valida'}/>
                                </label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={selectedDocente && selectedMateria ? false : true}>Guardar</button>
                        <button onClick={closeModal} className="btn btn-danger">Cerrar</button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default VModalSolicitarTutoria;