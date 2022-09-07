import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Card, CardFromApi, rarities } from "../utils/types";

const SelectedCards = dynamic(
  async () => (await import("../components/SelectedCards")).SelectedCards,
  { ssr: false }
);

type HomeProps = {
  cards: Card[];
};

const Home: NextPage<HomeProps> = ({ cards }) => {
  return (
    <>
      <Header />
      <SelectedCards cards={cards} />
      <Footer />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://proxy.royaleapi.dev/v1/cards", {
    headers: { authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  const data: CardFromApi[] = (await res.json()).items;

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
        startingLevel: 15 - maxLevel,
      };
    }
  );

  return { props: { cards } };
};
