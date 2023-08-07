import React from 'react';
import '../css/Bootstrap.css';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { GuardarCuenta, guardarCuenta } from '../hooks/Conexionsw';

const CrearCuentaView = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const mensaje = (texto) => swal(
        {
            title: "Error",
            text: texto,
            icon: "error",
            button: "Aceptar",
            timer: 2000
        }
    );

    const mensajeOk = (texto) => swal(
        {
            title: "Ingresado Correctamente",
            text: texto,
            icon: "success",
            button: "Aceptar",
            timer: 2000
        }
    );

    const onSubmit = (data) => {
        var datos = {
            'nombre': data.nombre, 'apellido': data.apellido, 'direccion': data.direccion, 'identificacion': data.identificacion, 'telefono': data.telefono,
            'rol': parseInt(data.rol,10), 'correo': data.correo, 'clave': data.clave, 'docente': {
                'titulo': data.titulo,
            }
        };
        const val = GuardarCuenta(datos).then((info) => {
            console.log(info.msj);
            if (info && info.msj == 'OK') {
                console.log("---", info);
                //console.log(info.datos);
                mensajeOk("Se han ingresado los datos");
            } else {
                mensaje(info.msj);
                console.log("NO Se han ingresado los datos");
            }
        });
    };


    return (
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                    <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-6" style={{ backgroundColor: "#8fb3ff" }}>
                                <div className="card-body p-md-5 mx-md-4" >
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className='row d-flex justify-content-center mb-3'>
                                            <h2 className='mx-2'> <b>CREAR CUENTA</b></h2>
                                            <img src="https://img.icons8.com/ios-filled/50/d41d6d/user.png" width={"45"} height={"45"} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" {...register('nombre', { required: true })} className="form-control"
                                                placeholder="Nombres" style={{ border: "1px solid" }} />
                                            <label className="form-label">Nombres</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" {...register('apellido', { required: true })} className="form-control"
                                                placeholder="Apellido" style={{ border: "1px solid" }} />
                                            <label className="form-label">Apellido</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" {...register('direccion', { required: true })} className="form-control"
                                                placeholder="Direccion" style={{ border: "1px solid" }} />
                                            <label className="form-label">Direccion</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="number"  {...register('identificacion', { required: true })} className="form-control"
                                                placeholder="identificacion" style={{ border: "1px solid" }} />
                                            <label className="form-label">Identificacion</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="number"  {...register('telefono', { required: true })} className="form-control"
                                                placeholder="telefono" style={{ border: "1px solid" }} />
                                            <label className="form-label">telefono</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="number"  {...register('rol', { required: true })} className="form-control"
                                                placeholder="rol" style={{ border: "1px solid" }} />
                                            <label className="form-label">rol</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" {...register('correo', { required: true })} className="form-control"
                                                placeholder="Correo electronico" style={{ border: "1px solid" }} />
                                            <label className="form-label">Correo Electronico</label>
                                        </div>

                                        <div className="form-outline mb-4">

                                            <select style={{ border: "1px solid #d41d6d", borderradius: "5px", padding: "10px" }}>
                                                <option value="docente">Docente</option>
                                                <option value="estudiante">Estudiante</option>
                                            </select>

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" {...register('clave', { required: true })} className="form-control" style={{ border: "1px solid" }} />
                                            <label className="form-label">Contraseña</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" {...register('titulo', { required: true })} className="form-control" style={{ border: "1px solid" }} />
                                            <label className="form-label">Titulo</label>
                                        </div>


                                        <div className="d-flex align-items-center justify-content-center pb-4">

                                            <button type="submit" className="btn btn-dark"> <b>Registrar</b></button>
                                            <img src="https://img.icons8.com/ios-filled/50/d41d6d/save--v1.png" width={"45"} height={"45"} />
                                        </div>

                                    </form>

                                </div>
                            </div>

                            <div className="col-lg-6 d-flex align-items-center gradient-custom-2" style={{ backgroundColor: "#ebf1ff" }}>
                                <div className="container ">
                                    <img src="https://www.edina.com.ec/logos/6210105553-378568.jpg" width={"350"} height={"355"}
                                        className="img-fluid form-outline mb-4" alt="Sample image" style={{ borderStyle: "solid" }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearCuentaView;
