/*************
 @file        Login.jsx
 @description Componente de React que muestra formulario para login de usuarios.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '/src/context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError(false);
    
    try {
      const res = await axios.post('http://localhost:3000/usuarios/login', formData);
      login(res.data.token); // <- actualiza contexto
      localStorage.setItem('token', res.data.token);
      setMensaje('Inicio de sesión exitoso ');
      
      // Redireccionar a una ruta protegida
      setTimeout(() => navigate('/Inicio'), 1500);
    } catch (err) {
      setError(true);
      setMensaje(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      p={4}
      maxWidth={400}
      mx="auto"
      mt={8}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h5" mb={2}>
        Iniciar Sesión
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          size='small'
          label="Correo electrónico"
          type="email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          size='small'
          label="Contraseña"
          type="password"
          name="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Ingresar
        </Button>
      </form>

      {mensaje && (
        <Alert severity={error ? 'error' : 'success'} sx={{ mt: 2, width: '100%' }}>
          {mensaje}
        </Alert>
      )}
    </Box>
  );
};

export default Login;

