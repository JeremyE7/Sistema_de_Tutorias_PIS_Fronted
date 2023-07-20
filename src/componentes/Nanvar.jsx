import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Nanvar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const excludedRoutes = ["/"];

  const shouldRenderNavbar = !excludedRoutes.includes(location.pathname);

  if (!shouldRenderNavbar) {
    return null;
  }
  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <div className="mx-3 mt-1">
            <img
              src={logo}
              width={"60"}
              height={"60"}
            />
          </div>

          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu open={showMobileMenu}>
            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div>
                  <AiFillSchedule/>
                  <Link className="link-dark" style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                  TUTORÍAS
                  </Link>
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div>
                <AiFillFilePdf />
                <Link className="link-dark" style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                  REPORTES
                  </Link>
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div>
                  <AiOutlineUser/>
                  <Link className="link-dark" style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                  CUENTA
                  </Link>
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                
                <div>
                
                  <AiOutlineLogout/>
                  <Link className="link-dark" style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                  CERRAR SESIÓN
                  </Link>
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
