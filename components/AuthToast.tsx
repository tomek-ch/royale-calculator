import { useMyContext } from "../context/MyContext";
import { useSync } from "../hooks/useSync";
import { useTransition } from "../hooks/useTransition";
import { Toast } from "./Toast";

export const AuthToast = () => {
  const {
    player: { isLoading },
  } = useMyContext();
  const toast = useTransition();
  useSync(isLoading, toast.set);
  return <Toast transition={toast}>Logging in...</Toast>;
};
