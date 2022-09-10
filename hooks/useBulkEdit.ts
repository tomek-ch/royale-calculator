import { SelectedCard } from "../utils/types";

export const useBulkEdit = (
  deck: SelectedCard[],
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

  const updateMany = (key: "fromLevel" | "toLevel") => (value: number) => {
    setDeck((prev) =>
      prev.map((item) => {
        if (item.isSelected) {
          return { ...item, [key]: value };
        }
        return item;
      })
    );
  };

  const updateManyFrom = updateMany("fromLevel");
  const updateManyTo = updateMany("toLevel");

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
  const maxStartLevel = Math.max(
    1,
    ...selectedCards.map(({ card: { startingLevel } }) => startingLevel)
  );

  const numberOfSelected = selectedCards.length;
  const isSelectMode = !!numberOfSelected;

  return {
    selectForEdit,
    cancelSelect,
    deleteMany,
    selectAll,
    updateManyFrom,
    updateManyTo,
    selectedFromLevel,
    selectedToLevel,
    maxStartLevel,
    isSelectMode,
    numberOfSelected,
  };
};
