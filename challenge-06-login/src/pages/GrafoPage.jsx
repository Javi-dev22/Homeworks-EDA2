import React from 'react';
import { Link } from 'react-router-dom';

export default function GrafoPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Challenge 11: Grafo de Amigos y Ciudades</h2>
      <p>Aquí se renderizaría el componente del grafo con D3.</p>
      <Link to="/dashboard">Volver al Dashboard</Link>
    </div>
  );
}