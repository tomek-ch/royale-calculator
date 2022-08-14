import type { NextPage } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SelectedCards } from "../components/SelectedCards";

const Home: NextPage = () => {
  return (
    <div className="px-4 max-w-md mx-auto flex flex-col min-h-full">
      <Header />
      <SelectedCards />
      <Footer />
    </div>
  );
};

export default Home;
