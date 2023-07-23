import React from "react";
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

const Nanvar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navegacion = useNavigate();

  const excludedRoutes = ["/"];

  const shouldRenderNavbar = !excludedRoutes.includes(location.pathname);


  if (!shouldRenderNavbar) {
    return null;
  }
  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <div className="mt-1" style={{ display: "flex" }}>
            <img onClick={() => navegacion('/Inicio')}
              src={logo}
              width={"60"}
              height={"60"}
            />
              <h5 className="ml-3 mt-3" style={{ color: "white" }}> <b> Bienvenido {desencriptando('Nombre')}  </b></h5>
          </div>


          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu open={showMobileMenu}>
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                //navegacion('estudiante/listar') --> aqui va la ruta del componente tutoria ponerla ojo
              }}>
                <div style={{ color: "white", fontWeight: "bold" }}>
                  <AiFillSchedule />
                  TUTORÍAS
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                //navegacion('estudiante/listar') --> aqui va la ruta delcomponente reporte ponerla ojo
              }}>
                <div style={{ color: "white", fontWeight: "bold" }}>
                  <AiFillFilePdf />
                  REPORTES
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                //navegacion('estudiante/listar') --> aqui va la ruta del componente cuenta ponerla ojo
              }}>
                <div style={{ color: "white", fontWeight: "bold" }} >
                  <AiOutlineUser />
                  CUENTA
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                CerrarSession();
                BorrarDatos('Nombre');
                navegacion('/');
              }}>

                <div style={{ color: "white", fontWeight: "bold" }}>

                  <AiOutlineLogout />
                  CERRAR SESIÓN
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