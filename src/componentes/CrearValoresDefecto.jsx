import React, { useEffect } from 'react';
import { valoresDefecto } from '../hooks/Conexionsw';

const CrearValoresDefecto = () => {
    
    useEffect(() => {
        const cargarDAtos = async () => {
            const res = await valoresDefecto();
        }
    }, []);        

    return (
        <div>
            hola
        </div>
    );
};

export default CrearValoresDefecto;