import { shape, string, number, arrayOf } from 'prop-types';

export const transactionPropType = shape({
  id: string,
  ticker: string,
  performedAt: string,
  strikePrice: number,
  units: number,
  value: number
});

export const transactionsPropType = arrayOf(transactionPropType);
