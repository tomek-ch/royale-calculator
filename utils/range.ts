export const getRange = (
  from: number,
  to: number,
  arr: number[] = []
): number[] => {
  if (from > to) {
    return arr;
  }
  return getRange(from + 1, to, [...arr, from]);
};
