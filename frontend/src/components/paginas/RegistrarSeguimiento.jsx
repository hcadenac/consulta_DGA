/*************
 @file        RegistarSeguimiento.jsx
 @description Componente de React que muestra formulario para ingresar nuevas seguimientos.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrarSeguimiento = () => {
  const [formData, setFormData] = useState({
    departamento_id: '',
    funcionario_id: '',
    fecha_seguimiento: '',
    resultado_visita: '',
    observaciones: '',
    });
  const [empresas, setEmpresas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [nombrefuncionario, setNombrefuncionario] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [razonSocial, setRazonSocial] = useState('')

  // Cargar empresas y funcionarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEmpresas, resFuncionarios] = await Promise.all([
          axios.get('http://localhost:3000/empresas'),
          axios.get('http://localhost:3000/funcionarios'),
        ]);
        setEmpresas(resEmpresas.data);
        setFuncionarios(resFuncionarios.data);
      } catch (err) {
        setErrorMsg("Error al cargar datos: " + err.message);
      }
    };
    fetchData();
  }, []);

  
  // Lógica  en handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Actualizar el estado del formulario para todos los campos
    setFormData(prevData => ({
        ...prevData,
        [name]: value,
    }));

    // Lógica específica para cuando cambia el NIT
    if (name === 'departamento_id') {
      const empresaSeleccionada = empresas.find(emp => emp.nit === value);
      setRazonSocial(empresaSeleccionada.razon_social);
    }
    if (name === 'funcionario_id') { 
      const nombreSeleccionado = funcionarios.find(fun => fun.cedula === value);
      setNombrefuncionario(nombreSeleccionado.nombre);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await axios.post('http://localhost:3000/seguimientos', formData);
     
      setSuccessMsg('Seguimiento registrado correctamente..');
      setTimeout(() => navigate('/ConsultaSeguimientos'), 1500);
    } catch (err) {
      setErrorMsg('Error al registrar seguimiento: ' + (err.response?.data?.error || err.message));
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
      <Paper elevation={3} sx={{ padding: 4, width: '500px' }}>
        <Typography variant="h6" gutterBottom>
          Registrar Nuevo Seguimiento
        </Typography>

        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <form onSubmit={handleSubmit}>
          {/* Select de empresas */}
          <TextField
            select
            fullWidth
            size="small"
            label="NIT Empresa"
            name="departamento_id"
            value={formData.nit_empresa}
            onChange={handleChange}
            margin="normal"
            required
          >
            {empresas.map((empresa) => (
              <MenuItem key={empresa.nit} value={empresa.nit}>
                {empresa.nit}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            //select
            fullWidth
            size="small"
            label="Razon Social"
            name="departamento_nombre"
            value={razonSocial}
            onChange={handleChange}
            margin="normal"
            InputProps={{ // **Importante:** deshabilitar la edición
              readOnly: true, 
            }}
            variant="filled"
            required
          >
            
          </TextField>

          {/* Select de funcionarios */}
          <TextField
            select
            fullWidth
            size="small"
            label="Funcionario"
            name="funcionario_id"
            value={formData.funcionario_id}
            onChange={handleChange}
            margin="normal"
            required
          >
            {funcionarios.map((func) => (
              <MenuItem key={func.cedula} value={func.cedula}>
                {func.cedula}
              </MenuItem>
            ))}
          </TextField>
            <TextField
            //select
            fullWidth
            size="small"
            label="Nombre Funcionario"
            name="nombre_funcionario"
            value={nombrefuncionario}
            onChange={handleChange}
            margin="normal"
            InputProps={{ // **Importante:** deshabilitar la edición
              readOnly: true, 
            }}
            variant="filled"
            required
          >
            
          </TextField>
          <TextField
            fullWidth
            size="small"
            label="Fecha de Seguimiento"
            type="date"
            name="fecha_seguimiento"
            value={formData.fecha_seguimiento}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Resultado de la Visita"
            name="resultado_visita"
            value={formData.resultado_visita}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
            required
          />
          <TextField
            fullWidth
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
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

export default RegistrarSeguimiento;


