export const firstCap = (word: string) => {
  const [first, ...rest] = word.split("");
  return [first.toUpperCase(), ...rest].join("");
};
