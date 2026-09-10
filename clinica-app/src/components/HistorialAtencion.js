import React from 'react';
import './HistorialAtencion.css';

function HistorialAtencion({ historial }) {
    const todos = historial.obtenerTodos();
    const ultimos = historial.obtenerUltimos(5);

    return (
        <div className="historial">
            <h2>Historial de Atención</h2>
            <p>Total: {todos.length} atenciones</p>

            <h3>Últimos atendidos</h3>
            <div className="ultimos">
                {ultimos.length === 0 ? (
                    <p className="vacio">No hay atenciones recientes</p>
                ) : (
                    ultimos.map((h) => (
                        <div key={h.id} className="registro">
                            <span className="nombre">{h.paciente}</span>
                            <span className="medico">{h.medico}</span>
                            <span className="fecha">{h.fecha}</span>
                        </div>
                    ))
                )}
            </div>

            <h3>Todos los registros</h3>
            <div className="todos">
                {todos.length === 0 ? (
                    <p className="vacio">No hay historial</p>
                ) : (
                    todos.map((h) => (
                        <div key={h.id} className="registro-completo">
                            <div>
                                <strong>{h.paciente}</strong>
                            </div>
                            <div className="detalles">
                                <span>{h.medico}</span>
                                <span>{h.fecha}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HistorialAtencion;