import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/NavBar.css";
import {
  Container,
  LogoContainer,
  Wrapper,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
} from "./Narbar.elements";
import {
  AiFillFilePdf,
  AiFillSchedule,
  AiOutlineUser,
  AiOutlineLogout
} from "react-icons/ai";
import {
  FaBattleNet,
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaBriefcase,
  FaGlasses,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import logo from '../img/logo.png';
import unlEscudo from '../img/unlEscudo.png';
import { BorrarDatos, CerrarSession, ObtenerDatos } from "../utilidades/UseSession";
import { desencriptando } from "../utilidades/encryp";
import { obtenerRolCuenta } from "../hooks/Conexionsw";

const Nanvar = ({isAdmin, isEstudiante, isDocente}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navegacion = useNavigate();

  const excludedRoutes = ["/", "/CrearCuenta","/Rol"];

  const shouldRenderNavbar = !excludedRoutes.includes(location.pathname);

  if (!shouldRenderNavbar) {
    return null;
  }
  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <div onClick={() => navegacion('/Inicio')} className="" style={{ display: "flex", backgroundColor: "#052342", padding: "0px 50px", alignItems: "center", justifyContent: "center"}}>
            <img
              src={unlEscudo}
              width={"60"}
              height={"60"}
              alt="logo-unl"
              style={{ marginRight: "10px" }}
            />
            <img
              src={logo}
              width={"60"}
              height={"60"}
              alt="logo-unl"
            />
            {desencriptando("Nombre") !== null ? (
              <h5 className="ml-3 mt-3" style={{ color: "white", fontWeight: 500 }}>
                <label> Sistema de <br /> Tutorías</label>
              </h5>
            ) : (
              <h5 className="ml-3 mt-3" style={{ color: "black" }}>
                <b> Inicia Sesión para ver tu perfil </b>
              </h5>
            )}


          </div>


          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu open={showMobileMenu}>
            {isAdmin && <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                //navegacion('estudiante/listar') --> aqui va la ruta del componente tutoria ponerla ojo
              }}>
                {isAdmin && <div onClick={() =>{navegacion('/administracion')}}>
                  <AiFillSchedule />
                  Administrador
                </div>}
              </MenuItemLink>
            </MenuItem>}
            {isDocente && <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                navegacion('/tutoria/registros');
              }}>
                <div> 
                  <AiFillFilePdf />
                  Reportes
                </div>
              </MenuItemLink>
            </MenuItem>}
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                navegacion('/cuenta')
              }}>
                <div>
                  <AiOutlineUser />
                  Cuenta
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                CerrarSession();
                BorrarDatos('Nombre');
                BorrarDatos('ExternalCuenta');
                navegacion('/');
              }}>

                <div>

                  <AiOutlineLogout />
                  Cerrar Sesión
                </div>
              </MenuItemLink>
            </MenuItem>
          </Menu>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};

export default Nanvar;