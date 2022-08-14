import type { NextPage } from "next";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="px-4 max-w-md mx-auto">
      <Header />
    </div>
  );
};

export default Home;
