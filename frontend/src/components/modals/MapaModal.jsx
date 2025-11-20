/*************
 @file        MapaModal.jsx
 @description Componente de React que muestra ubicacion de la empresa en un mapa con leaflet.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo parcialmente asistido por IA
 *************/

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import MapView from '/src/components/paginas/MapView';

export const MapaModal = ({ open, onClose, coordinates, empresaNombre }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ textAlign: 'center' }}>
        <Typography variant="h6">
          Ubicación DGA en el Mapa: {empresaNombre}
        </Typography>
      </DialogTitle>
      <DialogContent style={{ height: '500px', padding: 3 }}>
        <MapView coordinates={coordinates} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};