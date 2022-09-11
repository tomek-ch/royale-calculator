import { NextApiHandler } from "next";
import { formatPlayerCardData } from "../../../utils/formatCardData";
import { Player, PlayerFromApi } from "../../../utils/types";

const handler: NextApiHandler = async (req, res) => {
  try {
    const tag = req.query.playerTag as string;
    const response = await fetch(
      `https://proxy.royaleapi.dev/v1/players/%23${tag.toUpperCase()}`,
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

      const player: Player = {
        tag,
        name,
        cards: cards.map(formatPlayerCardData),
        currentDeck: currentDeck.map(formatPlayerCardData),
      };

      res.status(200).json(player);
    } else {
      res.status(response.status).end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

export default handler;
