import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import fontCentury from "../fonts/CenturyGothic.ttf"
import centuryBold from "../fonts/GothicB0.tff"
import { useEffect, useState } from "react";
import { Materias_Docente, obtenerCuenta, obtenerRegistroTutoria } from "../hooks/Conexionsw";
import { ObtenerDatos } from "../utilidades/UseSession";

const ConsolidadoTablaPDF = () => {
    const [registro, setRegistro] = useState();
    const [materias, setMaterias] = useState();
    const [docente, setDocente] = useState();

    Font.register({
        family: 'CenturyGothic', fonts: [
            { src: fontCentury, fontWeight: 'normal' }, { src: centuryBold, fontWeight: 'bold' }
        ]
    })

    useEffect(() => {
        const getRegistro = async () => {
            const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"));
            setDocente(cuenta.data.persona);
            const registro = await obtenerRegistroTutoria(cuenta.data.persona.docente.externalId);
            setRegistro(registro);
            const materias = await Materias_Docente(cuenta.data.persona.docente.externalId);
            setMaterias(materias);
            console.log(registro)
        }

        getRegistro();
        console.log("Ya sale", materias);
    }, [])

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

    return (
        <>
            <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: '5%' }]}>
                    <Text style={styles.tableCabecera}>Nro.</Text>
                </View>
                <View style={[styles.tableCol, { width: '28.3%' }]}>
                    <Text style={styles.tableCabecera}>Nombres y apellidos del docente</Text>
                </View>
                <View style={[styles.tableCol, { width: '6.6%' }]}>
                    <Text style={styles.tableCabecera}>Ciclo</Text>
                </View>
                <View style={[styles.tableCol, { width: '10.7%' }]}>
                    <Text style={styles.tableCabecera}>Paralelo</Text>
                </View>
                <View style={[styles.tableCol, { width: '16.6%' }]}>
                    <Text style={styles.tableCabecera}>Asignatura</Text>
                </View>
                <View style={[styles.tableCol, { width: '32.8%' }]}>
                    <Text style={[styles.tableCabecera]}>Tutorías académicas</Text>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33%', borderTopWidth: 1, borderBottom: 0 }]}>
                            <Text style={styles.tableCabecera}>Horas{"\n"}programadas por período</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33%', borderTopWidth: 1, borderBottom: 0 }]}>
                            <Text style={styles.tableCabecera}>Horas{"\n"}registradas</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '34%', borderTopWidth: 1, borderRightWidth: 0, borderBottom: 0 }]}>
                            <Text style={styles.tableCabecera}>Número de{"\n"}estudiantes</Text>
                        </View>
                    </View>
                </View>
            </View>
            {materias && registro && materias.data.map((materia, key) => {
                return <View key={key}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '5%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{key + 1}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '28.3%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{docente.nombre + " " + docente.apellido}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '6.6%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{
                                registro.map((reg) => {
                                    var ciclo = [];
                                    reg.tutorias.map((tuto) => {
                                        tuto.estudiantes.forEach(estudiante => {
                                            if (materia.nombre === tuto.materia.nombre && !ciclo.includes(estudiante.ciclo)) {
                                                ciclo.push(estudiante.ciclo);
                                            }
                                        });

                                    })
                                    return (ciclo)
                                })
                            }</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '10.7%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{
                                registro.map((reg) => {
                                    var paralelos = [];
                                    reg.tutorias.map((tuto) => {
                                        tuto.estudiantes.forEach(estudiante => {
                                            if (materia.nombre === tuto.materia.nombre && !paralelos.includes(estudiante.paralelo)) {
                                                paralelos.push(estudiante.paralelo);
                                            }
                                        });

                                    })
                                    return (paralelos)
                                })
                            }</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '16.6%', backgroundColor: 'white' }]}>
                            <Text style={styles.tableCell}>{materia.nombre}</Text>
                        </View>
                        <View style={{ width: '32.8%', flexDirection: 'row' }}>
                            <View style={[styles.tableCol, { width: '33%', backgroundColor: 'white' }]}>
                                <Text style={styles.tableCell}> </Text>
                            </View>
                            <View style={[styles.tableCol, { width: '33%', backgroundColor: 'white' }]}>
                                <Text style={styles.tableCell}>{
                                    registro.map((reg) => {
                                        var horas = 0;
                                        reg.tutorias.forEach(tutoria => {
                                            if (materia.nombre === tutoria.materia.nombre && tutoria.estado === "Realizada")
                                                horas += (new Date(tutoria.fechaFinalizacion)).getHours() - (new Date(tutoria.fechaInicio)).getHours()
                                        });
                                        return (horas + " H")
                                    })
                                }</Text>
                            </View>
                            <View style={[styles.tableCol, { width: '34%', backgroundColor: 'white' }]}>
                                <Text style={styles.tableCell}>{
                                    registro.map((reg) => {
                                        var numEstudiantes = 0;
                                        reg.tutorias.forEach(tutoria => {
                                            if (materia.nombre === tutoria.materia.nombre && tutoria.estado === "Realizada")
                                                numEstudiantes += tutoria.estudiantes.length
                                        });
                                        return (numEstudiantes)
                                    })
                                }</Text>
                            </View>
                        </View>
                    </View>
                </View>
            })}
            <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: '67.2%', backgroundColor: 'white' }]}>
                    <Text style={[styles.tableCell, { fontWeight: 'bold', textAlign: 'center' }]}>TOTALES</Text>
                </View>
                <View style={{ width: '32.8%', flexDirection: 'row' }}>
                    <View style={[styles.tableCol, { width: '33%', backgroundColor: 'white' }]}>
                        <Text style={styles.tableCell}> </Text>
                    </View>
                    <View style={[styles.tableCol, { width: '33%', backgroundColor: 'white' }]}>
                        <Text style={styles.tableCell}>{
                            registro && registro.map((reg)=>{
                                var horas = 0;
                                reg.tutorias.forEach(tutoria => {
                                    if (tutoria.estado === "Realizada")
                                        horas += (new Date(tutoria.fechaFinalizacion)).getHours() - (new Date(tutoria.fechaInicio)).getHours()
                                });
                                return (horas + " H")
                            })
                        }</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '34%', backgroundColor: 'white' }]}>
                        <Text style={styles.tableCell}>{
                            registro && registro.map((reg)=>{
                                var estudiantes = 0;
                                reg.tutorias.forEach(tutoria => {
                                    if (tutoria.estado === "Realizada")
                                        estudiantes += tutoria.estudiantes.length
                                });
                                return (estudiantes)
                            })
                        }</Text>
                    </View>
                </View>
            </View>

        </>
    )
}

export default ConsolidadoTablaPDF;