const currencyLangMap = {
  'BRL': 'pt-BR',
  'USD': 'en-US',
};

const moneyFormatter = (currency) => new Intl.NumberFormat(currencyLangMap[currency] || [], {
  style: 'currency',
  currency,
});

export const formatCurrency = (value, currency='BRL') => moneyFormatter(currency).format(value);
