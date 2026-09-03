import React, { useState } from 'react';
import { paginasWeb } from '../data/datosPrueba';
import './ListaDobleEnlazada.css';

// Implementación de Nodo Doble
class NodoDoble {
    constructor(dato) {
        this.dato = dato;
        this.anterior = null;
        this.siguiente = null;
    }
}

// Implementación de Lista Doblemente Enlazada
class ListaDobleEnlazadaSimple {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.longitud = 0;
    }

    // Agregar al final
    agregar(dato) {
        const nuevoNodo = new NodoDoble(dato);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            this.cola.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.cola;
            this.cola = nuevoNodo;
        }
        this.longitud++;
    }

    // Obtener todos los elementos (de adelante hacia atrás)
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

    // Obtener el anterior de un elemento
    obtenerAnterior(posicion) {
        if (posicion <= 0 || posicion >= this.longitud) return null;
        let actual = this.cabeza;
        for (let i = 0; i < posicion - 1; i++) {
            actual = actual.siguiente;
        }
        return actual.dato;
    }

    // Obtener el siguiente de un elemento
    obtenerSiguiente(posicion) {
        if (posicion < 0 || posicion >= this.longitud - 1) return null;
        let actual = this.cabeza;
        for (let i = 0; i < posicion + 1; i++) {
            actual = actual.siguiente;
        }
        return actual.dato;
    }
}

// COMPONENTE REACT - Cambié el nombre para evitar conflicto
function ComponenteListaDobleEnlazada() {
    const [lista] = useState(() => {
        const nuevaLista = new ListaDobleEnlazadaSimple();
        paginasWeb.forEach(pagina => nuevaLista.agregar(pagina));
        return nuevaLista;
    });

    const [indiceActual, setIndiceActual] = useState(0);
    const [paginaActual, setPaginaActual] = useState(lista.obtener(0));

    // Navegar hacia adelante (siguiente)
    const adelante = () => {
        if (indiceActual < lista.longitud - 1) {
            const nuevoIndice = indiceActual + 1;
            setIndiceActual(nuevoIndice);
            setPaginaActual(lista.obtener(nuevoIndice));
        }
    };

    // Navegar hacia atrás (anterior)
    const atras = () => {
        if (indiceActual > 0) {
            const nuevoIndice = indiceActual - 1;
            setIndiceActual(nuevoIndice);
            setPaginaActual(lista.obtener(nuevoIndice));
        }
    };

    // Obtener todas las páginas
    const todasLasPaginas = lista.obtenerTodos();

    // Obtener página anterior y siguiente (para mostrar)
    const paginaAnterior = indiceActual > 0 ? lista.obtener(indiceActual - 1) : null;
    const paginaSiguiente = indiceActual < lista.longitud - 1 ? lista.obtener(indiceActual + 1) : null;

    return (
        <div className="lista-doble-container">
            <h2>🌐 Lista Doble Enlazada</h2>
            <p className="descripcion">Historial de navegación (adelante/atrás)</p>

            {/* Navegador actual */}
            <div className="navegador-actual">
                <div className="flecha-navegacion">
                    {paginaAnterior && (
                        <div className="pagina-preview anterior">
                            <span className="flecha">⬅️</span>
                            <span className="preview-titulo">{paginaAnterior.titulo}</span>
                        </div>
                    )}
                </div>

                <div className="pagina-actual">
                    <h3>Página actual</h3>
                    {paginaActual ? (
                        <div className="pagina-info">
                            <div className="pagina-titulo">{paginaActual.titulo}</div>
                            <div className="pagina-url">🔗 {paginaActual.url}</div>
                            <div className="pagina-fecha">🕐 {paginaActual.fecha}</div>
                            <div className="indicador-posicion">
                                {indiceActual + 1} de {lista.longitud}
                            </div>
                        </div>
                    ) : (
                        <p>No hay páginas</p>
                    )}
                </div>

                <div className="flecha-navegacion">
                    {paginaSiguiente && (
                        <div className="pagina-preview siguiente">
                            <span className="preview-titulo">{paginaSiguiente.titulo}</span>
                            <span className="flecha">➡️</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Botones de navegación */}
            <div className="controles">
                <button 
                    onClick={atras} 
                    disabled={indiceActual === 0}
                    className="btn-navegacion btn-atras"
                >
                    ⬅️ Atrás
                </button>
                <button 
                    onClick={adelante} 
                    disabled={indiceActual === lista.longitud - 1}
                    className="btn-navegacion btn-adelante"
                >
                    Adelante ➡️
                </button>
            </div>

            {/* Historial completo */}
            <div className="historial-completo">
                <h4>Historial de navegación ({lista.longitud} páginas)</h4>
                <div className="historial-lista">
                    {todasLasPaginas.map((pagina, index) => (
                        <div 
                            key={pagina.id} 
                            className={`historial-item ${index === indiceActual ? 'activo' : ''}`}
                            onClick={() => {
                                setIndiceActual(index);
                                setPaginaActual(pagina);
                            }}
                        >
                            <div className="historial-numero">{index + 1}</div>
                            <div className="historial-contenido">
                                <div className="historial-titulo">{pagina.titulo}</div>
                                <div className="historial-url">{pagina.url}</div>
                            </div>
                            {index === indiceActual && <div className="historial-indicador"></div>}
                            {index > 0 && <div className="conector">↑</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ComponenteListaDobleEnlazada;