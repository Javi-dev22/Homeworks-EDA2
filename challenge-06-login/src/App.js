import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import GrafoPage from './pages/GrafoPage';
import BuscadorPage from './pages/BuscadorPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Dashboard Privado
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bienvenido, {user.email}</h1> 
      <button onClick={handleLogout} style={{ padding: '10px', marginBottom: '20px', cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/grafo">Ir al Grafo (Challenge 11)</Link>
        <Link to="/buscador">Ir al Buscador (Challenge 12)</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/grafo" element={<GrafoPage />} />
            <Route path="/buscador" element={<BuscadorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;