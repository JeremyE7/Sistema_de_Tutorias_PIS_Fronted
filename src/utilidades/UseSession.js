import React from "react";

export const Session = (token) => {
    localStorage.setItem('token',token);
};

export const Guardar = (nombre,dato) => {
    localStorage.setItem(nombre,dato);
    // se pasa el nombre del dato y su data
};

export const ObtenerDatos = (nombre) => {
    return localStorage.getItem(nombre);
};

export const BorrarDatos = (nombre) => {
    localStorage.removeItem(nombre);
    
}

export const ObtenerSession = (token) => {
    return localStorage.getItem('token');
};

export const EstaSession = () => {
    const token = localStorage.getItem('token');
    if (token) return true;
    else return false;
};

export const CerrarSession = () => {
    localStorage.removeItem('token');
    //llamado al Servicios Web para borrar token
    
}