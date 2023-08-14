import React, { useEffect, useState } from 'react';
import { mensajeError, mensajeOk } from '../../utilidades/Mensajes';
import { Docentes, crearMateria, eliminarMateria, obtenerTodasMaterias } from '../../hooks/Conexionsw';
import EditarMateria from './ModalAdminView/EditarMateria';
import ConfirmarAccion from './ModalAdminView/ConfirmarAccion';

const MateriasAdminView = () => {
    const [docentes, setDocentes] = useState([])
    const [selectedDocente, setSelectedDocente] = useState(null);
    const [materias, setMaterias] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalEliminarIsOpen, setModalEliminarIsOpen] = useState(false);
    const [selectedMateria, setSelectedMateria] = useState(null);

    const getDocentes = async () => {
        const docentes = await Docentes()
        if (docentes.data) {
            setDocentes(docentes.data)
        }
    }

    const getMaterias = async () => {
        const materias = await obtenerTodasMaterias()
        if (materias.data) {
            setMaterias(materias.data)
            console.log(materias.data);
        }
    }

    useEffect(() => {
        getDocentes()
        getMaterias()
    }, [])

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

    const handleEliminarMateria = async () => {
        const materiaEliminada = await eliminarMateria(selectedMateria.externalId);
        if (materiaEliminada) {
            mensajeOk("Materia eliminada correctamente").then(() => {
                getMaterias();
                setModalEliminarIsOpen(false);
            });
        } else {
            mensajeError("No se pudo eliminar la materia, intente nuevamente")
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedDocente);
        const campos = new window.FormData(event.target);
        console.log(campos);
        const nombre = campos.get('nombre');
        const materia = {
            nombre: nombre,
            external_id_docente: selectedDocente.externalId
        }

        console.log(nombre, selectedDocente.externalId);

        const materiaCreada = await crearMateria(materia);

        if (materiaCreada) {
            console.log(materiaCreada);
            mensajeOk("Materia creada correctamente").then(() => {
                getMaterias()
                document.getElementById('nombre').value = '';
                document.getElementById('docente').value = '';
            });
        } else {
            mensajeError("No se pudo crear la materia, intente nuevamente")
        }
        setSelectedDocente(null);

    }

    return (
        <div>
            <label htmlFor="" className='label-admin'>Añadir Materia</label>
            <form action="submit" className='form-admin' onSubmit={handleSubmit}>
                <label>
                    Docente: <br />
                    <input type="text" id='docente' list='docentes' onInput={handleTypedDocente} autocomplete="off" />
                </label>
                <datalist id='docentes'>
                    {docentes && docentes.map((docente) => (
                        <option value={docente.persona.nombre + " " + docente.persona.apellido} />
                    ))}
                </datalist>
                <label htmlFor="">Nombre de Materia: <br />
                    <input type="text" name="nombre" id='nombre' autocomplete="off" disabled={selectedDocente ? false : true} placeholder={selectedDocente ? '' : 'Escoga un docente valido'} />
                </label>
                <button type='submit'>Crear</button>
            </form>
            <div className='contenedor-tablaTP'>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nombre</th>
                            <th>Docente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias && materias.map((materia) => (
                            <tr key={materia.id}>
                                <td>{materia.id}</td>
                                <td>{materia.nombre}</td>
                                <td>{materia.docente.persona.nombre + " " + materia.docente.persona.apellido}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => {
                                        setSelectedMateria(materia)
                                        setModalEliminarIsOpen(true)
                                    }}>
                                        Eliminar
                                    </button>
                                    <button className='btn btn-warning' onClick={() => {
                                        setModalIsOpen(true)
                                        setSelectedMateria(materia)
                                    }}>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <EditarMateria setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} docentes={docentes} getMaterias={getMaterias} handleTypedDocente={handleTypedDocente} materia={selectedMateria} />
            <ConfirmarAccion accion={handleEliminarMateria} modalIsOpen={modalEliminarIsOpen} setModalIsOpen={setModalEliminarIsOpen} />
        </div>
    );
};

export default MateriasAdminView;