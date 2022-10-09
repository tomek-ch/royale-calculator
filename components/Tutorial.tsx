import { ReactNode } from "react";
import { useMyContext } from "../context/MyContext";
import { useSync } from "../hooks/useSync";
import { useTransition } from "../hooks/useTransition";
import { Button } from "./Button";
import { Modal } from "./Modal";

const WelcomeStep = () => {
  const {
    tutorial: { nextStep, skip, step, isActive },
  } = useMyContext();
  const modal = useTransition({
    defaultVal: isActive,
    onClose: () => {
      if (step === 0) {
        skip();
      }
    },
  });
  useSync(step === 0 && isActive, modal.set);
  return (
    <Modal title="Welcome to Calculator Royale" {...modal}>
      <p>
        Ready to find out know how much gold you need to upgrade your Clash
        Royale deck?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={modal.toggle}>Skip</Button>
        <Button onClick={nextStep} variant="primary">
          Take the tutorial
        </Button>
      </div>
    </Modal>
  );
};

const LogInBtnStep = () => (
  // <div className="fixed inset-0 bg-black/70 w-full z-10 text-white">
  //   <div className="w-full h-full max-w-5xl mx-auto relative">
  //     <div
  //       className="absolute -right-[310px] -top-[350px] w-[700px] h-[700px]
  //         bg-slate-800 rounded-full"
  //     >
  //       <div
  //         className="absolute w-1/3 h-1/3 bg-slate-700 z-20
  //         left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"
  //       >
  //         <div className="top-3/4 right-1/4 absolute mr-8 whitespace-nowrap text-center z-20">
  //           Click here to log in
  //           <br />
  //           with your player tag
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  <>
    <div className="fixed inset-0 bg-black/70 w-full z-10">
      <div className="w-full h-full max-w-5xl mx-auto relative">
        <MsgBox className="absolute top-12 right-4 ml-4">
          Click here to log in with your player tag
        </MsgBox>
      </div>
    </div>
  </>
  // <></>
);

const CurrentStep = () => {
  const { tutorial } = useMyContext();

  if (tutorial.isLogInBtnStep) {
    return <LogInBtnStep />;
  }

  return null;
};

const SkipButton = () => {
  const {
    tutorial: { finishTutorial, isWelcomeStep, isSummaryStep, isActive },
  } = useMyContext();

  if (isActive && !isWelcomeStep && !isSummaryStep) {
    return (
      <div className="w-full max-w-5xl mx-auto relative">
        <Button
          onClick={finishTutorial}
          className="absolute bottom-4 right-0 z-10 bg-slate-200
          dark:bg-slate-700 dark:text-white !border-0"
        >
          Skip
        </Button>
      </div>
    );
  }

  return null;
};

export const Tutorial = () => {
  return (
    <>
      <WelcomeStep />
      <CurrentStep />
      <SkipButton />
    </>
  );
};

interface MsgBoxProps {
  children: ReactNode;
  className?: string;
}

export const MsgBox = ({ children, className = "" }: MsgBoxProps) => {
  return (
    <div
      className={`
      p-4 z-10 bg-white mt-2 rounded-lg shadow-lg
      dark:bg-slate-800 dark:text-white ${className}`}
    >
      {children}
    </div>
  );
};
