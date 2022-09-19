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

      if (value?.required) {
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
        <ul className="list-disc ml-4 mt-2">
          {requiredCardsSorted.map(({ missing, rarity, required }) => (
            <li key={rarity}>
              <div className="md:flex gap-3">
                <span className="capitalize">
                  {rarity} -{" "}
                  <span className="font-medium">
                    {required.toLocaleString()}
                  </span>
                </span>
                {!!missing && (
                  <InlineAlert
                    variant="warning"
                    className="!gap-1 mb-2 md:mb-0"
                  >
                    {missing.toLocaleString()} missing
                  </InlineAlert>
                )}
              </div>
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
