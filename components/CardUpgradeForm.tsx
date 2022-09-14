import { useMyContext } from "../context/MyContext";
import { getRequiredCards } from "../utils/getRequired";
import { getRange } from "../utils/range";
import { SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { ArrowUp } from "./icons/ArrowUp";
import { CircleQuestion } from "./icons/CircleQuestion";
import { Sync } from "./icons/Sync";
import { Select, SelectBtn, SelectOption, SelectOptions } from "./Select";
import { SelectedCardData } from "./SelectedCardData";
import { Tooltip } from "./Tooltip";

interface CardUpgradeFormProps {
  addToDeck: () => void;
}

export const CardUpgradeForm = ({ addToDeck }: CardUpgradeFormProps) => {
  const {
    selectedCard: {
      isEditing,
      resetCard: goBack,
      selectedCard: maybeSelectedCard,
      setFromLevel,
      setToLevel,
    },
    player: { playerCards },
  } = useMyContext();
  const selectedCard = maybeSelectedCard as SelectedCard;

  const handleFromLevelChange = (value: number) => {
    if (value > selectedCard.toLevel) {
      setToLevel(value);
    }
    setFromLevel(value);
  };

  const playerCard = playerCards.find(({ id }) => id === selectedCard.card.id);
  const sync = () => {
    setFromLevel(playerCard!.level);
  };

  const max = () => {
    const maxLevel = getRange(14, playerCard!.level, -1).find((toLevel) => {
      const missingCount =
        getRequiredCards({
          ...selectedCard,
          toLevel,
        }) - playerCard!.count;
      return missingCount <= 0;
    }) as number;
    setToLevel(maxLevel);
  };

  return (
    <>
      <SelectedCardData
        selectedCard={selectedCard}
        withShadow={false}
        onClick={goBack}
      />
      <div className="mt-4 mb-2 items-center">What level is your card?</div>
      <div className="flex gap-2">
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
        {playerCard ? (
          <>
            <Button className="flex items-center gap-2" onClick={sync}>
              <Sync width="16" className="-ml-1" />
              Sync
            </Button>
            <Tooltip
              title="Sync value with your actual card level"
              position="bottom"
              className="w-72 z-20"
            >
              <Button variant="round" size="md" className="-ml-1">
                <CircleQuestion width="20" className="text-slate-600" />
              </Button>
            </Tooltip>
          </>
        ) : null}
      </div>
      <div className="mt-4 mb-2">What level do you want to upgrade it to?</div>
      <div className="flex gap-2 items-center">
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
        {playerCard ? (
          <>
            <Button className="flex items-center gap-2" onClick={max}>
              <ArrowUp height="16" className="-ml-1" />
              Max
            </Button>
            <Tooltip
              title="Set upgrade level to the maximum allowed by your card count"
              position="bottom"
              className="w-72"
            >
              <Button variant="round" size="md" className="-ml-1">
                <CircleQuestion width="20" className="text-slate-600" />
              </Button>
            </Tooltip>
          </>
        ) : null}
      </div>
      <Button variant="primary" className="mt-3 ml-auto" onClick={addToDeck}>
        {isEditing ? "Save" : "Add to deck"}
      </Button>
    </>
  );
};
