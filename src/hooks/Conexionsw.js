import { useState, useEffect } from 'react';
import axios from 'axios';
import { Session } from '../utilidades/UseSession'

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
  return await axios.post(URL + '/cuenta/login', data)
    .then((response) => {
      console.log(response);
      if (response.data && response.data.token) {
        const session = Session(response.data.token);
        console.log("INGRESO AL SISTEMA", session);
      }
      return response.data;
    });
}