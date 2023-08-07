import { useState, useEffect } from 'react';
import axios from 'axios';
import { Session } from '../utilidades/UseSession'
import { ObtenerSession } from '../utilidades/UseSession'

const URL = "http://localhost:3000/api/v1"

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
      body: JSON.stringify(data)
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
    console.log(responseData);
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
    console.log(external_id);
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

export const cambiarEstadoTutoria = async (external_id, estado) => {
  try {
    const response = await fetch(URL + '/tutorias/estado/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify({
        "estado": estado
      })
    })
    const tutoria = await response.json();

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

export const finalizarTutoria = async (external_id, fechaFinalizacion) => {
  try {
    const response = await fetch(URL + '/tutorias/estado/' + external_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ObtenerSession()
      },
      body: JSON.stringify({
        "estado": "Realizada",
        "fechaFinalizacion": fechaFinalizacion
      })
    })
    const tutoria = await response.json();

    console.log(tutoria);

    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}

