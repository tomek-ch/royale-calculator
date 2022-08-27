import { SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";
import { Select, SelectBtn, SelectOption, SelectOptions } from "./Select";
import { SelectedCardData } from "./SelectedCardData";

interface CardUpgradeFormProps {
  selectedCard: SelectedCard;
  addToDeck: () => void;
  goBack: () => void;
}

export const CardUpgradeForm = ({
  selectedCard,
  addToDeck,
  goBack,
}: CardUpgradeFormProps) => {
  return (
    <>
      <h3 className="mb-3 flex gap-2">
        <button onClick={goBack}>
          <ArrowLeft width={16} />
        </button>
        Selected card
      </h3>
      <SelectedCardData selectedCard={selectedCard} withShadow={false} />
      <div>
        <div className="mt-4 mb-2">What level is your card?</div>
        <Select selected={1} onChange={console.log} className="w-16">
          <SelectBtn>1</SelectBtn>
          <SelectOptions>
            <SelectOption value={1}>1</SelectOption>
            <SelectOption value={2}>2</SelectOption>
          </SelectOptions>
        </Select>
      </div>
      <div>
        <div className="mt-4 mb-2">
          What level do you want to upgrade it to?
        </div>
        <Select selected={1} onChange={console.log} className="w-16">
          <SelectBtn>1</SelectBtn>
          <SelectOptions>
            <SelectOption value={1}>1</SelectOption>
            <SelectOption value={2}>2</SelectOption>
          </SelectOptions>
        </Select>
      </div>
      <Button variant="primary" className="mt-3 ml-auto" onClick={addToDeck}>
        Add to deck
      </Button>
    </>
  );
};
