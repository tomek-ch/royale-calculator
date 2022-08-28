import { useTransition } from "../hooks/useTransition";
import { Button } from "./Button";
import { LogInForm } from "./LogInForm";
import { Modal } from "./Modal";

export const UserNav = () => {
  const modal = useTransition();
  return (
    <>
      <Button onClick={modal.toggle}>Log in</Button>
      <Modal {...modal} title="Player tag" size="sm">
        <LogInForm />
      </Modal>
    </>
  );
};
