import {
  getRequiredCards,
  getRequiredGold,
  getXpGained,
} from "../utils/getRequired";
import { Rarity, rarityList, SelectedCard } from "../utils/types";

interface UpgradeSummaryProps {
  selectedCards: SelectedCard[];
}

export const UpgradeSummary = ({ selectedCards }: UpgradeSummaryProps) => {
  if (!selectedCards.length) {
    return null;
  }

  const sumCards = (cb: (selectedCard: SelectedCard) => number) =>
    selectedCards.reduce((acc, item) => acc + cb(item), 0);

  const requiredGold = sumCards(getRequiredGold);
  const gainedXp = sumCards(getXpGained);

  const requiredCards = selectedCards.reduce<Partial<Record<Rarity, number>>>(
    (acc, item) => ({
      ...acc,
      [item.card.rarity]: getRequiredCards(item) + (acc[item.card.rarity] || 0),
    }),
    {}
  );

  const requiredCardsSorted = rarityList
    .flatMap((rarity) => {
      const value = requiredCards[rarity];

      if (value) {
        return [[rarity, value]];
      }

      return [];
    })
    .reverse();

  return (
    <div>
      <div className="p-7 rounded-xl bg-slate-200 mt-4">
        <h2 className="mb-4 font-medium text-lg">Summary</h2>
        Required gold:{" "}
        <span className="font-medium">{requiredGold.toLocaleString()}</span>
        <h4 className="mt-4">Required cards:</h4>
        <ul className="list-disc ml-4 mt-1">
          {requiredCardsSorted.map(([k, v]) => (
            <li className="capitalize" key={k}>
              {k} - <span className="font-medium">{v.toLocaleString()}</span>
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
