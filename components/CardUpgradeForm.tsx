import { getRange } from "../utils/range";
import { SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";
import { Select, SelectBtn, SelectOption, SelectOptions } from "./Select";
import { SelectedCardData } from "./SelectedCardData";

interface CardUpgradeFormProps {
  selectedCard: SelectedCard;
  addToDeck: () => void;
  goBack: () => void;
  setFromLevel: (fromLevel: number) => void;
  setToLevel: (toLevel: number) => void;
}

export const CardUpgradeForm = ({
  selectedCard,
  addToDeck,
  goBack,
  setFromLevel,
  setToLevel,
}: CardUpgradeFormProps) => {
  const handleFromLevelChange = (value: number) => {
    if (value > selectedCard.toLevel) {
      setToLevel(value);
    }
    setFromLevel(value);
  };
  return (
    <>
      <h3 className="mb-3 flex gap-2">
        <button onClick={goBack}>
          <ArrowLeft width={16} />
        </button>
        Selected card
      </h3>
      <SelectedCardData selectedCard={selectedCard} withShadow={false} />
      <div className="mt-4 mb-2">What level is your card?</div>
      <Select
        selected={1}
        onChange={handleFromLevelChange}
        className="w-16 z-20"
      >
        <SelectBtn>{selectedCard.fromLevel}</SelectBtn>
        <SelectOptions>
          {getRange(selectedCard.card.startingLevel, 14).map((n) => (
            <SelectOption key={n} value={n}>
              {n}
            </SelectOption>
          ))}
        </SelectOptions>
      </Select>
      <div className="mt-4 mb-2">What level do you want to upgrade it to?</div>
      <Select selected={1} onChange={setToLevel} className="w-16">
        <SelectBtn>{selectedCard.toLevel}</SelectBtn>
        <SelectOptions>
          {getRange(selectedCard.fromLevel, 14).map((n) => (
            <SelectOption key={n} value={n}>
              {n}
            </SelectOption>
          ))}
        </SelectOptions>
      </Select>
      <Button variant="primary" className="mt-3 ml-auto" onClick={addToDeck}>
        Add to deck
      </Button>
    </>
  );
};
