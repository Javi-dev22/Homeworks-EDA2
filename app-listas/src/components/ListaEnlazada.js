import React, { useState } from 'react';
import { canciones } from '../data/datosPrueba';
import './ListaEnlazada.css';

// Implementación de Nodo
class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

// Implementación de Lista Enlazada Simple
class ListaEnlazadaSimple {
    constructor() {
        this.cabeza = null;
        this.longitud = 0;
    }

    agregar(dato) {
        const nuevoNodo = new Nodo(dato);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        this.longitud++;
    }

    // Obtener todos los elementos
    obtenerTodos() {
        const elementos = [];
        let actual = this.cabeza;
        while (actual) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }

    // Obtener elemento por posición
    obtener(posicion) {
        if (posicion < 0 || posicion >= this.longitud) return null;
        let actual = this.cabeza;
        for (let i = 0; i < posicion; i++) {
            actual = actual.siguiente;
        }
        return actual.dato;
    }
}

// COMPONENTE REACT - Cambié el nombre para evitar conflicto
function ComponenteListaEnlazada() {
    const [lista] = useState(() => {
        const nuevaLista = new ListaEnlazadaSimple();
        canciones.forEach(cancion => nuevaLista.agregar(cancion));
        return nuevaLista;
    });

    const [indiceActual, setIndiceActual] = useState(0);
    const [cancionActual, setCancionActual] = useState(lista.obtener(0));

    // Navegar a la siguiente canción
    const siguiente = () => {
        if (indiceActual < lista.longitud - 1) {
            const nuevoIndice = indiceActual + 1;
            setIndiceActual(nuevoIndice);
            setCancionActual(lista.obtener(nuevoIndice));
        }
    };

    // Navegar a la canción anterior
    const anterior = () => {
        if (indiceActual > 0) {
            const nuevoIndice = indiceActual - 1;
            setIndiceActual(nuevoIndice);
            setCancionActual(lista.obtener(nuevoIndice));
        }
    };

    // Obtener todas las canciones para mostrar
    const todasLasCanciones = lista.obtenerTodos();

    return (
        <div className="lista-enlazada-container">
            <h2>🎵 Lista Enlazada</h2>
            <p className="descripcion">Reproducción de canciones en orden</p>

            {/* Reproductor actual */}
            <div className="reproductor-actual">
                <h3>Reproduciendo ahora</h3>
                {cancionActual ? (
                    <div className="cancion-actual">
                        <div className="cancion-titulo">{cancionActual.titulo}</div>
                        <div className="cancion-artista">🎤 {cancionActual.artista}</div>
                        <div className="cancion-duracion">⏱️ {cancionActual.duracion}</div>
                        <div className="indicador-posicion">
                            {indiceActual + 1} de {lista.longitud}
                        </div>
                    </div>
                ) : (
                    <p>No hay canciones</p>
                )}
            </div>

            {/* Botones de navegación */}
            <div className="controles">
                <button 
                    onClick={anterior} 
                    disabled={indiceActual === 0}
                    className="btn-navegacion"
                >
                    ⬅️ Anterior
                </button>
                <button 
                    onClick={siguiente} 
                    disabled={indiceActual === lista.longitud - 1}
                    className="btn-navegacion"
                >
                    Siguiente ➡️
                </button>
            </div>

            {/* Lista completa de canciones */}
            <div className="lista-completa">
                <h4>Lista de reproducción ({lista.longitud} canciones)</h4>
                <ul>
                    {todasLasCanciones.map((cancion, index) => (
                        <li 
                            key={cancion.id} 
                            className={index === indiceActual ? 'activo' : ''}
                            onClick={() => {
                                setIndiceActual(index);
                                setCancionActual(cancion);
                            }}
                        >
                            <span className="numero">{index + 1}.</span>
                            <span className="titulo">{cancion.titulo}</span>
                            <span className="artista">- {cancion.artista}</span>
                            {index === indiceActual && <span className="indicador">▶️</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ComponenteListaEnlazada;