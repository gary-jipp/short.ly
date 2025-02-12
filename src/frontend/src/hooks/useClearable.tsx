import {useState} from "react";

/**
 * Set/Clear common items that auto-clear.
 * TODO: This hook name is not great
 *
 * @param duration Duration of error flag(seconds)
 * @returns
 */

interface UseClearableReturn {
  pending: boolean;
  error: string;
  setPending: (state: boolean) => void;
  setError: (message: string) => void;
}

const useClearable = function(duration: number): UseClearableReturn {
  const [pending, savePending] = useState(false);
  const [error, saveError] = useState("");

  const setPending = function(state: boolean) {
    savePending(state);
    state && setTimeout(() => {   // Clear pending message after <timeout> seconds
      savePending(false);;
    }, 20000);    // Just in case. Pending is usually cleared manually.
  };

  const setError = function(message: string) {
    saveError(message);
    message && setTimeout(() => {   // Clear error message after <timeout> seconds
      saveError("");;
    }, duration * 1000);
  };

  return {pending, error, setPending, setError};
};

export default useClearable;