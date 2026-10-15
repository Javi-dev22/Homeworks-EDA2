import React, { useState } from 'react';
import './TreeView.css';

function TreeNode({ node, level = 0 }) {
  const [expanded, setExpanded] = useState(true);
  const isFolder = node.type === 'folder';
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="tree-node" style={{ marginLeft: level * 24 }}>
      <div className={`node-header ${isFolder ? 'folder' : 'file'}`}>
        {isFolder && (
          <span 
            className="toggle" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '▾' : '▸'}
          </span>
        )}
        <span className="name">{node.name}</span>
        <span className="email" title={node.email}></span>
      </div>
      
      {isFolder && expanded && hasChildren && (
        <div className="children">
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ nodes }) {
  if (!nodes || nodes.length === 0) {
    return <p className="empty">No hay archivos ni carpetas</p>;
  }

  return (
    <div className="tree-view">
      {nodes.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}