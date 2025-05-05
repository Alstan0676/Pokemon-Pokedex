
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Pokedex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentPokemonSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const saveToRecentSearches = (pokemon) => {
    const updatedSearches = [pokemon, ...recentSearches.filter(p => p.id !== pokemon.id)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentPokemonSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const query = searchQuery.toLowerCase().trim();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      
      const data = await response.json();
      
      const pokemonData = {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        height: data.height / 10, // convert to meters
        weight: data.weight / 10, // convert to kg
        abilities: data.abilities.map(ability => ability.ability.name),
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      };
      
      setSearchResult(pokemonData);
      saveToRecentSearches(pokemonData);
      
    } catch (error) {
      setError('Pokémon not found. Try another name or ID.');
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-400',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-600',
      rock: 'bg-yellow-800',
      ghost: 'bg-indigo-600',
      dark: 'bg-gray-800',
      dragon: 'bg-indigo-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    
    return typeColors[type] || 'bg-gray-500';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Pokédex</h1>
        <p className="text-gray-600 mb-6">Search for a Pokémon by name or ID</p>
        
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
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {searchResult && !isLoading && (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mx-auto max-w-2xl pokemon-card">
          <div className="relative">
            <div className={`absolute top-0 right-0 px-4 py-2 bg-opacity-90 text-white rounded-bl-lg ${getTypeColor(searchResult.types[0])}`}>
              #{searchResult.id.toString().padStart(3, '0')}
            </div>
            <div className="bg-gray-100 p-8 flex justify-center">
              <img 
                src={searchResult.image} 
                alt={searchResult.name} 
                className="h-48 w-48 object-contain"
              />
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 capitalize">{searchResult.name}</h2>
            
            <div className="flex gap-2 mb-4">
              {searchResult.types.map(type => (
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
                <p>{searchResult.height} m</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Weight</h3>
                <p>{searchResult.weight} kg</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {searchResult.abilities.map(ability => (
                  <span key={ability} className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize">
                    {ability.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Base Stats</h3>
              {searchResult.stats.map(stat => (
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
                to={`/pokemon/${searchResult.id}`}
                className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {!searchResult && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">How to use</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Enter a Pokémon name (e.g., "pikachu") or ID number</li>
              <li>Click the search button or press Enter</li>
              <li>View detailed information about the Pokémon</li>
              <li>Check the Pokémon List page to browse all Pokémon</li>
            </ul>
          </div>
          
          {recentSearches.length > 0 && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
