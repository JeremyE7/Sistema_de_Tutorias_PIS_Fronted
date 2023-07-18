import React from "react";

export const Session = (token) => {
    localStorage.setItem('token',token);
};

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