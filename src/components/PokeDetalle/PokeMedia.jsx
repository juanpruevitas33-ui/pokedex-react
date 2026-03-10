// src/components/PokeDetalle/PokeMedia.jsx
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { PokeTypeChips } from '../shared/PokeTypeChips';

export const PokeMedia = ({ pokemon }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Lógica: Si es mobile, busca el GIF. Si es PC o no hay GIF, usa el arte oficial.
  const imageToShow = (isMobile && pokemon.sprites.versions['generation-v']['black-white'].animated.front_default)
    ? pokemon.sprites.versions['generation-v']['black-white'].animated.front_default
    : pokemon.sprites.other['official-artwork'].front_default;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, height: '160px' }}>
        <Box 
          component="img"
          src={imageToShow} 
          alt={pokemon.name} 
          sx={{ width: '150px', height: '150px', objectFit: 'contain' }} 
        />
      </Box>
      <PokeTypeChips types={pokemon.types} size="medium" />
    </>
  );
};