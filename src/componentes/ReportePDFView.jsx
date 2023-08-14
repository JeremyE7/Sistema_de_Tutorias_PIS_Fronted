import { PDFViewer, Text, View, Document, Page, Image, StyleSheet, Font } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { Materias_Docente, obtenerCuenta, obtenerRegistroTutoria, obtenerTutorias } from '../hooks/Conexionsw';
import { ObtenerDatos } from '../utilidades/UseSession';
import logoUNL from "../img/logoPDF.png"
import fontCentury from "../fonts/CenturyGothic.ttf"
import centuryBold from "../fonts/GothicB0.tff"
import ConsolidadoTablaPDF from './ConsolidadoTablaPDF';

const ReportePDFView = () => {
    const [registro, setRegistro] = useState();

    Font.register({
        family: 'CenturyGothic', fonts: [
            { src: fontCentury, fontWeight: 'normal' }, { src: centuryBold, fontWeight: 'bold' }
        ]
    })

    const styles = StyleSheet.create({
        titulo: { textAlign: 'center', fontFamily: 'CenturyGothic', fontSize: 12, fontWeight: 'bold' },
        etiqueta: { textAlign: 'left', fontFamily: 'CenturyGothic', fontSize: 11, fontWeight: 'bold' },
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
            const registro = await obtenerRegistroTutoria(cuenta.data.persona.docente.externalId);
            setRegistro(registro)
        }

        getRegistro();
    }, [])

    return (
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
                                    <Text style={styles.titulo}>FORMATO PARA EL INFORME CONSOLIDADO DE TUTORÍAS ACADÉMICAS DE LA CARRERA</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: '10px' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.etiqueta}>Carrera: </Text>
                                    {registro && <Text style={styles.campo}>{registro[0].tutorias[0].estudiantes[0].carrera}</Text>}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.etiqueta}>Período académico ordinario (PAO): </Text>
                                    {registro && <Text style={styles.campo}>{registro[0].periodoAcademico}</Text>}
                                </View>
                            </View>
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableCol, { width: '25%' }]}>
                                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>1. Título:</Text>
                                    </View>
                                    <View style={[styles.tableCol, { width: '75%' }]}>
                                        <Text style={styles.tableCell}>Informe de tutorias académicas</Text>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableCol, { width: '25%' }]}>
                                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>1. Fundamentación:</Text>
                                    </View>
                                    <View style={[styles.tableCol, { width: '75%' }]}>
                                        <Text style={styles.tableCell}>Formatos Institucionales </Text>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableCol, { width: '100%' }]}>
                                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>3. Resultados:</Text>
                                    </View>
                                </View>
                                <ConsolidadoTablaPDF listaTutorias={undefined}></ConsolidadoTablaPDF>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableCol, { width: '25%' }]}>
                                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>4. Conclusiones:</Text>
                                    </View>
                                    <View style={[styles.tableCol, { width: '75%' }]}>
                                        <Text style={styles.tableCell}>Se abordó las tutorías con todos los estudiantes para resolver las inquietudes generadas en clases y de los trabajos autónomos</Text>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableCol, { width: '25%' }]}>
                                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>5. Recomendaciones:</Text>
                                    </View>
                                    <View style={[styles.tableCol, { width: '75%' }]}>
                                        <Text style={styles.tableCell}>Ninguna</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: '10px' }}>
                                <Text style={styles.campo}>{"Fecha de presentación: " + (new Date().toLocaleDateString('en-GB'))}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop:'50px'}}>
                                <Text style={[styles.campo,{borderTopWidth:1, marginRight:'100px',width:"50%", textAlign:'center'}]}>Firma Director y/o Gestor de Carrera</Text>
                                <Text style={[styles.campo,{borderTopWidth:1, width:"50%", textAlign:'center'}]}>Firma Decano/a de la Facultad</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ReportePDFView;
