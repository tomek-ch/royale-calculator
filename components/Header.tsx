import dynamic from "next/dynamic";
import { Logo } from "./Logo";

const UserNav = dynamic(
  () => import("./UserNav").then(({ UserNav }) => UserNav),
  { ssr: false }
);

export const Header = () => {
  return (
    <header className="py-3 items-center flex justify-between h-[62px]">
      <Logo />
      <UserNav />
    </header>
  );
};
