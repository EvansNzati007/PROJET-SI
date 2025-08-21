import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    id: localStorage.getItem('userId') || null,
    username: localStorage.getItem('username') || null, // Ajout de username
  });

  const login = (token, role, id, username) => {
    setUser({ token, role, id, username });
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', id);
    localStorage.setItem('username', username); // Stockage de username
  };

  const logout = () => {
    setUser({ token: null, role: null, id: null, username: null });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); // Suppression de username
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;