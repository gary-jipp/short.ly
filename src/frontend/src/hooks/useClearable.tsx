import {useState} from "react";

/**
 * Set/Clear common items that auto-clear.
 * TODO: This hook name is not great
 *
 * @param duration Duration of error flag(seconds)
 * @returns
 */

interface AutoClearable {
  pending: boolean;
  copied: boolean;
  error: string;
  setPending: (state: boolean) => void;
  setCopied: (state: boolean) => void;
  setError: (message: string) => void;
}

const useClearable = function(duration: number): AutoClearable {
  const [pending, savePending] = useState(false);
  const [error, saveError] = useState("");
  const [copied, saveCopied] = useState(false);

  const setPending = function(state: boolean) {
    savePending(state);
    state && setTimeout(() => {   // Clear pending after <timeout> seconds
      savePending(false);;
    }, 20000);    // Just in case. Pending is usually cleared manually.
  };

  const setCopied = function(state: boolean) {
    saveCopied(state);
    state && setTimeout(() => {   // Clear copied  after <timeout> seconds
      saveCopied(false);;
    }, duration*1000);    // Just in case. Pending is usually cleared manually.
  };

  const setError = function(message: string) {
    saveError(message);
    message && setTimeout(() => {   // Clear error message after <timeout> seconds
      saveError("");;
    }, duration * 1000);
  };


  return {pending, error, copied, setPending, setError, setCopied};
};

export default useClearable;