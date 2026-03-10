import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';
import {theme} from '../theme'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  }, 
}); // <-- Asegúrate de que ambas llaves estén cerradas