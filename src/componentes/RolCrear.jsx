//COMPONENTE TEMPORAL DESPUES BORRAR
import React from 'react';
import { useForm } from 'react-hook-form';
import { GuardarRol } from '../hooks/Conexionsw';
import swal from 'sweetalert';

const RolCrear = () => {

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
        var datos = { 'nombre': data.nombre, 'descripcion': data.descripcion };
        const val = GuardarRol(datos).then((info) => {
            if (info) {
                console.log("---", info);
                //console.log(info.datos);
                mensajeOk("Se han ingresado los datos");
            } else {
                mensaje(info.message);
                console.log("NO Se han ingresado los datos");
            }
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row d-flex justify-content-center">
                    <div className="mt-4 mx-5">
                        <label > <b>Nombre</b> </label>
                        <input className="text-center mx-1"
                            placeholder="Nombre"
                            aria-describedby="search-addon"
                            style={{ width: "200px", height: "40px" }} type="text" step="any"{...register('nombre', { required: true })} />
                    </div>
                    <div className="mx-6 mt-4">
                        <label > <b> Descripcion </b></label>
                        <input className="text-center mx-1"
                            placeholder="Descripcion"
                            aria-describedby="search-addon"
                            style={{ width: "200px", height: "40px" }} type="text" {...register('descripcion', { required: true })} />

                    </div>
                    <div className="mx-5 mt-4">
                        <button type="submit" className="btn btn-dark"> <b>Ingresar Rol</b></button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RolCrear;