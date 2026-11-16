import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authData = useAuth();
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);