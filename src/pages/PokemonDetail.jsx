
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPokemonDetails, fetchEvolutionChain } from '../services/pokemonService';
import PokemonHeader from '../components/PokemonHeader';
import PokemonInfo from '../components/PokemonInfo';
import EvolutionChain from '../components/EvolutionChain';
import PokemonNavigation from '../components/PokemonNavigation';

/**
 * PokemonDetail component displays detailed information about a specific Pokémon
 * - Fetches and displays Pokémon data using the ID from URL parameters
 * - Shows Pokémon header, stats, evolution chain, and navigation
 * - Handles loading states and error conditions
 * 
 * @returns {JSX.Element} The Pokémon detail page component
 */
const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to load Pokémon data and evolution chain
    const loadPokemonData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch Pokemon details
        const pokemonData = await fetchPokemonDetails(id);
        setPokemon(pokemonData);
        
        // Fetch evolution chain
        const evolutionData = await fetchEvolutionChain(pokemonData.evolutionChainUrl);
        setEvolutionChain(evolutionData);
        
      } catch (error) {
        setError('Failed to load Pokémon details. Please try again later.');
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPokemonData();
  }, [id]);

  // Display loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Display error message if data fetching fails
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
          <p>{error}</p>
          <div className="mt-4">
            <Link to="/" className="text-primary hover:underline">Return to Pokédex</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-primary hover:underline inline-flex items-center">
          &larr; Back to Pokédex
        </Link>
      </div>
      
      <PokemonHeader pokemon={pokemon} />
      
      <div className="bg-white p-6">
        <PokemonInfo pokemon={pokemon} />
        <EvolutionChain evolutionChain={evolutionChain} currentPokemonId={pokemon.id} />
        <PokemonNavigation pokemonId={pokemon.id} />
      </div>
    </div>
  );
};

export default PokemonDetail;
