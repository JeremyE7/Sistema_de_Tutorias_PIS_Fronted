import React, { useEffect, useState } from 'react';
import TablaTutoriasPendientes from './TablaTutoriasPendientes';
import TablaHistorialTutorias from './TablaHistorialTutorias';
import { Link } from 'react-router-dom';
import { obtenerRolCuenta } from '../hooks/Conexionsw';
import { set } from 'react-hook-form';
import { desencriptando } from '../utilidades/encryp';
import VModalSolicitarTutoria from './VMSolicitarTutoria';

const Inicioview = ({setIsAdmin, setIsEstudiante}) => {
    const [esDocente, setDocente] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const asignarPermiso = (rol) => {
        if (rol === 'Docente') {
            setDocente(true)
            console.log("Es docente");
            setIsAdmin(false)
            setIsEstudiante(false)
        }
        else if(rol === 'Administrador'){
            setIsAdmin(true)
            setIsEstudiante(false)
            setDocente(false)
            console.log("Es admin");
        }
        else if(rol === 'Estudiante'){
            setIsAdmin(false)
            setIsEstudiante(true)
            setDocente(false)
            console.log("Es estudiante");
        }
    }
    useEffect(() => {
        const external = localStorage.getItem('ExternalCuenta')
        const rol = obtenerRolCuenta(external).then(result => asignarPermiso(result.nombre))
    })

    return (
        <div>
            <label htmlFor="" style={{ margin: "80px 0px 0px 50px", color: "#8d0b0e", fontWeight: 600, fontSize: 30 }}>Bienvenido:  </label> <label style={{ fontSize: 30 }}>{desencriptando("Nombre")}</label>
            <div>
                {!esDocente && <div>
                    <button onClick={() => setModalIsOpen(true)} style={{ margin: "10px 0px 0px 50px", backgroundColor: '#8d0b0e', color: 'white', fontWeight: 'bold', borderColor: '#8d0b0e', borderRadius: '4px' }}>Solicitar tutoría</button>
                </div>}
                <TablaTutoriasPendientes />
                <TablaHistorialTutorias />
            </div>
            <VModalSolicitarTutoria setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
        </div>
    );
}

export default Inicioview;