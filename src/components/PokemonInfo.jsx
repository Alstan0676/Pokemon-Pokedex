
import React from 'react';

const PokemonInfo = ({ pokemon }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Pokémon Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Physical Characteristics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Height</h4>
              <p>{pokemon.height} m</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Weight</h4>
              <p>{pokemon.weight} kg</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-sm text-gray-500 mb-1">Habitat</h4>
              <p className="capitalize">{pokemon.habitat}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Abilities</h3>
          <ul className="space-y-2">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="flex items-start">
                <span className="capitalize">{ability.name.replace('-', ' ')}</span>
                {ability.isHidden && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                    Hidden
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Base Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pokemon.stats.map(stat => (
            <div key={stat.name} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm capitalize">{stat.name.replace('-', ' ')}</span>
                <span className="text-sm font-medium">{stat.value}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
