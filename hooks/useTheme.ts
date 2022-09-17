import { useEffect } from "react";
import { isClient } from "../utils/isServer";
import { useSyncedValue } from "./useSyncedValue";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useSyncedValue(
    "isDarkMode",
    isClient ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  );
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return { isDarkMode, toggleTheme };
};
