
import React from 'react';
import { getTypeBackground } from '../utils/pokemonUtils';

const PokemonHeader = ({ pokemon }) => {
  // Get the primary type for the background gradient
  const primaryType = pokemon.types[0];
  const gradientClass = getTypeBackground(primaryType);

  return (
    <div className={`bg-gradient-to-b ${gradientClass} rounded-t-lg p-8 mb-6 text-white`}>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="h-48 w-48 object-contain drop-shadow-lg" 
          />
        </div>
        
        <div className="md:w-2/3 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
          <p className="text-lg opacity-90 mb-4">#{pokemon.id.toString().padStart(3, '0')}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            {pokemon.types.map(type => (
              <span 
                key={type} 
                className="px-4 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white text-sm capitalize"
              >
                {type}
              </span>
            ))}
          </div>
          
          <p className="text-lg opacity-80">{pokemon.genus}</p>
          <p className="mt-2 text-sm md:text-base opacity-90">{pokemon.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonHeader;
