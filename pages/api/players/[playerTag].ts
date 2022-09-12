import { NextApiHandler } from "next";
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
    const tag = (req.query.playerTag as string).toUpperCase();
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
        (battleLogData as BattleLog).map(({ team: [{ cards }] }) =>
          cards.map(formatPlayerCardData)
        ),
        areDecksTheSame
      ).filter((deck) => !areDecksTheSame(deck, currentDeck)),
    };

    res.status(200).json(player);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

export default handler;
