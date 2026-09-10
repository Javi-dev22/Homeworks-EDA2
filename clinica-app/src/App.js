import React from 'react';
import './App.css';
import { useClinica } from './hooks/useClinica';
import ListaEspera from './components/ListaEspera';
import HistorialAtencion from './components/HistorialAtencion';
import RotacionMedicos from './components/RotacionMedicos';
import ComiteAdministrativo from './components/ComiteAdministrativo';

function App() {
    const {
        listaEspera,
        historial,
        medicosLista,
        comiteLista,
        medicoActual,
        turnosAtendidos,
        atenderPaciente,
        agregarPaciente,
        rotarComiteSiguiente,
        rotarComiteAnterior,
    } = useClinica();

    return (
        <div className="app">
            <header className="header">
                <h1>Sistema Clínica</h1>
                <div className="stats">
                    <span>Turnos: {turnosAtendidos}</span>
                    <span>Espera: {listaEspera.longitud}</span>
                    <span>Médico: {medicoActual?.nombre || 'Sin médico'}</span>
                </div>
            </header>

            <main className="main">
                <div className="grid">
                    <div className="item">
                        <ListaEspera 
                            lista={listaEspera}
                            onAtender={atenderPaciente}
                            onAgregar={agregarPaciente}
                        />
                    </div>
                    <div className="item">
                        <HistorialAtencion historial={historial} />
                    </div>
                    <div className="item">
                        <RotacionMedicos 
                            medicosLista={medicosLista}
                            medicoActual={medicoActual}
                        />
                    </div>
                    <div className="item">
                        <ComiteAdministrativo 
                            comiteLista={comiteLista}
                            onRotarSiguiente={rotarComiteSiguiente}
                            onRotarAnterior={rotarComiteAnterior}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;