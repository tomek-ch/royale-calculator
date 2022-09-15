import { isClient } from "../utils/isServer";
import { useSyncedValue } from "./useSyncedValue";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useSyncedValue(
    "isDarkMode",
    isClient ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  );
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  return { isDarkMode, toggleTheme };
};
