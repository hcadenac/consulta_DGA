import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative", // 👈 así respeta el flujo
        width: "100vw",       // 👈 ocupa todo el ancho de la ventana
        backgroundColor: "#008FD1",
        color: "#fff",
        textAlign: "center",
        p: 2,
        mt: "auto",
        //zIndex: 1200 // para que quede por encima de otros elementos
      }}
    >
      © {new Date().getFullYear()} CVS - Todos los derechos reservados
    </Box>
  );
}