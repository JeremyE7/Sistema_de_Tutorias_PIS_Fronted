import React, { useState } from 'react'
import fontCentury from "../fonts/CenturyGothic.ttf"
import centuryBold from "../fonts/GothicB0.tff"
import { Font, Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import { useEffect } from 'react'
import { ObtenerDatos } from '../utilidades/UseSession'
import { Materias_Docente, obtenerCuenta, obtenerEstudiante, obtenerRegistroTutoria } from '../hooks/Conexionsw'

const PDFTablaMateria = ({ externalMateria }) => {
    const [tutorias, setTutorias] = useState();

    Font.register({
        family: 'CenturyGothic', fonts: [
            { src: fontCentury, fontWeight: 'normal' }, { src: centuryBold, fontWeight: 'bold' }
        ]
    })

    const styles = StyleSheet.create({
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
            backgroundColor: '#2e75b6',
            justifyContent: 'center'
        },
        tableCabecera: {
            margin: 'auto',
            margin: 5,
            fontSize: 10,
            fontFamily: 'CenturyGothic',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',

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
            console.log(registro);
            setTutorias(registro[0].tutorias.filter(tutoria => tutoria.estado === "Realizada" && tutoria.materia.externalId === externalMateria));
            console.log(tutorias);
        }

        getRegistro();
    }, []);

    return (
        <>
            <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: '5%' }]}>
                    <Text style={styles.tableCabecera}>Nro.</Text>
                </View>
                <View style={[styles.tableCol, { width: '10%' }]}>
                    <Text style={styles.tableCabecera}>Fecha</Text>
                </View>
                <View style={[styles.tableCol, { width: '15%' }]}>
                    <Text style={styles.tableCabecera}>Tiempo empleado en la tutoría</Text>
                </View>
                <View style={[styles.tableCol, { width: '12.5%' }]}>
                    <Text style={styles.tableCabecera}>Justificación de la tutoría</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                    <Text style={styles.tableCabecera}>Nombres y apellidos del o los estudiantes</Text>
                </View>
                <View style={[styles.tableCol, { width: '12.5%' }]}>
                    <Text style={styles.tableCabecera}>Tema tratado</Text>
                </View>
                <View style={[styles.tableCol, { width: '15%' }]}>
                    <Text style={styles.tableCabecera}>Modalidad</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.tableCol, { width: '60%', borderTopWidth: 1, borderBottom: 0 }]}>
                            <Text style={styles.tableCabecera}>Presencial</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '40%', borderTopWidth: 1, borderRightWidth: 0, borderBottom: 0 }]}>
                            <Text style={styles.tableCabecera}>{"\nVirtual \n"}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.tableCol, { width: '10%' }]}>
                    <Text style={styles.tableCabecera}>Firma del estudiante/  Registro Virtual</Text>
                </View>
            </View>
            {tutorias && tutorias.map((tutoria, key) => {
                return <View key={key}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '5%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{key + 1}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '10%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{(new Date(tutoria.fechaInicio).toLocaleDateString('en-GB'))}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{(new Date(tutoria.fechaFinalizacion)).getHours() - (new Date(tutoria.fechaInicio)).getHours() + " H"}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '12.5%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{tutoria.descripcion}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '20%', backgroundColor: 'white', flexDirection: 'column' }]}>
                            {tutoria.estudiantes.map((estudiante) => {
                                return <Text key={key} style={styles.tableCell}>
                                    {estudiante.persona.nombre + " " + estudiante.persona.apellido}
                                </Text>
                            })
                            }
                        </View>
                        <View style={[styles.tableCol, { width: '12.5%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{tutoria.nombreTutoria}</Text>
                        </View>
                        <View style={{ width: '15%', flexDirection: 'row' }}>
                            <View style={[styles.tableCol, { width: '60%', backgroundColor: 'white', textAlign: 'center' }]}>
                                <Text style={styles.tableCell}>{(tutoria.tipoReunionTutoria === "Presencial") ? "X" : ""}</Text>
                            </View>
                            <View style={[styles.tableCol, { width: '40%', backgroundColor: 'white', borderRightWidth: 1, textAlign: 'center' }]}>
                                <Text style={styles.tableCell}>{(tutoria.tipoReunionTutoria === "Virtual") ? "X" : ""}</Text>
                            </View>
                        </View>
                        <View style={[styles.tableCol, { width: '10%', backgroundColor: 'white' }]}>
                            <View style={styles.tableCell}>
                                {tutoria.estudiantes.map((estudiante) => {
                                    return (estudiante.persona.firma) ?<Image source={estudiante.persona.firma} key={key} style={[styles.tableCell, {width:'100%', }]}>
                                    </Image>:""
                                })
                                }</View>
                        </View>
                    </View>
                </View>
            })}
        </>
    )
}

export default PDFTablaMateria