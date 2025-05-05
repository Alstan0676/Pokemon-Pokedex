
import * as React from "react";

// Breakpoint for mobile devices in pixels
const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook to detect if the current device is mobile
 * - Uses media queries to check screen width
 * - Returns true for mobile devices, false for larger screens
 * - Updates state when window size changes
 * 
 * @returns {boolean} - True if mobile, false otherwise
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // Create media query list for the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Handler function to update state when media query changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Add event listener and set initial value
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Clean up event listener on component unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Ensure boolean return value
  return !!isMobile;
}
