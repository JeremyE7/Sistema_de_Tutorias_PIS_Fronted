import React from "react";
import "../css/Bootstrap.css";
import { Session } from '../utilidades/UseSession';
import { Docentes } from "../hooks/Conexionsw";
import { useNavigate, Link, Navigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
//import '../css/fondo.css'

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

const ListarDocenteView = () => {
  //const navegacion = useNavigate();

  const { external } = useParams();
  const [info, setInfo] = useState(undefined);
  const [llamada, setllamada] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!llamada) {
    const datos = Docentes().then((data) => {
      console.log(data);

      setllamada(true);
      setInfo(data);
      //console.log(data);
    }, (error) => {
      //console.log(error);
      mensaje(error.mensaje);
    });
  }

  const manejarClickCelda = (dato) => {
    console.log('Dato de la celda:', dato);
    // Aquí puedes hacer lo que necesites con el dato
  };


  return (
    <div className="container" style={{ height: "1460px", width: "2600px" }}>
      <div className="row d-flex justify-content-center">
        <h1 className="font-weight-bold mx-3 "> LISTA DE DOCENTES</h1>
        <img
          src="https://img.icons8.com/carbon-copy/100/d41d6d/teacher.png"
          width={"50"}
          height={"65"}
        ></img>
      </div>



      <div className="container mt-5  ">
        <table className="table table-hover table-dark tableFixHead ">
          <thead className="border-light">
            <tr>
              <th scope="col">
                <strong>Id</strong>
              </th>
              <th scope="col">
                <strong>Nombre</strong>
              </th>
              <th scope="col">
                <strong>Apellido</strong>
              </th>
              <th scope="col">
                <strong>Identificacion</strong>
              </th>
              <th scope="col">
                <strong>Titulo</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {info && info.data && info.data.map((element, key) => {
              console.log(external);
              return <tr key={key}>
                <td >{(key) + 1}</td>
                <td> {element.persona.nombre}</td>
                <td> {element.persona.apellido}</td>
                <td> {element.persona.identificacion}</td>
                <td> {element.titulo}</td>
                {console.log(element)}
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <dir></dir>
    </div>
  );
};

export default ListarDocenteView;