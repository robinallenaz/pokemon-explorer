import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import PokemonList from './components/PokemonList';
import Pokeball from './components/Pokeball';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="pokeball-background">
          {[...Array(15)].map((_, index) => (
            <Pokeball key={index} className="pokeball" />
          ))}
        </div>
        <AppBar position="fixed" className="glass-nav" elevation={0}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600, color: 'black' }}>
              PokéExplorer
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 10, mb: 4, position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<PokemonList />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
