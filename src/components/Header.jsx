import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
// ¡ESTA ES LA LÍNEA QUE TE FALTA! Asegúrate de que la ruta sea correcta
import logo from '../assets/img/poke-logo.png'; 

export default function Nuevoheader() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: '#EF5350', // Tu color rojo original
        height: 64, 
        justifyContent: 'center',
        boxShadow: '0px 10px 20px #F28786' // Sombra que tenías en CSS
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box 
          component="img" 
          src={logo} // Aquí es donde fallaba porque no estaba definido
          alt="pokedex"
          sx={{ 
            height: 48, 
            width: 'auto', 
            borderRadius: '50px', 
            objectFit: 'contain' 
          }} 
        />
      </Toolbar>
    </AppBar>
  );
}