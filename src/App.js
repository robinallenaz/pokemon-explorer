import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import PokemonList from './components/PokemonList';
import Pokeball from './components/Pokeball';
import './App.css';

// Main App component - Sets up routing and layout
function App() {
  return (
    <Router>
      <div className="App">
        {/* Background animation with floating pokeballs */}
        <div className="pokeball-background">
          {[...Array(15)].map((_, index) => (
            <Pokeball key={index} className="pokeball" />
          ))}
        </div>

        {/* Glass-morphic navigation bar */}
        <AppBar position="fixed" className="glass-nav" elevation={0}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600, color: 'black' }}>
              PokéExplorer
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main content container with z-index to appear above background */}
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
