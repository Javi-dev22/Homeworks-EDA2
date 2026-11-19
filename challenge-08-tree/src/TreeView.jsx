import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { ArbolBinario } from './arbol';

export default function TreeView() {
  const [arbol] = useState(() => {
    const a = new ArbolBinario();
    [10, 5, 15, 3, 7, 12, 20].forEach(num => a.insertar(num));
    return a;
  });

  const [buscarValor, setBuscarValor] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);
  const handleBuscar = (e) => {
    e.preventDefault();
    const valor = parseInt(buscarValor);
    if (!isNaN(valor)) {
      const existe = arbol.buscar(valor);
      setResultadoBusqueda(existe ? `El valor ${valor} SÍ está en el árbol.` : `El valor ${valor} NO está en el árbol.`);
    }
  };

  const datosD3 = arbol.obtenerDatosD3();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Árbol Binario de Búsqueda</h2>
      
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Recorridos:</h3>
        <p><strong>Inorden:</strong> {arbol.inorden().join(', ')}</p>
        <p><strong>Preorden:</strong> {arbol.preorden().join(', ')}</p>
        <p><strong>Postorden:</strong> {arbol.postorden().join(', ')}</p>
      </div>

      <form onSubmit={handleBuscar} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="number" 
          placeholder="Buscar valor..." 
          value={buscarValor} 
          onChange={e => setBuscarValor(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Buscar</button>
      </form>
      {resultadoBusqueda && <p style={{ fontWeight: 'bold' }}>{resultadoBusqueda}</p>}

      <div style={{ height: '500px', width: '100%', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
        {datosD3 ? (
          <Tree 
            data={datosD3} 
            orientation="vertical"
            pathFunc="step"
            translate={{ x: 400, y: 50 }}
            nodeSize={{ x: 80, y: 80 }}
          />
        ) : (
          <p style={{ padding: '20px' }}>El árbol está vacío.</p>
        )}
      </div>
    </div>
  );
}