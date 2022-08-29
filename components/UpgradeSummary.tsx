import { firstCap } from "../utils/firstCap";
import { getRequiredCards, getRequiredGold } from "../utils/getRequired";
import { Rarity, SelectedCard } from "../utils/types";

interface UpgradeSummaryProps {
  selectedCards: SelectedCard[];
}

export const UpgradeSummary = ({ selectedCards }: UpgradeSummaryProps) => {
  if (!selectedCards.length) {
    return null;
  }

  const requiredGold = selectedCards.reduce(
    (acc, item) => acc + getRequiredGold(item),
    0
  );

  const requiredCards = selectedCards.reduce<Partial<Record<Rarity, number>>>(
    (acc, item) => ({
      ...acc,
      [item.card.rarity]: getRequiredCards(item) + (acc[item.card.rarity] || 0),
    }),
    {}
  );

  return (
    <div>
      <div className="p-7 rounded-xl bg-slate-200 mt-4">
        <h2 className="mb-4 font-medium text-lg">Summary</h2>
        Required gold:{" "}
        <span className="font-medium">{requiredGold.toLocaleString()}</span>
        <h4 className="mt-4">Required cards:</h4>
        <ul className="list-disc ml-4 mt-1">
          {Object.entries(requiredCards).map(([k, v]) => (
            <li>
              {firstCap(k)} -{" "}
              <span className="font-medium">{v.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
