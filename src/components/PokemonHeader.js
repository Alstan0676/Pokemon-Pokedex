
import React from 'react';
import { Link } from 'react-router-dom';
import { getTypeBackground } from '../utils/pokemonUtils';

const PokemonHeader = ({ pokemon }) => {
  return (
    <div className={`rounded-lg shadow-xl overflow-hidden bg-gradient-to-r ${getTypeBackground(pokemon.types[0])}`}>
      <div className="p-8 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-48 h-48 mb-6 md:mb-0 md:mr-10 bg-white bg-opacity-20 rounded-full p-4 flex items-center justify-center">
            <img 
              src={pokemon.image} 
              alt={pokemon.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <p className="text-lg font-semibold mb-1">#{pokemon.id.toString().padStart(3, '0')}</p>
            <h1 className="text-4xl font-bold mb-2 capitalize">{pokemon.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {pokemon.types.map(type => (
                <span 
                  key={type} 
                  className={`px-4 py-1 rounded-full text-white text-sm font-medium capitalize bg-white bg-opacity-30`}
                >
                  {type}
                </span>
              ))}
            </div>
            
            <p className="text-lg">{pokemon.genus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonHeader;
