/*************
 @file        RegistarDga.jsx
 @description Componente de React que muestra formulario para ingresar nuevas empresas.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/

import { Alert, Box, Button, TextField, Grid, Card, CardHeader, CardContent , Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';

// Tipos constantes
const TIPOS_DGA = [
  { value: 'INTERNO', label: 'INTERNO' },
  { value: 'EXTERNO', label: 'EXTERNO' },
];

// Estado inicial
const INITIAL_EMPRESA_DATA = {
  nit: '',
  razon_social: '',
  direccion: '',
  municipio_id: '',
  codigo_ciiu: '',
  camara_comercio: '',
  latitud: '',
  longitud: '',
  pagina_web: '',
  email: '',
  telefono: '',
  nombre_representante_legal: '',
  cedula_representante_legal: '',
  sector_productivo: '',
  tipo_departamento: '',
  nombre_encargado: '',   
  profesion: '',
  cargo: '',
  email_encargado: '',
  fecha_creacion: '',    
};

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      console.log('Municipio:', response.data);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

const useAlert = () => {
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  const closeAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return { alert, showAlert, closeAlert };
};

const FormTextField = ({ name, label, value, onChange, required = false, width = '40ch', ...props }) => (
  <TextField
    sx={{ width }}
    required={required}
    id={name}
    name={name}
    label={label}
    variant="outlined"
    size="small"
    fullWidth
    margin="normal"
    value={value}
    onChange={onChange}
    {...props}
  />
);

const FormSelectField = ({ name, label, value, onChange, options, required = false, width = '40ch' }) => (
  <TextField
    sx={{ width }}
    select
    required={required}
    id={name}
    name={name}
    label={label}
    size="small"
    variant="outlined"
    fullWidth
    margin="normal"
    value={value}
    onChange={onChange}
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default function RegistrarDga() {
  const navigate = useNavigate();
  //const { data: municipios, isLoading, error } = useApi('http://localhost:3000/municipios');
  //console.log(data)
  const { alert, showAlert, closeAlert } = useAlert();
  const [empresaData, setEmpresaData] = useState(INITIAL_EMPRESA_DATA);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/municipios');
    
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setEmpresaData({
      ...empresaData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Verificar si el NIT ya existe
    try {
      await axios.get(`http://localhost:3000/empresas/${empresaData.nit}`);
      showAlert('¡La empresa ya existe en la base de datos!', 'warning');
      return; // Salir de la función si ya existe
    } catch (error) {
      // Si el error es 404 (no encontrado), continuar con el registro
      if (!error.response || error.response.status !== 404) {
        console.error('Error al verificar NIT:', error);
        showAlert('Error al verificar el NIT de la empresa', 'error');
        return;
      }
    }

    // Registrar la nueva empresa
    const response = await axios.post('http://localhost:3000/empresas', empresaData);
    
    if (response.status === 201) {
      showAlert('¡Datos grabados correctamente!', 'success');
      setEmpresaData(INITIAL_EMPRESA_DATA);
      
      setTimeout(() => {
        navigate('/Inicio');
      }, 3000);
    }
  } catch (error) {
    console.error('Error al crear la empresa:', error);
    const errorMessage = error.response?.data?.message || 'Error al grabar los datos!';
    showAlert(errorMessage, 'error');
  }
};

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        width: '100%',
        //margin: '0 auto', 
        marginTop: '50px', 
        padding: '20px',
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        textAlign: 'center',
      }}
    >
      {/* <h2>Registrar Nuevo Departamento de Gestion Ambiental</h2> */}
      <Typography variant="h5" gutterBottom sx={{ backgroundColor:  '#eaf2f8', align: 'center' }}>
        Registrar Nuevo Departamento de Gestion Ambiental
      </Typography>
      
      {alert.open && (
        <Alert severity={alert.severity} onClose={closeAlert}>
          {alert.message}
        </Alert>
      )}
      
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardHeader 
        title="Información de la empresa"
        titleTypographyProps={{ variant: 'h5', align: 'center' }}
        sx={{ backgroundColor:  '#87B700 ',  color: 'white' }}
      />
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField 
                size='small'
                name="nit" 
                label="NIT" 
                value={empresaData.nit} 
                onChange={handleChange} 
                required 
                color="warning"
                sx={{ width: '30ch' }}
              />
              <TextField
                size='small'
                name="razon_social" 
                label="Razón Social" 
                value={empresaData.razon_social} 
                onChange={handleChange} 
                required 
                color="warning"
                // sx={{ flex: 1, maxWidth: '85ch' }}
              />
            
              <FormSelectField 
                  name="municipio_id" 
                  label="Municipio" 
                  value={empresaData.municipio_id} 
                  onChange={handleChange}
                  required 
                  color="warning"
                  sx={{ width: '30ch' }}
                  options={data.map(m => ({ value: m.codmpio, label: m.nombre }))}
              />
              <TextField 
                  size='small'
                  name="direccion" 
                  label="Dirección" 
                  value={empresaData.direccion} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  // sx={{ flex: 1, maxWidth: '85ch' }}
                />
              <TextField 
                size='small'
                name="telefono" 
                label="Telefono" 
                value={empresaData.telefono} 
                onChange={handleChange} 
                type="tel"
                required 
                color="warning"
                sx={{ width: '30ch' }}
              />

              <Box sx={{ display: 'flex', gap: 3, alignItems: 'left' }}>             
                <TextField 
                  size='small'
                  name="latitud" 
                  label="Latitud" 
                  value={empresaData.latitud} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
                <TextField 
                  size='small'
                  name="longitud" 
                  label="Longitud" 
                  value={empresaData.longitud} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
              </Box>
                <TextField 
                  size='small'
                  name="sector_productivo" 
                  label="Sector Productivo" 
                  value={empresaData.sector_productivo} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'left' }}>
                <TextField 
                  size='small'
                  name="codigo_ciiu" 
                  label="CIIU" 
                  value={empresaData.codigo_ciiu} 
                  onChange={handleChange} 
                  sx={{ flex: 1, width: '45ch' }}
                />
                <TextField 
                  size='small'
                  name="camara_comercio" 
                  label="Camara de Comercio" 
                  value={empresaData.camara_comercio} 
                  onChange={handleChange} 
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
              </Box>

                <TextField
                  size='small' 
                  name="cedula_representante_legal" 
                  label="Cedula Representante Legal" 
                  value={empresaData.cedula_representante_legal} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ width: '30ch' }}
                />
                <TextField 
                  size='small'
                  name="nombre_representante_legal" 
                  label="Nombre Representante Legal" 
                  value={empresaData.nombre_representante_legal} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                />
               <Box sx={{ display: 'flex', gap: 3, alignItems: 'left' }}>
                <TextField 
                  size='small'
                  name="pagina_web" 
                  label="Pagina Web" 
                  value={empresaData.pagina_web} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
                <TextField 
                  size='small'
                  name="email" 
                  label="email" 
                  value={empresaData.email} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
              </Box>
      <CardHeader 
              title="Información del Departamento de Gestion Ambiental"
              titleTypographyProps={{ variant: 'h5', align: 'center' }}
              sx={{ backgroundColor:  '#87B700 ',  color: 'white' }}
            />
                <FormSelectField 
                  name="tipo_departamento" 
                  label="Tipo DGA" 
                  value={empresaData.tipo_departamento} 
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                  options={TIPOS_DGA.map(m => ({ value: m.value, label: m.label }))}
                  /* options={TIPOS_DGA.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))} */
                />
                <TextField 
                  size='small'
                  name="nombre_encargado" 
                  label="Nombre Encargado DGA" 
                  value={empresaData.nombre_encargado} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                />
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'left' }}>
                <FormTextField 
                  name="profesion" 
                  label="profesion" 
                  value={empresaData.profesion} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
            
                <FormTextField 
                  name="cargo" 
                  label="cargo" 
                  value={empresaData.cargo} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'left' }}>
                <TextField 
                  size='small'
                  name="email_encargado" 
                  label="Email Encargado DGA" 
                  value={empresaData.email_encargado} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />

                <TextField 
                  size='small'
                  name="fecha_creacion" 
                  label="Fecha Creacion DGA" 
                  value={empresaData.fecha_creacion} 
                  onChange={handleChange} 
                  required 
                  color="warning"
                  sx={{ flex: 1, maxWidth: '45ch' }}
                />
            </Box>
              {alert.open && (
            <Alert severity={alert.severity} onClose={closeAlert}>
              {alert.message}
            </Alert>
          )}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/Inicio"}
              style={{ flex: 1, marginRight: '10px' }} 
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ flex: 1 }} 
            >
              Registrar DGA
            </Button>
            
          </Box>
        </Box>
        </form>
      </CardContent>
    </Card>
    </Box>
  );
}