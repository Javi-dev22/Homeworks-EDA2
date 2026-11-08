import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './hooks/useAuth';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Cargar las tareas
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks(); // Si hay un cambio en la BD, recarga la lista
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Crear
  const createTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const { error } = await supabase
      .from('tasks')
      .insert([{ title: newTaskTitle, user_id: user.id, status: 'pendiente' }]);
      
    if (error) alert("Error al crear: " + error.message);
    
    setNewTaskTitle('');
    fetchTasks(); // Forzamos la recarga
  };

  // Actualizar
  const toggleTask = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pendiente' ? 'completada' : 'pendiente';
    
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) alert("Error al actualizar: " + error.message);
    
    fetchTasks(); 
  };

  // Eliminar
  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) alert("Error al eliminar: " + error.message);
    
    fetchTasks(); 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Mis Tareas</h2>
        <button onClick={signOut} style={{ padding: '8px 15px', cursor: 'pointer', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px' }}>
          Cerrar Sesión
        </button>
      </div>

      <form onSubmit={createTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ flex: 1, padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
          Agregar
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>No hay tareas aún.</p>}
        
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
            <span 
              onClick={() => toggleTask(task.id, task.status)}
              style={{ 
                cursor: 'pointer', 
                textDecoration: task.status === 'completada' ? 'line-through' : 'none', 
                color: task.status === 'completada' ? 'gray' : 'black',
                flex: 1 
              }}
            >
              {task.title} <strong style={{ fontSize: '12px', color: task.status === 'completada' ? 'green' : 'orange' }}>({task.status})</strong>
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red', fontSize: '18px', marginLeft: '10px' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}