
import React from 'react';
import { Link } from 'react-router-dom';
import { getTypeColor } from '../utils/pokemonUtils';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden mx-auto max-w-2xl pokemon-card">
      <div className="relative">
        <div className={`absolute top-0 right-0 px-4 py-2 bg-opacity-90 text-white rounded-bl-lg ${getTypeColor(pokemon.types[0])}`}>
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
        <div className="bg-gray-100 p-8 flex justify-center">
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="h-48 w-48 object-contain"
          />
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 capitalize">{pokemon.name}</h2>
        
        <div className="flex gap-2 mb-4">
          {pokemon.types.map(type => (
            <span 
              key={type} 
              className={`px-3 py-1 rounded-full text-white text-sm capitalize ${getTypeColor(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Height</h3>
            <p>{pokemon.height} m</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Weight</h3>
            <p>{pokemon.weight} kg</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map(ability => (
              <span key={ability} className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize">
                {ability.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Base Stats</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.name} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="capitalize">{stat.name.replace('-', ' ')}</span>
                <span className="font-medium">{stat.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Math.min(100, stat.value / 2)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Link 
            to={`/pokemon/${pokemon.id}`}
            className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
