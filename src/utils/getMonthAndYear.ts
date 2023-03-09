export const getMonthAndYear = (date: string) => {
  const [dateMon, dateYear] = date.split('/');
  return { dateMon, dateYear };
};
