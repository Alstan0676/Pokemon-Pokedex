
import React, { useState, useEffect } from 'react';
import PokemonSearch from '../components/PokemonSearch';
import PokemonCard from '../components/PokemonCard';
import InstructionsPanel from '../components/InstructionsPanel';
import RecentSearches from '../components/RecentSearches';
import { searchPokemon } from '../services/pokemonService';
import { formatPokemonData } from '../utils/pokemonUtils';

/**
 * Pokedex component serves as the main search interface for Pokémon
 * - Allows users to search for Pokémon by name or ID
 * - Displays search results as a Pokémon card
 * - Shows recent searches and instructions when no search is active
 * - Saves recent searches to localStorage for persistence
 * 
 * @returns {JSX.Element} The Pokédex component
 */
const Pokedex = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentPokemonSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save a Pokémon to recent searches
  const saveToRecentSearches = (pokemon) => {
    // Add new search to the beginning, remove duplicates, limit to 5 items
    const updatedSearches = [pokemon, ...recentSearches.filter(p => p.id !== pokemon.id)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentPokemonSearches', JSON.stringify(updatedSearches));
  };

  // Handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Don't search if query is empty
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Call API to search for Pokémon
      const data = await searchPokemon(searchQuery);
      const pokemonData = formatPokemonData(data);
      
      // Update state with search results
      setSearchResult(pokemonData);
      saveToRecentSearches(pokemonData);
      
    } catch (error) {
      setError('Pokémon not found. Try another name or ID.');
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Pokédex</h1>
        <p className="text-gray-600 mb-6">Search for a Pokémon by name or ID</p>
        
        <PokemonSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>
      
      {/* Display loading spinner while searching */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Display error message if search fails */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {/* Display search result if available */}
      {searchResult && !isLoading && <PokemonCard pokemon={searchResult} />}
      
      {/* Display instructions and recent searches if no active search */}
      {!searchResult && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <InstructionsPanel />
          <RecentSearches recentSearches={recentSearches} />
        </div>
      )}
    </div>
  );
};

export default Pokedex;
