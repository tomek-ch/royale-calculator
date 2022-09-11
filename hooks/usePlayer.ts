import { useEffect, useState } from "react";
import { getPlayer } from "../api/getPlayer";
import { Player } from "../utils/types";
import { useSyncedValue } from "./useSyncedValue";

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerTag, setPlayerTag] = useSyncedValue<null | string>(
    "playerTag",
    null
  );
  const [isLoading, setIsLoading] = useState(!!playerTag);

  const logIn = (player: Player) => {
    setPlayerTag(player.tag);
    setPlayer(player);
  };

  const logOut = () => {
    setPlayerTag(null);
    setPlayer(null);
  };

  useEffect(() => {
    if (playerTag && !player) {
      getPlayer(playerTag).then(([_err, data]) => {
        if (data) {
          setPlayer(data);
        }
        setIsLoading(false);
      });
    }
  }, [playerTag, player]);

  return {
    player,
    setPlayer,
    setPlayerTag,
    logIn,
    logOut,
    isLoading,
  };
};
