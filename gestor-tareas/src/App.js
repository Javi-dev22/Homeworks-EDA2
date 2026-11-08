import React from 'react';
import { useAuth } from './hooks/useAuth';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;

  return (
    <div>
      {user ? <Dashboard /> : <Auth />}
    </div>
  );
}

export default App;