import React, { useEffect, useState } from 'react';
import { Modal as MuiModal, Box, Typography, IconButton, Stack, CircularProgress } from '@mui/material';
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

  // Cada vez que cambie el pokemon seleccionado en el store
  useEffect(() => {
    if (selectedPokemon) {
      // Si el objeto ya tiene stats (viene del click inicial)
      if (selectedPokemon.stats) {
        setFullData(selectedPokemon);
      } else {
        // Si no tiene stats (viene de las flechas), los buscamos
        setLoading(true);
        axios.get(selectedPokemon.url)
          .then(res => {
            setFullData(res.data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    } else {
      setFullData(null);
    }
  }, [selectedPokemon]);

  if (!isModalOpen || !selectedPokemon) return null;

  // Lógica de límites para las flechas
  const isFirst = allPokemons[0]?.name === selectedPokemon.name;
  const isLast = allPokemons[allPokemons.length - 1]?.name === selectedPokemon.name;

  return (
    <MuiModal open={isModalOpen} onClose={() => dispatch(closeModal())} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, outline: 'none' }}>
        
        <NavArrow direction="left" onClick={() => dispatch(prevPokemon())} disabled={isFirst || loading} />

        <Box sx={{ 
          width: { xs: '85vw', sm: 400 }, 
          bgcolor: 'white', 
          borderRadius: '24px', 
          p: 3, 
          position: 'relative',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: loading ? 'center' : 'flex-start'
        }}>
          <IconButton onClick={() => dispatch(closeModal())} sx={{ position: 'absolute', right: 16, top: 16, bgcolor: '#f5f5f5', zIndex: 1 }}>
            <CloseIcon />
          </IconButton>

          {loading ? (
            <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>
          ) : fullData && (
            <>
              <Typography variant="h6" color="textSecondary" align="center">
                #{String(fullData.id).padStart(3, '0')}
              </Typography>
              <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', textTransform: 'uppercase', mb: 2 }}>
                {fullData.name}
              </Typography>

              <PokeMedia pokemon={fullData} />

              <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', my: 2, color: '#555' }}>
                ESTADÍSTICAS BASE
              </Typography>
              
              <Stack spacing={0.5}>
                {fullData.stats.map((s) => {
                  const config = STATS_MAP[s.stat.name] || { label: s.stat.name, color: '#ccc' };
                  return <StatBar key={s.stat.name} label={config.label} value={s.base_stat} color={config.color} />;
                })}
              </Stack>
            </>
          )}
        </Box>

        <NavArrow direction="right" onClick={() => dispatch(nextPokemon())} disabled={isLast || loading} />

      </Box>
    </MuiModal>
  );
}