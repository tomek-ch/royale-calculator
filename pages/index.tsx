import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { AuthToast } from "../components/AuthToast";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MyContextProvider } from "../context/MyContext";
import { formatCardData } from "../utils/formatCardData";
import { Card, CardFromApi } from "../utils/types";

const SelectedCards = dynamic(
  async () => (await import("../components/SelectedCards")).SelectedCards,
  { ssr: false }
);

type HomeProps = {
  cards: Card[];
};

const Home: NextPage<HomeProps> = ({ cards }) => {
  return (
    <MyContextProvider cards={cards}>
      <Header />
      <SelectedCards />
      <Footer />
      <AuthToast />
    </MyContextProvider>
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

  const cards: Card[] = data.flatMap((card) => {
    if (["Super Mini P.E.K.K.A", "Barbarian Launcher"].includes(card.name)) {
      return [];
    }
    return formatCardData(card);
  });

  return { props: { cards } };
};
