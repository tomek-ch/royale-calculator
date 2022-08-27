export const getRange = (
  from: number,
  to: number,
  arr: number[] = []
): number[] => {
  if (from === to) {
    return arr;
  }
  const i = from + 1;
  return getRange(i, to, [...arr, i]);
};
