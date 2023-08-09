import React, { useState } from 'react';
import '../css/CrearCuentaView.css';
import { useForm } from 'react-hook-form';
import { GuardarCuenta, crearRegistroTutoria } from '../hooks/Conexionsw';
import { mensajeError, mensajeOk } from '../utilidades/Mensajes';
import { useNavigate } from "react-router-dom";


const CrearCuentaView = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [tipoCuenta, setTipoCuenta] = useState('Docente');

  const navegacion = useNavigate();


  const onSubmit = async (campos) => {
    const cuenta ={
      nombre: campos.nombre,
      apellido: campos.apellido,
      identificacion: campos.identificacion,
      correo: campos.correo,
      clave: campos.clave,
      telefono: campos.telefono,
      direccion: campos.direccion,
    }

    if(tipoCuenta === 'Docente'){
      cuenta.docente = {titulo: campos.titulo}
      cuenta.rol = 1
    }else if(tipoCuenta === 'Estudiante'){
      cuenta.estudiante = {
        carrera: campos.carrera,
        ciclo: campos.ciclo,
        paralelo: campos.paralelo
      }
      cuenta.rol = 2
    }

    const cuentaCreada = await GuardarCuenta(cuenta);
    console.log(cuentaCreada);
    if(cuentaCreada.data) {
      if(tipoCuenta === 'Docente'){
        const registroTutoria = {
          periodoAcademico: '2023-2023',
          externalIdDocente: cuentaCreada.data.docente.externalId
        }
        const registroTutoriasCreado = await crearRegistroTutoria(registroTutoria)

        if(!registroTutoriasCreado.data)
          mensajeError("No se pudo crear la cuenta, intente nuevamente")
      }
      mensajeOk("Cuenta creada con exito").then(() => navegacion('/'))
    }else{
      mensajeError("No se pudo crear la cuenta, intente nuevamente")
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
          <h3>Registrar Cuenta</h3>
          <form action='submit' onSubmit={handleSubmit(onSubmit)}>
            <div className='contenedor-datos-personales'>
              <h4>Datos Personales</h4>
              <section className='datos-personales'>
                <label htmlFor="" className="test">
                  Nombre: <br />
                  <input type="text" id='nombre' {...register('nombre', { required: true })} />
                  {errors.nombre && <div className="error">El campo es requerido</div>}

                </label>
                <label htmlFor="" className="test">
                  Apellido: <br />
                  <input type="text" id='apellido'{...register('apellido', { required: true })} />
                  {errors.apellido && <div className="error">El campo es requerido</div>}

                </label>
              </section>
              <section className='datos-personales'>
                <label htmlFor="" className="test">
                  Identificación: <br />
                  <input type="number" id='identificacion'{...register('identificacion', { required: true })} />
                  {errors.identificacion && <div className="error">El campo es requerido</div>}

                </label>
                <label htmlFor="" className="test">
                  Correo Electronico: <br />
                  <input type="text" id='correo'{...register('correo', { required: true, pattern: /\S+@\S+\.\S+/ })} />
                  {errors.correo && errors.correo.type === 'required' && <div className='error' role='alert'>Se requiere su correo</div>}
                  {errors.correo && errors.correo.type === 'pattern' && <div className='error' role='alert'>Ingrese un correo valido</div>}
                </label>
              </section>

              <section className='datos-personales'>
                <label htmlFor="" className="test">
                  Clave: <br />
                  <input type="text" id='clave'{...register('clave', { required: true })} />
                  {errors.clave && <div className="error">El campo es requerido</div>}

                </label>
                <label htmlFor="" className="test">
                  Telefono: <br />
                  <input type="number" id='telefono'{...register('telefono', { required: true })} />
                  {errors.clave && <div className="error">El campo es requerido</div>}
                </label>
              </section>

              <section className='datos-personales'>
                <label htmlFor="" className="test">
                  Dirección: <br />
                  <input type="text" id='direccion'{...register('direccion', { required: true })} />
                  {errors.direccion && <div className="error">El campo es requerido</div>}
                </label>
              </section>
            </div>

            <div className='contenedor-tipo-cuenta'>
              <h4>Tipo de Cuenta</h4>
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
                      Titulo: <br />
                      <input type="text" id='titulo'{...register('titulo', { required: true })} />
                      {errors.titulo && <div className="error">El campo es requerido</div>}
                    </label>
                  </div>): tipoCuenta === 'Estudiante' ? (
                    <div className='datos-estudiante'>
                      <label htmlFor="" className="test">
                        Carrera: <br />
                        <input type="text" id='carrera'{...register('carrera', { required: true })} />
                        {errors.carrera && <div className="error">El campo es requerido</div>}
                      </label>
                      <label htmlFor="">
                        Ciclo: <br />
                        <input type="text" id='ciclo'{...register('ciclo', { required: true })} />
                        {errors.ciclo && <div className="error">El campo es requerido</div>}
                      </label>
                      <label htmlFor="">
                        Paralelo: <br />
                        <input type="text" id='paralelo'{...register('paralelo', { required: true })} />
                        {errors.paralelo && <div className="error">El campo es requerido</div>}
                      </label>
                    </div>
                  ): null}
              </section>
            </div>
            <div className='contenedor-botones'>
              <button type="submit" className='btn btn-success'>Crear Cuenta</button>
              <a href='/' className='btn btn-danger'>Cancelar</a>
            </div>

          </form>
        </main>
      </div>
    </>
  );
};

export default CrearCuentaView;
