import React, { useEffect, useState } from 'react';
import { mensajeError, mensajeOk } from '../../utilidades/Mensajes';
import { Docentes, crearMateria, eliminarCuenta, eliminarMateria, obtenerTodasCuentas, obtenerTodasMaterias } from '../../hooks/Conexionsw';
import ConfirmarAccion from './ModalAdminView/ConfirmarAccion';
import EditarRol from './ModalAdminView/EditarRol';

const CuentasAdminView = () => {
    const [cuentas, setCuentas] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalEliminarIsOpen, setModalEliminarIsOpen] = useState(false);
    const [selectedCuenta, setSelectedCuenta] = useState(null);

    const getCuentas = async () => {
        const cuentas = await obtenerTodasCuentas()
        if (cuentas.data) {
            setCuentas(cuentas.data)
        }
    }


    useEffect(() => {
        getCuentas();
        console.log(cuentas);
    }, [])


    const handleEliminarCuenta = async () => {
        const res = await eliminarCuenta(selectedCuenta.externalId)
        if (res) {
            mensajeOk("Cuenta eliminada con exito", "").then(() => {
            getCuentas();
            })
        }
    }


    return (
        <div>
            <label htmlFor="" className='label-admin'>Cuentas</label>
            <div className='contenedor-tablaTP'>
                <table className='tablaTP-desktop'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuentas && cuentas.map((cuenta) => (
                            <tr key={cuenta.id}>
                                <td>{cuenta.id}</td>
                                <td>{cuenta.persona.nombre}</td>
                                <td>{cuenta.persona.apellido}</td>
                                <td>{cuenta.correo}</td>
                                <td>{cuenta.rol.nombre}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => {
                                        setSelectedCuenta(cuenta);
                                        setModalEliminarIsOpen(true);
                                    }}>
                                        Eliminar
                                    </button>
                                    <button className='btn btn-warning' onClick={() => {
                                        setSelectedCuenta(cuenta);
                                        setModalIsOpen(true);
                                    }}>
                                        Editar Rol
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmarAccion accion={handleEliminarCuenta} modalIsOpen={modalEliminarIsOpen} setModalIsOpen={setModalEliminarIsOpen} mensaje="Eliminar esta cuenta"/>
            <EditarRol modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} cuenta={selectedCuenta} getCuentas={getCuentas}/>
        </div>
    );
};

export default CuentasAdminView;