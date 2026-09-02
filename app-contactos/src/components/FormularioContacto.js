import React, { useState } from 'react';
import './FormularioContacto.css';

function FormularioContacto({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !telefono.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    onAgregar({ nombre, telefono });
    setNombre('');
    setTelefono('');
  };

  return (
    <div className="formulario-container">
      <h2>Agregar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <button type="submit">Agregar Contacto</button>
      </form>
    </div>
  );
}

export default FormularioContacto;