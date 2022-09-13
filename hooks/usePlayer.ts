import { useEffect, useState } from "react";
import { getPlayer } from "../lib/getPlayer";
import { Player, PlayerCard } from "../utils/types";
import { useSyncedValue } from "./useSyncedValue";

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerTag, setPlayerTag] = useSyncedValue<null | string>(
    "playerTag",
    null
  );
  const [isLoading, setIsLoading] = useState(!!playerTag);
  const [copiedDeck, setCopiedDeck] = useState<null | PlayerCard[]>(null);

  const resetCopiedDeck = () => setCopiedDeck(null);

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

  const playerDecks = player?.recentDecks || [];
  const playerCurrentDeck = player?.currentDeck || [];
  const playerName = player?.name || "";
  const playerCards = player?.cards || [];

  return {
    player,
    setPlayer,
    setPlayerTag,
    logIn,
    logOut,
    isLoading,
    playerDecks,
    playerCurrentDeck,
    playerName,
    playerCards,
    copiedDeck,
    setCopiedDeck,
    resetCopiedDeck,
  };
};
