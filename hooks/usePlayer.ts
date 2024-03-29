import { useEffect, useState } from "react";
import { getPlayer } from "../lib/getPlayer";
import { getMaxUpgradeLevel } from "../utils/getMaxUpgradeLevel";
import { Player, PlayerCard, SelectedCard } from "../utils/types";
import { useSyncedValue } from "./useSyncedValue";

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerTag, setPlayerTag] = useSyncedValue<null | string>(
    "playerTag",
    null
  );
  const [isLoading, setIsLoading] = useState(!!playerTag);
  const [authError, setAuthError] = useState("");
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

  const syncPlayer = async () => {
    setIsLoading(true);
    const [err, data] = await getPlayer(playerTag as string);

    if (data) {
      setAuthError("");
      setPlayer(data);
    } else {
      setAuthError(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (playerTag && !player) {
      syncPlayer();
    }
  }, [playerTag, player]);

  const playerDecks = player?.recentDecks || [];
  const playerCurrentDeck = player?.currentDeck || [];
  const playerName = player?.name || "";
  const playerCardsMap = player?.cardsMap || {};

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
    copiedDeck,
    setCopiedDeck,
    resetCopiedDeck,
    authError,
    syncPlayer,
    getMaxUpgradeLevel: (selectedCard: SelectedCard) =>
      getMaxUpgradeLevel(playerCardsMap, selectedCard),
    playerCardsMap,
  };
};
