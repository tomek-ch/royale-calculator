import { useMyContext } from "../context/MyContext";
import { useTransition } from "../hooks/useTransition";
import { Button } from "./Button";
import { User } from "./icons/User";
import { LogInForm } from "./LogInForm";
import { Modal } from "./Modal";
import { PlayerDecks } from "./PlayerDecks";

export const UserNav = () => {
  const {
    player: {
      player,
      logOut,
      isLoading,
      playerName,
      copiedDeck,
      resetCopiedDeck,
    },
  } = useMyContext();

  const playerDecksModal = useTransition({ onClose: resetCopiedDeck });
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
          <User width="12" /> {playerName}
        </Button>
      ) : (
        <Button onClick={logInModal.toggle}>Log in</Button>
      )}
      <Modal {...logInModal} title="Player tag" size="sm">
        <LogInForm onLogIn={onLogIn} />
      </Modal>
      <Modal type="drawer" title="Your decks" {...playerDecksModal}>
        {copiedDeck ? "Deck copied" : <PlayerDecks onLogOut={onLogOut} />}
      </Modal>
    </>
  );
};
