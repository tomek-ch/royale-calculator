import { useEffect, useRef } from "react";
import { useMyContext } from "../context/MyContext";
import { disableScroll, enableScroll } from "../utils/disableScroll";
import {
  getRequiredCards,
  getRequiredGold,
  getXpGained,
} from "../utils/getRequired";
import { Rarity, rarityList, SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { InlineAlert } from "./InlineAlert";
import { MsgBox } from "./Tutorial";

export const UpgradeSummary = () => {
  const {
    decks: { deck: selectedCards },
    player: { playerCards },
    tutorial,
  } = useMyContext();

  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tutorial.isSummaryStep) {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" });
      let scrollTimeout: number;
      addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(function () {
          disableScroll();
        }, 100);
      });
      return () => clearTimeout(scrollTimeout);
    }
  }, [tutorial.isSummaryStep, summaryRef]);

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
    <div ref={summaryRef} className="relative">
      {tutorial.isSummaryStep && (
        <>
          <div className="fixed inset-0 bg-black/70 w-full z-10" />
          <MsgBox className="absolute max-w-xl sm:flex items-center bottom-full">
            Here you can find the upgrade costs of your deck. The default
            upgrade level is 14 but you can adjust it for every card.
            <Button
              variant="primary"
              className="mt-2 ml-auto sm:mt-0"
              onClick={() => {
                tutorial.finishTutorial();
                enableScroll();
              }}
            >
              Got it
            </Button>
          </MsgBox>
        </>
      )}
      <div
        className={`p-7 rounded-xl bg-slate-200 dark:bg-slate-800 mt-4 relative ${
          tutorial.isSummaryStep ? "z-10" : ""
        }`}
      >
        <h2 className="mb-4 font-medium text-lg dark:text-white">Summary</h2>
        Required gold:{" "}
        <span className="font-medium dark:text-slate-200">
          {requiredGold.toLocaleString()}
        </span>
        <h4 className="mt-4">
          Required cards: {!requiredCardsSorted.length && 0}
        </h4>
        <ul className="list-disc ml-4 mt-2">
          {requiredCardsSorted.map(({ missing, rarity, required }) => (
            <li key={rarity}>
              <div className="md:flex gap-3">
                <span className="capitalize">
                  {rarity} -{" "}
                  <span className="font-medium dark:text-slate-200">
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
          <span className="font-medium dark:text-slate-200">
            {gainedXp.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
