
import React from 'react';
import { Search } from 'lucide-react';

const PokemonSearch = ({ searchQuery, setSearchQuery, handleSearch, isLoading }) => {
  return (
    <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-primary pr-12"
          placeholder="Enter Pokémon name or ID..."
          aria-label="Search Pokémon"
        />
        <button
          type="submit"
          className="absolute right-0 h-full px-4 text-white bg-primary rounded-r-full hover:bg-red-700 transition-colors"
          disabled={isLoading}
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default PokemonSearch;
