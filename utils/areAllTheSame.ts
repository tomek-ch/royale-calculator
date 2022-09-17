export const areAllTheSame = <T>(
  [head, ...tail]: T[],
  compare = (item1: T, item2: T) => item1 === item2
) => {
  return tail.every((item) => compare(item, head));
};
