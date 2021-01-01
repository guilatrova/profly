import { shape, string, number, arrayOf } from 'prop-types';

export const stockSummaryPropType = shape({
  name: string.isRequired,
  units: number,
  averageBuyPrice: number,
  averageSellPrice: number
});

export const stocksSummaryPropType = arrayOf(stockSummaryPropType);
