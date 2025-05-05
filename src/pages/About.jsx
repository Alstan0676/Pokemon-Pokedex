
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">About This Project</h1>
        <p className="text-gray-600 mb-6">Learn about the technology stack used in this Pokédex</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">React</h3>
            <p className="text-gray-700">
              This project is built using React, a JavaScript library for building user interfaces.
              React allows us to create reusable components and efficiently update the UI when data changes.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">JavaScript</h3>
            <p className="text-gray-700">
              JavaScript is the primary programming language used in this project, handling all the logic,
              API calls, and data manipulation.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Tailwind CSS</h3>
            <p className="text-gray-700">
              The styling is done using Tailwind CSS, a utility-first CSS framework. Tailwind allows us to
              rapidly build custom designs without leaving our HTML (JSX) files.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">React Router</h3>
            <p className="text-gray-700">
              React Router is used for navigation and routing in this single-page application, allowing
              for a smooth browsing experience without page reloads.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">PokéAPI</h3>
            <p className="text-gray-700">
              This project uses the PokéAPI, a free and open RESTful API service that provides all the
              Pokémon data used in the application. All Pokémon information, images, and stats come from this API.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Lucide Icons</h3>
            <p className="text-gray-700">
              The beautiful icons used throughout the application are from the Lucide icon library,
              providing a consistent and modern look.
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 border-t">
          <h3 className="text-xl font-semibold mb-2">Project Features</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Search for Pokémon by name or ID</li>
            <li>Browse a complete list of Pokémon with pagination</li>
            <li>View detailed information about each Pokémon</li>
            <li>See Pokémon evolution chains</li>
            <li>Responsive design that works on mobile and desktop</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
