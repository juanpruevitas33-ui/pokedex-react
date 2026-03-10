// src/components/PokeDetalle/NavArrow.jsx
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const NavArrow = ({ direction, onClick, disabled }) => {
  const isLeft = direction === 'left';
  
  return (
    <IconButton 
      onClick={onClick}
      disabled={disabled}
      sx={{ 
        color: 'white', 
        bgcolor: 'rgba(0,0,0,0.3)', 
        '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
        '&.Mui-disabled': { color: 'rgba(255,255,255,0.1)' },
        // En mobile las pegamos un poco más al cuadro
        mx: { xs: -1, sm: 1 }, 
        zIndex: 10
      }}
    >
      {isLeft ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
};