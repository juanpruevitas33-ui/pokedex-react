// src/components/Container.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/slices/pokemonSlice';
import { Card, CardMedia, CardContent, Typography, Box, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { PokeTypeChips } from './shared/PokeTypeChips'; // Importamos el átomo compartido

export default function SimplePaper({ url }) {
    const [info, setInfo] = useState(null);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 260 }}>
        <CircularProgress size={24} />
      </Box>
    );

    const pokemonImage = isMobile 
        ? (info.sprites.versions['generation-v']['black-white'].animated.front_default || info.sprites.front_default)
        : info.sprites.other['official-artwork'].front_default;

    return (
        <Card
            onClick={() => dispatch(openModal(info))}
            sx={{ 
                height: { xs: 200, sm: 260 },
                bgcolor: '#E6E7EB', 
                borderRadius: '8px', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                p: 0, 
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-5px)' }
            }}
        >
            <Box sx={{ width: '100%', height: { xs: 120, sm: 180 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                    component="img"
                    image={pokemonImage}
                    alt={info.name}
                    sx={{ width: '80%', height: '80%', objectFit: 'contain' }} 
                />
            </Box>

            {/* REUTILIZACIÓN DEL ÁTOMO */}
            <PokeTypeChips types={info.types} size="small" />

            <CardContent sx={{ textAlign: 'center', p: '0 !important', mt: 0.5 }}> 
                <Typography sx={{ textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: 500 }}>
                    <Box component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>{info.id}.</Box> 
                    {info.name}
                </Typography>
            </CardContent>
        </Card>
    );
}