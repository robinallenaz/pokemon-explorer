import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getTypeEffectiveness, getTypeColor } from '../utils/typeEffectiveness';

const TypeEffectivenessModal = ({ open, onClose, pokemon }) => {
  if (!pokemon) return null;

  const strongAgainstTypes = getTypeEffectiveness(pokemon.types);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="type-effectiveness-modal"
      disableAutoFocus
    >
      <Box className="modal-content">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is strong against:
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {strongAgainstTypes.length > 0 ? (
            strongAgainstTypes.map((type) => (
              <span
                key={type}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  margin: '2px',
                  borderRadius: '20px',
                  fontSize: '1.1rem',
                  color: 'white',
                  backgroundColor: getTypeColor(type),
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  textTransform: 'capitalize'
                }}
              >
                {type}
              </span>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              This Pokémon has no type advantages
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TypeEffectivenessModal;
