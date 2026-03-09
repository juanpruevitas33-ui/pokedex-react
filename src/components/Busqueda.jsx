// Fíjate bien en esta línea de importación, es la que te falta
import { TextField, Box } from '@mui/material';

export default function Busqueda({ alCambiar, valor }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <TextField 
                placeholder="Buscar Pokémon..."
                value={valor || ''}
                onChange={(e) => alCambiar(e.target.value)}
                fullWidth
                variant="outlined" 
                size="small"
                sx={{ 
                    bgcolor: 'white',
                    borderRadius: '8px' ,
                    // Ajustamos la altura a 45px para que sea igual al Filtro
                    '& .MuiOutlinedInput-root': {
                      
                        '& fieldset': { 
                            borderColor: '#FFCB05', 
                            borderWidth: '2px',
                            borderRadius: '8px' 
                        },
                        '&:hover fieldset': { borderColor: '#FFCB05' },
                        '&.Mui-focused fieldset': { borderColor: '#FFCB05' },
                    }
                }}
            />
        </Box>
    );
}