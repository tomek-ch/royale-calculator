import { NextApiHandler } from "next";
import { chunkArr } from "../../../utils/chunkArr";
import { areDecksTheSame } from "../../../utils/compareDecks";
import { formatPlayerCardData } from "../../../utils/formatCardData";
import { getUnique } from "../../../utils/getUnique";
import { Player, PlayerCardFromApi, PlayerFromApi } from "../../../utils/types";

type BattleLog = {
  team: {
    cards: PlayerCardFromApi[];
    tag: string;
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
        // teams -> player -> cards
        battleLogData
          // filter out teammates from 2v2 battles
          .flatMap(({ team }) =>
            team.filter((player) => player.tag.slice(1) === tag)
          )
          // split duel cards into decks
          .flatMap(({ cards }) => chunkArr(cards.map(formatPlayerCardData), 8))
          // do not repeat player's current deck
          .filter((deck) => !areDecksTheSame(deck, currentDeck)),
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
