export const getRange = (
  from: number,
  to: number,
  step = 1,
  arr: number[] = []
): number[] => {
  const newArr = [...arr, from];
  if (from === to) {
    return newArr;
  }
  return getRange(from + step, to, step, newArr);
};
