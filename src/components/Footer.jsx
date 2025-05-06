
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div 
        className="bg-cover bg-center h-48 flex flex-col items-center justify-center"
        style={{ 
          backgroundImage: "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png')",
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundColor: "#f1f5f9",
          backgroundBlendMode: "soft-light" 
        }}
      >
        <div className="backdrop-blur-sm bg-white/30 p-10 rounded-lg shadow-lg">
          <Link 
            to="/pokemon-list" 
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300 inline-flex items-center"
          >
            Search For More Pokémon
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>2025 Pokédex App. All Rights Reserved by Nintendo.</p>
        <p className="text-xs mt-1 text-gray-400">Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        <p className="text-xs mt-1 text-gray-400">This website is created solely for project and educational purposes. No copyright infringement intended.</p>
      </div>
    </footer>
  );
};

export default Footer;
