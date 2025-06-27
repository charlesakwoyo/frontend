// src/context/AuthProvider.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) setIsAuthenticated(true);
  }, []);

  const login = async (email, password, onSuccess) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        email,
        password,
      });
      const token = res.data.accessToken;
      if (typeof token === 'string') {
        sessionStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        onSuccess();
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, onSuccess) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:4000/api/register', {
        email,
        password,
      });
      const token = res.data.accessToken;
      if (typeof token === 'string') {
        sessionStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        onSuccess();
      } else {
        setError('Registration failed: No token received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
