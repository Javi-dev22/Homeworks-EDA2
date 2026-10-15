import React from 'react';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { useFileTree } from './hooks/useFileTree';
import Login from './components/Login';
import TreeView from './components/TreeView';
import CreateForm from './components/CreateForm';

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const { loading, addNode, getNestedTree } = useFileTree();

  if (authLoading) return <div className="loading">Cargando...</div>;
  if (!user) return <Login />;

  const handleAdd = async ({ name, type, parentId }) => {
    await addNode({ name, type, email: user.email, parentId });
  };

  const nestedTree = getNestedTree();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestor de Archivos</h1>
        <div className="user-info">
          <span>✉ {user.email}</span>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <CreateForm onAdd={handleAdd} parentId={null} />
        </aside>
        
        <section className="content">
          {loading ? (
            <div className="loading">Cargando archivos...</div>
          ) : (
            <TreeView nodes={nestedTree} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;