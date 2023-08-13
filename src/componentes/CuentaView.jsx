import React, { useEffect, useState } from 'react';
import { editarCuenta, guardarFirma, obtenerCuenta } from '../hooks/Conexionsw';
import { Guardar, ObtenerDatos } from '../utilidades/UseSession';
import isValidCI from '../utilidades/validadorDeCedulas';
import { mensajeError, mensajeOk } from '../utilidades/Mensajes';
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
                const data = [cuentaEditada.data.persona.nombre, cuentaEditada.data.persona.apellido]
                const encriptado = encriptando(data);
                Guardar('Nombre', encriptado);
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
            {cuenta ? <div className="background-registro">
                <main className="main-registro">
                    <h3 className='shadow'>Cuenta</h3>
                    <button onClick={() => setEditar(!editar)} className={'boton-editar btn btn-' + (editar ? 'dark' : 'danger')}>{editar ? "Cancelar edición" : "Editar"}</button>
                    <form action='submit shadow' onSubmit={handleSubmit(onSubmit)} >
                        <div className='contenedor-datos-personales shadow'>
                            <h4 className='shadow'>Datos Personales</h4>
                            <section className={'datos-personales ' + (editar ? '' : 'disabled-div')} >
                                <label htmlFor="" className="">
                                    Nombre: <br />
                                    <input type="text" id='nombre' className='form-control' {...register('nombre', { required: true })} defaultValue={cuenta.persona.nombre} />
                                    {errors.nombre && <small className="form-text text-danger">El campo es requerido</small>}

                                </label>
                                <label htmlFor="" className="">
                                    Apellido: <br />
                                    <input type="text" id='apellido' className='form-control'{...register('apellido', { required: true })} defaultValue={cuenta.persona.apellido} />
                                    {errors.apellido && <small className="form-text text-danger">El campo es requerido</small>}

                                </label>
                            </section>
                            <section className={'datos-personales ' + (editar ? '' : 'disabled-div')}>
                                <label htmlFor="" className="">
                                    Identificación: <br />
                                    <input type="number" id='identificacion'className='form-control'{...register('identificacion', {
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
                                        <small className="form-text text-danger">El campo es requerido</small>
                                    )}
                                    {errors.identificacion?.type === 'validate' && (
                                        <small className="form-text text-danger">{errors.identificacion.message}</small>
                                    )}

                                </label>
                                <label htmlFor="" className="">
                                    Correo Electronico: <br />
                                    <input type="text" id='correo' className='form-control'{...register('correo', { required: true, pattern: /\S+@\S+\.\S+/ })} defaultValue={cuenta.correo} />
                                    {errors.correo && errors.correo.type === 'required' && <small className="form-text text-danger">El campo es requerido</small>}
                                    {errors.correo && errors.correo.type === 'pattern' && <small className="form-text text-danger">Ingrese un correo valido</small>}
                                </label>
                            </section>

                            <section className={'datos-personales ' + (editar ? '' : 'disabled-div')}>
                                <label htmlFor="" className="">
                                    Telefono: <br />
                                    <input type="number" id='telefono' className='form-control'{...register('telefono', { required: true })} defaultValue={cuenta.persona.telefono} />
                                    {errors.clave && <small className="form-text text-danger">El campo es requerido</small>}
                                </label>
                                <label htmlFor="" className="">
                                    Dirección: <br />
                                    <input type="text" id='direccion' className='form-control' {...register('direccion', { required: true })} defaultValue={cuenta.persona.direccion} />
                                    {errors.direccion && <small className="form-text text-danger">El campo es requerido</small>}
                                </label>
                            </section>
                        </div>

                        <div className='contenedor-tipo-cuenta shadow'>
                            <h4 className='shadow'>Tipo de Cuenta</h4>
                            <div className='contenedor-tipo-cuenta-subcontenedor'>
                                <section className='tipo-cuenta-info'>
                                    <section className={'tipo-cuenta ' + (editar ? '' : 'disabled-div')}>
                                        <label htmlFor="" className="">
                                            <label htmlFor=""> {cuenta.rol.nombre}</label>
                                        </label>
                                    </section>
                                    <section className={'tipo-cuenta ' + (editar ? '' : 'disabled-div')}>
                                        {tipoCuenta && cuenta.persona.docente ? (
                                            <div className='datos-docente'>
                                                <label htmlFor="" className="">
                                                    Titulo: <br />
                                                    <input type="text" id='titulo' className='form-control'{...register('titulo', { required: true })} defaultValue={cuenta.persona.docente.titulo} />
                                                    {errors.titulo && <small className="form-text text-danger">El campo es requerido</small>}
                                                </label>
                                            </div>) : cuenta.persona.estudiante ? (
                                                <div className='datos-estudiante'>
                                                    <label htmlFor="" className="">
                                                        Carrera: <br />
                                                        <input type="text" id='carrera' className='form-control'{...register('carrera', { required: true })} defaultValue={cuenta.persona.estudiante.carrera} />
                                                        {errors.carrera && <small className="form-text text-danger">El campo es requerido</small>}
                                                    </label>
                                                    <label htmlFor="">
                                                        Ciclo: <br />
                                                        <input type="text" id='ciclo' className='form-control' {...register('ciclo', { required: true })} defaultValue={cuenta.persona.estudiante.ciclo} />
                                                        {errors.ciclo && <small className="form-text text-danger">El campo es requerido</small>}
                                                    </label>
                                                    <label htmlFor="">
                                                        Paralelo: <br />
                                                        <input type="text" id='paralelo' className='form-control' {...register('paralelo', { required: true })} defaultValue={cuenta.persona.estudiante.paralelo} />
                                                        {errors.paralelo && <small className="form-text text-danger">El campo es requerido</small>}
                                                    </label>
                                                </div>
                                            ) : null}
                                    </section>
                                </section>
                                <section className={'tipo-cuenta-info ' + (editar ? '' : 'disabled-div')}>
                                    <label htmlFor="firma">Firma:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="firma"
                                        onInput={handleFileChange}
                                        {...register('firma')}
                                        className='form-field'
                                    />
                                    {previewUrl && (
                                        <img src={previewUrl} alt="Vista previa de la imagen de firma" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                    )}
                                </section>
                            </div>
                        </div>
                        <div className='contenedor-botones' hidden={editar ? false : true} >
                            <button type="submit" className='btn btn-success'>Editar Cuenta</button>
                        </div>

                    </form>
                </main>
            </div> : (
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            )}
        </>
    );
};

export default CuentaView;