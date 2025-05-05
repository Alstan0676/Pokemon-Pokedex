
export const searchPokemon = async (query) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`);
  
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  
  return await response.json();
};
