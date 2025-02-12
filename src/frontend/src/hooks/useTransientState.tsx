/**
 * Wraps useSatate
 * TODO: This hook name is not great
*
* @param duration Duration of error flag(seconds)
* @returns
*/

import {useState} from "react";

type TransientValue = string | number | boolean;
type TransientState<T> = [T, (state: T) => void];

const useTransientState = function <T extends TransientValue>(initial: T, duration: number): TransientState<T> {
  const [value, saveValue] = useState<T>(initial);
  const [initialValue] = useState<T>(initial);

  const setValue = function(state: T) {
    saveValue(state);
    setTimeout(() => saveValue(initialValue), duration);  // Reset back to initial after duration
  };

  return [value, setValue];
};

export default useTransientState;
