
/**
 * Search for a Pokémon by name or ID
 * 
 * @param {string} query - The name or ID of the Pokémon to search for
 * @returns {Promise<Object>} Pokémon data from the API
 * @throws {Error} If the Pokémon is not found
 */
export const searchPokemon = async (query) => {
  // Make API request to PokeAPI
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`);
  
  // Throw error if Pokémon not found
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  
  // Parse and return the JSON response
  return await response.json();
};

/**
 * Fetch detailed information about a specific Pokémon
 * 
 * @param {string|number} id - The ID or name of the Pokémon
 * @returns {Promise<Object>} Detailed Pokémon data including description and habitat
 * @throws {Error} If the data cannot be fetched
 */
export const fetchPokemonDetails = async (id) => {
  try {
    // Fetch basic Pokémon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error('Pokémon not found');
    const data = await response.json();
    
    // Fetch species data for evolution chain and description
    const speciesResponse = await fetch(data.species.url);
    if (!speciesResponse.ok) throw new Error('Species data not found');
    const speciesData = await speciesResponse.json();
    
    // Find the English description text
    const englishEntry = speciesData.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    
    // Compile all the data into a single object
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
      // Clean up the description text by replacing form feed characters
      description: englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : 'No description available',
      habitat: speciesData.habitat ? speciesData.habitat.name : 'Unknown',
      genus: speciesData.genera.find(g => g.language.name === 'en')?.genus || '',
      evolutionChainUrl: speciesData.evolution_chain.url
    };
    
    return pokemonData;
  } catch (error) {
    throw new Error('Failed to load Pokémon details. Please try again later.');
  }
};

/**
 * Fetch the evolution chain for a Pokémon
 * 
 * @param {string} url - The URL to the evolution chain data
 * @returns {Promise<Array>} Array of Pokémon in the evolution chain
 */
export const fetchEvolutionChain = async (url) => {
  try {
    // Fetch evolution chain data
    const response = await fetch(url);
    if (!response.ok) throw new Error('Evolution data not found');
    const data = await response.json();
    
    // Array to store evolution chain
    const evoChain = [];
    let currentEvo = data.chain;
    
    // Process first Pokémon in chain
    const speciesUrl = currentEvo.species.url;
    const speciesId = speciesUrl.split('/').filter(Boolean).pop();
    
    // Add first evolution to chain
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
      
      // Extract the species ID from the URL
      const nextSpeciesUrl = nextEvo.species.url;
      const nextSpeciesId = nextSpeciesUrl.split('/').filter(Boolean).pop();
      
      // Add evolution to the chain
      evoChain.push({
        id: nextSpeciesId,
        name: nextEvo.species.name,
        min_level: evolutionDetails.min_level,
        trigger: evolutionDetails.trigger?.name,
        item: evolutionDetails.item?.name
      });
      
      // Move to the next evolution in the chain
      currentEvo = nextEvo;
    }
    
    // Fetch images for each evolution
    const evolutionWithImages = await Promise.all(
      evoChain.map(async (evo) => {
        try {
          // Get the Pokémon data to extract the image
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
    
    return evolutionWithImages;
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    return [];
  }
};
