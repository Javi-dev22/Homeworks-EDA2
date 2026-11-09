import React, { useMemo } from 'react';
import { Graph } from 'react-d3-graph';
import { nodes, links } from './data/grafoData';

export default function Grafo() {
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 600, // Tamaño de los nodos
      highlightStrokeColor: 'blue',
      labelProperty: 'label',
    },
    link: {
      highlightColor: 'lightblue',
      strokeWidth: 2,
    },
    d3: {
      gravity: -400, 
      linkLength: 200, // Enlaces
      disableLinkForce: false,
    },
  };

  const data = useMemo(() => {
    return {
      nodes: nodes.map(node => ({
        ...node,
        color: node.type === 'city' ? '#3498db' : '#2ecc71',
      })),
      links: links.map(link => ({ ...link })), 
    };
  }, []);

  const onClickNode = (nodeId) => {
    const nodo = nodes.find(n => n.id === nodeId);
    if (nodo.type === 'person') {
      alert(`Persona: ${nodo.label}\nEdad: ${nodo.age}\nCiudad: ${nodo.city}`);
    } else {
      alert(`Ciudad: ${nodo.label}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Challenge 11: Grafo de Amigos y Ciudades</h2>
      <p>Haga clic en cualquier nodo para ver su información.</p>
      
      <div style={{ height: '500px', width: '100%', border: '1px solid #ccc', borderRadius: '10px', marginBottom: '20px', position: 'relative' }}>
        <Graph
          id="graph-id"
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
        />
      </div>

      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        <h3>Listado de personas por ciudad</h3>
        <ul>
          {['Bogotá', 'Medellín', 'Cali'].map(ciudad => {
            const habitantes = nodes.filter(n => n.type === 'person' && n.city === ciudad);
            return (
              <li key={ciudad} style={{ marginBottom: '8px' }}>
                <strong>{ciudad}:</strong> {habitantes.length > 0 ? habitantes.map(p => `${p.label} (${p.age} años)`).join(', ') : 'Nadie'}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}