import { rarities, SelectedCard } from "./types";

const cardsRequired = {
  common: [2, 4, 10, 20, 50, 100, 200, 400, 800, 1000, 1500, 3000, 5000],
  rare: [2, 4, 10, 20, 50, 100, 200, 400, 500, 750, 1250],
  epic: [2, 4, 10, 20, 40, 50, 100, 200],
  legendary: [2, 4, 6, 10, 20],
  champion: [2, 8, 20],
};

const goldRequired = {
  common: [
    5, 20, 50, 150, 400, 1000, 2000, 4000, 8000, 15000, 35000, 75000, 100000,
  ],
  rare: [50, 150, 400, 1000, 2000, 4000, 8000, 15000, 35000, 75000, 100000],
  epic: [400, 2000, 4000, 8000, 15000, 35000, 75000, 100000],
  legendary: [5000, 15000, 35000, 75000, 100000],
  champion: [35000, 75000, 100000],
};

const sum = (arr: number[]) => arr.reduce((sum, n) => sum + n, 0);

const levelOffsets = Object.fromEntries(
  Object.entries(rarities).map(([offset, rarity]) => [
    rarity,
    14 - Number(offset),
  ])
);

const getRequired =
  (data: typeof cardsRequired) =>
  ({ card, fromLevel, toLevel }: SelectedCard) => {
    const range = data[card.rarity].slice(
      fromLevel - 1 - levelOffsets[card.rarity],
      toLevel - 1 - levelOffsets[card.rarity]
    );
    return sum(range);
  };

export const getRequiredCards = getRequired(cardsRequired);
export const getRequiredGold = getRequired(goldRequired);
