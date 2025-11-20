
/*************
 @file        ConfirmDeleteModal.jsx
 @description Componente de React que muestra modal para confirmar eliminacion de registro.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado parcialmente asistido por IA
 *************/
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

// URL base de la API de Express
const API_BASE_URL = 'http://localhost:3000'; 

export const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm, 
  empresa, 
  empresaNombre
}) => {
  // Estado para manejar el estado de carga (mientras se realiza la petición DELETE)
  const [isDeleting, setIsDeleting] = useState(false);
  // Estado para almacenar y mostrar cualquier error de la petición DELETE
  const [deleteError, setDeleteError] = useState(null);

  //realiza la llamada a la API de eliminación
  const handleConfirmDelete = async () => {
    if (!empresa || !empresaNombre) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);
      // Petición DELETE a la API
      await axios.delete(`http://localhost:3000/empresas/${empresaNombre}`);
      //callback al componente padre
      if (onConfirm) onConfirm(); 
      // Cierra el modal
      onClose(); 
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      setDeleteError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

 // Generación del Diálogo Modal de Material-UI
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro que desea eliminar la empresa <strong>{empresa}</strong>? 
          Esta acción no se puede deshacer.
        </DialogContentText>
        {deleteError && (
          <DialogContentText style={{ color: 'red' }}>
            Error: {deleteError}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
