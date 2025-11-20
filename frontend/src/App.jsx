import react from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SideBar from './components/navegacion/SideBar';
import Footer from './components/navegacion/Footer';
import Inicio from './components/paginas/Inicio';
import ConsultaDga from './components/paginas/ConsultaDga';
import GestionDga from './components/paginas/GestionDga';
import Login from './components/paginas/Login';
import RegistrarUsuario from './components/paginas/RegistrarUsuario';
import RegistrarFuncionario from './components/paginas/RegistrarFuncionario';
import ConsultaFuncionarios from './components/paginas/ConsultaFuncionarios';
import ConsultaSeguimientos from './components/paginas/ConsultaSeguimientos';
import RegistrarSeguimiento from './components/paginas/RegistrarSeguimiento';
import ConsultaUsuarios from './components/paginas/ConsultaUsuarios';
import RegistrarDga from './components/paginas/RegistrarDga';
import './App.css'

import  {AuthProvider} from './context/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';
import { Home } from '@mui/icons-material';

function App() {
 
  return (
    <div >
      <Router>
        <AuthProvider>
        {/* < NavBar /> */}
          <div className="sidebar">
            < SideBar />
          </div>
           <div style={{ flex: 1 }}>
            <Routes>
              {/* Página pública */}
              <Route path="/Inicio" element={<Inicio />} />

              {/* Rutas públicas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<RegistrarUsuario />} />

              {/* Rutas protegidas */}
              <Route path="/RegistrarDga" element={
                <PrivateRoute roles={['admin']}>
                  <RegistrarDga />
                </PrivateRoute>
              } />
              <Route path="/ConsultaUsuarios" element={
                <PrivateRoute roles={['admin']}>
                  <ConsultaUsuarios />
                </PrivateRoute>
              } />
              <Route path="/RegistrarFuncionario" element={
                <PrivateRoute roles={['admin']}>
                  <RegistrarFuncionario />
                </PrivateRoute>
              } />
              <Route path="/ConsultaFuncionarios" element={
                <PrivateRoute roles={['admin']}>
                  <ConsultaFuncionarios />
                </PrivateRoute>
              } />
              <Route path="/ConsultaSeguimientos" element={
                <PrivateRoute roles={['admin']}>
                  <ConsultaSeguimientos />
                </PrivateRoute>
              } />
              <Route path="/RegistrarSeguimiento" element={
                <PrivateRoute roles={['admin']}>
                  <RegistrarSeguimiento />
                </PrivateRoute>
              } />
              <Route path="/ConsultaDga" element={
                <PrivateRoute roles={['admin', 'usuario']}>
                  <ConsultaDga />
                </PrivateRoute>
              } />
              <Route path="/GestionDga" element={
                <PrivateRoute roles={['admin']}>
                  <GestionDga />
                </PrivateRoute>
              } />
            </Routes>
            </div>
          
        {/* </div> */}
        {/* <Footer/> */}
        </AuthProvider>
      </Router>  
    </div>
  )
}

export default App
