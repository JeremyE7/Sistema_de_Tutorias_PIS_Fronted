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


    return tutoria.data;
  } catch (error) {
    console.log(error);
  }
}