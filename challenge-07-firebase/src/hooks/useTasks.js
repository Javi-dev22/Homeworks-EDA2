import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!userId) return;
    
    // Escuchar solo las tareas del usuario logueado
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    
    // onSnapshot permite que la lista se actualice en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    
    return unsubscribe;
  }, [userId]);

  const addTask = async (title) => {
    await addDoc(collection(db, "tasks"), { title, done: false, userId });
  };

  const toggleTask = async (id, currentStatus) => {
    await updateDoc(doc(db, "tasks", id), { done: !currentStatus });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}