
export const searchPokemon = async (query) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`);
  
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  
  return await response.json();
};

export const fetchPokemonDetails = async (id) => {
  try {
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
    
    return pokemonData;
  } catch (error) {
    throw new Error('Failed to load Pokémon details. Please try again later.');
  }
};

export const fetchEvolutionChain = async (url) => {
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
    
    return evolutionWithImages;
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    return [];
  }
};
