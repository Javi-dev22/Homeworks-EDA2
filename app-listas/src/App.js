import React, { useState } from 'react';
import './App.css';
import ComponenteListaEnlazada from './components/ListaEnlazada';
import ComponenteListaDobleEnlazada from './components/ListaDobleEnlazada';

function App() {
    const [pagina, setPagina] = useState('simple');

    return (
        <div className="app">
            <header className="app-header">
                <h1>Explorador de Listas</h1>
                <div className="nav-buttons">
                    <button 
                        className={`nav-btn ${pagina === 'simple' ? 'active' : ''}`}
                        onClick={() => setPagina('simple')}
                    >
                        🎵 Lista Enlazada
                    </button>
                    <button 
                        className={`nav-btn ${pagina === 'doble' ? 'active' : ''}`}
                        onClick={() => setPagina('doble')}
                    >
                        🌐 Lista Doble Enlazada
                    </button>
                </div>
            </header>

            <main className="app-main">
                {pagina === 'simple' ? <ComponenteListaEnlazada /> : <ComponenteListaDobleEnlazada />}
            </main>

        </div>
    );
}

export default App;
