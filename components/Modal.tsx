import { ReactNode } from "react";
import { useModal } from "../hooks/useModal";
import { ModalHeader } from "./ModalHeader";

type Size = keyof typeof sizeClasses;

type ModalProps = {
  type?: keyof typeof modalStyles;
  size?: Size;
  title?: string;
  children: ReactNode;
} & ReturnType<typeof useModal>;

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
};

const modalStyles = {
  modal: {
    body: "rounded-md",
    wrapper: "p4 top-1/2 -translate-y-1/2",
  },
  drawer: {
    body: "rounded-t-md h-full",
    wrapper: "pb-0 h-full top-10",
  },
};

export const Modal = ({
  type = "modal",
  title = "",
  size = "md",
  children,
  toggle,
  isOpen,
  isExiting,
  finishExit,
}: ModalProps) => {
  const [enteringAnimation, exitingAnimation] =
    type === "modal"
      ? ["animate-pop-up", "animate-hide"]
      : ["animate-slide-up", "animate-slide-down"];

  if (isOpen) {
    return (
      <>
        <div
          onClick={toggle}
          className={`fixed inset-0 bg-black/70 w-full z-10 ${
            isExiting ? "animate-fade-out" : "animate-fade-in"
          }`}
          onAnimationEnd={({ animationName }) => {
            if (animationName === "fade-out") {
              finishExit();
            }
          }}
        />
        <div
          className={`
          fixed p-4 w-full z-10 left-1/2 -translate-x-1/2
          ${sizeClasses[size]}
          ${modalStyles[type].wrapper}
          `}
        >
          <div
            className={`
            ${isExiting ? exitingAnimation : enteringAnimation}
            p-6 bg-white w-full shadow-md
            ${modalStyles[type].body}
            `}
          >
            <ModalHeader close={toggle} title={title} />
            {children}
          </div>
        </div>
      </>
    );
  }

  return null;
};
