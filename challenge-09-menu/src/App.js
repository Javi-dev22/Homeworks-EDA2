import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { rootMenu } from './menuData';
import './App.css';

function renderRoutes(node) {
  let routes = [];
  
  if (node.link && node.component) {
    routes.push(
      <Route key={node.link} path={node.link} element={<node.component />} />
    );
  }
  
  node.children.forEach(child => {
    routes = routes.concat(renderRoutes(child));
  });
  
  return routes;
}

function Layout() {
  const location = useLocation();

  const getTitle = (node) => {
    if (node.link === location.pathname) return node.title;
    for (let child of node.children) {
      const title = getTitle(child);
      if (title) return title;
    }
    return null;
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar menuData={rootMenu} />
      
      <div style={{ flex: 1, padding: '30px', background: '#f9f9f9' }}>
        <h1 style={{ color: '#333' }}>{getTitle(rootMenu) || 'Selecciona una opción'}</h1>
        <hr style={{ marginBottom: '20px', border: '1px solid #ddd' }} />
        
        <Routes>
          {renderRoutes(rootMenu)}
          <Route path="/" element={<Navigate to="/inicio" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;