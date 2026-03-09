// Faltaban estas importaciones para que el navegador reconozca los componentes
import { FormControl, Select, MenuItem } from '@mui/material';
import { POKEMON_TYPES } from '../constants/pokemonsTypes';

export default function Filtro({ alCambiarTipo, tipoSeleccionado }) {
    return (
        /* fullWidth permite que crezca proporcionalmente según el Home.jsx */
        <FormControl fullWidth sx={{ bgcolor: 'white', borderRadius: '8px' }}>
            <Select
                value={tipoSeleccionado}
                onChange={(e) => alCambiarTipo(e.target.value)}
                displayEmpty
                size='small'
                sx={{ 
                    
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': { borderRadius: '8px' }
                }}
            >
                <MenuItem value="all">Todos</MenuItem>
                {POKEMON_TYPES.map((tipo) => (
                    <MenuItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}