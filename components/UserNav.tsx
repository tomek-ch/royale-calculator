import { useMyContext } from "../context/MyContext";
import { useTransition } from "../hooks/useTransition";
import { Player } from "../utils/types";
import { Button } from "./Button";
import { Deck } from "./Deck";
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
        <Button onClick={onLogOut}>Log out</Button>
        <div className="mb-4 mt-8">Your current deck</div>
        <Deck cards={(player as Player).currentDeck} />
      </Modal>
    </>
  );
};
