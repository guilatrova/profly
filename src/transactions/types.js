import { shape, string, number, arrayOf } from 'prop-types';

export const stockInfoPropType = shape({
  name: string.isRequired,
  ticker: string.isRequired,
  currency: string,
  currentPrice: number,
  logoUrl: string,
  timestamp: string
});

export const transactionPropType = shape({
  id: string,
  ticker: string,
  performedAt: string,
  strikePrice: number,
  units: number,
  value: number
});

export const transactionsPropType = arrayOf(transactionPropType);
