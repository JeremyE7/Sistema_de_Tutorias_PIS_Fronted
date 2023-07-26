import React, { useEffect, useState } from 'react';
import TablaTutoriasPendientes from './TablaTutoriasPendientes';
import TablaHistorialTutorias from './TablaHistorialTutorias';
import { Link } from 'react-router-dom';
import { obtenerRolCuenta } from '../hooks/Conexionsw';
import { set } from 'react-hook-form';

const Inicioview = () => {
    const [esDocente, setDocente] = useState(false)

    const asignarPermiso = (rol) =>{
        if(rol === 'Docente'){
            setDocente(true)
        }
    }
    useEffect(()=>{
        const external = localStorage.getItem('ExternalCuenta')
        const rol = obtenerRolCuenta(external).then(result => asignarPermiso(result.nombre))
    })

    return (
        <div>
            {!esDocente && <div style={{margin:'20px'}}>
                <Link to="/solicitar">
                    <button style={{backgroundColor:'#23394d',color:'white', fontFamily:'sans-serif', fontWeight:'bold', borderColor:'#23394d', borderRadius:'4px'}}>Solicitar tutoria</button>
                </Link>
            </div>}
            <div>
                <TablaTutoriasPendientes />
                <TablaHistorialTutorias />
            </div>
        </div>
    );
}

export default Inicioview;