import { PDFViewer, Text, View, Document, Page, Image } from '@react-pdf/renderer';
import React, { Fragment, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Materias_Docente, obtenerCuenta, obtenerTutorias } from '../hooks/Conexionsw';
import { ObtenerDatos } from '../utilidades/UseSession';
import logoUNL from "../img/logoPDF.png"

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
            tutoriasAux.data.forEach((element=>{
                const aux = totalHoras;
                const horas = aux + (new Date(element.fechaFinalizacion)).getHours()-(new Date(element.fechaInicio)).getHours();
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
                    <Page size="A4" style={{
                        fontFamily: 'Helvetica-Oblique', fontSize: 11, lineHeight: 1.5,
                        flexDirection: 'column',
                        display: 'flex'
                    }}>
                        <View style={{ marginTop: 20, marginHorizontal: 20, padding: 20, fontWeight: 'bold' }}>
                            <Image style={{ textAlign: 'center', width: '200px' }} src={logoUNL} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'center' }}>UNIVERIDAD NACIONAL DE LOJA</Text>
                                <Text style={{ textAlign: 'center' }}>COMISIÓN DE ARTICULACIÓN DE LAS FUNCIONES SUSTANTIVAS</Text>
                                <Text style={{ textAlign: 'center' }}>FORMATO PARA EL INFORME CONSOLIDADO DE TUTORÍAS ACADÉMICAS DE LA CARRERA</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 0, margin: 0, padding: 20 }}>
                            <Text style={{ marginTop: '5px', textAlign: 'left' }}>Titulo: Informe de tutorias académicas</Text>
                            <Text style={{ marginTop: '5px', textAlign: 'left' }}>Fundamentación: Formatos institucionales</Text>
                            <View id='CabeceraTabla' style={{
                                flexDirection: 'row', borderBottomColor: '#000000', backgroundColor: '#000000',
                                borderBottomWidth: 1, height: 24, alignItems: 'center', flexGrow: 1, marginTop: "2%", color: 'white',
                            }}>
                                <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1 }}>Nro</Text>
                                <Text style={{ width: '30%', borderRightColor: '#000000', borderRightWidth: 1 }}>Docente</Text>
                                <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1 }}>Ciclo</Text>
                                <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1 }}>Paralelo</Text>
                                <Text style={{ width: '15%', borderRightColor: '#000000', borderRightWidth: 1 }}>Asignatura</Text>
                                <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1 }}>Horas</Text>
                                <Text style={{ width: '15%', borderRightColor: '#000000', borderRightWidth: 1 }}>Estudiantes</Text>
                            </View>
                            <Fragment>
                                {tutorias.length > 0 && tutorias.map((element, key) => {
                                    return <View key={key} id='CuerpoTabla' style={{
                                        flexDirection: 'row', borderBottomColor: '#000000',
                                        borderBottomWidth: 1, height: 24, alignItems: 'center', color: 'black'
                                    }}>
                                        <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1, paddingLeft: 8 }}>{key + 1}</Text>
                                        <Text style={{ width: '30%', borderRightColor: '#000000', borderRightWidth: 1, paddingLeft: 8 }}>{docente.nombre + " " + docente.apellido}</Text>
                                        <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1 }}>{element.estudiantes[0].ciclo}</Text>
                                        <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1 }}>{element.estudiantes[0].paralelo}</Text>
                                        <Text style={{ width: '15%', borderRightColor: '#000000', borderRightWidth: 1 }}>{element.materia.nombre}</Text>
                                        <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1 }}>{(new Date(element.fechaFinalizacion)).getHours()-(new Date(element.fechaInicio)).getHours()+" Horas"}</Text>
                                        <Text style={{ width: '15%', borderRightColor: '#000000', borderRightWidth: 1 }}>{element.estudiantes.length}</Text>
                                    </View>
                                })}
                            </Fragment>
                            <View id='footer'>
                                <View style={{
                                    flexDirection: 'row', borderBottomColor: '#000000',
                                    borderBottomWidth: 1, height: 24, alignItems: 'center'
                                }}>
                                    <Text style={{ width: '75%', textAlign:'right',borderRightColor: '#000000', borderRightWidth: 1,paddingRight:8}}>TOTAL</Text>
                                    <Text style={{ width: '10%', borderRightColor: '#000000', borderRightWidth: 1}}>{totalHoras+" Horas"}</Text>
                                    <Text style={{ width: '15%', borderRightColor: '#000000', borderRightWidth: 1}}>{tutorias.length}</Text>
                                </View>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ReportePDFView;
