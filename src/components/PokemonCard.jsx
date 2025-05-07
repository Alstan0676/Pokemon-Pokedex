import React from 'react';
import { Link } from 'react-router-dom';
import { getTypeColor, getTypeBackground } from '../utils/pokemonUtils';

/**
 * PokemonCard Component
 * 
 * A reusable card component that displays information about a Pokémon.
 * This component is used in both the Pokémon list and search results.
 * 
 * Props:
 * @param {Object} pokemon - The Pokémon data object containing all information
 * @param {number} pokemon.id - The Pokémon's ID number
 * @param {string} pokemon.name - The Pokémon's name
 * @param {string} pokemon.image - URL to the Pokémon's image
 * @param {string[]} pokemon.types - Array of the Pokémon's types
 * @param {number} pokemon.height - The Pokémon's height in meters
 * @param {number} pokemon.weight - The Pokémon's weight in kilograms
 * @param {string[]} pokemon.abilities - Array of the Pokémon's abilities
 * @param {Object[]} pokemon.stats - Array of the Pokémon's base stats
 * 
 * @returns {JSX.Element} A card displaying the Pokémon's information
 */
const PokemonCard = ({ pokemon }) => {
  // Early return if no Pokémon data is provided
  if (!pokemon) return null;

  // Get the primary type for the background gradient
  const primaryType = pokemon.types[0];
  const gradientClass = getTypeBackground(primaryType);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header section with Pokémon image */}
      <div className={`bg-gradient-to-b ${gradientClass} p-8 flex justify-center`}>
        <img 
          src={pokemon.image} 
          alt={`${pokemon.name} artwork`}
          className="h-48 w-48 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      {/* Content section with Pokémon details */}
      <div className="p-6">
        {/* Name and ID section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <span className="text-lg text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        
        {/* Types section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pokemon.types.map(type => (
            <span 
              key={type} 
              className={`px-3 py-1 rounded-full text-white text-sm font-medium capitalize ${getTypeColor(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
        
        {/* Basic info section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Height</h3>
            <p>{pokemon.height} m</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Weight</h3>
            <p>{pokemon.weight} kg</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Abilities</h3>
            <p className="capitalize">{pokemon.abilities.join(', ')}</p>
          </div>
        </div>
        
        {/* Base stats section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-2">Base Stats</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.name} className="space-y-1">
              {/* Stat name and value */}
              <div className="flex justify-between">
                <span className="text-sm capitalize">{stat.name.replace('-', ' ')}</span>
                <span className="text-sm font-medium">{stat.value}</span>
              </div>
              {/* Visual stat bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View details button */}
        <div className="mt-6">
          <Link 
            to={`/pokemon/${pokemon.id}`}
            className="inline-block w-full text-center bg-primary text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
