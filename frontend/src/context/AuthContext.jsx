// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(() => {
    try {
      const t = localStorage.getItem('token');
      return t ? jwtDecode(t) : null;
    } catch {
      return null;
    }
  });

  // Login (solo actualiza estado y localStorage)
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUsuario(jwtDecode(newToken));
  };

  // Logout (reactivo, sin navegar)
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  }, []);

  // Verificar expiración y refrescar token
  useEffect(() => {
    const checkToken = async () => {
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          logout();
        } else if (decoded.exp - currentTime < 300) {
          const response = await axios.post('/api/auth/refresh', {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const newToken = response.data.token;
          login(newToken);
        }
      } catch {
        logout();
      }
    };

    const interval = setInterval(checkToken, 60000);
    checkToken();

    return () => clearInterval(interval);
  }, [token, logout]);

  const value = useMemo(() => ({
    token,
    usuario,
    isAuthenticated: !!token,
    login,
    logout,
  }), [token, usuario, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

