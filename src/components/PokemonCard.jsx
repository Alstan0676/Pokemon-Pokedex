
import React from 'react';
import { Link } from 'react-router-dom';
import { getTypeColor, getTypeBackground } from '../utils/pokemonUtils';

/**
 * PokemonCard component displays a card with Pokemon information
 * 
 * This component shows a summary of a Pokémon including its image,
 * name, types, and basic stats. It also provides a link to the
 * detail page for the Pokémon.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.pokemon - Pokémon data object
 * @returns {JSX.Element|null} The rendered card or null if no data
 */
const PokemonCard = ({ pokemon }) => {
  // Don't render anything if no Pokemon data is provided
  if (!pokemon) return null;

  // Get the first type to use for the background gradient
  const primaryType = pokemon.types[0];
  const gradientClass = getTypeBackground(primaryType);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Colored header with Pokemon image */}
      <div className={`bg-gradient-to-b ${gradientClass} p-8 flex justify-center`}>
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          className="h-48 w-48 object-contain drop-shadow-lg" 
        />
      </div>
      
      <div className="p-6">
        {/* Pokemon name and ID header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          {/* Format ID to have leading zeros */}
          <span className="text-lg text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        
        {/* Pokemon types displayed as colored badges */}
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
        
        {/* Basic stats in a grid layout */}
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
        
        {/* Base stats with visual bars */}
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
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Link to detailed page */}
        <div className="mt-6">
          <Link 
            to={`/pokemon/${pokemon.id}`}
            className="inline-block w-full text-center bg-primary text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
