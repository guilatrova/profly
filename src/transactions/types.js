import { arrayOf,number, shape, string } from 'prop-types';

export const stockInfoPropType = shape({
  currency: string,
  currentPrice: number,
  logoUrl: string,
  name: string,
  ticker: string.isRequired,
  timestamp: string
});

export const transactionPropType = shape({
  id: string,
  performedAt: string,
  stock: stockInfoPropType,
  strikePrice: number,
  ticker: string,
  units: number,
  value: number
});

export const transactionsPropType = arrayOf(transactionPropType);
