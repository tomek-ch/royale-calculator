import { useState } from "react";
import { getPlayer } from "../api/getPlayer";
import { useInput } from "../hooks/useInput";
import { createSubmitHandler } from "../utils/createSubmitHandler";
import { Player } from "../utils/types";
import { Button } from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { Input } from "./Input";

interface LogInFormProps {}

export const LogInForm = ({}: LogInFormProps) => {
  const [error, setError] = useState("");
  const [playerTag, setPlayerTag] = useInput(() => {
    setError("");
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = (player: Player) => {
    console.log(player);
  };

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
        onSuccess(data as Player);
      }

      setIsLoading(false);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Input
          value={playerTag}
          onChange={setPlayerTag}
          id="player-tag"
          placeholder="#XXXXXX"
          autoFocus
          disabled={isLoading}
        />
        <Button variant="primary" className="ml-auto" loading={isLoading}>
          Log in
        </Button>
      </div>
      <ErrorMessage className="mt-2">{error}</ErrorMessage>
    </form>
  );
};
