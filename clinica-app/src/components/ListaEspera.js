import React, { useState } from 'react';
import './ListaEspera.css';

function ListaEspera({ lista, onAtender, onAgregar }) {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [sintoma, setSintoma] = useState('');

    const pacientes = lista.obtenerTodos();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !edad || !sintoma) {
            alert('Completa todos los campos');
            return;
        }
        onAgregar(nombre, edad, sintoma);
        setNombre('');
        setEdad('');
        setSintoma('');
    };

    return (
        <div className="lista-espera">
            <h2>Pacientes en Espera</h2>
            <p>Total: {pacientes.length}</p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="formulario">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Síntoma"
                    value={sintoma}
                    onChange={(e) => setSintoma(e.target.value)}
                />
                <button type="submit">Agregar Paciente</button>
            </form>

            {/* Lista */}
            <div className="pacientes">
                {pacientes.length === 0 ? (
                    <p className="vacio">No hay pacientes en espera</p>
                ) : (
                    pacientes.map((p, i) => (
                        <div key={p.id} className="paciente">
                            <div>
                                <strong>{i + 1}. {p.nombre}</strong>
                                <span> ({p.edad} años)</span>
                                <span className="sintoma"> - {p.sintoma}</span>
                            </div>
                            <button onClick={() => onAtender(p.id)}>
                                Atender
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ListaEspera;