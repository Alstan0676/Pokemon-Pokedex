
import React from 'react';

const InstructionsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">How to use</h2>
      <ul className="list-disc ml-5 space-y-2 text-gray-700">
        <li>Enter a Pokémon name (e.g., "pikachu") or ID number</li>
        <li>Click the search button or press Enter</li>
        <li>View detailed information about the Pokémon</li>
        <li>Check the Pokémon List page to browse all Pokémon</li>
      </ul>
    </div>
  );
};

export default InstructionsPanel;
