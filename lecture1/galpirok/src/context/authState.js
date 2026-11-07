import { createContext, useContext } from 'react';

// Providers and consumers share this instance outside the component refresh boundary.
export const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
