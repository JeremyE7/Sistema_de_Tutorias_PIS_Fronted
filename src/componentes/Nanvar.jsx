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
import { BorrarDatos, CerrarSession, ObtenerDatos } from "../utilidades/UseSession";
import { desencriptando } from "../utilidades/encryp";
import { obtenerRolCuenta } from "../hooks/Conexionsw";

const Nanvar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navegacion = useNavigate();

  const excludedRoutes = ["/", "/CrearCuenta","/Rol"];

  const shouldRenderNavbar = !excludedRoutes.includes(location.pathname);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getRol = async () => {
      if(ObtenerDatos("ExternalCuenta") === null) return
      const rol = await obtenerRolCuenta(ObtenerDatos("ExternalCuenta"))
      if(rol.nombre === "Administrador"){
        setIsAdmin(true)
      }
    }
    getRol()
  },[])

  if (!shouldRenderNavbar) {
    return null;
  }
  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <div className="" style={{ display: "flex", backgroundColor: "#8d0b0e", padding: "0px 50px", alignItems: "center", justifyContent: "center"}}>
            <img onClick={() => navegacion('/Inicio')}
              src={logo}
              width={"60"}
              height={"60"}
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
                <div style={{ color: "black", fontWeight: "500" }} onClick={() =>{navegacion('/administracion')}}>
                  <AiFillSchedule />
                  Administrador
                </div>
              </MenuItemLink>
            </MenuItem>}
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                navegacion('/tutoria/registros');
              }}>
                <div style={{ color: "black", fontWeight: "500" }}>
                  <AiFillFilePdf />
                  Reportes
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                //navegacion('estudiante/listar') --> aqui va la ruta del componente cuenta ponerla ojo
              }}>
                <div style={{ color: "black", fontWeight: "500" }} >
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

                <div style={{ color: "black", fontWeight: 500 }}>

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