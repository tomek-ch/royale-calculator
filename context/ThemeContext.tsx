import { createContext, ReactNode, useContext } from "react";
import { useTheme } from "../hooks/useTheme";

type ThemeContext = ReturnType<typeof useTheme>;

const ThemeContext = createContext({} as ThemeContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={useTheme()}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
