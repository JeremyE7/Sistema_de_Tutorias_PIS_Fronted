import { useState, useEffect } from 'react';
import axios from 'axios';
import { Session } from '../utilidades/UseSession'
import { ObtenerSession } from '../utilidades/UseSession'

const URL = process.env.REACT_APP_API_BASE_URL

export const Opac = (accion = true) => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (accion) callApi();
  }, []);
  const callApi = async (nombre) => {
    try {
      const { data, status, statusText } = await axios.get(URL + "/opac");
      setInfo(data);
      console.log(data);
    } catch (error) {
      //console.log(error);
      setError(error);
    }
  };
  return { info, error, execute: callApi };
};


export const InicioSesion = (data, accion = true) => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (accion) callApi(data);
  }, []);
  const callApi = async (datos) => {
    try {
      const { data, status, statusText } = await axios.post(URL + '/cuenta/login', datos);
      setInfo(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }

  }
  return { info, error, execute: callApi };
};

export const IngresarSistema = async (data) => {
  try {
    console.log(URL + '/cuenta/login');
    console.log(process.env);
    const response = await fetch(URL + '/cuenta/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    console.log(responseData);

    if (responseData && responseData.token) {
      const session = Session(responseData.token);
      console.log("INGRESO AL SISTEMA", session);
    }

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}

//guardar persona
export const GuardarCuenta = async (data) => {
  try {

    const response = await fetch(URL + '/cuenta/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log('Error:', error);
  }
}

export const GuardarRol = async (data) => {
  try {

    const response = await fetch(URL + '/rol/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log('Error:', error);
  }
}

export const obtenerCuenta = async (external_id) => {
  try {
    console.log(external_id);
    const response = await fetch(URL + '/cuenta/' + external_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const Estudiantes = async () => {
  try {
    const response = await fetch(URL + '/estudiante/listar', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    });

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const Docentes = async () => {
  try {
    const response = await fetch(URL + '/docente/listar', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    });

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}



export const tutoriasPendientes = async (external_id_docente) => {
  try {
    const response = await fetch(URL + '/tutorias/docente/' + external_id_docente)
    const tutorias = await response.json();

    console.log(tutorias);

    return tutorias.data;
  } catch (error) {
    console.log(error);
  }
}

export const obtenerRolCuenta = async (external_id) => {
  try {
    const response = await fetch(URL + '/cuenta/' + external_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    })
    const responseData = await response.json()
    return responseData.data.rol
  } catch (error) {
    console.log(error)
  }
}

export const obtenerTutorias = async (rol, external_id) => {
  try {
    rol = rol.nombre.toLowerCase();
    const response = await fetch(URL + '/tutorias/' + rol + "/" + external_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    })
    console.log(rol, external_id);
    const responseData = await response.json()
    console.log(responseData);
    return responseData
  } catch (error) {
    console.log(error)
  }
}

export const aceptarTutoria = async (external_id, datos) => {
  try {
    console.log(datos);
    const response = await fetch(URL + '/tutorias/docente/aceptar/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify(datos)
    })
    console.log(response);
    const tutoria = await response.json();

    console.log(tutoria);

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const Materias_Docente = async (external_id_docente) => {
  try {
    const response = await fetch(URL + '/materias/docente/' + external_id_docente, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    });

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const solicitarTutoria = async (external_id, datos) => {
  try {
    console.log(datos);
    const response = await fetch(URL + '/tutorias/estudiante/' + external_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify(datos)
    })
    console.log(response);
    const tutoria = await response.json();

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const cambiarEstadoTutoria = async (external_id, estado, justificacion) => {
  try {
    console.log(justificacion);
    const response = await fetch(URL + '/tutorias/estado/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify({
        "estado": estado,
        "justificacion": justificacion,
      })
    })
    const tutoria = await response.json();
    console.log(tutoria);
    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const finalizarTutoria = async (external_id, fechaFinalizacion, observacion) => {
  try {
    console.log(observacion);
    const response = await fetch(URL + '/tutorias/estado/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify({
        "estado": "Semirealizada",
        "fechaFinalizacion": fechaFinalizacion,
        "observacionDocente": observacion
      })
    })
    const tutoria = await response.json();

    console.log(tutoria);

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const crearRegistroTutoria = async (datos) => {
  try {
    console.log(datos);
    const response = await fetch(URL + '/registro_tutorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify(datos)
    })
    console.log(response);
    const tutoria = await response.json();

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const crearMateria = async (datos) => {
  try {
    console.log(datos);
    const response = await fetch(URL + '/materias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify(datos)
    })
    console.log(response);
    const tutoria = await response.json();

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const valoresDefecto = async () => {
  try {
    const response = await fetch(URL + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    })
    console.log(response);
    const tutoria = await response.json();

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const obtenerTodasMaterias = async () => {
  try {
    const response = await fetch(URL + '/materias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    });

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const editarMateria = async (external_id, datos) => {
  try {
    const response = await fetch(URL + '/materias/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify(datos)
    })
    const materia = await response.json();
    console.log(materia);
    return materia.data;
  } catch (error) {
    console.log(error);
  }
}

export const eliminarMateria = async (external_id) => {
  try {
    const response = await fetch(URL + '/materias/' + external_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    })
    const materia = await response.json();
    console.log(materia);
    return materia.data;

  } catch (error) {
    console.log(error);
  }
}

export const obtenerTodasCuentas = async () => {
  try {
    const response = await fetch(URL + '/cuenta', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    });

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const eliminarCuenta = async (external_id) => {
  try {
    console.log(external_id);
    const response = await fetch(URL + '/cuenta/' + external_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    })
    const materia = await response.json();
    console.log(materia);
    return materia.data;

  } catch (error) {
    console.log(error);
  }
}

export const editarCuenta = async (external_id, datos) => {
  try {
    const response = await fetch(URL + '/cuenta/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify(datos)
    })
    const cuenta = await response.json();
    console.log(cuenta);
    return cuenta.data;
  } catch (error) {
    console.log(error);
  }
}

export const editarCuentaRol = async (external_id, rol) => {
  try {
    const response = await fetch(URL + '/cuenta/' + external_id + '/' + rol, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    })
    const cuenta = await response.json();
    console.log(cuenta);
    return cuenta.data;
  } catch (error) {
    console.log(error);
  }
}

export const obtenerTodosRoles = async () => {
  try {
    const response = await fetch(URL + '/rol/listar', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
    });

    const responseData = await response.json();

    console.log(responseData.data);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
} 

export const guardarFirma = async (external_id, firma) => {
  try {
    console.log(firma);
    const formData = new FormData();
    formData.append('firma', firma);
    console.log(external_id);
    const response = await fetch(URL + '/persona/firma/' + external_id,{
      method: 'PUT',
      headers: {
        'Authorization': ObtenerSession()
      },
      body: formData
    })
    const cuenta = await response.json();
    console.log(cuenta);
    return cuenta.data;
  } catch (error) {
    console.log(error);
  }
}

export const finalizarTutoriaEstudiante = async (external_id, valoracion, observacion) => {
  try {
    console.log(observacion);
    console.log(valoracion);
    console.log(external_id);
    const response = await fetch(URL + '/tutorias/estado/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify({
        "estado": "Realizada",
        "valoracion": valoracion,
        "observacionEstudiante": observacion
      })
    })
    const tutoria = await response.json();

    console.log(tutoria);

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}