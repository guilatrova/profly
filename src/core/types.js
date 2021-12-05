import { oneOf, string } from 'prop-types';
import PERIODS from './constants/periods';

export const tickerType = string;

export const periodType = oneOf(PERIODS.map(x => x.value ));
