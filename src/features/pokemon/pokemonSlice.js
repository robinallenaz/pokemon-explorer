import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for PokeAPI
const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

// Async thunk for fetching Pokemon list with details
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (offset = 0) => {
    // Get list of Pokemon with pagination
    const response = await axios.get(`${POKEMON_API_BASE_URL}/pokemon?limit=20&offset=${offset}`);
    
    // Fetch detailed info for each Pokemon in parallel
    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );
    
    return {
      pokemons: pokemonDetails,
      total: response.data.count,
    };
  }
);

// Async thunk for fetching single Pokemon by name
export const fetchPokemonByName = createAsyncThunk(
  'pokemon/fetchPokemonByName',
  async (name) => {
    const response = await axios.get(`${POKEMON_API_BASE_URL}/pokemon/${name.toLowerCase()}`);
    return response.data;
  }
);

// Initial state for Pokemon slice
const initialState = {
  pokemons: [],          // List of Pokemon with details
  selectedPokemon: null, // Currently selected Pokemon
  favorites: [],         // Array of favorite Pokemon IDs
  status: 'idle',        // API call status
  error: null,          // Error message if any
  total: 0,             // Total number of Pokemon available
};

// Pokemon slice with reducers and extra reducers for async actions
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    // Toggle Pokemon favorite status
    toggleFavorite: (state, action) => {
      const pokemonId = action.payload;
      const index = state.favorites.indexOf(pokemonId);
      if (index === -1) {
        state.favorites.push(pokemonId);
      } else {
        state.favorites.splice(index, 1);
      }
    }
  },
  // Handle async action states
  extraReducers: (builder) => {
    builder
      // Handle fetchPokemons states
      .addCase(fetchPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = [...state.pokemons, ...action.payload.pokemons];
        state.total = action.payload.total;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetchPokemonByName success
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.selectedPokemon = action.payload;
      });
  }
});

export const { toggleFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
