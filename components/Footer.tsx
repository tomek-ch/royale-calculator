import { useTransition } from "../hooks/useTransition";
import { Link } from "./Link";
import { Modal } from "./Modal";

export const Footer = () => {
  const aboutModal = useTransition();
  const noticeModal = useTransition();
  const contactModal = useTransition();
  return (
    <>
      <footer className="flex gap-6 pb-4 pt-6 mt-auto">
        <Link onClick={() => aboutModal.toggle()}>About</Link>
        <Link onClick={() => noticeModal.toggle()}>Notice</Link>
        <Link onClick={() => contactModal.toggle()}>Contact</Link>
      </footer>
      <Modal title="About" size="lg" {...aboutModal}>
        <p className="mb-4">
          Have you ever wondered how much gold and how many cards you need to
          upgrade your deck in Clash Royale?
        </p>
        <p className="mb-4">
          With Calculator Royale, you can simply enter your player tag, copy
          your deck and get instant results based on your card counts and
          levels.
        </p>
        <p className="pb-1">
          You can adjust the selected cards and their levels to test different
          scenarios and plan out how to upgrade your deck. With features such as
          bulk editing and level sync the whole process is super quick.
        </p>
      </Modal>
      <Modal title="Notice" {...noticeModal}>
        <p className="pb-1">
          This content is not affiliated with, endorsed, sponsored, or
          specifically approved by Supercell and Supercell is not responsible
          for it. For more information see Supercell’s Fan Content Policy:{" "}
          <Link
            variant="primary"
            href="https://www.supercell.com/fan-content-policy"
          >
            www.supercell.com/fan-content-policy
          </Link>
          .
        </p>
      </Modal>
      <Modal title="Contact" {...contactModal}>
        <p className="pb-1">
          For bug reports, feature requests, or feedback, you can contact the
          developer at the following email address:{" "}
          <Link variant="primary" href="mailto:test@example.com">
            test@example.com
          </Link>
          .
        </p>
      </Modal>
    </>
  );
};
