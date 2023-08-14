import React, { useState } from 'react';
import '../css/CrearCuentaView.css';
import { useForm } from 'react-hook-form';
import { GuardarCuenta, crearRegistroTutoria, guardarFirma } from '../hooks/Conexionsw';
import { mensajeError, mensajeOk } from '../utilidades/Mensajes';
import { useNavigate } from "react-router-dom";
import isValidCI from '../utilidades/validadorDeCedulas';
import CargandoView from './CargandoView';


const CrearCuentaView = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [tipoCuenta, setTipoCuenta] = useState('Docente');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [creandoCuenta, setCreandoCuenta] = useState(false);

  const navegacion = useNavigate();

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
    setCreandoCuenta(true);
    console.log(campos);
    const cuenta = {
      nombre: campos.nombre,
      apellido: campos.apellido,
      identificacion: campos.identificacion,
      correo: campos.correo,
      clave: campos.clave,
      telefono: campos.telefono,
      direccion: campos.direccion,
    }

    if (tipoCuenta === 'Docente') {
      cuenta.docente = { titulo: campos.titulo }
      cuenta.rol = 1
    } else if (tipoCuenta === 'Estudiante') {
      cuenta.estudiante = {
        carrera: campos.carrera,
        ciclo: campos.ciclo,
        paralelo: campos.paralelo
      }
      cuenta.rol = 2
    }

    const cuentaCreada = await GuardarCuenta(cuenta);
    console.log(cuentaCreada);
    if (cuentaCreada.data) {
      if (tipoCuenta === 'Docente') {
        const registroTutoria = {
          periodoAcademico: '2023-2023',
          externalIdDocente: cuentaCreada.data.docente.externalId
        }
        const registroTutoriasCreado = await crearRegistroTutoria(registroTutoria)

        if (!registroTutoriasCreado){
          mensajeError("No se pudo crear la cuenta, registro de tutorias no creado, intente nuevamente")
          return
        }
      }
      console.log(campos.firma[0]);
      const cuentaFirmada = await guardarFirma(cuentaCreada.data.externalId, campos.firma[0]);
      console.log(cuentaFirmada);
      if (!cuentaFirmada) {
        setCreandoCuenta(false);
        mensajeError("No se pudo crear la cuenta, firma no asignada, intente nuevamente")
      }
      setCreandoCuenta(false);
      mensajeOk("Cuenta creada con exito").then(() => {
        navegacion('/')
      })
    } else {
      if (cuentaCreada.error === 'Identificacion ya registrada') {
        mensajeError("La identificacion ya se encuentra registrada")
      }
      else if (cuentaCreada.error === 'Correo ya registrado') {
        mensajeError("El correo ya se encuentra registrado")
      }
      setCreandoCuenta(false);
    }


    console.log(cuenta);
  };

  const handleSelectChange = (evt) => {
    console.log(evt.target.value);
    setTipoCuenta(evt.target.value)
  };

  return (
    <>
      <div className="background-registro">
        <main className="main-registro">
          <h3 className='shadow'>Registrar Cuenta</h3>
          <form action='submit shadow' onSubmit={handleSubmit(onSubmit)}>
            <div className='contenedor-datos-personales shadow'>
              <h4 className='shadow'>Datos Personales</h4>
              <section className='datos-personales'>
                <label htmlFor="">
                  Nombre: <br />
                  <input type="text" id='nombre' className='form form-control' {...register('nombre', { required: true })} />
                  {errors.nombre && <small className="form-text text-danger">El campo es requerido</small>}

                </label>
                <label htmlFor="" className="test">
                  Apellido: <br />
                  <input type="text" id='apellido' className='form form-control'{...register('apellido', { required: true })} />
                  {errors.apellido && <small className="form-text text-danger">El campo es requerido</small>}

                </label>
              </section>
              <section className='datos-personales'>
                <label htmlFor="" className="test">
                  Identificación: <br />
                  <input type="number" id='identificacion' className='form form-control' {...register('identificacion', {
                    required: true,
                    validate: (value) => {
                      const isValid = isValidCI(value);
                      if (!isValid) {
                        return 'La cédula no es válida';
                      }
                      return true;
                    },
                  })}
                  />
                  {errors.identificacion?.type === 'required' && (
                    <small className="form-text text-danger">El campo es requerido</small>
                  )}
                  {errors.identificacion?.type === 'validate' && (
                    <small className="form-text text-danger">{errors.identificacion.message}</small>
                  )}

                </label>
                <label htmlFor="" className="test">
                  Correo Electrónico: <br />
                  <input type="text" id='correo' className='form form-control' {...register('correo', { required: true, pattern: /\S+@\S+\.\S+/ })} />
                  {errors.correo && errors.correo.type === 'required' && <small className="form-text text-danger">El campo es requerido</small>
                  }
                  {errors.correo && errors.correo.type === 'pattern' && <small className="form-text text-danger">Se requiere un correo valido</small>
                  }
                </label>
              </section>

              <section className='datos-personales'>
                <label htmlFor="" className="test">
                  Clave: <br />
                  <input type="password" id='clave' className='form form-control' {...register('clave', { required: true })} />
                  {errors.clave && <small className="form-text text-danger">El campo es requerido</small>}

                </label>
                <label htmlFor="" className="test">
                  Teléfono: <br />
                  <input type="number" id='telefono' className='form form-control' {...register('telefono', { required: true })} />
                  {errors.clave && <small className="form-text text-danger">El campo es requerido</small>}
                </label>
              </section>

              <section className='datos-personales'>
                <label htmlFor="" className="test">
                  Dirección: <br />
                  <input type="text" id='direccion' className='form form-control' {...register('direccion', { required: true })} />
                  {errors.direccion && <small className="form-text text-danger">El campo es requerido</small>}
                </label>
              </section>
            </div>

            <div className='contenedor-tipo-cuenta shadow'>
              <h4 className='shadow'>Tipo de Cuenta</h4>
              <div className='contenedor-tipo-cuenta-subcontenedor'>
                <section className='tipo-cuenta-info'>
                  <section className='tipo-cuenta'>
                    <label htmlFor="" className="test">
                      Tipo de Cuenta:
                      <select className='form-control' name="tipo-cuenta" id="tipo-cuenta" onChange={handleSelectChange} >
                        <option value="Docente">Docente</option>
                        <option value="Estudiante">Estudiante</option>
                      </select>
                    </label>
                  </section>
                  <section>
                    {tipoCuenta && tipoCuenta === 'Docente' ? (
                      <div className='datos-docente'>
                        <label htmlFor="" className="test">
                          Título: <br />
                          <input type="text" id='titulo' className='form form-control' {...register('titulo', { required: true })} />
                          {errors.titulo && <small className="form-text text-danger">El campo es requerido</small>}
                        </label>
                      </div>) : tipoCuenta === 'Estudiante' ? (
                        <div className='datos-estudiante'>
                          <label htmlFor="" className="test">
                            Carrera: <br />
                            <input type="text" id='carrera' className='form form-control' {...register('carrera', { required: true })} />
                            {errors.carrera && <small className="form-text text-danger">El campo es requerido</small>}
                          </label>
                          <label htmlFor="">
                            Ciclo: <br />
                            <input type="text" id='ciclo' className='form form-control' {...register('ciclo', { required: true })} />
                            {errors.ciclo && <small className="form-text text-danger">El campo es requerido</small>}
                          </label>
                          <label htmlFor="">
                            Paralelo: <br />
                            <input type="text" id='paralelo' className='form form-control' {...register('paralelo', { required: true })} />
                            {errors.paralelo && <small className="form-text text-danger">El campo es requerido</small>}
                          </label>
                        </div>
                      ) : null}
                  </section>
                </section>
                <section className='tipo-cuenta-info'>
                  <label htmlFor="firma">Firma:</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="firma"
                    onInput={handleFileChange}
                    className='form form-control-file'
                    {...register('firma', { required: true })}
                  />
                  {previewUrl && (
                    <img src={previewUrl} alt="Vista previa de la imagen de firma" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  )}
                </section>
              </div>

            </div>
            <div className='contenedor-botones'>
              <button type="submit" className='btn btn-success'>Crear Cuenta</button>
              <a href='/' className='btn btn-danger'>Cancelar</a>
            </div>

          </form>
        </main>
      </div>
      {creandoCuenta && <CargandoView/>}
    </>
  );
};

export default CrearCuentaView;
