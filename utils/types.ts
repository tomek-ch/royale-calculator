export const rarities = {
  [14]: "common",
  [12]: "rare",
  [9]: "epic",
  [6]: "legendary",
  [4]: "champion",
} as const;

export const rarityList = Object.values(rarities);

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
  isSelected: boolean;
  fromLevel: number;
  toLevel: number;
}

type PlayerCardData = {
  level: number;
  count: number;
};

export type PlayerCard = Card & PlayerCardData;

export type PlayerCardFromApi = CardFromApi & PlayerCardData;

export interface PlayerFromApi {
  name: string;
  cards: PlayerCardFromApi[];
  currentDeck: PlayerCardFromApi[];
}

export interface Player {
  name: string;
  tag: string;
  cards: PlayerCard[];
  currentDeck: PlayerCard[];
  recentDecks: PlayerCard[][];
}
