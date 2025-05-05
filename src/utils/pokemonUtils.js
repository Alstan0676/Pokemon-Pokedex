
/**
 * Utility functions for Pokémon data
 * These helper functions provide consistent styling and data formatting
 * for Pokémon throughout the application
 */

/**
 * Get the background color class for a Pokémon type
 * 
 * @param {string} type - The Pokémon type (e.g., "fire", "water")
 * @returns {string} Tailwind CSS class for background color
 */
export const getTypeColor = (type) => {
  // Map of Pokémon types to Tailwind background color classes
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
  
  // Return the color class or a default if the type doesn't have a mapping
  return typeColors[type] || 'bg-gray-500';
};

/**
 * Get the gradient background classes for a Pokémon type
 * Used for creating gradient backgrounds in header sections
 * 
 * @param {string} type - The Pokémon type (e.g., "fire", "water")
 * @returns {string} Tailwind CSS classes for gradient background
 */
export const getTypeBackground = (type) => {
  // Map of Pokémon types to gradient background classes
  const typeBackgrounds = {
    normal: 'from-gray-300 to-gray-400',
    fire: 'from-red-400 to-red-500',
    water: 'from-blue-400 to-blue-500',
    grass: 'from-green-400 to-green-500',
    electric: 'from-yellow-300 to-yellow-400',
    ice: 'from-blue-200 to-blue-300',
    fighting: 'from-red-600 to-red-700',
    poison: 'from-purple-400 to-purple-500',
    ground: 'from-yellow-500 to-yellow-600',
    flying: 'from-indigo-200 to-indigo-300',
    psychic: 'from-pink-400 to-pink-500',
    bug: 'from-green-500 to-green-600',
    rock: 'from-yellow-700 to-yellow-800',
    ghost: 'from-indigo-500 to-indigo-600',
    dark: 'from-gray-700 to-gray-800',
    dragon: 'from-indigo-600 to-indigo-700',
    steel: 'from-gray-400 to-gray-500',
    fairy: 'from-pink-200 to-pink-300',
  };
  
  // Return the gradient classes or a default if the type doesn't have a mapping
  return typeBackgrounds[type] || 'from-gray-400 to-gray-500';
};

/**
 * Format raw Pokémon data from the API into a consistent format for our app
 * 
 * @param {Object} data - Raw Pokémon data from PokeAPI
 * @returns {Object} Formatted Pokémon data
 */
export const formatPokemonData = (data) => {
  return {
    id: data.id,
    name: data.name,
    // Try to get the high-quality artwork first, fallback to sprite
    image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
    // Extract type names from the types array
    types: data.types.map(type => type.type.name),
    // Convert height from decimeters to meters
    height: data.height / 10, 
    // Convert weight from hectograms to kilograms
    weight: data.weight / 10, 
    // Extract ability names from the abilities array
    abilities: data.abilities.map(ability => ability.ability.name),
    // Extract stats with name and value
    stats: data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))
  };
};
