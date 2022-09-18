export const sumArr = <T>(
  arr: T[],
  cb = ((item: number) => item) as (item: T) => number
) => arr.reduce((acc, cur) => acc + cb(cur), 0);
