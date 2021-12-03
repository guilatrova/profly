import { shape, string, number, arrayOf } from 'prop-types';

export const stockSummaryPropType = shape({
  ticker: string.isRequired,
  name: string.isRequired,
  currency: string.isRequired,
  units: number.isRequired,
  value: number.isRequired,
  logoUrl: string
});

export const stocksSummaryPropType = arrayOf(stockSummaryPropType);
