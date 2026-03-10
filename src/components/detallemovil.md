// src/components/pokeDetalle.jsx
import { 
  Modal, Box, Typography, IconButton, 
  Stack, Chip, LinearProgress, useTheme, useMediaQuery 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/slices/pokemonSlice';

export default function PokeDetalle() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { isModalOpen, selectedPokemon } = useSelector((state) => state.pokemon);

  if (!selectedPokemon) return null;

  // Estilo común para las flechas
  const arrowStyle = {
    color: 'white',
    bgcolor: 'rgba(0,0,0,0.3)',
    '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
    position: isMobile ? 'absolute' : 'static',
    zIndex: 10,
    // Si es mobile, las ponemos en los bordes de la pantalla
    ...(isMobile && {
      top: '50%',
      transform: 'translateY(-50%)',
    })
  };

  return (
    <Modal 
      open={isModalOpen} 
      onClose={() => dispatch(closeModal())}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Contenedor relativo para que las flechas se posicionen bien en mobile */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isMobile ? 0 : 2, 
        width: '100%', 
        justifyContent: 'center',
        outline: 'none',
        position: 'relative' 
      }}>
        
        {/* Flecha Izquierda */}
        <IconButton sx={{ ...arrowStyle, left: 8 }}>
          <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>

        {/* RECUADRO BLANCO */}
        <Box sx={{
          width: isMobile ? '85%' : 400, // En mobile ocupa el 85% para dejar espacio a flechas
          maxHeight: '90vh', // Para que no se corte en pantallas pequeñas
          overflowY: 'auto', // Por si el contenido es muy largo
          bgcolor: 'white',
          borderRadius: '24px',
          p: isMobile ? 2 : 3,
          position: 'relative',
          boxShadow: 24,
        }}>
          {/* Botón Cerrar */}
          <IconButton 
            onClick={() => dispatch(closeModal())}
            sx={{ position: 'absolute', right: 8, top: 8, bgcolor: '#f5f5f5' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 1 }}>
            #{String(selectedPokemon.id).padStart(3, '0')}
          </Typography>
          
          <Typography variant="h4" align="center" sx={{ 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            fontSize: isMobile ? '1.5rem' : '2.125rem' 
          }}>
            {selectedPokemon.name}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <Box 
              component="img"
              src={selectedPokemon.sprites.other['official-artwork'].front_default} 
              alt={selectedPokemon.name} 
              sx={{ width: isMobile ? '150px' : '200px', height: 'auto' }} 
            />
          </Box>

          <Stack direction="row" spacing={1} justifyContent="center" mb={3}>
            {selectedPokemon.types.map((t) => (
              <Chip 
                key={t.type.name} 
                label={t.type.name} 
                sx={{ 
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: 'white',
                  bgcolor: theme.palette.pokemon?.[t.type.name] || '#ccc',
                }} 
              />
            ))}
          </Stack>

          <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
            BASE STATS
          </Typography>
          
          <Stack spacing={1}>
            {selectedPokemon.stats.map((s) => (
              <Box key={s.stat.name}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {s.stat.name.replace('special-', 'S.')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {s.base_stat}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(s.base_stat / 250) * 100} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 5,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.pokemon?.[selectedPokemon.types[0].type.name] || 'primary.main'
                    }
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Flecha Derecha */}
        <IconButton sx={{ ...arrowStyle, right: 8 }}>
          <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>

      </Box>
    </Modal>
  );
}