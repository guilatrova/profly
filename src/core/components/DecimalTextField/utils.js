const currencyMap = {
  'BRL': 'R$',
  'USD': '$'
};

export const resolveCurrencySign = currency => currencyMap[currency] || "";
