
import React from 'react';

const About = () => {
  const technologies = [
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
    },
    {
      name: 'JavaScript',
      description: 'The programming language for web development',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png'
    },
    {
      name: 'Tailwind CSS',
      description: 'A utility-first CSS framework',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png'
    },
    {
      name: 'HTML5',
      description: 'The standard markup language for web pages',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png'
    },
    {
      name: 'PokéAPI',
      description: 'The RESTful Pokémon API',
      icon: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
    },
    {
      name: 'React Router',
      description: 'Client-side routing for React applications',
      icon: 'https://reactrouter.com/_brand/react-router-mark-color.svg'
    }
  ];

  const features = [
    {
      title: 'Pokédex Search',
      description: 'Search for Pokémon by name or ID to get detailed information'
    },
    {
      title: 'Pokémon List',
      description: 'Browse all Pokémon with a responsive grid layout showing images and types'
    },
    {
      title: 'Detailed Information',
      description: 'View detailed stats, abilities, and type information for each Pokémon'
    },
    {
      title: 'Responsive Design',
      description: 'The application works on all device sizes from mobile to desktop'
    },
    {
      title: 'Efficient API Usage',
      description: 'Optimized API calls to retrieve Pokémon data efficiently'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">About This Project</h1>
        <p className="text-gray-600">Learn about the technologies and features used in this Pokédex application</p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src={tech.icon} alt={tech.name} className="max-w-full max-h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Features</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-6 ${index < features.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">API Information</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">This application uses the <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PokéAPI</a> - a free, open REST API for Pokémon data.</p>
          
          <h3 className="text-xl font-semibold mb-2 mt-4">Endpoints Used:</h3>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/v2/pokemon</code> - Get a list of Pokémon</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/v2/pokemon/{'{id or name}'}</code> - Get details of a specific Pokémon</li>
          </ul>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">About the Developer</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">This Pokédex application was created as a demonstration of using modern web technologies to create an interactive and responsive web application.</p>
          <p className="mb-4">The project showcases the integration of React, JavaScript, and Tailwind CSS with a third-party API to create a functional and visually appealing application.</p>
          <p>Feel free to explore the application and discover information about your favorite Pokémon!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
