
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  
  const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
      types: data.types.map(type => type.type.name)
    };
  };

  const fetchPokemons = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(nextUrl);
      const data = await response.json();
      
      const newPokemonDetails = await Promise.all(
        data.results.map(pokemon => fetchPokemonDetails(pokemon.url))
      );
      
      setPokemonList(currentList => [...currentList, ...newPokemonDetails]);
      setNextUrl(data.next);
    } catch (error) {
      setError('Failed to load Pokémon. Please try again later.');
      console.error('Error fetching Pokémon:', error);
    } finally {
      setIsLoading(false);
    }
  }, [nextUrl]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPokemonList(pokemonList);
    } else {
      const filtered = pokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString() === searchQuery
      );
      setFilteredPokemonList(filtered);
    }
  }, [searchQuery, pokemonList]);

  const handleLoadMore = () => {
    if (nextUrl) {
      fetchPokemons();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Pokémon List</h1>
        <p className="text-gray-600 mb-6">Browse through all Pokémon</p>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-primary pr-12"
              placeholder="Filter Pokémon..."
              aria-label="Filter Pokémon"
            />
            <div className="absolute right-0 h-full px-4 text-gray-500 flex items-center">
              <Search size={20} />
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {filteredPokemonList.map(pokemon => (
          <Link 
            key={pokemon.id} 
            to={`/pokemon/${pokemon.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden pokemon-card"
          >
            <div className="p-4 bg-gray-100 flex justify-center">
              <img 
                src={pokemon.image} 
                alt={pokemon.name}
                className="h-24 w-24 object-contain" 
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">#{pokemon.id.toString().padStart(3, '0')}</p>
              <h3 className="font-semibold mb-2 capitalize">{pokemon.name}</h3>
              <div className="flex flex-wrap gap-1">
                {pokemon.types.map(type => (
                  <span 
                    key={type} 
                    className={`px-2 py-1 rounded-full text-white text-xs capitalize ${getTypeColor(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
        
        {isLoading && Array(5).fill(0).map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden pokemon-card-loader">
            <div className="p-4 bg-gray-200 h-32"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
      
      {!isLoading && nextUrl && (
        <div className="text-center mt-8 mb-12">
          <button
            onClick={handleLoadMore}
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
          >
            Load More Pokémon
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
