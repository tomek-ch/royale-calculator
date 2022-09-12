import { useMyContext } from "../context/MyContext";
import { useTransition } from "../hooks/useTransition";
import { Button } from "./Button";
import { Deck } from "./Deck";
import { LogOut } from "./icons/LogOut";
import { User } from "./icons/User";
import { LogInForm } from "./LogInForm";
import { Modal } from "./Modal";

export const UserNav = () => {
  const {
    player: { player, logOut, isLoading },
  } = useMyContext();

  const playerDecksModal = useTransition();
  const logInModal = useTransition();

  const onLogIn = () => {
    logInModal.toggle();
    playerDecksModal.toggle();
  };

  const onLogOut = () => {
    playerDecksModal.toggle(logOut);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {player ? (
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={playerDecksModal.toggle}
        >
          <User width="12" /> {player.name}
        </Button>
      ) : (
        <Button onClick={logInModal.toggle}>Log in</Button>
      )}
      <Modal {...logInModal} title="Player tag" size="sm">
        <LogInForm onLogIn={onLogIn} />
      </Modal>
      <Modal type="drawer" title="Your decks" {...playerDecksModal}>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-2 items-center">
              <User width="12" /> {player!.name}
            </div>
          </div>
          <Button onClick={onLogOut} className="flex gap-3">
            Log out <LogOut width="20" className="-mr-1" />
          </Button>
        </div>
        <div className="mb-4 mt-8">Current deck</div>
        <Deck cards={player!.currentDeck} />
        <div className="mb-4 mt-8">Recent decks</div>
        {player!.recentDecks.map((deck, idx) => (
          <div className="mb-6" key={idx}>
            <Deck cards={deck} />
          </div>
        ))}
      </Modal>
    </>
  );
};
