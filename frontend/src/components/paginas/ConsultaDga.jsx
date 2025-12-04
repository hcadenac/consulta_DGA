/*************
 @file        ConsultaDga.jsx
 @description Componente de React que muestra tabla con datos generales de la empresa.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, asistido parcialmente por IA
 *************/

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle, Divider, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
//import jsPDF from 'jspdf';
import 'jspdf-autotable';

import autoTable from 'jspdf-autotable';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import * as XLSX from 'xlsx';
import MapView from '/src/components/paginas/MapView';
import { apiEmpresas } from '/src/components/utils/apiEmpresas';
import { DetallesEmpresa } from '/src/components/modals/DetallesEmpresa';
import { MapaModal } from '/src/components/modals/MapaModal';


const ConsultaDga = ({handleCoordinates }) => {
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  //const navigate = useNavigate();
  const { data, isLoading, error, refetch } = apiEmpresas();

  const [mapModalState, setMapModalState] = useState({
      open: false,
      coords: { lat: null, lng: null },
      empresaNombre: ''
    });

  //const [selectedCoords, setSelectedCoords] = useState({ lat: null, lng: null });
  const [open, setOpen] = useState(false);
  const [dga, setDga] = useState('')


  const handleViewOnMap = (empresa) => {
    setMapModalState({
      open: true,
      coords: { lat: empresa.latitud, lng: empresa.longitud },
      empresaNombre: empresa.razon_social
    });
  };

  const handleCloseMapModal = () => {
    setMapModalState(prev => ({ ...prev, open: false }));
  };

  // Cierra el modal
  const handleCloseM = () => {
    setOpen(false); 
  };
 
  // Manejar apertura del modal
  const handleOpenModal = (company) => {
    setSelectedCompany(company);
    setOpenModal(true);
  };

  // Manejar cierre del modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCompany(null);
  };
  
  //Exportar a excel
  const exportToExcel = () => {
    // Crear una nueva hoja de trabajo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Empresas');
    
    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(workbook, 'empresas.xlsx');
  };

  // Definir las columnas
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nit', // Campo del JSON
        header: 'NIT',
      },
      {
        accessorKey: 'razon_social',
        header: 'Razón Social',
      },
      /* {
        accessorKey: 'sector_productivo',  
        header: 'Sector Productivo',
      }, */
      {
        accessorKey: 'direccion',
        header: 'Dirección',
      },
      {
        accessorKey: 'municipio.nombre', 
        header: 'Municipio',
      },
      {
        id: 'acciones', // Columna personalizada para las acciones
        header: 'Acciones',
        Cell: ({ row }) => (
          <div>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip title="Ver Informacion Detallada">
                <IconButton color="success"
                onClick={() => handleOpenModal(row.original)}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="ver ubicacion en el mapa">
                <IconButton color="error"
                onClick={() => handleViewOnMap(row.original)}
                //onClick={() => handleCoordinates(row.original.latitud, row.original.longitud)} 
                >
                  <LocationOnIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </div>
        ),
      },
    ],
    []
  );

  // Hook de material-react-table
  const table = useMaterialReactTable({
    columns, 
    data,    
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableHiding: false,
    enableFullScreenToggle: false, 
    enableDensityToggle: false,
    enableGlobalFilter: true, 
    initialState: {
      showGlobalFilter: true, 
    },
    
    mrtTheme: (theme) => ({
        baseBackgroundColor: theme.palette.background.default, 
      }),
    muiTableBodyCellProps:{
        sx: {
          fontSize: '12px',
          height: '10px',
          padding: '5px', 
        },
    },
    muiTableHeadCellProps: {
        sx: {
          // border: '1px solid rgba(81, 81, 81, .5)',
          fontStyle: 'Tahoma',
          fontWeight: 'normal',
          textAlign: 'center',
          backgroundColor: '#008FD1',
          color: 'white',
          fontSize: '16px',
        },
    },
    localization: {
      rowsPerPage: 'Filas por página', 
    },
    /* renderTopToolbarCustomActions: ({ table }) => (
  
    ), */
    renderBottomToolbarCustomActions: ({ table }) => (
    <Button
      variant="contained"
      onClick={exportToExcel}
      sx={{
        backgroundColor: "#87B700",
        "&:hover": {
          backgroundColor: "#6b9100" 
        }
      }}
    >
      Exportar a Excel
    </Button>
      
    ),
    state: {
      isLoading: isLoading, 
    },
  });

  return (
    <div style={{ width: '100%', textAlign: 'center',  margin: '0 auto', }}>
      <Box sx={{
        margin: '0 auto',
        marginLeft: '200px',
        textAlign: 'center',
        padding: '10px',
        marginTop: '64px', // Ajustar la distancia desde la parte superior
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
      >
      <Typography variant="h5" component="h1" gutterBottom color='success' marginTop={'40px'}>
        LISTADO DE EMPRESAS CON DGA REGISTRADO EN CVS
      </Typography>
      <div style={{ width: '100%', padding: 3 }}>     
        {error && <div>Error fetching data: {error}</div>}
        <MaterialReactTable table={table} />
         
        <DetallesEmpresa 
          empresa={selectedCompany} 
          open={!!selectedCompany} 
          onClose={handleCloseModal} 
        />
        
        <MapaModal 
          open={mapModalState.open} 
          onClose={handleCloseMapModal} 
          coordinates={mapModalState.coords} 
          empresaNombre={mapModalState.empresaNombre} 
        />
      </div>
      </Box>
    </div>
  );
};

export default ConsultaDga;