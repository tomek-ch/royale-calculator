import { Card, CardFromApi, rarities } from "./types";

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
