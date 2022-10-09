import { useMyContext } from "../context/MyContext";
import { useTransition } from "../hooks/useTransition";
import { Button } from "./Button";
import { User } from "./icons/User";
import { LogInForm } from "./LogInForm";
import { Modal } from "./Modal";
import { PasteDeck } from "./PasteDeck";
import { PlayerDecks } from "./PlayerDecks";
import { MsgBox } from "./Tutorial";

export const UserNav = () => {
  const {
    player: { player, logOut, playerName, copiedDeck, resetCopiedDeck },
    tutorial,
  } = useMyContext();

  const playerDecksModal = useTransition({ onClose: resetCopiedDeck });
  const logInModal = useTransition();

  const onLogIn = () => {
    logInModal.toggle();
    playerDecksModal.toggle();

    if (tutorial.isLogInFormStep) {
      tutorial.nextStep();
    }
  };

  const onLogOut = () => {
    playerDecksModal.toggle(logOut);
  };

  const playerModalTitle = copiedDeck ? "Copying deck" : "Your decks";

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
        <Button
          variant="primary"
          onClick={() => {
            if (tutorial.isLogInBtnStep) {
              tutorial.nextStep();
            }
            logInModal.toggle();
          }}
          className={`ml-3 ${tutorial.isLogInBtnStep ? "relative z-20" : ""}`}
        >
          Log in
        </Button>
      )}
      <Modal
        {...logInModal}
        title="Player tag"
        size="sm"
        closeOnClickOutside={!tutorial.isLogInFormStep}
        withCloseBtn={!tutorial.isLogInFormStep}
      >
        <LogInForm onLogIn={onLogIn} />
        {tutorial.isLogInFormStep && (
          <div className="relative">
            <MsgBox className="absolute max dark:!bg-slate-700">
              Enter your player tag or try an example one like #PLV9L88J.
            </MsgBox>
          </div>
        )}
      </Modal>
      <Modal
        type="drawer"
        onGoBack={copiedDeck ? resetCopiedDeck : null}
        title={playerModalTitle}
        backdropClass={
          tutorial.isCopyStep || tutorial.isPasteStep ? "!bg-black/80" : ""
        }
        {...playerDecksModal}
      >
        {copiedDeck ? (
          <PasteDeck
            onPaste={() =>
              playerDecksModal.toggle(() => {
                if (tutorial.isPasteStep) {
                  tutorial.nextStep();
                }
              })
            }
          />
        ) : (
          <PlayerDecks onLogOut={onLogOut} />
        )}
      </Modal>
    </>
  );
};
