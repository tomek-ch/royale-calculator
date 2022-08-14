import type { NextPage } from "next";
import { Header } from "../components/Header";
import { SelectedCards } from "../components/SelectedCards";

const Home: NextPage = () => {
  return (
    <div className="px-4 max-w-md mx-auto">
      <Header />
      <SelectedCards />
    </div>
  );
};

export default Home;
