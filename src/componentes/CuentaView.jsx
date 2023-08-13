import React, { useEffect, useState } from 'react';
import { editarCuenta, guardarFirma, obtenerCuenta } from '../hooks/Conexionsw';
import { Guardar, ObtenerDatos } from '../utilidades/UseSession';
import isValidCI from '../utilidades/validadorDeCedulas';
import { mensajeError, mensajeOk } from '../utilidades/Mensajes';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../css/CuentaView.css'
import { encriptando } from '../utilidades/encryp';

const CuentaView = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tipoCuenta, setTipoCuenta] = useState('Docente');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [cuenta, setCuenta] = useState(null);
    const [editar, setEditar] = useState(false);

    const navegacion = useNavigate();

    const obtenerCuentaActual = async () => {
        const cuenta = await obtenerCuenta(ObtenerDatos("ExternalCuenta"))
        console.log(cuenta);
        setCuenta(cuenta.data)
        setPreviewUrl(cuenta.data.persona.firma)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log("===========", selectedFile);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (campos) => {
        console.log("Awdawdawd");
        console.log(campos);
        const cuentaAux = {
            correo: campos.correo,
            persona: {
                nombre: campos.nombre,
                apellido: campos.apellido,
                identificacion: campos.identificacion,
                telefono: campos.telefono,
                direccion: campos.direccion,
            },
        }

        if (tipoCuenta === 'Docente') {
            cuentaAux.persona.docente = { titulo: campos.titulo }
        } else if (tipoCuenta === 'Estudiante') {
            cuentaAux.persona.estudiante = {
                carrera: campos.carrera,
                ciclo: campos.ciclo,
                paralelo: campos.paralelo
            }
        }

        const cuentaEditada = await editarCuenta(cuenta.persona.externalId, cuentaAux);
        console.log(cuentaEditada);
        if (cuentaEditada.data) {

            console.log(campos.firma[0]);
            if (campos.firma[0]) {
                const cuentaFirmada = await guardarFirma(cuentaEditada.data.persona.externalId, campos.firma[0]);
                console.log(cuentaFirmada);
                if (!cuentaFirmada) {
                    mensajeError("No se pudo editar la cuenta, intente nuevamente")
                    return;
                }
            }

            mensajeOk("Cuenta editada con exito").then(() => {
                obtenerCuentaActual(); 
                setEditar(false)
                const data = [cuentaEditada.data.persona.nombre,cuentaEditada.data.persona.apellido]
                const encriptado = encriptando(data);
                Guardar('Nombre',encriptado);
            })
        } else {
            if (cuentaEditada.error === 'Identificacion ya registrada') {
                mensajeError("La identificacion ya se encuentra registrada")
            }
            else if (cuentaEditada.error === 'Correo ya registrado') {
                mensajeError("El correo ya se encuentra registrado")
            }
        }


        console.log(cuenta);
    };


    useEffect(() => {
        obtenerCuentaActual();
    }, [])

    return (
        <>
            {cuenta && <div className="background-registro">
                <main className="main-registro">
                    <h3>Cuenta</h3>
                    <button onClick={() => setEditar(!editar)}>Editar</button>
                    <form action='submit' onSubmit={handleSubmit(onSubmit)} >
                        <div className='contenedor-datos-personales'>
                            <h4>Datos Personales</h4>
                            <section className={'datos-personales ' + (editar ? '' : 'disabled-div')} >
                                <label htmlFor="" className="test">
                                    Nombre: <br />
                                    <input type="text" id='nombre' {...register('nombre', { required: true })} defaultValue={cuenta.persona.nombre} />
                                    {errors.nombre && <div className="error">El campo es requerido</div>}

                                </label>
                                <label htmlFor="" className="test">
                                    Apellido: <br />
                                    <input type="text" id='apellido'{...register('apellido', { required: true })} defaultValue={cuenta.persona.apellido} />
                                    {errors.apellido && <div className="error">El campo es requerido</div>}

                                </label>
                            </section>
                            <section className={'datos-personales ' + (editar ? '' : 'disabled-div')}>
                                <label htmlFor="" className="test">
                                    Identificación: <br />
                                    <input type="number" id='identificacion'{...register('identificacion', {
                                        required: true,
                                        validate: (value) => {
                                            const isValid = isValidCI(value);
                                            if (!isValid) {
                                                return 'La cédula no es válida';
                                            }
                                            return true;
                                        },
                                    })} defaultValue={cuenta.persona.identificacion}
                                    />
                                    {errors.identificacion?.type === 'required' && (
                                        <div className="error">El campo es requerido</div>
                                    )}
                                    {errors.identificacion?.type === 'validate' && (
                                        <div className="error">{errors.identificacion.message}</div>
                                    )}

                                </label>
                                <label htmlFor="" className="test">
                                    Correo Electronico: <br />
                                    <input type="text" id='correo'{...register('correo', { required: true, pattern: /\S+@\S+\.\S+/ })} defaultValue={cuenta.correo} />
                                    {errors.correo && errors.correo.type === 'required' && <div className='error' role='alert'>Se requiere su correo</div>}
                                    {errors.correo && errors.correo.type === 'pattern' && <div className='error' role='alert'>Ingrese un correo valido</div>}
                                </label>
                            </section>

                            <section className={'datos-personales ' + (editar ? '' : 'disabled-div')}>
                                <label htmlFor="" className="test">
                                    Telefono: <br />
                                    <input type="number" id='telefono'{...register('telefono', { required: true })} defaultValue={cuenta.persona.telefono} />
                                    {errors.clave && <div className="error">El campo es requerido</div>}
                                </label>
                                <label htmlFor="" className="test">
                                    Dirección: <br />
                                    <input type="text" id='direccion'{...register('direccion', { required: true })} defaultValue={cuenta.persona.direccion} />
                                    {errors.direccion && <div className="error">El campo es requerido</div>}
                                </label>
                            </section>
                        </div>

                        <div className='contenedor-tipo-cuenta'>
                            <h4>Tipo de Cuenta</h4>
                            <section className={'tipo-cuenta ' + (editar ? '' : 'disabled-div')}>
                                <label htmlFor="" className="test">
                                    <label htmlFor=""> {cuenta.rol.nombre}</label>
                                </label>
                            </section>
                            <section className={'tipo-cuenta ' + (editar ? '' : 'disabled-div')}>
                                {tipoCuenta && cuenta.persona.docente ? (
                                    <div className='datos-docente'>
                                        <label htmlFor="" className="test">
                                            Titulo: <br />
                                            <input type="text" id='titulo'{...register('titulo', { required: true })} defaultValue={cuenta.persona.docente.titulo} />
                                            {errors.titulo && <div className="error">El campo es requerido</div>}
                                        </label>
                                    </div>) : cuenta.persona.estudiante ? (
                                        <div className='datos-estudiante'>
                                            <label htmlFor="" className="test">
                                                Carrera: <br />
                                                <input type="text" id='carrera'{...register('carrera', { required: true })} defaultValue={cuenta.persona.estudiante.carrera} />
                                                {errors.carrera && <div className="error">El campo es requerido</div>}
                                            </label>
                                            <label htmlFor="">
                                                Ciclo: <br />
                                                <input type="text" id='ciclo'{...register('ciclo', { required: true })} defaultValue={cuenta.persona.estudiante.ciclo} />
                                                {errors.ciclo && <div className="error">El campo es requerido</div>}
                                            </label>
                                            <label htmlFor="">
                                                Paralelo: <br />
                                                <input type="text" id='paralelo'{...register('paralelo', { required: true })} defaultValue={cuenta.persona.estudiante.paralelo} />
                                                {errors.paralelo && <div className="error">El campo es requerido</div>}
                                            </label>
                                        </div>
                                    ) : null}
                            </section>
                            <section className={'tipo-cuenta ' + (editar ? '' : 'disabled-div')}>
                                <label htmlFor="firma">Firma:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="firma"
                                    onInput={handleFileChange}
                                    {...register('firma')}
                                />
                                {previewUrl && (
                                    <img src={previewUrl} alt="Vista previa de la imagen de firma" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                )}
                            </section>
                        </div>
                        <div className='contenedor-botones' hidden={editar ? false : true} >
                            <button type="submit" className='btn btn-success'>Editar Cuenta</button>
                        </div>

                    </form>
                </main>
            </div>}
        </>
    );
};

export default CuentaView;