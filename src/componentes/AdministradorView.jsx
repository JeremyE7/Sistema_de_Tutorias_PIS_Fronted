import React, { useEffect, useState } from 'react';
import { Docentes, crearMateria } from '../hooks/Conexionsw';
import { mensajeError, mensajeOk } from '../utilidades/Mensajes';

const AdministradorView = () => {

    const [docentes, setDocentes] = useState([])
    const [selectedDocente, setSelectedDocente] = useState(null);


    useEffect(() => {
        const getDocentes = async () => {
            const docentes = await Docentes()
            if (docentes.data) {
                setDocentes(docentes.data)
            }
        }
        getDocentes()
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

        if(materiaCreada)
        {
            console.log(materiaCreada);
            mensajeOk("Materia creada correctamente").then(() => window.location.reload());
        }else{
            mensajeError("No se pudo crear la materia, intente nuevamente")
        }
        setSelectedDocente(null);
    }

    return (
        <div>
            <h3>Ventana de administracion</h3>
            <label htmlFor="">Añadir Materia</label>
            <form action="submit" onSubmit={handleSubmit}>
                <label htmlFor="">Nombre de Materia:</label>
                <input type="text" name="nombre" id='nombre' />
                <label>
                    Docente: <br />
                    <input type="text" id='docente' list='docentes' onInput={handleTypedDocente} />
                </label>
                <datalist id='docentes'>
                    {docentes && docentes.map((docente) => (
                        <option value={docente.persona.nombre + " " + docente.persona.apellido} />
                    ))}
                </datalist>
                <button type='submit'>Crear</button>
            </form>
        </div>
    );
};

export default AdministradorView;