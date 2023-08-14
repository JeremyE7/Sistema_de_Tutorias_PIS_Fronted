import { PDFViewer, Text, View, Document, Page, Image, StyleSheet, Font } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { Materias_Docente, obtenerCuenta, obtenerRegistroTutoria, obtenerTutorias } from '../hooks/Conexionsw';
import { ObtenerDatos } from '../utilidades/UseSession';
import logoUNL from "../img/logoPDF.png"
import fontCentury from "../fonts/CenturyGothic.ttf"
import centuryBold from "../fonts/GothicB0.tff"
import ConsolidadoTablaPDF from './ConsolidadoTablaPDF';
import { useParams } from 'react-router-dom';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import PDFTablaMateria from './PDFTablaMateria';

const PDFReporteMateria = () => {
    const [registro, setRegistro] = useState();
    const [docente, setDocente] = useState();
    const [materia, setMateria] = useState();
    const { external } = useParams();

    Font.register({
        family: 'CenturyGothic', fonts: [
            { src: fontCentury, fontWeight: 'normal' }, { src: centuryBold, fontWeight: 'bold' }
        ]
    })

    const styles = StyleSheet.create({
        titulo: { textAlign: 'center', fontFamily: 'CenturyGothic', fontSize: 12, fontWeight: 'bold' },
        etiqueta: { textAlign: 'left', fontFamily: 'CenturyGothic', fontSize: 11, fontWeight: 'bold', width: '25%' },
        campo: { textAlign: 'left', fontFamily: 'CenturyGothic', fontSize: 11 },
        table: {
            display: "table",
            width: 'auto',
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            marginTop: '10px'
        },
        tableRow: {
            margin: "auto",
            flexDirection: "row"
        },
        tableCol: {
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            fontFamily: 'CenturyGothic'
        },
        tableCabecera: {
            margin: 'auto',
            marginTop: 5,
            fontSize: 10,
            fontFamily: 'CenturyGothic'
        },
        tableCell: {
            margin: 5,
            fontSize: 10,
            fontFamily: 'CenturyGothic'
        }
    });

    useEffect(() => {
        const getRegistro = async () => {
            const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"));
            setDocente(cuenta.data.persona);
            const registro = await obtenerRegistroTutoria(cuenta.data.persona.docente.externalId);
            const materia = await Materias_Docente(cuenta.data.persona.docente.externalId);
            setMateria(materia.data.find(mat => mat.externalId === external));
            setRegistro(registro)
        }

        getRegistro();
    }, [])

    if (materia && docente && registro) return (
        <div>
            <PDFViewer style={{ width: window.innerWidth, height: '100vh' }}>
                <Document>
                    <Page size="A4" orientation='landscape'>
                        <View style={{ margin: '25px 50px 25px 50px', display: 'flex', flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={logoUNL} style={{ width: '25%' }}></Image>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={styles.titulo}>UNIVERSIDAD NACIONAL DE LOJA</Text>
                                    <Text style={styles.titulo}>COMISIÓN DE ARTICULACIÓN DE LAS FUNCIONES SUSTANTIVAS</Text>
                                    <Text style={styles.titulo}>FORMATO PARA EL REGISTRO DE LAS ACTIVIDADES DE TUTORÍA ACADÉMICA</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: '10px' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.etiqueta}>Carrera: </Text>
                                    <Text style={styles.campo}>{registro[0].tutorias[0].estudiantes[0].carrera}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.etiqueta}>Asignatura: </Text>
                                    <Text style={styles.campo}>{materia.nombre}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.etiqueta}>Nombres y apellidos del docente: </Text>
                                    <Text style={styles.campo}>{docente.nombre + " " + docente.apellido}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.etiqueta}>Ciclo: </Text>
                                    <Text style={styles.campo}>{registro[0].tutorias.find(tutoria => tutoria.materia.externalId === external).estudiantes[0].ciclo}</Text>
                                    <Text style={[styles.etiqueta, { marginLeft: '15%', width:'10%'}]}>Paralelo: </Text>
                                    <Text style={[styles.campo]}>
                                        {registro[0].tutorias.find(tutoria => tutoria.materia.externalId === external).estudiantes[0].paralelo}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.etiqueta}>Período académico ordinario: </Text>
                                    {registro && <Text style={styles.campo}>{registro[0].periodoAcademico}</Text>}
                                </View>
                            </View>
                            <View style={styles.table}>
                                <PDFTablaMateria externalMateria={external}></PDFTablaMateria>
                            </View>
                            <View style={{ marginTop: '10px' }}>
                                <Text style={styles.campo}>{"Fecha de presentación: " + (new Date().toLocaleDateString('en-GB'))}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: '50px' }}>
                                <Text style={[styles.campo, { borderTopWidth: 1, marginRight: '50px', width: "50%", textAlign: 'center' }]}>Firma del docente </Text>
                                <Text style={[styles.campo, { borderTopWidth: 1, width: "50%", textAlign: 'center' }]}>Firma del Director/a y/o Encargado de la Gestión Académica de la Carrera</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default PDFReporteMateria;
