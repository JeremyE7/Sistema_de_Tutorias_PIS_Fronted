import { useState } from 'react';
import "../css/solicitar.css";
import '../css/Bootstrap.css';
import { Link } from 'react-router-dom';
const Solicitar = ({ onSubmit }) => {
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [materia, setMateria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [carrera, setCarrera] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Actualiza el estado con la opción seleccionada
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombreEstudiante || !mensaje || !carrera) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");
    onSubmit({ nombreEstudiante, materia, mensaje });
    setNombreEstudiante("");
    setMateria("");
    setMensaje("");
    setCarrera("");

  };

  return (
   
    <form onSubmit={handleSubmit}>
      <div className='container3 card'>
        <label>Nombre del Estudiante:</label>
        <input
          type="text"
          value={nombreEstudiante}
          onChange={(e) => setNombreEstudiante(e.target.value)}
          required
        />
      </div>
      <div className='container3 card'>
        <label>Materia:</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Sistemas Distribuidos</option>
          <option value="opcion2">Procesos de Software</option>
          <option value="opcion3">Teoria de Automatas</option>
          <option value="opcion4">Computacion en la nube</option>
          <option value="opcion5">Gestion de Redes</option>
        </select>

      </div>
      <div className='container3 card'>
        <label>Carrera:</label>
        <input
          type="text"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          required
        />
      </div>
      <div className='container3 card'>
        <label>Docente:</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Ing Rene Guaman</option>
          <option value="opcion2">Ing. Francisco Alvarez</option>
          <option value="opcion3">Ing. Genoveva Suing</option>
          <option value="opcion4">Ing. Cristian Narvaez</option>
          <option value="opcion5">Ing. Mario Cueva</option>
        </select>

      </div>
      <div className='container3 card'>
        <label>Mensaje:</label>
        <input
          type='text'
          background
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        ></input>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Solicitar Tutoría</button>
    

    </form>
  );

};
export default Solicitar;