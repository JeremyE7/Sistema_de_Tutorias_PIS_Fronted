import React, { useEffect, useState } from 'react';
import TablaTutoriasPendientes from './TablaTutoriasPendientes';
import TablaHistorialTutorias from './TablaHistorialTutorias';
import { Link } from 'react-router-dom';
import { obtenerRolCuenta } from '../hooks/Conexionsw';
import { set } from 'react-hook-form';
import { desencriptando } from '../utilidades/encryp';
import VModalSolicitarTutoria from './VMSolicitarTutoria';
import '../css/Inicioview.css'
import logoCunl from '../img/logoCunl.png'

const Inicioview = ({ setIsAdmin, setIsEstudiante, esDocente, setDocente, esEstudiante }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const asignarPermiso = (rol) => {
        if (rol === 'Docente') {
            setDocente(true)
            console.log("Es docente");
            setIsAdmin(false)
            setIsEstudiante(false)
        }
        else if (rol === 'Administrador') {
            setIsAdmin(true)
            setIsEstudiante(false)
            setDocente(false)
            console.log("Es admin");
        }
        else if (rol === 'Estudiante') {
            console.log(rol);
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
            <div className='contenedor-subheader'>
                <label htmlFor="" style={{ margin: "10px 0px 0px 0px", color: "#052342", fontWeight: 600, fontSize: 30, display: 'flex'}}>
                    <img src={logoCunl} alt="logo-computacion-unl" 
                    style={{width: '100px', marginRight: '20px'}}/>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <label htmlFor="">
                            Bienvenido:
                        </label>
                        <br />
                        <label style={{ fontSize: 30, fontWeight: 300 }}>{desencriptando("Nombre")}</label>
                    </div>
                </label>
                {esEstudiante && <div>
                    <button onClick={() => setModalIsOpen(true)} className='boton-solicitar'>Solicitar tutoría</button>
                </div>}
            </div>
            <div>

                <main className='contenedor-main'>
                    <label htmlFor="" className='ttl-tabla'>Tutorías Pendientes</label>
                    <TablaTutoriasPendientes />
                    <label htmlFor="" className='ttl-tabla'>Historial de tutorías</label>
                    <TablaHistorialTutorias />
                </main>
            </div>
            <VModalSolicitarTutoria setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
        </div>
    );
}

export default Inicioview;