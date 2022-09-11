import { useMyContext } from "../context/MyContext";
import { useTransition } from "../hooks/useTransition";
import { Button } from "./Button";
import { User } from "./icons/User";
import { LogInForm } from "./LogInForm";
import { Modal } from "./Modal";

export const UserNav = () => {
  const {
    player: { player, logOut },
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

  return (
    <>
      {player ? (
        <div className="py-[1px]">
          <Button
            className="flex gap-2 items-center"
            variant="ghost"
            onClick={playerDecksModal.toggle}
          >
            <User width="12" /> {player.name}
          </Button>
        </div>
      ) : (
        <Button onClick={logInModal.toggle}>Log in</Button>
      )}
      <Modal {...logInModal} title="Player tag" size="sm">
        <LogInForm onLogIn={onLogIn} />
      </Modal>
      <Modal type="drawer" title="Your decks" {...playerDecksModal}>
        <Button onClick={onLogOut}>Log out</Button>
      </Modal>
    </>
  );
};
