
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Main entry point of the application
 * - Creates a React root in the 'root' DOM element
 * - Renders the App component inside this root
 */
createRoot(document.getElementById("root")).render(<App />);
