export const rarities = {
  [14]: "common",
  [12]: "rare",
  [9]: "epic",
  [6]: "legendary",
  [4]: "champion",
} as const;

type MaxLevel = keyof typeof rarities;
export type Rarity = typeof rarities[MaxLevel];

export interface CardFromApi {
  name: string;
  id: number;
  maxLevel: MaxLevel;
  iconUrls: { medium: string };
}

export interface Card {
  id: number;
  name: string;
  rarity: Rarity;
  icon: string;
  startingLevel: number;
}

export interface SelectedCard {
  card: Card;
  fromLevel: number;
  toLevel: number;
}
