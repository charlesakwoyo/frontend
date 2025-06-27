// src/components/Register.jsx
import React, { useContext, useEffect, useState } from 'react';
import {
  Container, TextField, Button, Typography, Alert, Box,
} from '@mui/material';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, isAuthenticated, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    register(email, password, () => navigate('/'));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
      <Box textAlign="center" mt={2}>
        <Button onClick={() => navigate('/login')}>Already have an account? Login</Button>
      </Box>
    </Container>
  );
};

export default Register;
