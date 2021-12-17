import { arrayOf,number, shape, string } from 'prop-types';

export const stockSummaryPropType = shape({
  currency: string.isRequired,
  logoUrl: string,
  name: string.isRequired,
  ticker: string.isRequired,
  units: number.isRequired,
  value: number.isRequired
});

export const stocksSummaryPropType = arrayOf(stockSummaryPropType);
