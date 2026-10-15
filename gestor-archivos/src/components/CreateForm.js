import React, { useState } from 'react';
import './CreateForm.css';

export default function CreateForm({ onAdd, parentId }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('folder');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    try {
      await onAdd({ name: name.trim(), type, parentId });
      setName('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del archivo/carpeta"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="folder">Carpeta</option>
        <option value="file">Archivo</option>
      </select>
      <button type="submit">Crear</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}