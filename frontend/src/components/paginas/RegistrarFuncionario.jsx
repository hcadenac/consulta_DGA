/*************
 @file        RegistarFuncionario.jsx
 @description Componente de React que muestra formulario para ingresar nuevas funcionarios.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import axios from 'axios';

const RegistrarFuncionario = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    cargo: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const res = await axios.post('http://localhost:3000/funcionarios', formData);
      setSuccessMsg(`Funcionario ${res.data.nombre} registrado correctamente ✅`);
      setFormData({ cedula: '', nombre: '', cargo: '' }); // limpiar formulario
    } catch (err) {
      setErrorMsg('Error al registrar funcionario: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      sx={{ marginLeft: '200px', marginTop: '64px', padding: 3 }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h6" gutterBottom>
          Registrar Nuevo Funcionario
        </Typography>

        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Registrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegistrarFuncionario;
