/*************
 @file        EditarEmpresaModal.jsx
 @description Componente de React que muestra formulario para editar  la informacion de la empresa.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo parcialmente asistido por IA
 *************/

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

// estilos del formulario
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '80vh',
  overflowY: 'auto',
};

export const EditarEmpresaModal = ({ empresa, open, onClose, onUpdate, setDataUpdate} ) => {
  
  //estados para almacenar informacion y manejo de errores
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Inicializar formData con los datos de la empresa
  useEffect(() => {
  if (empresa) {
    setFormData({ ...empresa });
  }
  }, [empresa]);

    // Actualizar el estado del componente cuando se selecciona algo en un campo de formulario.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // enviar informacion modificada para actualizar la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    // Validación mínima
    if (!formData.nit?.trim() || !formData.razon_social?.trim()) {
      setError('El NIT y la Razón Social son obligatorios.');
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/empresas/${empresa.nit}`,
        formData
      );

      setSuccess('Empresa actualizada correctamente');
      // Notificar al componente padre de la actualización
      onUpdate(response.data); 
      
      // Cerrar automáticamente después de 2 segundos
      setTimeout(() => {
        console.log('Empresa actualizada correctamente')
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar la empresa');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

/// los campos del formulario
  const fieldGroups = [
    {
      title: 'Información Básica',
      fields: [
        { name: 'nit', label: 'NIT' },
        { name: 'razon_social', label: 'Razón Social' },
        { name: 'direccion', label: 'Dirección' },
      ]
    },
    {
      title: 'Ubicación',
      fields: [
        { name: 'latitud', label: 'Latitud' },
        { name: 'longitud', label: 'Longitud' },
      ]
    },
    {
      title: 'Información Legal',
      fields: [
        { name: 'codigo_ciiu', label: 'Código CIIU' },
        { name: 'camara_comercio', label: 'Cámara de Comercio' },
        { name: 'nombre_representante_legal', label: 'Representante Legal' },
        { name: 'cedula_representante_legal', label: 'Cédula Representante' },
      ]
    },
    {
      title: 'Contacto',
      fields: [
        { name: 'pagina_web', label: 'Página Web' },
        { name: 'email', label: 'Email' },
        { name: 'telefono', label: 'Teléfono' },
      ]
    },
    {
      title: 'Información DGA',
      fields: [
        { name: 'tipo_departamento', label: 'Tipo DGA' },
        { name: 'nombre_encargado', label: 'Encargado DGA' },
        { name: 'profesion', label: 'Profesión' },
        { name: 'cargo', label: 'Cargo' },
        { name: 'email_encargado', label: 'Email Encargado' },
        { name: 'fecha_creacion', label: 'Fecha Creacion DGA', type: 'date' },
      ]
    }
  ];
  
  useEffect(() => {
  if (!open) {
    setFormData({});
    setError(null);
    setSuccess(null);
    setIsLoading(false);
  }
}, [open]);

  //generacion del modal con el formulario
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2" mb={2} color="primary">
          Editar Empresa: {empresa?.razon_social}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {fieldGroups.map((group, index) => (
          <React.Fragment key={index}>
            <Typography variant="subtitle1" mt={index > 0 ? 3 : 0} mb={1}>
              {group.title}
            </Typography>
            <Divider />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
              {group.fields.map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  size="small"
                  type={field.type || 'text'}
                  disabled={isLoading}
                />
              ))}
            </Box>
          </React.Fragment>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};