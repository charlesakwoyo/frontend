// src/components/AuthPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import {
  Container, TextField, Button, Typography, Alert, Box
} from '@mui/material';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { login, register, isAuthenticated, loading, error } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    const onSuccess = () => navigate('/dashboard');
    isLogin ? login(email, password, onSuccess) : register(email, password, onSuccess);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        {isLogin ? 'Login' : 'Register'}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
      </Button>
      <Box textAlign="center" mt={2}>
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthPage;
