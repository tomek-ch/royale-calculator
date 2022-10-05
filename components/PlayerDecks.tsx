import { useMyContext } from "../context/MyContext";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { Deck } from "./Deck";
import { LogOut } from "./icons/LogOut";
import { User } from "./icons/User";
import { MsgBox } from "./Tutorial";

interface PlayerDecksProps {
  onLogOut: () => void;
}

export const PlayerDecks = ({ onLogOut }: PlayerDecksProps) => {
  const {
    player: { playerName, playerDecks, playerCurrentDeck, setCopiedDeck },
    tutorial,
  } = useMyContext();
  return (
    <div className="dark:text-slate-300 h-full">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-2 items-center">
            <User width="12" /> {playerName}
          </div>
        </div>
        <Button onClick={onLogOut} className="flex gap-3">
          Log out <LogOut width="20" className="-mr-1" />
        </Button>
      </div>
      <div className="overflow-y-scroll h-[calc(100%-142px)] pr-2 mt-8">
        <div className="mb-4">Current deck</div>
        {tutorial.isCopyStep && (
          <div className="fixed inset-0 bg-black/70 w-full z-10" />
        )}
        <Deck
          className="z-20 relative"
          cards={playerCurrentDeck}
          onCopy={() => {
            if (tutorial.isCopyStep) {
              tutorial.nextStep();
            }
            setCopiedDeck(playerCurrentDeck);
          }}
        />
        {tutorial.isCopyStep && (
          <div className="relative">
            <MsgBox className="absolute right-0">
              Click here to copy your current deck
            </MsgBox>
          </div>
        )}
        <div className="mb-4 mt-8">Recent decks</div>
        {playerDecks.length ? (
          playerDecks.map((deck, idx) => (
            <div className="mb-6" key={idx}>
              <Deck cards={deck} onCopy={() => setCopiedDeck(deck)} />
            </div>
          ))
        ) : (
          <Alert>No recent decks found</Alert>
        )}
      </div>
    </div>
  );
};
