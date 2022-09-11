export const callMaybeFunction = (maybeFn: unknown) => {
  if (typeof maybeFn === "function") {
    maybeFn();
  }
};
