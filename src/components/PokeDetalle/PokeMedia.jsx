import { Box, Stack } from '@mui/material';
import { PokeTypeChips } from '../shared/PokeTypeChips';

export const PokeMedia = ({ pokemon }) => {
  const officialArt = pokemon.sprites.other['official-artwork'].front_default;
  const animatedGif = pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;

  return (
    <Stack spacing={2} alignItems="center" sx={{ mb: 2, flexShrink: 0 }}>
      <Box sx={{ 
        // Tamaño aumentado para que el GIF no se vea pequeño en móvil
        width: { xs: '220px', md: '220px' }, 
        height: { xs: '180px', md: '220px' }, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexShrink: 0 
      }}>
        {/* GIF para móviles (xs a md) */}
        <Box 
          component="img"
          src={animatedGif || officialArt} 
          alt={pokemon.name} 
          sx={{ 
            display: { xs: 'block', md: 'none' }, 
            width: 'auto',
            height: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }} 
        />

        {/* Estática para Desktop (md en adelante) */}
        <Box 
          component="img"
          src={officialArt} 
          alt={pokemon.name} 
          sx={{ 
            display: { xs: 'none', md: 'block' }, 
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }} 
        />
      </Box>
      
      <Box sx={{ flexShrink: 0 }}>
        <PokeTypeChips types={pokemon.types} size="medium" />
      </Box>
    </Stack>
  );
};