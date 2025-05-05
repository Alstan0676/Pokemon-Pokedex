import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pokedex from './pages/Pokedex.jsx';
import PokemonList from './pages/PokemonList';
import About from './pages/About';
import PokemonDetail from './pages/PokemonDetail';
import { Toaster } from './components/ui/toaster';

/**
 * Main App component that sets up the application
 * - Includes the navigation bar at the top
 * - Sets up the main content area with route configuration
 * - Adds a footer at the bottom of the layout
 * - Uses a flex column layout to ensure proper spacing
 * 
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <BrowserRouter>
      {/* Main container with flex layout to keep footer at bottom */}
      <div className="flex flex-col min-h-screen">
        {/* Navigation bar fixed at the top */}
        <Navbar />
        
        {/* Main content area that grows to fill available space */}
        <main className="flex-grow">
          {/* Define routes for different pages */}
          <Routes>
            {/* Home page: Pokedex search interface */}
            <Route path="/" element={<Pokedex />} />
            
            {/* List all Pokémon */}
            <Route path="/pokemon-list" element={<PokemonList />} />
            
            {/* About page with information about the app */}
            <Route path="/about" element={<About />} />
            
            {/* Detail page for a specific Pokémon */}
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </main>
        
        {/* Footer at the bottom of the page */}
        <Footer />
        
        {/* Toast notifications component */}
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
