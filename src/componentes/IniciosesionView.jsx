import '../css/Bootstrap.css';
import '../css/fondo.css';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { Session } from '../utilidades/UseSession';
import { IngresarSistema } from '../hooks/Conexionsw';
import { useUser } from './useContext';

const InicioSesionView = () => {
    const navegacion = useNavigate();
    const { setUser } = useUser();
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
                const userInfo = {
                    username: info.usuario.persona.nombre,
                    userapellido: info.usuario.persona.apellido
                };
                setUser(userInfo);
                Session(info.token);
                mensajeOk("Bienvenido")
                navegacion('/inicio');
            } else {
                mensaje(info.error);
            }
        });
    };
    //llamar(datos);
    //mensaje(info)

    return <section className="vh-100">
        <div style={{display:"grid"}} className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10 col-md-8 col-lg-6 col-xl-5">
                <div className="card " style={{ borderRadius: "10px", backgroundColor: "#ebf1ff" }} >
                    <div className="vertical-align" style={{ textAlign: "center" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-5 mx-4 " style={{ fontFamily: "bold" }}> <b> LOGIN</b></h2>
                                <img src="https://siaaf.unl.edu.ec/static/img/logo.png" alt="" className="img-fluid" />

                                <div className="container mb-3">
                                    <label className="form-label"> <b> Email </b> </label>
                                    <input type="email" {...register('correo', { required: true, pattern: /\S+@\S+\.\S+/ })}
                                        placeholder='Correo Electronico' className="form-control container" style={{ width: "500px", height: "35px", alignContent: "center", fontFamily: "Cambria" }} />
                                    {errors.correo && errors.correo.type === 'required' && <div className='alert alert-danger fade show' role='alert'>Se requiere su correo</div>}
                                    {errors.correo && errors.correo.type === 'pattern' && <div className='alert alert-danger fade show' role='alert'>Ingrese un correo valido</div>}
                                </div>

                                <div className="container mb-3" style={{ justifyContent: "center", alignItems: "center" }}>
                                    <label className="form-label "><b>Clave</b> </label>
                                    <input {...register('clave', { required: true })} type="password" placeholder='Clave' className="form-control container" style={{ width: "500px", height: "35px", fontFamily: "Cambria" }} />
                                    {errors.clave && errors.clave.type === 'required' && <div className='alert alert-danger fade show' role='alert'>Se requiere su clave</div>}
                                </div>

                                <div className="mb-5">
                                    <button type="submit" className="btn mx-2" style={{ background: "#8fb3ff" }}>
                                        <img className='mx-2' src="https://img.icons8.com/ios-filled/50/d41d6d/login-rounded-right.png" alt='ingresar' width={"30"} height={"35"}></img>
                                        <b>Ingresar</b></button>

                                </div>

                                <div>
                                    <p style={{ fontSize: "17px" }}> <b> Si no tiene cuenta registrese a continuación </b> </p>
                                    <button type="submit" className="btn" style={{ background: "#8fb3ff" }}>
                                        <img src="https://img.icons8.com/ios-glyphs/30/d41d6d/create-new.png" alt='' width={"30"} height={"35"}></img>
                                        <Link className="btn" to="/CrearCuenta"> <b>Crear Cuenta</b> </Link>
                                    </button>
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