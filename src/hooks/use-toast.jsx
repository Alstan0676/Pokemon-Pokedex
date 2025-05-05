import * as React from "react"

// Maximum number of toasts that can be displayed at once
const TOAST_LIMIT = 20
// Delay in milliseconds before removing a toast from the DOM after it's dismissed
const TOAST_REMOVE_DELAY = 1000

// Action types for our reducer - these define the different operations we can perform on toasts
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",       // Add a new toast to the list
  UPDATE_TOAST: "UPDATE_TOAST", // Update an existing toast
  DISMISS_TOAST: "DISMISS_TOAST", // Mark a toast as dismissed (starts the removal process)
  REMOVE_TOAST: "REMOVE_TOAST"  // Actually remove the toast from the list
}

// Counter to generate unique IDs for each toast
let count = 0

/**
 * Generates a unique ID for each toast
 * Increments the counter for each new toast and wraps around when it gets too large
 * @returns {string} A unique ID string
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Map to store timeout IDs for removing toasts
// This helps us manage the delayed removal of toasts
const toastTimeouts = new Map()

/**
 * Adds a toast to the removal queue
 * This creates a timeout to remove the toast after a delay
 * @param {string} toastId - The ID of the toast to remove
 */
const addToRemoveQueue = (toastId) => {
  // Don't create a new timeout if one already exists for this toast
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Create a timeout to remove the toast after the delay
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  // Store the timeout ID so we can cancel it if needed
  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer function for managing toast state
 * Handles adding, updating, dismissing, and removing toasts
 * @param {Object} state - Current state containing the toast array
 * @param {Object} action - Action to perform
 * @returns {Object} New state after the action is performed
 */
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      // Add a new toast to the beginning of the array and limit the total number
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      // Update an existing toast by its ID
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // Side effect: Queue the toast(s) for removal
      if (toastId) {
        // Queue a specific toast for removal
        addToRemoveQueue(toastId)
      } else {
        // Queue all toasts for removal
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      // Mark the toast(s) as closed by setting open: false
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      // If no toastId is provided, remove all toasts
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      // Otherwise, filter out the specific toast to remove it
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array to store listener functions from different components using the toast
const listeners = []

// Initial state for the toast system
let memoryState = { toasts: [] }

/**
 * Dispatch function to update the state and notify all listeners
 * @param {Object} action - Action to dispatch to the reducer
 */
function dispatch(action) {
  // Update the state using the reducer
  memoryState = reducer(memoryState, action)
  // Notify all listeners about the state change
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Function to create and display a toast notification
 * @param {Object} props - Properties for the toast
 * @returns {Object} Methods to control the toast (dismiss, update)
 */
function toast({ ...props }) {
  // Generate a unique ID for this toast
  const id = genId()

  // Function to update this specific toast
  const update = (props) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    })

  // Function to dismiss this specific toast
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  // Add the toast to the state
  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        // When the toast is closed, dismiss it
        if (!open) dismiss()
      },
    },
  })

  // Return methods to control this toast
  return {
    id,
    dismiss,
    update,
  }
}

/**
 * Hook to access the toast functionality
 * @returns {Object} Toast state and methods
 */
function useToast() {
  // Create a state that tracks the global toast state
  const [state, setState] = React.useState(memoryState)

  // Subscribe to state changes on mount, unsubscribe on unmount
  React.useEffect(() => {
    // Add this component's setState function as a listener
    listeners.push(setState)
    
    // Clean up on unmount by removing the listener
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  // Return the current state and methods to control toasts
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }
