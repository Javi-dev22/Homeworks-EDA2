import React from 'react';
import { Link } from 'react-router-dom';

export default function BuscadorPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Challenge 12: Buscador Inteligente (Trie + Heap)</h2>
      <p>Aquí se renderizaría el buscador con las estructuras de datos.</p>
      <Link to="/dashboard">Volver al Dashboard</Link>
    </div>
  );
}