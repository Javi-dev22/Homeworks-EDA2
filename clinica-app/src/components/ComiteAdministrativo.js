import React from 'react';
import './ComiteAdministrativo.css';

function ComiteAdministrativo({ comiteLista, onRotarSiguiente, onRotarAnterior }) {
    const miembros = comiteLista.obtenerTodos();
    const actual = comiteLista.obtenerActual();

    return (
        <div className="comite">
            <h2>Comité Administrativo</h2>

            <div className="miembro-actual">
                <div className="info-miembro">
                    <div className="nombre">{actual?.nombre || "Sin miembro"}</div>
                    <div className="cargo">{actual?.cargo || "-"}</div>
                </div>
                <div className="controles">
                    <button onClick={onRotarAnterior} className="btn">⬅️</button>
                    <button onClick={onRotarSiguiente} className="btn">➡️</button>
                </div>
            </div>

            <div className="todos-miembros">
                <h4>Miembros ({miembros.length})</h4>
                <div className="grid-miembros">
                    {miembros.map((m) => (
                        <div 
                            key={m.id} 
                            className={`miembro ${actual?.id === m.id ? 'activo' : ''}`}
                        >
                            <div className="nom">{m.nombre}</div>
                            <div className="car">{m.cargo}</div>
                            {actual?.id === m.id && <div className="badge">Actual</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ComiteAdministrativo;