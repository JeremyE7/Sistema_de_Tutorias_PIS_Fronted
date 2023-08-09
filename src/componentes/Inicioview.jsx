import React, { useEffect, useState } from 'react';
import TablaTutoriasPendientes from './TablaTutoriasPendientes';
import TablaHistorialTutorias from './TablaHistorialTutorias';
import { Link } from 'react-router-dom';
import { obtenerRolCuenta } from '../hooks/Conexionsw';
import { set } from 'react-hook-form';
import { desencriptando } from '../utilidades/encryp';
import VModalSolicitarTutoria from './VMSolicitarTutoria';

const Inicioview = () => {
    const [esDocente, setDocente] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const asignarPermiso = (rol) => {
        if (rol === 'Docente') {
            setDocente(true)
            console.log("Es docente");
        }
    }
    useEffect(() => {
        const external = localStorage.getItem('ExternalCuenta')
        const rol = obtenerRolCuenta(external).then(result => asignarPermiso(result.nombre))
    })

    return (
        <div>
            <label htmlFor="" style={{ margin: "80px 0px 0px 50px", color: "#8d0b0e", fontWeight: 600, fontSize: 30 }}>Bienvendio:  </label> <label style={{ fontSize: 30 }}>{desencriptando("Nombre")}</label>
            <div>
                {!esDocente && <div>
                    <button onClick={() => setModalIsOpen(true)} style={{ margin: "10px 0px 0px 50px", backgroundColor: '#23394d', color: 'white', fontWeight: 'bold', borderColor: '#23394d', borderRadius: '4px' }}>Solicitar tutoria</button>
                </div>}
                <TablaTutoriasPendientes />
                <TablaHistorialTutorias />
            </div>
            <VModalSolicitarTutoria setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
        </div>
    );
}

export default Inicioview;