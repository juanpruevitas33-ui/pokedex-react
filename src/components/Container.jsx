// src/components/Container.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Card, CardMedia, CardContent, Typography, 
  Stack, Chip, Box, CircularProgress, useTheme 
} from '@mui/material';


import { useMediaQuery} from '@mui/material';

// ... dentro de tu componente SimplePap




export default function SimplePaper({ url }) {
    const [info, setInfo] = useState(null);
   


    
// ... dentro de tu componente SimplePaper
const theme = useTheme();
// Detecta si la pantalla es pequeña (mobile)
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// 2. Define la imagen basándote en esa variable





    useEffect(() => {
        const traerDetalle = async () => {
            try {
                const res = await axios.get(url);
                setInfo(res.data);
            } catch (e) { console.error(e); }
        };
        traerDetalle();
    }, [url]);

    if (!info) return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 230, height: 280 }}>
        <CircularProgress size={24} color="primary" />
      </Box>
    );


const pokemonImage = isMobile 
    ? (info.sprites.versions['generation-v']['black-white'].animated.front_default || info.sprites.front_default)
    : info.sprites.other['official-artwork'].front_default;


    return (
        <Card sx={{ 
            
            height: { xs: 200, sm: 260 },
            bgcolor: '#E6E7EB', 
            borderRadius: '4px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            // 1. Quitamos el pt: 0.5 y dejamos que flex centre o pegue arriba
            p: 0, 
            transition: '0.3s',
            '&:hover': { boxShadow: 6, transform: 'translateY(-5px)' }
        }}>
            {/* 2. Box contenedor para la imagen para controlar su posición exacta */}
            <Box sx={{ 
                width: '100%', 
                height: { xs: 200, sm: 190 }, // Espacio fijo para la imagen
                display: 'flex', 
                alignItems: 'flex-end', // Pega la imagen a los tipos
                justifyContent: 'center' 
            }}>
                <CardMedia
                    component="img"
                    image={pokemonImage}
                    alt={info.name}
                    sx={{ width: { xs: '70%', sm: 175 }, height:{ xs: '70%', sm: 175 }, objectFit: 'contain' }} 
                />
            </Box>

            {/* 3. Tipos pegados a la imagen */}
            <Stack direction="row" spacing={0.5} mt={0.5} justifyContent="center">
                {info.types.map((t) => (
                    <Chip 
                        key={t.type.name} 
                        label={t.type.name} 
                        size="small"
                        sx={{ 
                            borderRadius: '4px',
                            fontSize: '11px', 
                            fontWeight: 'bold', 
                            color: 'white',
                            bgcolor: theme.palette.pokemon[t.type.name] || '#ccc',
                            textTransform: 'capitalize',
                            height: '20px' 
                        }}
                    />
                ))}
            </Stack>

            {/* 4. Nombre pegado a los tipos */}
            <CardContent sx={{ textAlign: 'center', p: '0 !important', mt: 0.5 }}> 
                <Typography sx={{ textTransform: 'capitalize', fontSize: '1.15rem', fontWeight: 500 }}>
                    <Box component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>{info.id}.</Box> 
                    {info.name}
                </Typography>
            </CardContent>
        </Card>
    );
}