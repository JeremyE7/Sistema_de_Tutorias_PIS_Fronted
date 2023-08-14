import { useEffect, useState } from "react"
import { Materias_Docente, obtenerCuenta, obtenerTutorias } from "../hooks/Conexionsw";
import { ObtenerDatos } from "../utilidades/UseSession";
import TablaHistorialTutorias from "./TablaHistorialTutorias";
import TablaRegistroTutorias from "./TablaRegistroTutorias";
import { Link, Navigate } from "react-router-dom";
import { AiFillFilePdf } from "react-icons/ai";
import '../css/TutoriaRegistros.css';

const RegistroTutorias = () => {
    const [listaMaterias, setMaterias] = useState([]);
    const [numRegistro, setNumRegistro] = useState();
    const [registroSelec, setRegistro] = useState(undefined);
    const [listaTutorias, setTutorias] = useState([]);

    function cambiarMateria(id) {
        setNumRegistro(id)
    }
    function navegacion() {
        return (
            <Navigate to='ReportePDF' />
        )
    }

    useEffect(() => {
        const getMaterias = async () => {
            const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"));
            const materias = await Materias_Docente(cuenta.data.persona.docente.externalId);
            setMaterias(materias.data);
            if (!numRegistro) {
                setNumRegistro(materias.data[0] ? materias.data[0].id : undefined);
            }
            const auxMateria = materias.data.filter(materia => materia.id === numRegistro);
            const tutoriasAux = await obtenerTutorias(cuenta.data.rol, cuenta.data.persona.docente.externalId);
            if (tutoriasAux && numRegistro) {
                setTutorias(tutoriasAux.data.filter(tutoria => tutoria.estado === "Realizada" && tutoria.materia.externalId === auxMateria[0].externalId));
            }
        }

        getMaterias()
    }, [numRegistro])

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="btn-group container" style={{ margin: "20px", flexDirection: 'column', height: '100vh', width: '15%' }}>
                <label className='ttl-tabla'>Asignaturas</label>
                {listaMaterias && listaMaterias.map((materia) => (
                    <div className="btn-group">
                        <button className="btn-asignaturas" style={{width: '75%' }} onClick={() => cambiarMateria(materia.id)} key={materia.id}>
                            {materia.nombre}
                        </button>
                        <button className="btn-asignaturas" style={{width: '25%' }}>
                            <Link style={{color:'white'}} to={"/reporte/materia/" + materia.externalId} target="_blank" onClick={() => { <Navigate to='/reporte/materia/"+materia.externalId' /> }}><AiFillFilePdf /></Link>
                        </button>
                    </div>
                ))}
            </div>
            <div className="container" style={{ margin: "20px", width: '100%' }}>
                <TablaRegistroTutorias listTutorias={listaTutorias}></TablaRegistroTutorias>
                <Link className='btn' style={{ backgroundColor: '#052342', color: 'white', fontFamily: 'sans-serif', fontWeight: 'bold', borderColor: '#052342' }} to={"/reporte/pdf"} target="_blank" onClick={navegacion}>Generar reporte consolidado</Link>
            </div>
        </div>
    )
}
export default RegistroTutorias;