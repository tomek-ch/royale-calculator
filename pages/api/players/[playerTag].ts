import { NextApiHandler } from "next";
import { PlayerFromApi } from "../../../utils/types";

const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await fetch(
      `https://proxy.royaleapi.dev/v1/players/%23${(
        req.query.playerTag as string
      ).toUpperCase()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const { name, cards, currentDeck } = data as PlayerFromApi;
      res.status(200).json({
        name,
        cards: cards.map(({ id, level, count }) => ({
          id,
          level,
          count,
        })),
        currentDeck: currentDeck.map(({ id }) => id),
      });
    } else {
      res.status(response.status).end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

export default handler;
