import React, { useEffect, useState } from 'react';
import { Modal as MuiModal, Box, Typography, IconButton, Stack, CircularProgress, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, nextPokemon, prevPokemon } from '../../store/slices/pokemonSlice';
import { StatBar } from './StatBar';
import { PokeMedia } from './PokeMedia';
import { NavArrow } from './NavArrow';
import { STATS_MAP } from '../../constants/statsMap';

export default function PokeDetalle() {
  const dispatch = useDispatch();
  const { isModalOpen, selectedPokemon, allPokemons } = useSelector((state) => state.pokemon);
  const [fullData, setFullData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPokemon) {
      if (selectedPokemon.stats) {
        setFullData(selectedPokemon);
        setLoading(false);
      } else {
        setLoading(true);
        axios.get(selectedPokemon.url)
          .then(res => {
            setFullData(res.data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    }
  }, [selectedPokemon]);

  if (!selectedPokemon) return null;

  const isFirst = allPokemons[0]?.name === selectedPokemon.name;
  const isLast = allPokemons[allPokemons.length - 1]?.name === selectedPokemon.name;

  return (
    <MuiModal 
      open={isModalOpen} 
      onClose={() => dispatch(closeModal())} 
      closeAfterTransition
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%',
        outline: 'none',
        p: 1 
      }}>
        
        <NavArrow direction="left" onClick={() => dispatch(prevPokemon())} disabled={isFirst} />

        <Fade in={isModalOpen} timeout={400} key={selectedPokemon.id}>
          <Box sx={{ 
            width: { xs: '85vw', sm: 400 }, 
            // CAMBIO CLAVE: Altura automática para que se encoja si la pantalla es pequeña
            height: 'auto', 
            // minHeight solo para que el loading no se vea colapsado
            minHeight: { xs: '300px', sm: '400px' }, 
            // maxHeight limita la tarjeta al tamaño de la pantalla actual
            maxHeight: { xs: '100vh', sm: '80vh' },
            bgcolor: 'white', 
            borderRadius: '24px', 
            position: 'relative',
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            // El scroll ahora sí funcionará porque la tarjeta respeta el maxHeight
            overflowY: 'auto', 
            p: { xs: 2, sm: 3 },
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#ddd', borderRadius: '10px' }
          }}>
            <IconButton 
              onClick={() => dispatch(closeModal())} 
              sx={{ position: 'absolute', right: 8, top: 8, bgcolor: '#f5f5f5', zIndex: 20 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            {/* Pantalla de carga absoluta: mantiene el tamaño de la tarjeta mientras cambias de poke */}
            {loading && (
              <Box sx={{ 
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                bgcolor: 'rgba(255,255,255,0.7)', zIndex: 15, borderRadius: '24px'
              }}>
                <CircularProgress size={40} />
              </Box>
            )}

            {fullData && (
              <Box sx={{ opacity: loading ? 0.4 : 1, transition: 'opacity 0.2s' }}>
                <Typography variant="h6" color="textSecondary" align="center" sx={{ fontSize: '0.85rem' }}>
                  #{String(fullData.id).padStart(3, '0')}
                </Typography>
                <Typography variant="h4" align="center" sx={{ 
                  fontWeight: 'bold', textTransform: 'uppercase', mb: 1,
                  fontSize: { xs: '1.4rem', sm: '2rem' } 
                }}>
                  {fullData.name}
                </Typography>

                {/* No tocamos PokeMedia para no dañar el tamaño del GIF */}
                <PokeMedia pokemon={fullData} />

                <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', my: 1, color: '#555', fontSize: '0.9rem' }}>
                  ESTADÍSTICAS BASE
                </Typography>
                
                <Stack spacing={0.5} sx={{ pb: 1 }}>
                  {fullData.stats?.map((s) => {
                    const config = STATS_MAP[s.stat.name] || { label: s.stat.name, color: '#ccc' };
                    return (
                      <StatBar 
                        key={s.stat.name} 
                        label={config.label} 
                        value={s.base_stat} 
                        color={config.color} 
                      />
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Box>
        </Fade>

        <NavArrow direction="right" onClick={() => dispatch(nextPokemon())} disabled={isLast} />

      </Box>
    </MuiModal>
  );
}