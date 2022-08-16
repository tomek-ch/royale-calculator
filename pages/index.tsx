import type { GetStaticProps, NextPage } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SelectedCards } from "../components/SelectedCards";
import { Card, CardFromApi, rarities } from "../utils/types";

type HomeProps = {
  cards: Card[];
};

const Home: NextPage<HomeProps> = ({ cards }) => {
  return (
    <div className="px-4 max-w-md mx-auto flex flex-col min-h-full">
      <Header />
      <SelectedCards cards={cards} />
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://api.clashroyale.com/v1/cards", {
    headers: { authorization: `Bearer ${process.env.API_TOKEN}` },
  });
  const data = (await res.json()).items as CardFromApi[];

  const cards: Card[] = data.flatMap(
    ({ name, id, iconUrls: { medium }, maxLevel }) => {
      if (["Super Mini P.E.K.K.A", "Barbarian Launcher"].includes(name)) {
        return [];
      }

      return {
        id,
        name,
        icon: medium,
        rarity: rarities[maxLevel],
      };
    }
  );

  return { props: { cards } };
};
