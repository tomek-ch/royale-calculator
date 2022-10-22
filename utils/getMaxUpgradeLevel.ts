import { getRequiredCards } from "./getRequired";
import { getRange } from "./range";
import { PlayerCards, SelectedCard } from "./types";

export const getMaxUpgradeLevel = (
  playerCards: PlayerCards,
  selectedCard: SelectedCard
) => {
  const playerCard = playerCards[selectedCard.card.id];

  if (!playerCard) {
    return;
  }

  return getRange(14, playerCard.level, -1).find((toLevel) => {
    const missingCount =
      getRequiredCards({
        ...selectedCard,
        toLevel,
      }) - playerCard!.count;
    return missingCount <= 0;
  });
};
