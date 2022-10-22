import { useState } from "react";
import {
  initModal,
  setMaxOnSave,
  setSyncOnSave,
  updateInputFrom,
  updateInputTo,
} from "../lib/bulkEdit";
import { SelectedCard } from "../utils/types";
import { usePlayer } from "./usePlayer";

export const useBulkEdit = (
  deck: SelectedCard[],
  { playerCardsMap }: ReturnType<typeof usePlayer>,
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

  const selectedCards = deck.filter((item) => item.isSelected);

  const numberOfSelected = selectedCards.length;
  const isSelectMode = !!numberOfSelected;

  const [bulkUpdate, setBulkUpdate] = useState(
    initModal(selectedCards, playerCardsMap)
  );
  const setUpdateFrom = (value: number) =>
    setBulkUpdate((prev) => updateInputFrom(prev, value));
  const setUpdateTo = (value: number) =>
    setBulkUpdate((prev) => updateInputTo(prev, value));
  const {
    updateFrom,
    updateTo,
    updateFromRange,
    updateToRange,
    maxOnSave,
    syncOnSave,
    updatedCards,
    canSync,
  } = bulkUpdate;

  const save = () => {
    setDeck((prev) =>
      prev.map((item) => {
        const updatedCard = updatedCards.find(
          ({ card: { id } }) => id === item.card.id
        );
        if (!updatedCard) {
          return item;
        }
        return updatedCard;
      })
    );
    cancelSelect();
  };

  return {
    selectForEdit,
    cancelSelect,
    deleteMany,
    selectAll,
    isSelectMode,
    numberOfSelected,
    selectedCards,
    setMaxOnSave: () =>
      setBulkUpdate((prev) => setMaxOnSave(prev, playerCardsMap)),
    setSyncOnSave: () =>
      setBulkUpdate((prev) => setSyncOnSave(prev, playerCardsMap)),
    setUpdateFrom,
    setUpdateTo,
    updateFromRange,
    updateToRange,
    updateFrom,
    updateTo,
    maxOnSave,
    syncOnSave,
    save,
    initModal: () => setBulkUpdate(initModal(selectedCards, playerCardsMap)),
    canSync,
  };
};
