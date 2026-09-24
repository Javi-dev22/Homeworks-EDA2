import React, { useState } from 'react';
import { librosIniciales } from '../data/libros';
import './PilaLibros.css';

class Pila {
    constructor() {
        this.elementos = [];
    }

    apilar(dato) {
        this.elementos.push(dato);
    }

    desapilar() {
        if (this.estaVacia()) return null;
        return this.elementos.pop();
    }

    verTope() {
        if (this.estaVacia()) return null;
        return this.elementos[this.elementos.length - 1];
    }

    estaVacia() {
        return this.elementos.length === 0;
    }

    tamaño() {
        return this.elementos.length;
    }

    obtenerTodos() {
        return [...this.elementos].reverse();
    }
}

function PilaLibros() {
    const [pila] = useState(() => {
        const nuevaPila = new Pila();
        librosIniciales.forEach(libro => nuevaPila.apilar(libro));
        return nuevaPila;
    });

    const [libros, setLibros] = useState(pila.obtenerTodos());
    const [formulario, setFormulario] = useState({
        nombre: '',
        isbn: '',
        autor: '',
        editorial: ''
    });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleAgregar = (e) => {
        e.preventDefault();

        if (!formulario.nombre || !formulario.isbn || !formulario.autor || !formulario.editorial) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const nuevoLibro = {
            id: Date.now(),
            nombre: formulario.nombre,
            isbn: formulario.isbn,
            autor: formulario.autor,
            editorial: formulario.editorial
        };

        pila.apilar(nuevoLibro);
        setLibros(pila.obtenerTodos());

        setFormulario({
            nombre: '',
            isbn: '',
            autor: '',
            editorial: ''
        });
    };

    const handleDesapilar = () => {
        if (pila.estaVacia()) {
            alert('La pila está vacía');
            return;
        }
        pila.desapilar();
        setLibros(pila.obtenerTodos());
    };

    return (
        <div className="pila-container">
            <h1>Pila de Libros</h1>
            <p className="subtitulo">Estructura de datos: Pila (LIFO - Last In, First Out)</p>

            {/* Formulario */}
            <div className="formulario-container">
                <h2>Agregar Nuevo Libro</h2>
                <form onSubmit={handleAgregar}>
                    <div className="campo">
                        <label>Nombre del libro:</label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Ej: Cien Años de Soledad"
                            value={formulario.nombre}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo">
                        <label>ISBN:</label>
                        <input
                            type="text"
                            name="isbn"
                            placeholder="Ej: 978-0307474728"
                            value={formulario.isbn}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo">
                        <label>Autor:</label>
                        <input
                            type="text"
                            name="autor"
                            placeholder="Ej: Gabriel García Márquez"
                            value={formulario.autor}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo">
                        <label>Editorial:</label>
                        <input
                            type="text"
                            name="editorial"
                            placeholder="Ej: Sudamericana"
                            value={formulario.editorial}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-agregar">
                        Apilar Libro
                    </button>
                </form>
            </div>

            <div className="info-pila">
                <div className="info-item">
                    <span className="info-label">Total de libros:</span>
                    <span className="info-valor">{pila.tamaño()}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Tope de la pila:</span>
                    <span className="info-valor">
                        {pila.verTope()?.nombre || 'Pila vacía'}
                    </span>
                </div>
                <button 
                    onClick={handleDesapilar}
                    className="btn-desapilar"
                    disabled={pila.estaVacia()}
                >
                    Desapilar (quitar tope)
                </button>
            </div>

            <div className="pila-visual">
                <h2>Pila Actual ({libros.length} libros)</h2>
                <p className="aviso">El primer libro de la lista es el tope de la pila</p>

                {libros.length === 0 ? (
                    <p className="vacio">La pila está vacía</p>
                ) : (
                    <div className="libros-lista">
                        {libros.map((libro, index) => (
                            <div 
                                key={libro.id} 
                                className={`libro-item ${index === 0 ? 'tope' : ''}`}
                            >
                                {index === 0 && (
                                    <div className="badge-tope"> TOPE</div>
                                )}
                                <div className="libro-numero">
                                    #{libros.length - index}
                                </div>
                                <div className="libro-info">
                                    <div className="libro-nombre">{libro.nombre}</div>
                                    <div className="libro-detalles">
                                        <span>{libro.autor}</span>
                                        <span>{libro.editorial}</span>
                                        <span>{libro.isbn}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PilaLibros;