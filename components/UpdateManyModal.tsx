import { useMyContext } from "../context/MyContext";
import { Transition } from "../hooks/useTransition";
import { areAllTheSame } from "../utils/areAllTheSame";
import { getRequiredCards } from "../utils/getRequired";
import { getRange } from "../utils/range";
import { Button } from "./Button";
import { ArrowUp } from "./icons/ArrowUp";
import { CircleQuestion } from "./icons/CircleQuestion";
import { Sync } from "./icons/Sync";
import { InlineAlert } from "./InlineAlert";
import { Modal } from "./Modal";
import { Select, SelectBtn, SelectOption, SelectOptions } from "./Select";
import { Tooltip } from "./Tooltip";

interface UpdateManyModalProps {
  transition: Transition;
  inputFrom: number;
  setInputFrom: (value: number | null) => void;
  inputTo: number;
  setInputTo: (value: number | null) => void;
  syncOnSave: boolean;
  maxOnSave: boolean;
  setSyncOnSave: (value: boolean) => void;
  setMaxOnSave: (value: boolean) => void;
}

export const UpdateManyModal = ({
  transition,
  inputFrom,
  setInputFrom,
  inputTo,
  setInputTo,
  maxOnSave,
  setMaxOnSave,
  setSyncOnSave,
  syncOnSave,
}: UpdateManyModalProps) => {
  const {
    bulkEdit: {
      numberOfSelected,
      isSelectMode,
      maxStartLevel,
      cancelSelect,
      updateManyFrom,
      updateManyTo,
      selectedCards,
    },
    decks: { setDeck },
    player: { player, playerCards },
  } = useMyContext();

  const sync = () => {
    const playerCardLevels = selectedCards.map(
      ({ card: { id } }) => playerCards.find((card) => card.id === id)?.level
    );
    const firstPlayerCardLvl = playerCardLevels[0];

    if (firstPlayerCardLvl && areAllTheSame(playerCardLevels)) {
      setInputFrom(firstPlayerCardLvl);
      setSyncOnSave(true);
    } else if (playerCardLevels.some((lvl) => !!lvl)) {
      setInputFrom(null);
      setSyncOnSave(true);
    }
  };

  const max = () => {
    const maxLevels = selectedCards.map((selectedCard) => {
      const playerCard = playerCards.find(
        (card) => card.id === selectedCard.card.id
      );

      if (!playerCard) {
        return;
      }

      const maxLevel = getRange(14, playerCard.level, -1).find((toLevel) => {
        const missingCount =
          getRequiredCards({
            ...selectedCard,
            toLevel,
          }) - playerCard!.count;
        return missingCount <= 0;
      });

      return maxLevel;
    });

    const firstMaxLevel = maxLevels[0];

    if (firstMaxLevel && areAllTheSame(maxLevels)) {
      setInputTo(firstMaxLevel);
      setMaxOnSave(true);
    } else if (maxLevels.some((lvl) => !!lvl)) {
      setInputTo(null);
      setMaxOnSave(true);
    }
  };

  return (
    <Modal
      {...transition}
      title={`Editing ${numberOfSelected} ${
        numberOfSelected === 1 ? "item" : "items"
      }`}
    >
      Upgrade from level
      <div className="mt-2 mb-4">
        <div className="flex gap-2 items-center">
          <Select
            selected={inputFrom}
            onChange={setInputFrom}
            className="w-20 z-10"
          >
            <SelectBtn>{inputFrom || "Mixed"}</SelectBtn>
            <SelectOptions>
              {isSelectMode &&
                getRange(maxStartLevel, 14).map((value) => (
                  <SelectOption key={value} value={value}>
                    {value}
                  </SelectOption>
                ))}
            </SelectOptions>
          </Select>
          {player && (
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
                <Button
                  variant="round"
                  size="md"
                  className="-ml-1 dark:hover:!bg-slate-700"
                >
                  <CircleQuestion
                    width="20"
                    className="text-slate-600 dark:text-slate-500"
                  />
                </Button>
              </Tooltip>
            </>
          )}
        </div>
        {syncOnSave && (
          <InlineAlert variant="success" className="mt-2">
            Levels will be synced on save
          </InlineAlert>
        )}
      </div>
      Upgrade to level
      <div className="mt-2">
        <div className="flex gap-2 items-center">
          <Select selected={inputTo} onChange={setInputTo} className="w-20">
            <SelectBtn>{inputTo || "Mixed"}</SelectBtn>
            <SelectOptions>
              {isSelectMode &&
                getRange(inputFrom || maxStartLevel, 14).map((value) => (
                  <SelectOption key={value} value={value}>
                    {value}
                  </SelectOption>
                ))}
            </SelectOptions>
          </Select>
          {player && (
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
                <Button
                  variant="round"
                  size="md"
                  className="-ml-1 dark:hover:!bg-slate-700"
                >
                  <CircleQuestion
                    width="20"
                    className="text-slate-600 dark:text-slate-500"
                  />
                </Button>
              </Tooltip>
            </>
          )}
        </div>
        {maxOnSave && (
          <InlineAlert variant="success" className="mt-2">
            Levels will be synced on save
          </InlineAlert>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          onClick={() => {
            transition.toggle();
            cancelSelect();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (syncOnSave) {
              setDeck((prev) =>
                prev.map((item) => {
                  const playerCard = playerCards.find(
                    ({ id }) => id === item.card.id
                  );
                  if (!playerCard) return item;
                  return {
                    ...item,
                    fromLevel: playerCard.level,
                    toLevel:
                      playerCard.level > item.toLevel
                        ? playerCard.level
                        : item.toLevel,
                  };
                })
              );
            } else if (inputFrom) {
              updateManyFrom(inputFrom);
            }

            if (maxOnSave) {
              setDeck((prev) =>
                prev.map((item) => {
                  const playerCard = playerCards.find(
                    ({ id }) => id === item.card.id
                  );
                  if (!playerCard) return item;
                  const maxLevel = getRange(14, playerCard!.level, -1).find(
                    (toLevel) => {
                      const missingCount =
                        getRequiredCards({
                          ...item,
                          toLevel,
                        }) - playerCard!.count;
                      return missingCount <= 0;
                    }
                  ) as number;
                  return {
                    ...item,
                    toLevel: maxLevel,
                  };
                })
              );
            } else if (inputTo) {
              updateManyTo(inputTo);
            }
            transition.toggle();
            cancelSelect();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
