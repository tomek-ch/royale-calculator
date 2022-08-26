import { SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";
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
      <Button variant="primary" className="mt-3 ml-auto" onClick={addToDeck}>
        Add to deck
      </Button>
    </>
  );
};
