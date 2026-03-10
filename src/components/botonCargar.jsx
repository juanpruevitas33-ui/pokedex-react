import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
  '&:hover': {
    borderWidth: '2px',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
    backgroundColor: '#f5f5f5',
  },
}));

const BotonCargar = ({ alClic, cargando }) => {
  return (
    <PokemonButton 
      onClick={alClic} 
      disabled={cargando}
      variant="outlined"
      startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : <KeyboardArrowDownIcon />}
    >
      {cargando ? 'Cargando...' : 'Mostrar más'}
    </PokemonButton>
  );
};

export default BotonCargar;