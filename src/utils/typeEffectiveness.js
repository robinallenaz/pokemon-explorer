// Type effectiveness chart
const typeChart = {
  normal: {
    strongAgainst: [],
    color: '#A8A878'
  },
  fire: {
    strongAgainst: ['grass', 'ice', 'bug', 'steel'],
    color: '#F08030'
  },
  water: {
    strongAgainst: ['fire', 'ground', 'rock'],
    color: '#6890F0'
  },
  electric: {
    strongAgainst: ['water', 'flying'],
    color: '#F8D030'
  },
  grass: {
    strongAgainst: ['water', 'ground', 'rock'],
    color: '#78C850'
  },
  ice: {
    strongAgainst: ['grass', 'ground', 'flying', 'dragon'],
    color: '#98D8D8'
  },
  fighting: {
    strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'],
    color: '#C03028'
  },
  poison: {
    strongAgainst: ['grass', 'fairy'],
    color: '#A040A0'
  },
  ground: {
    strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'],
    color: '#E0C068'
  },
  flying: {
    strongAgainst: ['grass', 'fighting', 'bug'],
    color: '#A890F0'
  },
  psychic: {
    strongAgainst: ['fighting', 'poison'],
    color: '#F85888'
  },
  bug: {
    strongAgainst: ['grass', 'psychic', 'dark'],
    color: '#A8B820'
  },
  rock: {
    strongAgainst: ['fire', 'ice', 'flying', 'bug'],
    color: '#B8A038'
  },
  ghost: {
    strongAgainst: ['psychic', 'ghost'],
    color: '#705898'
  },
  dragon: {
    strongAgainst: ['dragon'],
    color: '#7038F8'
  },
  dark: {
    strongAgainst: ['psychic', 'ghost'],
    color: '#705848'
  },
  steel: {
    strongAgainst: ['ice', 'rock', 'fairy'],
    color: '#B8B8D0'
  },
  fairy: {
    strongAgainst: ['fighting', 'dragon', 'dark'],
    color: '#EE99AC'
  }
};

export const getTypeEffectiveness = (types) => {
  const strongAgainst = new Set();
  
  types.forEach(type => {
    const typeInfo = typeChart[type.type.name];
    if (typeInfo && typeInfo.strongAgainst) {
      typeInfo.strongAgainst.forEach(t => strongAgainst.add(t));
    }
  });

  return Array.from(strongAgainst);
};

export const getTypeColor = (type) => {
  return typeChart[type]?.color || '#777777';
};