import { useState } from "react";
import { getPlayer } from "../lib/getPlayer";
import { useMyContext } from "../context/MyContext";
import { useInput } from "../hooks/useInput";
import { createSubmitHandler } from "../utils/createSubmitHandler";
import { Player } from "../utils/types";
import { Button } from "./Button";
import { InlineAlert } from "./InlineAlert";
import { Input } from "./Input";

interface LogInFormProps {
  onLogIn: () => void;
}

export const LogInForm = ({ onLogIn }: LogInFormProps) => {
  const [error, setError] = useState("");
  const [playerTag, setPlayerTag] = useInput(() => {
    setError("");
  });
  const [isLoading, setIsLoading] = useState(false);
  const {
    player: { logIn },
    tutorial,
  } = useMyContext();

  const handleSubmit = createSubmitHandler(async () => {
    if (!playerTag) {
      setError("Please provide a player tag");
    } else {
      setError("");
      setIsLoading(true);

      const [error, data] = await getPlayer(playerTag);
      if (error) {
        setError(error);
      } else {
        logIn(data as Player);
        onLogIn();
      }

      setIsLoading(false);
    }
  });

  const zIndexClass = tutorial.isLogInFormStep ? "z-20" : "";

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Input
            value={playerTag}
            onChange={setPlayerTag}
            id="player-tag"
            placeholder="#XXXXXX"
            autoFocus
            disabled={isLoading}
            autoCapitalize="off"
            className={zIndexClass}
          />
          <Button
            variant="primary"
            className={`ml-auto ${zIndexClass}`}
            loading={isLoading}
          >
            Log in
          </Button>
        </div>
        <InlineAlert variant="danger" className={`mt-2 ${zIndexClass}`}>
          {error}
        </InlineAlert>
      </div>
    </form>
  );
};
