import { isServer } from "./isServer";

export const getFromStorage = (key: string) => {
  if (isServer) {
    return null;
  }
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
};
