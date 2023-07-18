import React from "react";
const CabeceraFija = () => {
  return (
    <header style={{backgroundColor:"#333" , fontFamily: "Arial, Helvetica, sans-serif", color:"#ffffff", height: "90px", width: "100%" , textAlign: "center"}}>
      <h1 style={{color: "#ffffff", padding: "10px 0 0 15px"}}>
        <span className="site-name"> <b>Sistema de Tutorias</b> </span> 
      </h1>
    </header>
  );
};

export default CabeceraFija;

/*cabecera fija
.cabecera-fija {
  background: #333;
  color: white;
  height: 80px;
  width: 100%; /* hacemos que la cabecera ocupe el ancho completo de la página */
  //left: 0; /* Posicionamos la cabecera al lado izquierdo */
  //top: 0; /* Posicionamos la cabecera pegada arriba */
  //position: fixed; /* Hacemos que la cabecera tenga una posición fija */
 // font-family: Arial, Helvetica, sans-serif;
  //z-index: 1
//}

/* .cabecera-titulo {
  padding: 10px 0 0 15px;
  color: white;
}
*/