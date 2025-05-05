
import React from 'react';

const PokemonInfo = ({ pokemon }) => {
  return (
    <div>
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
          <PokemonStats stats={pokemon.stats} />
        </div>
      </div>
    </div>
  );
};

const PokemonStats = ({ stats }) => {
  return (
    <div className="space-y-4">
      {stats.map(stat => {
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
  );
};

export default PokemonInfo;
