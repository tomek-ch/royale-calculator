import { getMaxUpgradeLevel } from "../utils/getMaxUpgradeLevel";
import { getRange } from "../utils/range";
import { PlayerCards, SelectedCard } from "../utils/types";

const initialModalState = {
  updateFromRange: [] as number[],
  updateToRange: [] as number[],
  updateFrom: null as number | null,
  updateTo: null as number | null,
  maxOnSave: false,
  syncOnSave: false,
  updatedCards: [] as SelectedCard[],
  canMax: false,
  canSync: false,
};

type ModalState = typeof initialModalState;

const getSelectedCardsUpgradeLevel =
  (key: "fromLevel" | "toLevel") => (selectedCards: SelectedCard[]) => {
    if (!selectedCards.length) {
      return null;
    }
    const firstSelectedLevel = selectedCards[0][key];
    const areSelectedSameLevel = selectedCards.every(
      (item) => item[key] === firstSelectedLevel
    );
    if (areSelectedSameLevel) {
      return firstSelectedLevel;
    }
    return null;
  };

const getUpdateFrom = getSelectedCardsUpgradeLevel("fromLevel");
const getUpdateTo = getSelectedCardsUpgradeLevel("toLevel");

const getMinStartLevel = (selectedCards: SelectedCard[]) =>
  Math.min(
    11,
    ...selectedCards.map(({ card: { startingLevel } }) => startingLevel)
  );

export const initModal = (
  selectedCards: SelectedCard[],
  playerCards: PlayerCards
): ModalState => {
  const minStartLevel = getMinStartLevel(selectedCards);
  const levelRange = getRange(minStartLevel, 14);
  const updateFrom = getUpdateFrom(selectedCards);
  const updateTo = getUpdateTo(selectedCards);
  const canSync = selectedCards.some(({ card: { id } }) => playerCards[id]);
  return {
    ...initialModalState,
    updatedCards: selectedCards,
    updateFromRange: levelRange,
    updateToRange: levelRange,
    updateFrom,
    updateTo,
    canSync,
  };
};

export const updateInputFrom = (
  state: ModalState,
  newUpdateFrom: number
): ModalState => {
  const updatedCards = state.updatedCards.map((item) => ({
    ...item,
    fromLevel:
      item.card.startingLevel > newUpdateFrom
        ? item.card.startingLevel
        : newUpdateFrom,
    toLevel: item.toLevel < newUpdateFrom ? newUpdateFrom : item.toLevel,
  }));
  return {
    ...state,
    updateFrom: newUpdateFrom,
    updateTo: getUpdateTo(updatedCards),
    updatedCards,
    syncOnSave: false,
  };
};

export const updateInputTo = (
  state: ModalState,
  newUpdateTo: number
): ModalState => {
  const updatedCards = state.updatedCards.map((item) => ({
    ...item,
    fromLevel: item.fromLevel > newUpdateTo ? newUpdateTo : item.fromLevel,
    toLevel: newUpdateTo,
  }));
  return {
    ...state,
    updateFrom: getUpdateFrom(updatedCards),
    updateTo: newUpdateTo,
    updatedCards,
    maxOnSave: false,
  };
};

export const setSyncOnSave = (
  state: ModalState,
  playerCards: PlayerCards
): ModalState => {
  const updatedCards = state.updatedCards.map((item) => {
    const playerCard = playerCards[item.card.id];
    if (!playerCard) {
      return item;
    }
    return {
      ...item,
      fromLevel: playerCard.level,
      toLevel:
        playerCard.level > item.toLevel ? playerCard.level : item.toLevel,
    };
  });
  return {
    ...state,
    syncOnSave: true,
    updatedCards,
    updateFrom: getUpdateFrom(updatedCards),
    updateTo: getUpdateTo(updatedCards),
  };
};

export const setMaxOnSave = (
  state: ModalState,
  playerCards: PlayerCards
): ModalState => {
  const updatedCards = state.updatedCards.map((item) => {
    const maxLevel = getMaxUpgradeLevel(playerCards, item);
    if (!maxLevel) {
      return item;
    }
    return {
      ...item,
      toLevel: maxLevel,
      fromLevel: maxLevel < item.fromLevel ? maxLevel : item.fromLevel,
    };
  });

  return {
    ...state,
    maxOnSave: true,
    updatedCards,
    updateFrom: getUpdateFrom(updatedCards),
    updateTo: getUpdateTo(updatedCards),
  };
};
