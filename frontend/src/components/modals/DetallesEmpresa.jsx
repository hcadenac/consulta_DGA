/*************
 @file        DetallesEmpresa.jsx
 @description Componente de React que muestra toda la informacion de la empresa seleccionada.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo parcialmente asistido por IA
 *************/

import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Divider,
  Button,
  Table,        // <-- Nuevo Import
  TableBody,    // <-- Nuevo Import
  TableRow,     // <-- Nuevo Import
  TableCell
} from '@mui/material';
import { generateEmpresaPDF } from '/src/components/utils/pdfGenerator';


// estilo del dialog Modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const DetallesEmpresa = ({ empresa, open, onClose }) => {
  // Informacion para genrar el pdf
  const handleExportPDF = () => {
    const pdf = generateEmpresaPDF(empresa);
    pdf.save('empresa.pdf');
  };

   //Generacion del dialogo modal en material ui
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {empresa && (
          <>
            <Typography variant="h6" style={{ textAlign: 'center', color: '#339900' }}>
              REPORTE DE INSCRIPCION - DGA
            </Typography>
            <Divider />
            <br />
            
            <Typography><strong>NIT:</strong> {empresa.nit}</Typography>
            <Typography><strong>Razón Social:</strong> {empresa.razon_social}</Typography>
            <Typography><strong>Dirección:</strong> {empresa.direccion}</Typography>
            <Typography><strong>Municipio:</strong> {empresa.municipio.nombre}</Typography>
            <Typography><strong>Latitud:</strong> {empresa.latitud}</Typography>
            <Typography><strong>Longitud:</strong> {empresa.longitud}</Typography>
            <Typography><strong>Codigo CIIU:</strong> {empresa.codigo_ciiu}</Typography>
            <Typography><strong>Camara de Comercio:</strong> {empresa.camara_comercio}</Typography>
            <Typography><strong>Pagina Web:</strong> {empresa.pagina_web}</Typography>
            <Typography><strong>Correo Electrónico:</strong> {empresa.email}</Typography>
            <Typography><strong>Telefono:</strong> {empresa.telefono}</Typography>
            <Typography><strong>Representante Legal:</strong> {empresa.nombre_representante_legal}</Typography>
            <Typography><strong>Documento:</strong> {empresa.cedula_representante_legal}</Typography>
            <Typography><strong>Sector Productivo:</strong> {empresa.sector_productivo}</Typography>
            <Typography><strong>Tipo DGA:</strong> {empresa.tipo_departamento}</Typography>
            <Typography><strong>Responsable DGA:</strong> {empresa.nombre_encargado}</Typography>
            <Typography><strong>Profesion:</strong> {empresa.profesion}</Typography>
            <Typography><strong>Cargo:</strong> {empresa.cargo}</Typography>
            <Typography><strong>Email Encargado:</strong> {empresa.email_encargado}</Typography>
            <Typography><strong>Fecha Creacion DGA:</strong> {empresa.fecha_creacion}</Typography>
            
            <Divider />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button 
                variant="contained" 
                color="success" 
                onClick={onClose} 
                style={{ flex: 1, marginRight: '100px' }}
              >
                Cerrar
              </Button>
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleExportPDF} 
                style={{ flex: 1 }}
              >
                Exportar a PDF
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};