/*************
 @file        Inicio.jsx
 @description Componente de React que muestra pagina de inicio de la aplicacion.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/
import React from "react";
import { Box, Container, Typography, Divider, Paper } from "@mui/material";
import logo from '/src/assets/logo275.jpg';

const DRAWER_WIDTH = 210;

export default function Inicio() {
  return (
   <Container
      maxWidth="lg"
      sx={{
        mt: 10, 
        ml: `${DRAWER_WIDTH}px`, 
        mb: 4
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "#fafafa",
          fontFamily: "Roboto, Arial, sans-serif",
          fontSize: "1rem",
          lineHeight: 1.5,
          maxWidth: "1000px",
          margin: "0 auto" 
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '85px', width: '190px' }} />
        {/* Título principal */}
        <Typography
          variant="h5"
          component="h1"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          INSCRIPCIÓN DEPARTAMENTOS DE GESTIÓN AMBIENTAL
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Marco Jurídico */}
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          sx={{ fontFamily: "Roboto, Arial, sans-serif", textAlign: 'left' }}
        >
          Marco Jurídico
        </Typography>
         <Typography paragraph variant= "body2" align="justify">
          1. Mediante la Ley 1124 de 2007 en su artículo 8, se estableció la
          obligación a las empresas de nivel industrial de contar con un
          Departamento de Gestión Ambiental.
        </Typography>
          <Typography paragraph variant= "body2" align="justify">
          2. Así mismo mediante el Decreto 1299 de 2008, luego la Corte
          Constitucional mediante Sentencia C-486 de 2009 estableció la
          obligatoriedad de la conformación e inscripción del DGA solamente
          para las empresas Medianas y Grandes.
        </Typography>
         <Typography paragraph variant= "body2" align="justify">
          3. Posteriormente esta reglamentación fue incluida en el Decreto 1076 de
          2015.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* ¿Qué es el DGA? */}
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          sx={{ fontFamily: "Roboto, Arial, sans-serif", textAlign: 'left' }}
        >
          ¿Qué es el DGA?
        </Typography>
          <Typography paragraph variant= "body2" align="justify">
          El Departamento de Gestión Ambiental (DGA), es el área especializada
          dentro de la estructura organizacional de las empresas a nivel
          industrial, responsable de garantizar el cumplimiento de lo
          establecido en el Decreto 1076 de 2015 hoy compilado en los artículos
          2.2.8.11.1.1. a 2.2.8.11.1.8.
        </Typography>
         <Typography paragraph variant= "body2" align="justify">
          Tiene por objeto establecer e implementar acciones encaminadas a
          dirigir la gestión ambiental de las empresas a nivel industrial; velar
          por el cumplimiento de la normatividad ambiental; prevenir, minimizar
          y controlar la generación de cargas contaminantes; promover prácticas
          de producción más limpia y el uso racional de los recursos naturales;
          aumentar la eficiencia energética y el uso de combustible más limpios;
          implementar opciones para la reducción de emisiones de gases de efectos
          invernadero; y proteger y conservar los ecosistemas.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Inscripción DGA */}
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          sx={{ fontFamily: "Roboto, Arial, sans-serif", textAlign: 'left' }}
        >
          Inscripción DGA
        </Typography>
         <Typography paragraph variant= "body2" align="justify">
          Todas las empresas de carácter industrial en la jurisdicción la CVS
          que se encuentren operando, cuyas actividades de acuerdo a la
          normatividad ambiental vigente, requieran de licencia ambiental, plan
          de manejo ambiental, permisos, concesiones y demás autorizaciones
          ambientales, deben conformar su Departamento de Gestión Ambiental – DGA.
        </Typography>
        <Typography paragraph variant= "body2" align="justify">
          Una vez constituido el DGA, se debe informar a la CVS acerca de su
          creación; para facilitar a la corporación el registro correspondiente.
          Teniendo en cuenta lo anterior la Corporación Autónoma Regional de los
          Valles de Sinú y San Jorge, adoptó el formulario “registro de
          Departamento de Gestión Ambiental”, a través del cual los
          representantes legales de las empresas informan a la autoridad
          ambiental su conformación.
        </Typography>
      </Paper>
    </Container>
  );
}

