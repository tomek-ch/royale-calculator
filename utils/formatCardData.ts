import {
  Card,
  CardFromApi,
  PlayerCard,
  PlayerCardFromApi,
  rarities,
} from "./types";

export const formatCardData = ({
  name,
  id,
  iconUrls: { medium },
  maxLevel,
}: CardFromApi): Card => {
  return {
    id,
    name,
    icon: medium,
    rarity: rarities[maxLevel],
    startingLevel: 15 - maxLevel,
  };
};

export const formatPlayerCardData = (card: PlayerCardFromApi): PlayerCard => {
  return {
    ...formatCardData(card),
    count: card.count,
    level: card.level,
  };
};
