import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function MenuItem({ node }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className="menu-item">
      <div className="menu-content" onClick={handleClick}>
        {hasChildren ? (
          <span className="menu-title">
            {node.title} <span className="arrow">{isOpen ? '▼' : '▶'}</span>
          </span>
        ) : (
          <Link to={node.link} className="menu-link">
            {node.title}
          </Link>
        )}
      </div>

      {hasChildren && isOpen && (
        <ul className="submenu">
          {node.children.map((child, index) => (
            <MenuItem key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ menuData }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Menú</h3>
      </div>
      <ul className="menu-list">
        {menuData.children.map((node, index) => (
          <MenuItem key={index} node={node} />
        ))}
      </ul>
    </div>
  );
}