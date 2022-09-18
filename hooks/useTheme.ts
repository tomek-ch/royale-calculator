import { useEffect } from "react";
import { isClient } from "../utils/isServer";
import { useSyncedValue } from "./useSyncedValue";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useSyncedValue(
    "isDarkMode",
    isClient ? window.matchMedia("(prefers-color-scheme: dark)").matches : null
  );
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else if (isDarkMode === false) {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return { isDarkMode, toggleTheme };
};
