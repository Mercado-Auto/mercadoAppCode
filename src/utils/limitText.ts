export const limitText = (txt: string, length: number, finalLenght: number) => {
  return txt.length > length ? txt.slice(0, finalLenght) + '...' : txt;
};
