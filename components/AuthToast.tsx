import { useMyContext } from "../context/MyContext";
import { useSync } from "../hooks/useSync";
import { useTransition } from "../hooks/useTransition";
import { Button } from "./Button";
import { Refresh } from "./icons/Refresh";
import { Xmark } from "./icons/Xmark";
import { Toast } from "./Toast";
import { Tooltip } from "./Tooltip";

export const AuthToast = () => {
  const {
    player: { isLoading, authError, syncPlayer },
  } = useMyContext();
  const errorToast = useTransition();
  const loadingToast = useTransition({
    onClose: () => {
      if (authError) {
        errorToast.set(true);
      }
    },
  });
  useSync(isLoading, loadingToast.set);
  return (
    <>
      <Toast transition={loadingToast}>Logging in...</Toast>
      <Toast transition={errorToast}>
        <div className="flex items-center">
          Error logging in
          <Tooltip title="Retry">
            <Button
              variant="round"
              className="hover:!bg-white/10 ml-2"
              onClick={() => {
                errorToast.toggle(syncPlayer);
              }}
            >
              <Refresh width="16" />
            </Button>
          </Tooltip>
          <Tooltip title="Close">
            <Button
              variant="round"
              className="hover:!bg-white/10 ml-1"
              onClick={() => errorToast.set(false)}
            >
              <Xmark width="12" />
            </Button>
          </Tooltip>
        </div>
      </Toast>
    </>
  );
};
