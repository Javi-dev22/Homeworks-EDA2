import React from 'react';
import Contacto from './Contacto';
import './ListaContactos.css';

function ListaContactos({ contactos, onEliminar }) {
  if (contactos.length === 0) {
    return (
      <div className="lista-vacia">
        <p>No hay contactos guardados</p>
      </div>
    );
  }

  return (
    <div className="lista-container">
      <h2>Mis Contactos ({contactos.length})</h2>
      <div className="lista-contactos">
        {contactos.map((contacto) => (
          <Contacto
            key={contacto.id}
            contacto={contacto}
            onEliminar={onEliminar}
          />
        ))}
      </div>
    </div>
  );
}

export default ListaContactos;