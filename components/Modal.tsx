import { ReactNode } from "react";
import { useModal } from "../hooks/useModal";
import { ModalHeader } from "./ModalHeader";

type Size = keyof typeof sizeClasses;

type ModalProps = {
  size?: Size;
  title?: string;
  children: ReactNode;
} & ReturnType<typeof useModal>;

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
};

export const Modal = ({
  title = "",
  size = "md",
  children,
  toggle,
  isOpen,
  isExiting,
  finishExit,
}: ModalProps) => {
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
          fixed p-4 w-full z-10 ${sizeClasses[size]}
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          `}
        >
          <div
            className={`
            ${isExiting ? "animate-hide" : "animate-pop-up"}
            p-6 bg-white w-full
            rounded-md shadow-md
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
