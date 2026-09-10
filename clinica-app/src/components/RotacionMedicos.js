import React from 'react';
import './RotacionMedicos.css';

function RotacionMedicos({ medicosLista, medicoActual }) {
    const todos = medicosLista.obtenerTodos();

    return (
        <div className="rotacion">
            <h2>Médicos de Guardia</h2>
            <p className="info">Cambio automático cada 10 segundos</p>

            <div className="medico-actual">
                <div className="info-medico">
                    <div className="nombre">{medicoActual?.nombre || "Sin médico"}</div>
                    <div className="especialidad">{medicoActual?.especialidad || "Esperando..."}</div>
                </div>
                <div className="estado">
                    <span className="punto"></span>
                    De guardia
                </div>
            </div>

            <div className="todos-medicos">
                <h4>Todos los médicos</h4>
                <div className="grid-medicos">
                    {todos.map((m) => (
                        <div 
                            key={m.id} 
                            className={`medico ${medicoActual?.id === m.id ? 'activo' : ''}`}
                        >
                            <div>{m.nombre}</div>
                            <div className="esp">{m.especialidad}</div>
                            {medicoActual?.id === m.id && <div className="badge">Actual</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RotacionMedicos;