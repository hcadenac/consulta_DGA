/*************
 @file        RegistarUsuario.jsx
 @description Componente de React que muestra formulario para ingresar nuevas usuarios.
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
  MenuItem,
  Paper
} from '@mui/material';
import axios from 'axios';

const RegistrarUsuario = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    email: '',
    password: '',
    rol: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError(false);
    try {
      const res = await axios.post('http://localhost:3000/usuarios/register', formData);
      setMensaje('Usuario registrado exitosamente');
    } catch (err) {
      setError(true);
      setMensaje(err.response?.data?.error || 'Error al registrar usuario');
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
        Registrar Usuarios
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
        size='small'
          label="Nombre de usuario"
          name="nombre_usuario"
          fullWidth
          margin="normal"
          value={formData.nombre_usuario}
          onChange={handleChange}
          required
        />
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
        <TextField
          size='small'
          label="Rol"
          name="rol"
          select
          fullWidth
          margin="normal"
          value={formData.rol}
          onChange={handleChange}
          required
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="usuario">Usuario</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrar
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

export default RegistrarUsuario;
