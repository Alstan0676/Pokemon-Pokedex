
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a new query client for React Query
const queryClient = new QueryClient();

/**
 * Main App component that sets up the application
 * - Provides Query Client for data fetching and state management
 * - Sets up Tooltip Provider for UI tooltips
 * - Configures Toast notifications through multiple providers
 * - Establishes routing with React Router
 * 
 * @returns {JSX.Element} The main application component
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notification components */}
      <Toaster />
      <Sonner />
      
      {/* Router setup with routes */}
      <BrowserRouter>
        <Routes>
          {/* Main landing page route */}
          <Route path="/" element={<Index />} />
          {/* Catch-all route for handling 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
