/*************
 @file        SideBar.jsx
 @description Componente de React que muestra el sideBar de la aplicacion.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado parcialmente asistido por IA
 *************/

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar, Box, Divider, Drawer, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  styled, Toolbar, Tooltip, Typography, Button
} from '@mui/material';
import logo from '/src/assets/logocvs1.jpg';

import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LockIcon from '@mui/icons-material/LoginRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { AuthContext } from '/src/context/AuthContext';


// Estilos
const DRAWER_WIDTH = 240;
const PRIMARY_COLOR = '#626567';
const HOVER_COLOR = 'PowderBlue';
const APP_COLOR = '#008FD1'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MenuItemButton = styled(ListItemButton)({
  borderRadius: '12px',
  '&:hover': {
    backgroundColor: HOVER_COLOR,
  },
});

// Menú completo (solo para usuarios autenticados)
const menuItems = [
  { text: 'Home', icon: <HomeWorkIcon />, path: '/Inicio', roles: ['admin', 'usuario'] },
  { text: 'Consulta DGA', icon: <ListAltIcon />, path: '/ConsultaDga', roles: ['admin', 'usuario'] },
  { text: 'Registrar DGA', icon: <PostAddIcon />, path: '/RegistrarDga', roles: ['admin'] },
  { text: 'Registrar Seguimiento', icon: <AppRegistrationIcon />, path: '/RegistrarSeguimiento', roles: ['admin', 'usuario'] },
  { text: 'Administracion DGA', icon: <DashboardIcon />, path: '/GestionDga', roles: ['admin'] },
];

export default function SideBar() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);

  // Menú filtrado: si hay usuario se filtra por rol, si no hay se muestran opciones públicas
  const menuFiltrado = usuario
  ? menuItems.filter(item => item.roles.includes(usuario.rol))
  : [
      { text: 'Home', icon: <HomeWorkIcon />, path: '/Inicio' }
    ];

  return (

    <Box sx={{ flex: 1 }}>
    
       {/* Barra superior */}
      <AppBar position="fixed" sx={{ backgroundColor: APP_COLOR }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <img src={logo} alt="Logo" style={{ height: '58px', width: '190px' }} />
          {/* Texto centrado */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}
          >
            DEPARTAMENTOS DE GESTION AMBIENTAL REGISTRADOS EN CVS
          </Typography>

          {/* Icono de Login / Logout */}
          {!usuario ? (
            <Tooltip title="Iniciar Sesión">
              <Button 
                startIcon={<LockIcon/>}
                color="success"
                variant="contained" 
                onClick={() => navigate('/login')}
                sx={{ backgroundColor: 'orange', color: 'white' }}
                >
                  INGRESAR
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Cerrar Sesión">
              <Button
                startIcon={<LogoutIcon/>}
                color="success"
                variant="contained"
                component={Link}
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                sx={{ backgroundColor: 'orange', color: 'white' }}
              >
                SALIR
              </Button>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      {/* Cajón lateral */}
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            marginTop: '64px', 
            backgroundColor: '#f5f5f5'
          },
        }}
      >
        {/* Encabezado */}
        <DrawerHeader>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 1 }}>
            {/* <img src={logo} alt="Logo" style={{ height: '55px', width: '50px' }} /> */}
            <PersonPinIcon sx={{ fontSize: '50px', color: '#252322ff' }}/>
            {usuario && (
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
               {usuario.nombre_usuario}
              </Typography>
            )}
          </Box>
        </DrawerHeader>
        
        <Divider />

        {/* Menú principal */}
        <List>
          {menuFiltrado.map((item) => (
            <ListItem key={item.text} disablePadding>
              <MenuItemButton component={Link} to={item.path}>
                <ListItemIcon sx={{ color: PRIMARY_COLOR }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: '27px' } })}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '15px' }} />
              </MenuItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    
  );
}
