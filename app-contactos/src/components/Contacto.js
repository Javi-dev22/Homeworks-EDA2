import React from 'react';
import './Contacto.css';

function Contacto({ contacto, onEliminar }) {
  return (
    <div className="contacto-item">
      <div className="contacto-info">
        <div className="contacto-nombre">{contacto.nombre}</div>
        <div className="contacto-telefono">📞 {contacto.telefono}</div>
      </div>
      <button 
        className="btn-eliminar"
        onClick={() => onEliminar(contacto.id)}
      >
        ✕
      </button>
    </div>
  );
}

export default Contacto;