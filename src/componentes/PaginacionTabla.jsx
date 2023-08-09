import React from "react";
import "../css/Bootstrap.css";
import "../css/PaginacionTabla.css";

const PaginacionTabla = ({ totalItems, itemsPorPagina, paginaActual, setPagina }) => {
    let paginas = [Math.ceil(totalItems / itemsPorPagina) + 1];

    function paginaSiguiente() {
        if (paginaActual !== paginas.length) {
            setPagina(paginaActual + 1)
        }
    }

    function paginaAnterior() {
        if (paginaActual > 1) {
            setPagina(paginaActual - 1)
        }
    }
    return (
        <>
            <nav aria-label="..." style={{marginTop:"10px"}}>
                <ul className="pagination justify-content-center">
                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={paginaAnterior}>Anterior</a>
                    </li>
                    {paginas.map((pagina, i) => (
                        <li className={`page-item ${paginaActual === paginaActual ? 'active':''}`} style={{background:'black'}}key={i}>
                            <a href="#" className={"page-link"} onClick={() => setPagina(pagina)}>{pagina}</a>
                        </li>
                    ))}
                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={(paginaSiguiente)}>Siguiente</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default PaginacionTabla;