import Link from "next/link";
import { Logo } from "./Logo";
import { UserNav } from "./UserNav";

export const Header = () => {
  return (
    <header className="py-3 items-center flex justify-between">
      <Link href="/">
        <Logo />
      </Link>
      <UserNav />
    </header>
  );
};
