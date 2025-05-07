import * as React from "react"
import { useToast } from "../../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"

/**
 * Toaster component for displaying toast notifications
 * 
 * This component subscribes to the toast state and renders all active
 * toast notifications. It should be included once in your app layout.
 * 
 * @returns {JSX.Element} The toaster component that renders all active toasts
 */
export function Toaster() {
  // Get the current list of toasts from the hook
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {/* Map through all active toasts and render them */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {/* Show title if provided */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* Show description if provided */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {/* Show action buttons if provided */}
            {action}
            {/* Show close button */}
            <ToastClose />
          </Toast>
        )
      })}
      {/* Viewport defines the position and style of the toast container */}
      <ToastViewport />
    </ToastProvider>
  )
}
