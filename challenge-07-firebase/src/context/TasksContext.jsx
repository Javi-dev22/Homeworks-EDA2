import { createContext, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAuthContext } from './AuthContext';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const { user } = useAuthContext();
  const tasksData = useTasks(user?.uid); // Pasa el ID del usuario al hook
  
  return <TasksContext.Provider value={tasksData}>{children}</TasksContext.Provider>;
}

export const useTasksContext = () => useContext(TasksContext);