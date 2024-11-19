import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../features/pokemon/pokemonSlice';
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Box } from '@mui/material';

const PokemonList = () => {
  // Redux hooks for state management
  const dispatch = useDispatch();
  const { pokemons, status, error } = useSelector((state) => state.pokemon);
  const [page, setPage] = useState(0);

  // Initial data fetch on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons(0));
    }
  }, [status, dispatch]);

  // Add scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom && status !== 'loading') {
        setPage(prev => {
          const newPage = prev + 1;
          dispatch(fetchPokemons(newPage * 20)); // Fetch next 20 Pokemon
          return newPage;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [status, dispatch]);

  // Loading state for initial page load
  if (status === 'loading' && page === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress className="loading-spinner" size={60} />
      </Box>
    );
  }

  // Error handling
  if (status === 'failed') {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        Error: {error}
      </Typography>
    );
  }

  // Main Pokemon grid display
  return (
    <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
      {pokemons.map((pokemon) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
          {/* Glass-morphic Pokemon card */}
          <Card className="glass-card">
            <Box className="pokemon-image-container">
              <CardMedia
                component="img"
                height="200"
                image={pokemon.sprites.front_default}
                alt={pokemon.name}
                sx={{ objectFit: 'contain' }}
              />
            </Box>
            <CardContent>
              {/* Pokemon name with capitalized first letter */}
              <Typography variant="h6" component="div" className="pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Typography>
              {/* Pokemon type badges */}
              <Box mt={1}>
                {pokemon.types.map(type => (
                  <span key={type.type.name} className={`pokemon-type type-${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {/* Loading spinner for infinite scroll */}
      {status === 'loading' && (
        <Box width="100%" display="flex" justifyContent="center" mt={4}>
          <CircularProgress className="loading-spinner" />
        </Box>
      )}
    </Grid>
  );
};

export default PokemonList;
