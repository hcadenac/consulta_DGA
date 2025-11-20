/*************
 @file        ConsultaFuncionarios.jsx
 @description Componente de React que muestra tabla con informacin de funcionarios.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/

import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Hook para obtener funcionarios
const useFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFuncionarios = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:3000/funcionarios');
      setFuncionarios(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFuncionarios();
  }, []);

  return { funcionarios, isLoading, error, refetch: fetchFuncionarios };
};

const ConsultaFuncionarios = () => {
  const { funcionarios, isLoading, error, refetch } = useFuncionarios();

  // Estados para modal de edición
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ cedula: '', nombre: '', cargo: '' });

  // Eliminar funcionario
  const handleDelete = async (cedula) => {
    if (!window.confirm("¿Estás seguro de eliminar este funcionario?")) return;
    try {
      await axios.delete(`http://localhost:3000/funcionarios/${cedula}`);
      refetch(); // refrescar lista
    } catch (err) {
      alert("Error al eliminar funcionario: " + err.message);
    }
  };

  // Abrir modal para editar
  const handleEdit = (funcionario) => {
    setEditData(funcionario);
    setOpenEdit(true);
  };

  // Cerrar modal
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditData({ cedula: '', nombre: '', cargo: '' });
  };

  // Guardar cambios
  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/funcionarios/${editData.cedula}`, {
        nombre: editData.nombre,
        cargo: editData.cargo,
      });
      refetch();
      handleCloseEdit();
    } catch (err) {
      alert("Error al actualizar funcionario: " + err.message);
    }
  };

  // Columnas de la tabla
  const columns = useMemo(
    () => [
      { accessorKey: 'cedula', header: 'Cédula' },
      { accessorKey: 'nombre', header: 'Nombre' },
      { accessorKey: 'cargo', header: 'Cargo' },
      {
        id: 'acciones',
        header: 'Acciones',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <Tooltip title="Editar Funcionario">
              <IconButton
                color="primary"
                onClick={() => handleEdit(row.original)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Funcionario">
              <IconButton
                color="error"
                onClick={() => handleDelete(row.original.cedula)}
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

  const table = useMaterialReactTable({
    columns,
    data: funcionarios,
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
          to={"/RegistrarFuncionario"} 
        >
          CREAR FUNCIONARIO
        </Button>
      </Box>
    )
  });

  //generacion del modal con la tabla em material ui
  return (
    <Box sx={{ marginLeft: '200px', marginTop: '64px', padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        LISTADO DE FUNCIONARIOS
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <MaterialReactTable table={table} />

      {/* Modal para editar funcionario */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Editar Funcionario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Cédula"
            value={editData.cedula}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Nombre"
            value={editData.nombre}
            onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Cargo"
            value={editData.cargo}
            onChange={(e) => setEditData({ ...editData, cargo: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConsultaFuncionarios;

