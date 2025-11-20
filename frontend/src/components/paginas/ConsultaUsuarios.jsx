/*************
 @file        ConsultaUsuarios.jsx
 @description Componente de React que muestra tabla con informacion de usuarios.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GradingIcon from '@mui/icons-material/Grading';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';

// Hook para obtener usuarios
const useUsuarios = () => {
  const [usuarios, setUsuarios] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchUsuarios = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:3000/usuarios'); // Ajusta tu endpoint
      setUsuarios(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, isLoading, error, refetch: fetchUsuarios };
};

const ConsultaUsuarios = () => {
  const { usuarios, isLoading, error } = useUsuarios();

  // Función para eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      //refetch(); // Recargar la lista
    } catch (err) {
      alert("Error al eliminar usuario: " + err.message);
    }
  };

  // Definir columnas
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'nombre_usuario', header: 'Nombre de Usuario' },
      { accessorKey: 'email', header: 'Correo' },
      { accessorKey: 'rol', header: 'Rol' },
      {
        id: 'acciones',
        header: 'Acciones',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <Tooltip title="Eliminar Usuario">
              <IconButton
                color="error"
                onClick={() => handleDelete(row.original.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  // Configurar tabla
  const table = useMaterialReactTable({
    columns,
    data: usuarios,
    enableColumnFilters: false,
    enableSorting: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableGlobalFilter: true,
    initialState: { showGlobalFilter: true },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        fontSize: '14px',
      },
    },
    muiTableBodyCellProps: {
      sx: { fontSize: '13px', padding: '6px' },
    },
    state: { isLoading },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
      <Button
      startIcon={<GradingIcon />}
      color="success"
        variant="contained"
        component={Link}
        to={"/Register"} 
        // onClick={handleOpenModal}
      >
        CREAR USUARIO
      </Button>
      </Box>
      )
  });

  return (
    <Box sx={{ marginLeft: '200px', marginTop: '64px', padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        LISTADO DE USUARIOS REGISTRADOS
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default ConsultaUsuarios;
