import dynamic from "next/dynamic";
import { Logo } from "./Logo";

const Nav = dynamic(async () => (await import("./Nav")).Nav, {
  ssr: false,
});

export const Header = () => {
  return (
    <header className="py-3 items-center flex justify-between h-[62px]">
      <Logo />
      <Nav />
    </header>
  );
};
