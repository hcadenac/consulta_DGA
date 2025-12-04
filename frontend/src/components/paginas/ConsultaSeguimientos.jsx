/*************
 @file        ConsultaSeguimientos.jsx
 @description Componente de React que muestra tabla con informacion de seguimientos.
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
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';

// Hook para obtener seguimientos
const useSeguimientos = () => {
  const [seguimientos, setSeguimientos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSeguimientos = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:3000/seguimientos');
      setSeguimientos(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSeguimientos();
  }, []);

  return { seguimientos, isLoading, error, refetch: fetchSeguimientos };
};

const ConsultaSeguimientos = () => {
  const { seguimientos, isLoading, error, refetch } = useSeguimientos();

  // Estados para modal de edición
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    departamento_id: '',
    funcionario_id: '',
    fecha_seguimiento: '',
    resultado_visita: '',
    observaciones: '',
  });

  // Eliminar seguimiento
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro de eliminar este seguimiento?")) return;
    try {
      await axios.delete(`http://localhost:3000/seguimientos/${id}`);
      refetch();
    } catch (err) {
      alert("Error al eliminar seguimiento: " + err.message);
    }
  };

  // Abrir modal editar
  const handleEdit = (seguimiento) => {
    setEditData(seguimiento);
    setOpenEdit(true);
  };

  // Cerrar modal
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditData({
      id: '',
      departamento_id: '',
      funcionario_id: '',
      fecha_seguimiento: '',
      resultado_visita: '',
      observaciones: '',
    });
  };

  // Guardar cambios
  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/seguimientos/${editData.id}`, {
        departamento_id: editData.departamento_id,
        funcionario_id: editData.funcionario_id,
        fecha_seguimiento: editData.fecha_seguimiento,
        resultado_visita: editData.resultado_visita,
        observaciones: editData.observaciones,
      });
      refetch();
      handleCloseEdit();
    } catch (err) {
      alert("Error al actualizar seguimiento: " + err.message);
    }
  };

  // Columnas de la tabla
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'departamento_id', header: 'Departamento' },
      { accessorKey: 'funcionario_id', header: 'Funcionario' },
      { accessorKey: 'fecha_seguimiento', header: 'Fecha' },
      { accessorKey: 'resultado_visita', header: 'Resultado' },
      { accessorKey: 'observaciones', header: 'Observaciones' },
      {
        id: 'acciones',
        header: 'Acciones',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <Tooltip title="Editar Seguimiento">
              <IconButton
                color="primary"
                onClick={() => handleEdit(row.original)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Seguimiento">
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

  const table = useMaterialReactTable({
    columns,
    data: seguimientos,
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
        variant="contained"
        color="success"
        onClick={() => window.location.href = "/RegistrarSeguimiento"}
      >
        CREAR SEGUIMIENTO
      </Button>
    </Box>
  )
  });

  return (
    <Box sx={{ marginLeft: '80px', marginTop: '64px', padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        LISTADO DE SEGUIMIENTOS
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <MaterialReactTable table={table} />

      {/* Modal de edición */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Seguimiento</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Departamento"
            value={editData.departamento_id}
            onChange={(e) => setEditData({ ...editData, departamento_id: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Funcionario"
            value={editData.funcionario_id}
            onChange={(e) => setEditData({ ...editData, funcionario_id: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Fecha"
            value={editData.fecha_seguimiento}
            onChange={(e) => setEditData({ ...editData, fecha_seguimiento: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Resultado"
            value={editData.resultado_visita}
            onChange={(e) => setEditData({ ...editData, resultado_visita: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Observaciones"
            value={editData.observaciones}
            onChange={(e) => setEditData({ ...editData, observaciones: e.target.value })}
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

export default ConsultaSeguimientos;
