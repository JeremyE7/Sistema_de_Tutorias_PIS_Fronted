import { PDFViewer, Text, View, Document, Page, Image } from '@react-pdf/renderer';
import React, { Fragment, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Materias_Docente, obtenerCuenta, obtenerTutorias } from '../hooks/Conexionsw';
import { ObtenerDatos } from '../utilidades/UseSession';
import logoUNL from "../img/logoPDF.png"
import '../css/ReportePDF.css'

const ReportePDFView = () => {
    const [numFilasTabla, setNumFilasTabla] = useState(17);
    const [docente, setDocente] = useState(undefined);
    const [tutorias, setTutorias] = useState([]);
    const [materias, setMaterias] = useState(undefined);
    const [contador, setContador] = useState(1);
    const [totalHoras, setTotal] = useState(0);

    useEffect(() => {
        const getMaterias = async () => {
            const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"));
            setDocente(cuenta.data.persona);
            const materias = await Materias_Docente(cuenta.data.persona.docente.externalId);
            setMaterias(materias.data);
            const tutoriasAux = await obtenerTutorias(cuenta.data.rol, cuenta.data.persona.docente.externalId);
            setTutorias(tutoriasAux.data);
            tutoriasAux.data.forEach((element => {
                const aux = totalHoras;
                const horas = aux + (new Date(element.fechaFinalizacion)).getHours() - (new Date(element.fechaInicio)).getHours();
                setTotal(horas);
            }))
        }

        getMaterias()
    }, [])

    const filasVacias = Array(numFilasTabla).fill(0)
    return (
        <div>
            <PDFViewer style={{ width: window.innerWidth, height: '100vh' }}>
                <Document>
                    <Page className='pagina-reporte' size="A4" orientation='landscape'>
                        <div className='container' style={{ margin: '50px', display: 'flex', flexDirection:'row'}}>
                            <View style={{flexDirection:'column'}}>
                                <Text className='texto-titulo' st>UNIVERSIDAD NACIONAL DE LOJA</Text>
                            </View>
                        </div>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ReportePDFView;
