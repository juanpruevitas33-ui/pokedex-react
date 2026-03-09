import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// 1. DEFINIMOS EL ESTILO FUERA DEL COMPONENTE (Orden total)
const PokemonButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: '10px 40px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  borderWidth: '2px',
  backgroundColor: '#ffffff',
  color: '#333',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  
  // Estilo cuando pasas el mouse
  '&:hover': {
    borderWidth: '2px',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
    backgroundColor: '#f5f5f5',
  },
  
  // Estilo para el icono dentro del botón
  '& .MuiButton-startIcon': {
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiButton-startIcon': {
    transform: 'translateY(3px)', // La flechita baja cuando haces hover
  }
}));

// 2. EL COMPONENTE QUEDA LIMPIO
export default function BotonCargar({ accion, cantidad }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <PokemonButton 
        variant="outlined" 
        onClick={accion}
        startIcon={<KeyboardArrowDownIcon />}
      >
        Mostrar más ({cantidad})
      </PokemonButton>
    </Box>
  );
}