/**
 * Pokémon Utility Functions
 * 
 * This file contains helper functions for working with Pokémon data.
 * These functions handle styling, data formatting, and type-related operations.
 */

/**
 * Get the background color class for a Pokémon type
 * 
 * This function maps each Pokémon type to a specific Tailwind CSS color class.
 * The colors are chosen to match the traditional Pokémon type colors.
 * 
 * @param {string} type - The Pokémon type (e.g., "fire", "water")
 * @returns {string} Tailwind CSS class for the type's background color
 * 
 * @example
 * getTypeColor('fire') // returns 'bg-red-500'
 */



export const getTypeColor = (type) => {
  // Map of Pokémon types to their corresponding Tailwind background colors
  const typeColors = {
    normal: 'bg-gray-400',    // Gray for normal type
    fire: 'bg-red-500',       // Red for fire type
    water: 'bg-blue-500',     // Blue for water type
    grass: 'bg-green-500',    // Green for grass type
    electric: 'bg-yellow-400', // Yellow for electric type
    ice: 'bg-blue-300',       // Light blue for ice type
    fighting: 'bg-red-700',   // Dark red for fighting type
    poison: 'bg-purple-500',  // Purple for poison type
    ground: 'bg-yellow-600',  // Dark yellow for ground type
    flying: 'bg-indigo-300',  // Light indigo for flying type
    psychic: 'bg-pink-500',   // Pink for psychic type
    bug: 'bg-green-600',      // Dark green for bug type
    rock: 'bg-yellow-800',    // Dark yellow for rock type
    ghost: 'bg-indigo-600',   // Indigo for ghost type
    dark: 'bg-gray-800',      // Dark gray for dark type
    dragon: 'bg-indigo-700',  // Dark indigo for dragon type
    steel: 'bg-gray-500',     // Medium gray for steel type
    fairy: 'bg-pink-300',     // Light pink for fairy type
  };
  
  // Return the color class or a default gray if the type isn't found
  return typeColors[type] || 'bg-gray-500';
};

/**
 * Get the gradient background classes for a Pokémon type
 * 
 * This function creates a gradient background based on the Pokémon's type.
 * The gradient goes from a lighter shade to a darker shade of the type's color.
 * 
 * @param {string} type - The Pokémon type (e.g., "fire", "water")
 * @returns {string} Tailwind CSS classes for the gradient background
 * 
 * @example
 * getTypeBackground('fire') // returns 'from-red-400 to-red-500'
 */
export const getTypeBackground = (type) => {
  // Map of Pokémon types to their gradient color combinations
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
  
  // Return the gradient classes or a default gray gradient if the type isn't found
  return typeBackgrounds[type] || 'from-gray-400 to-gray-500';
};

/**
 * Format raw Pokémon data from the API into a consistent format
 * 
 * This function takes the raw data from the PokéAPI and transforms it
 * into a more usable format for our application. It handles unit conversions
 * and data restructuring.
 * 
 * @param {Object} data - Raw Pokémon data from PokéAPI
 * @returns {Object} Formatted Pokémon data with the following structure:
 *   - id: number - The Pokémon's ID
 *   - name: string - The Pokémon's name
 *   - image: string - URL to the Pokémon's image
 *   - types: string[] - Array of the Pokémon's types
 *   - height: number - Height in meters
 *   - weight: number - Weight in kilograms
 *   - abilities: string[] - Array of ability names
 *   - stats: Object[] - Array of stat objects with name and value
 * 
 * @example
 * const pokemon = formatPokemonData(apiData);
 * console.log(pokemon.name); // "Pikachu"
 */
export const formatPokemonData = (data) => {
  return {
    id: data.id,
    name: data.name,
    // Use official artwork if available, otherwise use default sprite
    image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
    // Extract type names from the types array
    types: data.types.map(type => type.type.name),
    // Convert height from decimeters to meters
    height: data.height / 10,
    // Convert weight from hectograms to kilograms
    weight: data.weight / 10,
    // Extract ability names from the abilities array
    abilities: data.abilities.map(ability => ability.ability.name),
    // Format stats into a more usable structure
    stats: data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))
  };
};
