import { makeReq } from "../utils/makeReq";
import { Player } from "../utils/types";

export const getPlayer = (playerTag: string) => {
  return makeReq<Player>(`/api/players/${playerTag.replace("#", "")}`);
};
