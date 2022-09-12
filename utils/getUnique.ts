export const getUnique = <T>(
  arr: T[],
  areTheSame: (item: T, areTheSame: T) => boolean
) => {
  return arr.reduce<T[]>((acc, cur) => {
    if (acc.some((item) => areTheSame(item, cur))) {
      return acc;
    }
    return [...acc, cur];
  }, []);
};
