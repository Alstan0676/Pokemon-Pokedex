
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pokedex from './pages/Pokedex';
import PokemonList from './pages/PokemonList';
import About from './pages/About';
import PokemonDetail from './pages/PokemonDetail';

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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
            <Route path="/about" element={<About />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
