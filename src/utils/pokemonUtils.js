
// Utility functions for Pokemon data

export const getTypeColor = (type) => {
  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-600',
    rock: 'bg-yellow-800',
    ghost: 'bg-indigo-600',
    dark: 'bg-gray-800',
    dragon: 'bg-indigo-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  
  return typeColors[type] || 'bg-gray-500';
};

export const formatPokemonData = (data) => {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
    types: data.types.map(type => type.type.name),
    height: data.height / 10, // convert to meters
    weight: data.weight / 10, // convert to kg
    abilities: data.abilities.map(ability => ability.ability.name),
    stats: data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))
  };
};
