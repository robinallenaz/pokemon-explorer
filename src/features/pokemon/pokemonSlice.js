import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (offset = 0) => {
    const response = await axios.get(`${POKEMON_API_BASE_URL}/pokemon?limit=20&offset=${offset}`);
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

export const fetchPokemonByName = createAsyncThunk(
  'pokemon/fetchPokemonByName',
  async (name) => {
    const response = await axios.get(`${POKEMON_API_BASE_URL}/pokemon/${name.toLowerCase()}`);
    return response.data;
  }
);

const initialState = {
  pokemons: [],
  selectedPokemon: null,
  favorites: [],
  status: 'idle',
  error: null,
  total: 0,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const pokemonId = action.payload;
      const index = state.favorites.indexOf(pokemonId);
      if (index === -1) {
        state.favorites.push(pokemonId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.selectedPokemon = action.payload;
      });
  },
});

export const { toggleFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
