import React from 'react';
import { Chip, Stack, useTheme } from '@mui/material';
// Importamos el mapeo para la traducción que ya tienes
import { POKEMON_TYPES } from '../../constants/pokemonsTypes'; 

export const PokeTypeChips = ({ types, size = "small" }) => {
  const theme = useTheme();

  // Función para obtener la traducción desde tu constante
  const getLabelInSpanish = (englishName) => {
    const found = POKEMON_TYPES.find(t => t.value === englishName.toLowerCase());
    return found ? found.label : englishName;
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
      {types?.map((t) => {
        const typeName = t.type.name.toLowerCase();
        // Accedemos al color definido en tu theme.js
        const typeColor = theme.palette.pokemon[typeName] || '#ccc';

        return (
          <Chip
            key={t.type.name}
            label={getLabelInSpanish(t.type.name)}
            size={size}
            sx={{
              backgroundColor: typeColor,
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: size === 'small' ? '0.7rem' : '0.85rem'
            }}
          />
        );
      })}
    </Stack>
  );
};