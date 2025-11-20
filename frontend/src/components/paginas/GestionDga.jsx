
/*************
 @file        GestionDga.jsx
 @description Componente de React que muestra tabla para gestion de informacion de empresas.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle, Divider, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import axios from 'axios';

import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

//import * as XLSX from 'xlsx';
import MapView from '/src/components/paginas/MapView';
import { apiEmpresas } from '/src/components/utils/apiEmpresas';
import { DetallesEmpresa } from '/src/components/modals/DetallesEmpresa';
import { EditarEmpresaModal } from '/src/components/modals/EditarEmpresaModal';
import { ConfirmDeleteModal } from '/src/components/modals/ConfirmDeleteModal';
import { MapaModal } from '/src/components/modals/MapaModal';

export default function GestionDga({handleCoordinates }) {
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  //const navigate = useNavigate();
  const { data, isLoading, error, refetch } = apiEmpresas();
  
  const [mapModalState, setMapModalState] = useState({
    open: false,
    coords: { lat: null, lng: null },
    empresaNombre: ''
  });

  const [selectedCoords, setSelectedCoords] = useState({ lat: null, lng: null });
  const [open, setOpen] = useState(false);
  const [dga, setDga] = useState('')

  const [editingCompany, setEditingCompany] = useState(null);
  const [deletteCompany, setdeletteCompany] = useState(null);
  
  useEffect(() => {
    refetch();
  }, []);
 
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
  
  // Modificar la función handleOpenModal para distinguir entre ver y editar
const handleOpenEditModal = (company) => {
  setEditingCompany(company);
};

const handleCloseEditModal = () => {
  setEditingCompany(null);
};

const [dataUpdate, setDataUpdate] = useState([]);
const handleUpdateSuccess = (updatedCompany) => {
  // Actualizar los datos en el estado
  setDataUpdate(prevData => 
    prevData.map(item => 
      item.id === updatedCompany.id ? updatedCompany : item
    )
  );
};

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [empresaToDelete, setEmpresaToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Función para abrir el modal de confirmación
  const handleOpenDeleteModal = (empresa) => {
    setEmpresaToDelete(empresa);
    setdeletteCompany(empresa)
    setDeleteModalOpen(true);
  };

  // Función para cerrar el modal de confirmación
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEmpresaToDelete(null);
  };

  //Actualiza la lista después de eliminar
  const handleEmpresaDeleted = () => {
    refetch(); 
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
      /* {
        accessorKey: 'direccion',
        header: 'Dirección',
      }, */
      {
        accessorKey: 'municipio.nombre', 
        header: 'Municipio',
      },
      {
        // Columna personalizada para las acciones
        id: 'acciones', 
        header: 'Acciones',
        Cell: ({ row }) => (
          <div>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip title="Editar">
                <IconButton color="warning"
                onClick={() => handleOpenEditModal(row.original)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Consultar Informacion Detallada">
                <IconButton color="success"
                onClick={() => handleOpenModal(row.original)}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar DGA">
                <IconButton color="error"
                  onClick={() => handleOpenDeleteModal(row.original)}>
                  <DeleteIcon />
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
      <Button
      startIcon={<GradingIcon />}
      color="success"
        variant="contained"
        component={Link}
        to={"/ConsultaSeguimientos"} 
        // onClick={handleOpenModal}
      >
        SEGUIMIENTO
      </Button>
      <Button
      startIcon={<PersonIcon/>}
      color="success"
        variant="contained"
        component={Link}
        to={"/ConsultaFuncionarios"} 
        // onClick={handleOpenModal}
      >
        FUNCIONARIO
      </Button>
      <Button
      startIcon={<PublicIcon/>}
      color="success"
        variant="contained"
        component={Link}
        to={"/ConsultaUsuarios"} 
        // onClick={handleOpenModal}
      >
        USUARIOS
      </Button>
      </Box>
      
    ),
    renderBottomToolbarCustomActions: ({ table }) => (
      <Button
      color="success"
        variant="contained"
        /* component={Link}
        to={"/RegistrarDga"}  */
        onClick={exportToExcel}
      >
        Exportar a Excel
      </Button>
      
    ),
    state: {
      isLoading: isLoading, 
    },
  });

  return (
    <div style={{ width: '1300px', textAlign: 'center',  margin: '0 auto', }}>
      <Box sx={{
        //margin: '0 auto',
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
        ADMINISTRACION REGISTRO DEPARTAMENTOS DE GESTION AMBIENTAL - CVS
      </Typography>
      <div style={{ width: '100%', padding: 3 }}>     
        {error && <div>Error fetching data: {error}</div>}
        <MaterialReactTable table={table} />

        <DetallesEmpresa 
          empresa={selectedCompany} 
          open={!!selectedCompany} 
          onClose={handleCloseModal} 
        />
       <EditarEmpresaModal 
        empresa={editingCompany} 
        open={!!editingCompany} 
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateSuccess}
        setDataUpdate={setDataUpdate}
      />
       <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleEmpresaDeleted}
        isLoading={isDeleting}
        empresa={empresaToDelete?.razon_social || ''} 
        empresaNombre={empresaToDelete?.nit || ''}
      />
      </div>
      </Box>
    </div>
  );
};
