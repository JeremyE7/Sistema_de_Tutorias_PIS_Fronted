import { PDFViewer, Text, View, Document, Page, Image, StyleSheet, Font } from '@react-pdf/renderer';
import React, { Fragment, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Materias_Docente, obtenerCuenta, obtenerTutorias } from '../hooks/Conexionsw';
import { ObtenerDatos } from '../utilidades/UseSession';
import logoUNL from "../img/logoPDF.png"
import fontCentury from "../fonts/CenturyGothic.ttf"
import centuryBold from "../fonts/GothicB0.tff"

const ReportePDFView = () => {
    const [numFilasTabla, setNumFilasTabla] = useState(17);
    const [docente, setDocente] = useState(undefined);
    const [tutorias, setTutorias] = useState([]);
    const [materias, setMaterias] = useState(undefined);
    const [contador, setContador] = useState(1);
    const [totalHoras, setTotal] = useState(0);

    Font.register({
        family: 'CenturyGothic', fonts: [
            { src: fontCentury, fontWeight: 'normal' }, { src: centuryBold, fontWeight: 'bold' }
        ]
    })

    const styles = StyleSheet.create({
        titulo: { textAlign: 'center', fontFamily: 'CenturyGothic', fontSize: 12, fontWeight: 'bold' },
        etiqueta: { textAlign: 'left', fontFamily: 'CenturyGothic', fontSize: 11, fontWeight: 'bold' }
    });

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
                    <Page size="A4" orientation='landscape'>
                        <View style={{ margin: '50px', display: 'flex', flexDirection: 'column' }}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={logoUNL} style={{width:'75%', flex:1}}></Image>
                                <View style={{flexDirection:'column', flex:2}}>
                                    <Text style={styles.titulo}>UNIVERSIDAD NACIONAL DE LOJA</Text>
                                    <Text style={styles.titulo}>COMISIÓN DE ARTICULACIÓN DE LAS FUNCIONES SUSTANTIVAS</Text>
                                    <Text style={styles.titulo}>FORMATO PARA EL INFORME CONSOLIDADO DE TUTORÍAS ACADÉMICAS DE LA CARRERA</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: '10px' }}>
                                <Text style={styles.etiqueta}>Carrera:</Text>
                                <Text style={styles.etiqueta}>Período académico ordinario (PAO):</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ReportePDFView;
