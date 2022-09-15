import { NextApiHandler } from "next";
import { chunkArr } from "../../../utils/chunkArr";
import { areDecksTheSame } from "../../../utils/compareDecks";
import { formatPlayerCardData } from "../../../utils/formatCardData";
import { getUnique } from "../../../utils/getUnique";
import { Player, PlayerCardFromApi, PlayerFromApi } from "../../../utils/types";

type BattleLog = {
  team: {
    cards: PlayerCardFromApi[];
  }[];
}[];

const handler: NextApiHandler = async (req, res) => {
  try {
    const tag = (req.query.playerTag as string).toUpperCase().trim();
    const fetchConfig = {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    };

    const [playerRes, battleLogRes] = await Promise.all([
      fetch(`https://proxy.royaleapi.dev/v1/players/%23${tag}`, fetchConfig),
      fetch(
        `https://proxy.royaleapi.dev/v1/players/%23${tag}/battlelog`,
        fetchConfig
      ),
    ]);

    if (!playerRes.ok) {
      res.status(playerRes.status).end();
      return;
    }

    if (!battleLogRes.ok) {
      res.status(battleLogRes.status).end();
      return;
    }

    const [playerData, battleLogData]: [PlayerFromApi, BattleLog] =
      await Promise.all([playerRes.json(), battleLogRes.json()]);

    const currentDeck = playerData.currentDeck.map(formatPlayerCardData);

    const player: Player = {
      tag,
      name: playerData.name,
      cards: playerData.cards.map(formatPlayerCardData),
      currentDeck,
      recentDecks: getUnique(
        battleLogData.flatMap(({ team: [{ cards }] }) => {
          const deck = cards.map(formatPlayerCardData);
          if (areDecksTheSame(deck, currentDeck)) {
            return [];
          }
          return chunkArr(deck, 8);
        }),
        areDecksTheSame
      ),
    };

    res.status(200).json(player);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

export default handler;
