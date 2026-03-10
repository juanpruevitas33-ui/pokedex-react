import { Stack, Chip, useTheme } from '@mui/material';

export const PokeTypeChips = ({ types, size = "small", justifyContent = "center" }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1} justifyContent={justifyContent} sx={{ my: 1 }}>
      {types.map((t) => (
        <Chip 
          key={t.type.name} 
          label={t.type.name} 
          size={size}
          sx={{ 
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: 'white',
            borderRadius: '4px',
            bgcolor: theme.palette.pokemon?.[t.type.name] || '#ccc',
          }} 
        />
      ))}
    </Stack>
  );
};