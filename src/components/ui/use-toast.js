
/**
 * This file re-exports the toast functionality from the hooks directory.
 * It exists for backward compatibility with the shadcn/ui pattern where
 * components can import the toast hook from the components/ui directory.
 */

// Re-export from hooks for backward compatibility
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
