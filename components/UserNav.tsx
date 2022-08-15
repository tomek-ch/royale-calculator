import { useModal } from "../hooks/useModal";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const UserNav = () => {
  const modal = useModal();
  return (
    <>
      <Button onClick={modal.toggle}>Log in</Button>
      <Modal {...modal} title="Player tag">
        hello
      </Modal>
    </>
  );
};
