import { useEffect, useState } from "react";
import { Player } from "../utils/types";
import { useSyncedValue } from "./useSyncedValue";

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerTag, setPlayerTag] = useSyncedValue<null | string>(
    "playerTag",
    null
  );
  const [isLoading, setIsLoading] = useState(!!playerTag);

  const logIn = (playerTag: string, player: Player) => {
    setPlayerTag(playerTag);
    setPlayer(player);
  };

  const logOut = () => {
    setPlayerTag(null);
    setPlayer(null);
  };

  return {
    player,
    setPlayer,
    setPlayerTag,
    logIn,
    logOut,
  };
};
