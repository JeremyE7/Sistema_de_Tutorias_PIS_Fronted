import React from 'react';
import '../css/Bootstrap.css';

const CrearCuentaView = () => {
    return (
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                    <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-6" style={{ backgroundColor: "#8fb3ff" }}>
                                <div className="card-body p-md-5 mx-md-4" >
                                    <form>
                                        <div className='row d-flex justify-content-center mb-3'>
                                            <h2 className='mx-2'> <b>CREAR CUENTA</b></h2>
                                            <img src="https://img.icons8.com/ios-filled/50/d41d6d/user.png" width={"45"} height={"45"} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-control"
                                                placeholder="Nombres Completos" style={{border:"1px solid"}}/>
                                            <label className="form-label">Nombres</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-control"
                                                placeholder="# de Cedula" style={{border:"1px solid"}} />
                                            <label className="form-label">Cedula</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="form2Example11" className="form-control"
                                                placeholder="Correo electronico" style={{border:"1px solid"}} />
                                            <label className="form-label">Correo Electronico</label>
                                        </div>

                                        <div className="form-outline mb-4">

                                            <select style={{ border: "1px solid #d41d6d", borderradius: "5px", padding: "10px" }}>
                                                <option value="docente">Docente</option>
                                                <option value="estudiante">Estudiante</option>
                                            </select>

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="form2Example221" className="form-control" style={{border:"1px solid"}} />
                                            <label className="form-label">Contraseña</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="form2Example22" className="form-control" style={{border:"1px solid"}}/>
                                            <label className="form-label">Confirmar Contraseña</label>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-center pb-4">
                                            
                                            <button type="button" className="btn btn-dark mx-2"><b>GUARDAR</b></button>
                                            <img src="https://img.icons8.com/ios-filled/50/d41d6d/save--v1.png" width={"45"} height={"45"} />
                                        </div>

                                    </form>

                                </div>
                            </div>

                            <div className="col-lg-6 d-flex align-items-center gradient-custom-2" style={{ backgroundColor: "#ebf1ff" }}>
                                <div className="container ">
                                    <img src="https://www.edina.com.ec/logos/6210105553-378568.jpg" width={"350"} height={"355"}
                                        className="img-fluid form-outline mb-4" alt="Sample image" style={{ borderStyle: "solid" }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearCuentaView;
