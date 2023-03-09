import { formatCurrency } from 'react-native-format-currency';

export const formatMoney = (value?: number | string, symbol = true) => {
  const [valueFormattedWithSymbol] = formatCurrency({
    amount: Number(value),
    code: 'BRL',
  });
  return valueFormattedWithSymbol;
};

export const formatCNPJ = (value: string) =>
  value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gm, '$1.$2.$3/$4-$5');
