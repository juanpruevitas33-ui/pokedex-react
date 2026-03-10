import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAllPokemons } from '../store/slices/pokemonSlice';
import { usePokemones } from '../hooks/usePokemones';
import SimplePaper from '../components/Container'; 
import BotonCargar from '../components/botonCargar'; // 1. Importar el botón
import Nuevoheader from '../components/Header';
import Busqueda from '../components/Busqueda';
import Filtro from '../components/Filtro';
import PokeDetalle from '../components/PokeDetalle';

const Home = () => {
  const dispatch = useDispatch();
  // 2. Extraer setContador y cargando del hook
  const { 
    pokemonesFiltrados, setPokefiltro, 
    pokefiltro, filtrarPorTipo, tipoSeleccionado,
    setContador, cargando 
  } = usePokemones();

  useEffect(() => {
    if (pokemonesFiltrados.length > 0) {
      dispatch(setAllPokemons(pokemonesFiltrados));
    }
  }, [pokemonesFiltrados, dispatch]);

  return (
    <Box sx={{ minHeight: '100vh', pb: 5, bgcolor: '#D1D4DB' }}>
      <Nuevoheader />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mt: 4, mb: 5, px: 2 }}>
        <Box sx={{ width: '100%', maxWidth: '700px' }}>
          <Busqueda alCambiar={setPokefiltro} valor={pokefiltro} />
        </Box>
        
        <Box sx={{ width: '100%', maxWidth: '1100px', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap' }}>Tipo</Typography>
          <Filtro alCambiarTipo={filtrarPorTipo} tipoSeleccionado={tipoSeleccionado} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
        <Box sx={{ maxWidth: '950px', width: '100%' }}> 
          <Grid container spacing={2} justifyContent="center">
            {pokemonesFiltrados.map((p) => (
              <Grid key={p.name} size={{ xs: 6, sm: 4, md: 3 }}>
                <SimplePaper url={p.url} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* 3. Colocar el botón funcional aquí abajo */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <BotonCargar 
          alClic={() => setContador(prev => prev + 20)} 
          cargando={cargando} 
        />
      </Box>

      <PokeDetalle />
    </Box>
  );
};

export default Home;