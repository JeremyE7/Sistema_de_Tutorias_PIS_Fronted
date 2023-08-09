import swal from 'sweetalert';


export const mensajeOk = (texto, title) => swal(
    {
        title: title,
        text: texto,
        icon: "success",
        button: "Aceptar",
        timer: 2000
    }
);

export const mensajeError = (texto) => swal(
    {
        title: "Error",
        text: texto,
        icon: "error",
        button: "Aceptar",
        timer: 2000
    }
);