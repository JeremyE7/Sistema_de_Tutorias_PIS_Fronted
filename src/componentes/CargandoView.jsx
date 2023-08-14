import React from 'react';
import '../css/CargandoView.css';

const CargandoView = () => {
    return (
        <div className='contenedor-cargando'>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default CargandoView;