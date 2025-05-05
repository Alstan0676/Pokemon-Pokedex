
import React from 'react';
import { Link } from 'react-router-dom';

const RecentSearches = ({ recentSearches }) => {
  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent searches</h2>
      <div className="grid grid-cols-2 gap-4">
        {recentSearches.map(pokemon => (
          <Link 
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 mr-2">
              <img 
                src={pokemon.image} 
                alt={pokemon.name}
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <p className="font-medium capitalize">{pokemon.name}</p>
              <p className="text-xs text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
