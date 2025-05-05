
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function that combines Tailwind CSS classes
 * - Uses clsx to conditionally join class names
 * - Uses twMerge to handle Tailwind class conflicts and merging
 * 
 * @param {...any} inputs - Class names or conditional class objects
 * @returns {string} - Merged and processed class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
