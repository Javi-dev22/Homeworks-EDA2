import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import './styles.scss'; // <-- Importamos SASS aquí

// Protege las rutas privadas
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;