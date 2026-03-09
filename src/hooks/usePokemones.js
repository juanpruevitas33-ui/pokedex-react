import { useState, useEffect, useCallback } from 'react';
import pokeApi from '../api/pokeApi';

export const usePokemones = () => {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pokefiltro, setPokefiltro] = useState(''); 
  const [tipoSeleccionado, setTipoSeleccionado] = useState('all');
  const [contador, setContador] = useState(20);

  // Función para traer la lista (con o sin tipo)
  const obtenerData = useCallback(async () => {
    setCargando(true);
    try {
      if (tipoSeleccionado === 'all') {
        // Traemos la lista general limitada por el contador
        const res = await pokeApi.get(`pokemon?limit=${contador}&offset=0`);
        setPokemones(res.data.results);
      } else {
        // Traemos la lista por tipo
        const res = await pokeApi.get(`type/${tipoSeleccionado}`);
        // La API de tipo devuelve un formato distinto, lo normalizamos
        const listaNormalizada = res.data.pokemon.map(p => p.pokemon);
        // Cortamos la lista de ese tipo según el contador
        setPokemones(listaNormalizada.slice(0, contador));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  }, [tipoSeleccionado, contador]); // Se dispara si cambia el tipo O el contador

  // Disparar la carga cada vez que cambien los parámetros
  useEffect(() => {
    obtenerData();
  }, [obtenerData]);

  // EL FILTRO FINAL: Se aplica sobre la lista que ya tenemos guardada
  const pokemonesFiltrados = pokemones.filter((p) => {
    // 1. Sacamos el ID de la URL
    const id = parseInt(p.url.split('/').filter(Boolean).pop());
    
    // 2. Comprobamos el nombre (buscador)
    const coincideNombre = p.name.toLowerCase().includes(pokefiltro.toLowerCase());
    

    // El límite de 'contador' ya se aplicó arriba en el setPokemones
    return coincideNombre && id <= contador;
  });

  return { 
    pokemonesFiltrados, 
    cargando, 
    setPokefiltro, 
    pokefiltro,
    filtrarPorTipo: setTipoSeleccionado, // Solo cambiamos el estado y useEffect hará el resto
    tipoSeleccionado,
    contador,
    setContador 
  };
};