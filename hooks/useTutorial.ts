import { useState } from "react";
import { isClient } from "../utils/isServer";

const STORAGE_KEY = "hasFinishedTutorial";

export const useTutorial = () => {
  const [step, setStep] = useState(0);
  const [isActive, setIsActive] = useState(
    isClient ? !localStorage.getItem(STORAGE_KEY) : true
  );

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const skip = () => {
    setIsActive(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const isStepActive = (n: number) => isActive && n === step;

  const finishTutorial = () => {
    setIsActive(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  return {
    step,
    nextStep,
    isActive,
    skip,
    isWelcomeStep: isStepActive(0),
    isLogInBtnStep: isStepActive(1),
    isLogInFormStep: isStepActive(2),
    isCopyStep: isStepActive(3),
    isPasteStep: isStepActive(4),
    isSummaryStep: isStepActive(5),
    finishTutorial,
  };
};
