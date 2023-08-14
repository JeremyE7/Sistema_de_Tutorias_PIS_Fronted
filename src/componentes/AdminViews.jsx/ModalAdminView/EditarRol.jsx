import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { editarCuenta, editarCuentaRol, obtenerTodosRoles } from '../../../hooks/Conexionsw';
import { mensajeError, mensajeOk } from '../../../utilidades/Mensajes';

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

const EditarRol = ({ setModalIsOpen, modalIsOpen, cuenta, getCuentas }) => {

    const [roles, setRoles] = useState([])

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const getRoles = async() => {
        const roles = await obtenerTodosRoles();
        console.log(roles);
        if(roles.data){
            setRoles(roles.data);
        }
    }

    const handleEditarRol = async (event) => {
        const rol = document.getElementById("roles").value;
        event.preventDefault();
        const cuentaEditada = await editarCuentaRol(cuenta.externalId, rol)
        if (cuentaEditada) {
            mensajeOk("Cuenta editada con exito", "").then(() => {
                closeModal();
                getCuentas();
            })
        }
        else {
            mensajeError("No se pudo editar la cuenta", "").then(() => {
                closeModal();
            })
        }
    }

    useEffect(() => {
        getRoles();
    }, [])

    return (
        <Modal isOpen={modalIsOpen}
            onRequestClose={(closeModal)}
            style={modalStyle}
            className={"tutDocente-modal-open"}>
            <h1>Cambio de Rol</h1>
            <form action="submit" onSubmit={handleEditarRol}>
                <p>Escoga el nuevo rol de esta cuenta</p>
                <select name="roles" id="roles">
                    {roles && roles.map((rol) => (
                        <option value={rol.nombre} key={rol.id}>{rol.nombre}</option>
                    ))}
                </select>
                <div>
                    <button >
                        Editar
                    </button>
                    <button onClick={closeModal}>
                        Cancelar
                    </button>
                </div>
            </form>

        </Modal>
    );
};

export default EditarRol;