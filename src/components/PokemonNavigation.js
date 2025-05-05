
import React from 'react';
import { Link } from 'react-router-dom';

const PokemonNavigation = ({ pokemonId }) => {
  return (
    <div className="mt-8 flex justify-between">
      {pokemonId > 1 && (
        <Link 
          to={`/pokemon/${pokemonId - 1}`}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors flex items-center"
        >
          &larr; Previous
        </Link>
      )}
      
      <Link 
        to={`/pokemon/${pokemonId + 1}`}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors flex items-center ml-auto"
      >
        Next &rarr;
      </Link>
    </div>
  );
};

export default PokemonNavigation;
