import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { usePokemones } from '../hooks/usePokemones';
import SimplePaper from '../components/Container'; 
import BotonCargar from '../components/botonCargar';
import Nuevoheader from '../components/Header';
import Busqueda from '../components/Busqueda';
import Filtro from '../components/Filtro';

const Home = () => {
  const { 
    pokemonesFiltrados, cargando, setPokefiltro, 
    pokefiltro, filtrarPorTipo, tipoSeleccionado, 
    contador, setContador 
  } = usePokemones();

  return (
    <Box sx={{ minHeight: '100vh', pb: 5, bgcolor: '#D1D4DB' }}>
      <Nuevoheader />
      
      {/* SECCIÓN DE CONTROLES */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 1.5, 
        mt: 4, 
        mb: 5,
        px: 2 
      }}>
        {/* 1. Buscador: Lo mantenemos en 700px (más corto que el filtro) */}
        <Box sx={{ width: '100%', maxWidth: '700px' }}>
          <Busqueda alCambiar={setPokefiltro} valor={pokefiltro} />
        </Box>
        
        {/* 2. Filtro: Lo hacemos más largo (1000px) para que sobresalga de las tarjetas */}
        <Box sx={{ 
          width: '100%', 
          maxWidth: '1100px', // <-- Este valor lo hace más largo que el buscador y el Grid
          display: 'flex', 
          alignItems: 'center', 
          gap: 2 
        }}>
          <Typography sx={{ fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap' }}>
            Tipo
          </Typography>
          <Filtro alCambiarTipo={filtrarPorTipo} tipoSeleccionado={tipoSeleccionado} />
        </Box>
      </Box>

      {/* SECCIÓN DE TARJETAS */}
      <Box sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
        <Box sx={{ maxWidth: '950px', width: '100%' }}> 
          {/* El maxWidth del Grid es menor al del Filtro para que el filtro se vea más largo */}
          <Grid container spacing={2} justifyContent="center">
            {pokemonesFiltrados.map((p) => (
              <Grid size={{ xs: 6, sm: 4, md: 3}}   key={p.name}>
                <SimplePaper url={p.url} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {!cargando && <BotonCargar accion={() => setContador(prev => prev + 20)} cantidad={contador} />}
    </Box>
  );
};

export default Home;