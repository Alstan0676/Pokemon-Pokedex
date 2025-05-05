
import React from 'react';
import { Link } from 'react-router-dom';

const EvolutionChain = ({ evolutionChain, currentPokemonId }) => {
  if (evolutionChain.length <= 1) {
    return null;
  }

  return (
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
              className={`bg-white border rounded-lg p-3 flex flex-col items-center hover:shadow-md transition-shadow ${Number(evo.id) === Number(currentPokemonId) ? 'border-primary border-2' : 'border-gray-200'}`}
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
  );
};

export default EvolutionChain;
