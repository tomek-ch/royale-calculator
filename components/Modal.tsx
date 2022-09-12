import { ReactNode } from "react";
import { useNoScroll } from "../hooks/useNoScroll";
import { Transition } from "../hooks/useTransition";
import { ModalHeader } from "./ModalHeader";

type Size = keyof typeof sizeClasses;

type ModalProps = {
  type?: keyof typeof modalStyles;
  size?: Size;
  title?: ReactNode;
  children: ReactNode;
} & Transition;

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
};

const modalStyles = {
  modal: {
    body: "rounded-xl",
    wrapper: "p4 top-1/2 -translate-y-1/2 p-4",
  },
  drawer: {
    body: "rounded-t-xl h-full",
    wrapper: "bottom-0 h-full top-10",
  },
};

export const Modal = ({
  type = "modal",
  title = "",
  size = "md",
  children,
  toggle,
  isActive,
  isExiting,
  finishExit,
}: ModalProps) => {
  useNoScroll(isActive);

  const [enteringAnimation, exitingAnimation] =
    type === "modal"
      ? ["animate-pop-up", "animate-hide"]
      : ["animate-slide-up", "animate-slide-down"];

  if (isActive) {
    return (
      <>
        <div
          onClick={() => toggle()}
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
          fixed w-full z-10 left-1/2 -translate-x-1/2
          ${type === "modal" ? sizeClasses[size] : "max-w-2xl"}
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
