export const chunkArr = <T>(
  [head, ...tail]: T[],
  size: number,
  chunk: T[] = [],
  newArr: T[][] = []
): T[][] => {
  if (!head) {
    return newArr;
  }
  if (chunk.length === size) {
    return chunkArr(tail, size, [head], [...newArr, chunk]);
  }
  return chunkArr(tail, size, [...chunk, head], newArr);
};
