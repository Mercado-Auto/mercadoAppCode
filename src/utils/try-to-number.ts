export const tryToNumber = (a: number | string, ie = 0): number => {
  try {
    return +a;
  } catch {}
  return ie;
};
