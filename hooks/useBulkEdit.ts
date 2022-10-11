import { useState } from "react";
import { areAllTheSame } from "../utils/areAllTheSame";
import { SelectedCard } from "../utils/types";
import { usePlayer } from "./usePlayer";

export const useBulkEdit = (
  deck: SelectedCard[],
  { playerCardsMap, getMaxUpgradeLevel }: ReturnType<typeof usePlayer>,
  setDeck: (cb: (prev: SelectedCard[]) => SelectedCard[]) => void
) => {
  const selectForEdit = (id: number) => {
    setDeck((prev) =>
      prev.map((item) => {
        if (item.card.id === id) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      })
    );
  };

  const cancelSelect = () =>
    setDeck((prev) => prev.map((item) => ({ ...item, isSelected: false })));

  const deleteMany = () => {
    setDeck((prev) => prev.filter((item) => !item.isSelected));
  };

  const selectAll = () =>
    setDeck((prev) => prev.map((item) => ({ ...item, isSelected: true })));

  const updateManyFrom = (value: number) => {
    setDeck((prev) =>
      prev.map((item) => {
        if (!item.isSelected) {
          return item;
        }
        if (item.card.startingLevel > value) {
          return { ...item, fromLevel: item.card.startingLevel };
        }
        return { ...item, fromLevel: value };
      })
    );
  };
  const updateManyTo = (value: number) => {
    setDeck((prev) =>
      prev.map((item) => {
        if (!item.isSelected) {
          return item;
        }
        if (item.fromLevel > value) {
          return { ...item, toLevel: item.fromLevel };
        }
        return { ...item, toLevel: value };
      })
    );
  };

  const selectedCards = deck.filter((item) => item.isSelected);

  const getSelectedCardsUpgradeLevel = (key: "fromLevel" | "toLevel") => {
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

  const selectedFromLevel = getSelectedCardsUpgradeLevel("fromLevel");
  const selectedToLevel = getSelectedCardsUpgradeLevel("toLevel");

  const minStartLevel = Math.min(
    ...selectedCards.map(({ card: { startingLevel } }) => startingLevel)
  );
  const minCurrentLevel = Math.min(
    ...selectedCards.map(({ fromLevel }) => fromLevel)
  );

  const numberOfSelected = selectedCards.length;
  const isSelectMode = !!numberOfSelected;

  const [inputFrom, setInputFrom] = useState(selectedFromLevel);
  const [inputTo, setInputTo] = useState(selectedToLevel);

  const [syncOnSave, setSyncOnSave] = useState(false);
  const [maxOnSave, setMaxOnSave] = useState(false);

  const sync = () => {
    const playerCardLevels = selectedCards.map(
      ({ card: { id } }) => playerCardsMap[id]?.level
    );
    const [firstPlayerCardLvl] = playerCardLevels;

    if (firstPlayerCardLvl && areAllTheSame(playerCardLevels)) {
      setInputFrom(firstPlayerCardLvl);
    } else if (playerCardLevels.some((lvl) => !!lvl)) {
      setInputFrom(null);
    }

    setSyncOnSave(true);
  };

  const max = () => {
    const maxLevels = selectedCards.map(getMaxUpgradeLevel);
    const [firstMaxLevel] = maxLevels;

    if (firstMaxLevel && areAllTheSame(maxLevels)) {
      setInputTo(firstMaxLevel);
    } else if (maxLevels.some((lvl) => !!lvl)) {
      setInputTo(null);
    }

    setMaxOnSave(true);
  };

  const updateSync = () => {
    setDeck((prev) =>
      prev.map((item) => {
        const playerCard = playerCardsMap[item.card.id];
        if (!playerCard) return item;
        return {
          ...item,
          fromLevel: playerCard.level,
          toLevel:
            playerCard.level > item.toLevel ? playerCard.level : item.toLevel,
        };
      })
    );
  };

  const updateMax = () => {
    setDeck((prev) =>
      prev.map((item) => {
        const maxLevel = getMaxUpgradeLevel(item);
        if (!maxLevel) {
          return item;
        }
        return {
          ...item,
          toLevel: maxLevel,
        };
      })
    );
  };

  return {
    selectForEdit,
    cancelSelect,
    deleteMany,
    selectAll,
    updateManyFrom,
    updateManyTo,
    selectedFromLevel,
    selectedToLevel,
    isSelectMode,
    numberOfSelected,
    selectedCards,
    syncOnSave,
    maxOnSave,
    setSyncOnSave,
    setMaxOnSave,
    sync,
    max,
    inputFrom,
    setInputFrom,
    inputTo,
    setInputTo,
    minStartLevel,
    minCurrentLevel,
    updateMany: () => {
      if (syncOnSave) {
        updateSync();
      } else if (inputFrom) {
        updateManyFrom(inputFrom);
      }

      if (maxOnSave) {
        updateMax();
      } else if (inputTo) {
        updateManyTo(inputTo);
      }
      cancelSelect();
    },
  };
};
