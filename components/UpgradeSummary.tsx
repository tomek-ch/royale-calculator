import { useMyContext } from "../context/MyContext";
import {
  getRequiredCards,
  getRequiredGold,
  getXpGained,
} from "../utils/getRequired";
import { Rarity, rarityList, SelectedCard } from "../utils/types";
import { InlineAlert } from "./InlineAlert";

export const UpgradeSummary = () => {
  const {
    decks: { deck: selectedCards },
    player: { playerCards },
  } = useMyContext();

  if (!selectedCards.length) {
    return null;
  }

  const sumCards = (cb: (selectedCard: SelectedCard) => number) =>
    selectedCards.reduce((acc, item) => acc + cb(item), 0);

  const requiredGold = sumCards(getRequiredGold);
  const gainedXp = sumCards(getXpGained);

  const getMissingCount = (
    { fromLevel, card: { id } }: SelectedCard,
    required: number
  ) => {
    const playerCard = playerCards.find((item) => item.id === id);
    if (!playerCard || fromLevel !== playerCard.level) {
      return 0;
    }
    const difference = required - playerCard.count;
    return difference > 0 ? difference : 0;
  };

  const requiredCards = selectedCards.reduce<
    Partial<Record<Rarity, { required: number; missing: number }>>
  >((acc, item) => {
    const rarity = acc[item.card.rarity];
    const required = getRequiredCards(item);
    const missing = getMissingCount(item, required);
    return {
      ...acc,
      [item.card.rarity]: {
        required: required + (rarity?.required || 0),
        missing: missing + (rarity?.missing || 0),
      },
    };
  }, {});

  const requiredCardsSorted = rarityList
    .flatMap((rarity) => {
      const value = requiredCards[rarity];

      if (value) {
        return [{ ...value, rarity }];
      }

      return [];
    })
    .reverse();

  return (
    <div>
      <div className="p-7 rounded-xl bg-slate-200 dark:bg-slate-800 mt-4">
        <h2 className="mb-4 font-medium text-lg dark:text-white">Summary</h2>
        Required gold:{" "}
        <span className="font-medium">{requiredGold.toLocaleString()}</span>
        <h4 className="mt-4">
          Required cards: {!requiredCardsSorted.length && 0}
        </h4>
        <ul className="list-disc ml-4 mt-1">
          {requiredCardsSorted.map(({ missing, rarity, required }) => (
            <li
              className="capitalize flex gap-x-4 gap-y-2 flex-wrap"
              key={rarity}
            >
              <span>
                {rarity} -{" "}
                <span className="font-medium">{required.toLocaleString()}</span>
              </span>
              {!!missing && (
                <InlineAlert variant="warning" className="">
                  {missing.toLocaleString()} cards missing
                </InlineAlert>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          Experience gained:{" "}
          <span className="font-medium">{gainedXp.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
