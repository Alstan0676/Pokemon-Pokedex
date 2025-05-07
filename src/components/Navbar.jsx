import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

/**
 * Navbar Component
 * 
 * A responsive navigation bar that appears at the top of every page.
 * It includes links to different sections of the app and adapts to mobile screens.
 * 
 * Features:
 * - Responsive design (desktop and mobile views)
 * - Active link highlighting
 * - Mobile menu toggle
 * - Smooth transitions
 */
const Navbar = () => {
  // Get current location for active link highlighting
  const location = useLocation();
  
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if a link is active based on current path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <div className="h-6 w-6 bg-primary rounded-full"></div>
                </div>
                <span className="text-white font-bold text-xl">Pokédex</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation menu */}
          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`nav-link text-white hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/') ? 'bg-red-700' : ''
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Search size={16} />
                  <span>Pokédex</span>
                </div>
              </Link>
              <Link
                to="/pokemon-list"
                className={`nav-link text-white hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/pokemon-list') ? 'bg-red-700' : ''
                }`}
              >
                Pokémon List
              </Link>
              <Link
                to="/about"
                className={`nav-link text-white hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/about') ? 'bg-red-700' : ''
                }`}
              >
                About
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-red-700 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-primary transition-all duration-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block text-white hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/') ? 'bg-red-700' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-1">
              <Search size={16} />
              <span>Pokédex</span>
            </div>
          </Link>
          <Link
            to="/pokemon-list"
            className={`block text-white hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/pokemon-list') ? 'bg-red-700' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Pokémon List
          </Link>
          <Link
            to="/about"
            className={`block text-white hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/about') ? 'bg-red-700' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
