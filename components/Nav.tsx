import { useMyContext } from "../context/MyContext";
import { ThemeToggle } from "./ThemeToggle";
import { UserNav } from "./UserNav";

export const Nav = () => {
  const {
    player: { isLoading },
  } = useMyContext();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex gap-1 items-center">
      <ThemeToggle />
      <UserNav />
    </div>
  );
};
