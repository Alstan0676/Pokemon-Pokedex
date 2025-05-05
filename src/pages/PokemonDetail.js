
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch basic Pokemon data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const data = await response.json();
        
        // Fetch species data for evolution chain and description
        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) throw new Error('Species data not found');
        const speciesData = await speciesResponse.json();
        
        // Get English flavor text
        const englishEntry = speciesData.flavor_text_entries.find(
          entry => entry.language.name === 'en'
        );
        
        const pokemonData = {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
          types: data.types.map(type => type.type.name),
          height: data.height / 10, // convert to meters
          weight: data.weight / 10, // convert to kg
          abilities: data.abilities.map(ability => ({
            name: ability.ability.name,
            isHidden: ability.is_hidden
          })),
          stats: data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          })),
          description: englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : 'No description available',
          habitat: speciesData.habitat ? speciesData.habitat.name : 'Unknown',
          genus: speciesData.genera.find(g => g.language.name === 'en')?.genus || '',
          evolutionChainUrl: speciesData.evolution_chain.url
        };
        
        setPokemon(pokemonData);
        
        // Fetch evolution chain
        await fetchEvolutionChain(speciesData.evolution_chain.url);
        
      } catch (error) {
        setError('Failed to load Pokémon details. Please try again later.');
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchEvolutionChain = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Evolution data not found');
        const data = await response.json();
        
        const evoChain = [];
        let currentEvo = data.chain;
        
        // Process first Pokémon in chain
        const speciesUrl = currentEvo.species.url;
        const speciesId = speciesUrl.split('/').filter(Boolean).pop();
        
        evoChain.push({
          id: speciesId,
          name: currentEvo.species.name,
          min_level: null,
          trigger: null,
          item: null
        });
        
        // Process rest of evolution chain
        while (currentEvo.evolves_to.length > 0) {
          // We'll just take the first evolution path for simplicity
          const nextEvo = currentEvo.evolves_to[0];
          const evolutionDetails = nextEvo.evolution_details[0];
          
          const nextSpeciesUrl = nextEvo.species.url;
          const nextSpeciesId = nextSpeciesUrl.split('/').filter(Boolean).pop();
          
          evoChain.push({
            id: nextSpeciesId,
            name: nextEvo.species.name,
            min_level: evolutionDetails.min_level,
            trigger: evolutionDetails.trigger?.name,
            item: evolutionDetails.item?.name
          });
          
          currentEvo = nextEvo;
        }
        
        // Fetch images for each evolution
        const evolutionWithImages = await Promise.all(
          evoChain.map(async (evo) => {
            try {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo.id}`);
              const data = await response.json();
              return {
                ...evo,
                image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default
              };
            } catch (error) {
              console.error(`Error fetching evolution ${evo.name}:`, error);
              return {
                ...evo,
                image: null
              };
            }
          })
        );
        
        setEvolutionChain(evolutionWithImages);
        
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
      }
    };
    
    fetchPokemonDetails();
  }, [id]);

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

  const getTypeBackground = (type) => {
    const typeBackgrounds = {
      normal: 'from-gray-300 to-gray-400',
      fire: 'from-red-400 to-red-500',
      water: 'from-blue-400 to-blue-500',
      grass: 'from-green-400 to-green-500',
      electric: 'from-yellow-300 to-yellow-400',
      ice: 'from-blue-200 to-blue-300',
      fighting: 'from-red-600 to-red-700',
      poison: 'from-purple-400 to-purple-500',
      ground: 'from-yellow-500 to-yellow-600',
      flying: 'from-indigo-200 to-indigo-300',
      psychic: 'from-pink-400 to-pink-500',
      bug: 'from-green-500 to-green-600',
      rock: 'from-yellow-700 to-yellow-800',
      ghost: 'from-indigo-500 to-indigo-600',
      dark: 'from-gray-700 to-gray-800',
      dragon: 'from-indigo-600 to-indigo-700',
      steel: 'from-gray-400 to-gray-500',
      fairy: 'from-pink-200 to-pink-300',
    };
    
    return typeBackgrounds[type] || 'from-gray-400 to-gray-500';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
        
        <div className="bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Pokédex Entry</h2>
            <p className="text-gray-700">{pokemon.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Details</h2>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Height</h3>
                    <p>{pokemon.height} m</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Weight</h3>
                    <p>{pokemon.weight} kg</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Habitat</h3>
                    <p className="capitalize">{pokemon.habitat}</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4">Abilities</h2>
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-2">
                  {pokemon.abilities.map((ability, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-3 flex justify-between items-center">
                      <span className="capitalize font-medium">{ability.name.replace('-', ' ')}</span>
                      {ability.isHidden && (
                        <span className="text-xs px-2 py-1 bg-gray-300 rounded-full">Hidden</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Base Stats</h2>
              
              <div className="space-y-4">
                {pokemon.stats.map(stat => {
                  // Normalize stat value to a 0-100 scale for visual display
                  const normalizedValue = Math.min(100, (stat.value / 255) * 100);
                  
                  // Determine color based on stat value
                  let statColor;
                  if (stat.value < 50) statColor = 'bg-red-500';
                  else if (stat.value < 80) statColor = 'bg-yellow-500';
                  else statColor = 'bg-green-500';
                  
                  return (
                    <div key={stat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium capitalize">{stat.name.replace('-', ' ')}</span>
                        <span>{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`${statColor} h-3 rounded-full`} 
                          style={{ width: `${normalizedValue}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {evolutionChain.length > 1 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Evolution Chain</h2>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {evolutionChain.map((evo, index) => (
                  <React.Fragment key={evo.id}>
                    {index > 0 && (
                      <div className="flex flex-col items-center mx-2">
                        <div className="text-gray-500 text-sm mb-1">
                          {evo.min_level ? `Level ${evo.min_level}` : (evo.trigger === 'use-item' && evo.item ? `Use ${evo.item.replace('-', ' ')}` : 'Special')}
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <Link 
                      to={`/pokemon/${evo.id}`} 
                      className={`bg-white border rounded-lg p-3 flex flex-col items-center hover:shadow-md transition-shadow ${Number(evo.id) === pokemon.id ? 'border-primary border-2' : 'border-gray-200'}`}
                    >
                      {evo.image && (
                        <img src={evo.image} alt={evo.name} className="w-20 h-20 object-contain" />
                      )}
                      <div className="text-xs text-gray-500 mt-1">#{evo.id.toString().padStart(3, '0')}</div>
                      <div className="font-medium mt-1 capitalize">{evo.name}</div>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            {pokemon.id > 1 && (
              <Link 
                to={`/pokemon/${pokemon.id - 1}`}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors flex items-center"
              >
                &larr; Previous
              </Link>
            )}
            
            <Link 
              to={`/pokemon/${pokemon.id + 1}`}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors flex items-center ml-auto"
            >
              Next &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
