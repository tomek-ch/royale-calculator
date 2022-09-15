import { useMyContext } from "../context/MyContext";
import { Button } from "./Button";
import { Moon } from "./icons/Moon";
import { Sun } from "./icons/Sun";

export const ThemeToggle = () => {
  const {
    theme: { toggleTheme, isDarkMode },
  } = useMyContext();
  return (
    <Button variant="round" onClick={toggleTheme}>
      {isDarkMode ? <Moon width="20" /> : <Sun width="20" />}
    </Button>
  );
};
