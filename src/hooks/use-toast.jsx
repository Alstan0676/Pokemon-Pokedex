
import { 
  useToast as useToastInternal,
  toast as toastInternal
} from "@/components/ui/use-toast";

/**
 * Custom hook to use toast functionality
 * - Provides access to toast state and methods
 * - Reexports from the underlying toast component
 * 
 * @returns {Object} The toast hook functionality
 */
export const useToast = useToastInternal;

/**
 * Toast utility function
 * - Shows toast notifications
 * - Can be used directly without hooks
 * 
 * @type {Object} Toast functions for showing different types of notifications
 */
export const toast = toastInternal;
