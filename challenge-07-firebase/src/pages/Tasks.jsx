import React, { useState } from 'react';
import { useTasksContext } from '../context/TasksContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Tasks() {
  const [newTask, setNewTask] = useState('');
  const { tasks, addTask, toggleTask, deleteTask } = useTasksContext();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Hola, {user?.email}</h2>
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      </div>

      <form onSubmit={handleAdd} className="input-group mb-4">
        <input type="text" className="form-control" placeholder="Nueva tarea..." value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button type="submit" className="btn btn-success">Agregar</button>
      </form>

      <ul className="list-group">
        {tasks.length === 0 && <li className="list-group-item text-center">No hay tareas pendientes.</li>}
        {tasks.map(task => (
          <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${task.done ? 'bg-light text-muted' : ''}`}>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={task.done} onChange={() => toggleTask(task.id, task.done)} id={task.id} />
              <label className="form-check-label ms-2" style={{ textDecoration: task.done ? 'line-through' : 'none' }} htmlFor={task.id}>
                {task.title}
              </label>
            </div>
            <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-outline-danger">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}