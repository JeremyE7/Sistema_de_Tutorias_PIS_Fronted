import { useEffect, useState } from "react"
import { Materias_Docente, obtenerCuenta, obtenerTutorias } from "../hooks/Conexionsw";
import { ObtenerDatos } from "../utilidades/UseSession";
import TablaHistorialTutorias from "./TablaHistorialTutorias";
import TablaRegistroTutorias from "./TablaRegistroTutorias";
import { Link, Navigate } from "react-router-dom";

const RegistroTutorias = () => {
    const [listaMaterias, setMaterias] = useState([]);
    const [numRegistro, setNumRegistro] = useState(0);
    const [registroSelec, setRegistro] = useState(undefined);
    const [listaTutorias, setTutorias] = useState([]);

    function cambiarMateria(id){
        setNumRegistro(id)
    }
    function navegacion(){
        return(
            <Navigate to='ReportePDF'/>
        )
    }

    useEffect(() => {
        const getMaterias = async () => {
            const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"));
            const materias = await Materias_Docente(cuenta.data.persona.docente.externalId);
            setMaterias(materias.data);
            const auxMateria = materias.data.filter(materia => materia.id === numRegistro);
            const tutoriasAux = await obtenerTutorias(cuenta.data.rol, cuenta.data.persona.docente.externalId);
            if (tutoriasAux) {
                setTutorias(tutoriasAux.data.filter(tutoria => tutoria.estado === "Realizada" && tutoria.materia.externalId === auxMateria[0].externalId));
            }
            console.log(auxMateria);
            console.log(tutoriasAux);
        }

        getMaterias()
    }, [numRegistro])

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="btn-group container" style={{ margin: "20px", flexDirection: 'column', height: '100vh', width: '15%' }}>
                <label htmlFor="" className='ttl-tabla'>Asignaturas</label>
                {listaMaterias && listaMaterias.map((materia) => (
                    <button onClick={()=>cambiarMateria(materia.id)}style={{ backgroundColor: '#8d0b0e', color: 'white', fontFamily: 'sans-serif', fontWeight: 'bold', borderColor: '#8d0b0e', borderRadius: '2px', outline: 'none' }} key={materia.id}>
                        {materia.nombre}
                    </button>
                ))}
            </div>
            <div className="container" style={{ margin: "20px", width: '100%'}}>
                <TablaRegistroTutorias listTutorias={listaTutorias}></TablaRegistroTutorias>
                <Link className='btn' style={{backgroundColor: '#8d0b0e', color: 'white', fontFamily: 'sans-serif', fontWeight: 'bold', borderColor: '#8d0b0e'}}to={"/reporte/pdf"} target="_blank" onClick={navegacion}>Generar PDF</Link>
            </div>
        </div>
    )
}
export default RegistroTutorias;