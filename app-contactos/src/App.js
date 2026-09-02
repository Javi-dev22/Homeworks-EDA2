import React, { useState, useEffect } from 'react';
import './App.css';
import ListaContactos from './components/ListaContactos';
import FormularioContacto from './components/FormularioContacto';

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const contactosIniciales = [
      { id: 1, nombre: 'Ana García', telefono: '3226598222' },
      { id: 2, nombre: 'Carlos López', telefono: '3151234567' },
      { id: 3, nombre: 'María Rodríguez', telefono: '3201234567' },
    ];

    setTimeout(() => {
      setContactos(contactosIniciales);
      setCargando(false);
    }, 1500);
  }, []);

  const agregarContacto = (nuevoContacto) => {
    const contactoConId = {
      ...nuevoContacto,
      id: Date.now(),
    };
    setContactos([...contactos, contactoConId]);
  };

  const eliminarContacto = (id) => {
    const contactosActualizados = contactos.filter(
      (contacto) => contacto.id !== id
    );
    setContactos(contactosActualizados);
  };

  return (
    <div className="app">
      <h1>📱 Agenda de Contactos</h1>
      
      {cargando ? (
        <div className="cargando">
          <div className="spinner"></div>
          <p>Cargando contactos...</p>
        </div>
      ) : (
        <>
          <FormularioContacto onAgregar={agregarContacto} />
          <ListaContactos 
            contactos={contactos} 
            onEliminar={eliminarContacto} 
          />
        </>
      )}
    </div>
  );
}

export default App;