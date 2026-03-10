// src/store/slices/pokemonSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    isModalOpen: false,
    selectedPokemon: null,
    allPokemons: [], 
  },
  reducers: {
    setAllPokemons: (state, action) => {
      state.allPokemons = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedPokemon = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedPokemon = null;
    },
    // CORRECCIÓN: Buscamos por NAME porque el ID no existe en la lista del Home
    nextPokemon: (state) => {
      const index = state.allPokemons.findIndex(p => p.name === state.selectedPokemon.name);
      if (index !== -1 && index < state.allPokemons.length - 1) {
        state.selectedPokemon = state.allPokemons[index + 1];
      }
    },
    prevPokemon: (state) => {
      const index = state.allPokemons.findIndex(p => p.name === state.selectedPokemon.name);
      if (index > 0) {
        state.selectedPokemon = state.allPokemons[index - 1];
      }
    }
  },
});

export const { openModal, closeModal, setAllPokemons, nextPokemon, prevPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;