
import React from 'react';
import { Link } from 'react-router-dom';

const PokemonNavigation = ({ pokemonId }) => {
  const prevId = pokemonId > 1 ? pokemonId - 1 : null;
  const nextId = pokemonId < 1010 ? pokemonId + 1 : null; // Using 1010 as a max ID limit
  
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
      {prevId ? (
        <Link
          to={`/pokemon/${prevId}`}
          className="flex items-center text-primary hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous Pokémon
        </Link>
      ) : (
        <div></div> // Empty div to maintain spacing when there's no previous
      )}
      
      {nextId ? (
        <Link
          to={`/pokemon/${nextId}`}
          className="flex items-center text-primary hover:underline"
        >
          Next Pokémon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      ) : (
        <div></div> // Empty div to maintain spacing when there's no next
      )}
    </div>
  );
};

export default PokemonNavigation;
