import '../css/Bootstrap.css';
import '../css/fondo.css';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { Guardar, Session } from '../utilidades/UseSession';
import { IngresarSistema } from '../hooks/Conexionsw';
import { encriptando } from '../utilidades/encryp';

const InicioSesionView = () => {
    const navegacion = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm(); // initialise the hook
    //const {info, error, execute} = InicioSesion(undefined,false);
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
        var datos = { 'correo': data.correo, 'clave': data.clave };
        IngresarSistema(datos).then((info) => {
            if (info && info.token) {
                const data = [info.usuario.persona.nombre, info.usuario.persona.apellido]
                const encriptado = encriptando(data);
                Guardar('Nombre', encriptado);
                Guardar('ExternalCuenta', info.usuario.externalId)
                Session(info.token);
                mensajeOk("Bienvenido")
                navegacion('/inicio');
            } else {
                mensaje("Credenciales inválidas");
            }
        });
    };
    //llamar(datos);
    //mensaje(info)

    return <section className="vh-100">
        <div style={{ display: "grid", backgroundColor:"#eaeef3" }} className="test-bg row d-flex justify-content-center align-items-center h-100">
            <div className="col-10 col-md-8 col-lg-6 col-xl-5">
                <div className="card " style={{ borderRadius: "10px", backgroundColor: "#ebf1ff" }} >
                    <div className="vertical-align shadow" style={{ textAlign: "center" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-1 md-5 mt-md-4">

                                <div style={{backgroundColor: "#052342", color: "white"}} className='py-3 mt-2 mb-2'>
                                    <h2 className="fw-bold mx-4 "> <b> Inicio de Sesión</b><br />Sistema de Tutorías</h2>
                                </div>
                                <img src="https://siaaf.unl.edu.ec/static/img/logo.png" alt="" className="img-fluid" width={300} />

                                <div className="container mb-3">
                                    <label className="form-label"> <b> Email </b> </label>
                                    <input type="email" {...register('correo', { required: true, pattern: /\S+@\S+\.\S+/ })}
                                        placeholder='Correo Electrónico' className="form-control container" style={{ alignContent: "center" }} />
                                    {errors.correo && errors.correo.type === 'required' && <div className='alert alert-danger fade show' role='alert'>Se requiere su correo</div>}
                                    {errors.correo && errors.correo.type === 'pattern' && <div className='alert alert-danger fade show' role='alert'>Ingrese un correo valido</div>}
                                </div>

                                <div className="container mb-3" style={{ justifyContent: "center", alignItems: "center" }}>
                                    <label className="form-label "><b>Clave</b> </label>
                                    <input {...register('clave', { required: true })} type="password" placeholder='Clave' className="form-control container" />
                                    {errors.clave && errors.clave.type === 'required' && <div className='alert alert-danger fade show' role='alert'>Se requiere su clave</div>}
                                </div>

                                <div className="mb-1">
                                    <button type="submit" className="btn mx-2" style={{ background: "#8fb3ff" }}>
                                        <b>Ingresar</b></button>
                                </div>

                                <div className='mt-5'>
                                    <p style={{ fontSize: "17px" }}> <b> ¿No tienes cuenta?</b> <a href="/CrearCuenta">Regístrate aquí</a></p>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default InicioSesionView;