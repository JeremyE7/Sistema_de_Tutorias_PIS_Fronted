import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #052342;
  box-shadow: 3px 2px 12px 0px rgba(0,0,0,0.26);
-webkit-box-shadow: 3px 2px 12px 0px rgba(0,0,0,0.26);
-moz-box-shadow: 3px 2px 12px 0px rgba(0,0,0,0.26);

`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  justify-content: space-between;   
  @media screen and (max-width: 960px) {
    background-color: #052342;
  }
`;

export const LogoContainer = styled.div`
  
`;

export const Menu = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;

  @media screen and (max-width: 960px) {
    background-color: #ffffff;
    position: absolute;
    top: 70px;
    left: ${({ open }) => (open ? "0" : "-100%")}; //Import
    width: 100%;
    height: 90vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: 0.5s all ease;
  }

  &:hover {
    color: #052342;
  }
`;

export const MenuItem = styled.li`
  height: 100%;

  &:hover {
    color: #052342;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: ce;
    align-items: center;
  }
`;

export const MenuItemLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.5rem 2.5rem;
  color: #64b2ff;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: 0.5s all ease;
  div{
    color: white;
  }
  &:hover {
    color: #052342;
    background-color: #eaeef3;
    transition: 0.5s all ease;

    div {
      svg {
        fill: #23394d;
      }
    }

    a{
      color: red;
    }

    div{
      color: black;
    }
    
  }

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      display: none;
      fill: #052342;
      margin-right: 0.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    width: 100%;

    div {
      width: 30%;
      justify-content: left;
      color: black;
      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 880px) {
    div {
      width: 40%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 500px) {
    div {
      width: 60%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 260px) {
    div {
      width: 100%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      fill: black;
      margin-right: 0.5rem;
    }
  }
`;
