import { min } from 'date-fns';
import { strToDate } from '../utils/dates';


const buildDomain = (arr, minKey, maxKey) => {
  maxKey = maxKey || minKey;
  const minDomain = Math.min(...arr.map(entry => entry[minKey]));
  const maxDomain = Math.max(...arr.map(entry => entry[maxKey]));

  return [minDomain, maxDomain];
}

export const prepareLineChartData = (queryData = []) => {
  const data = queryData.map(entry => ({...entry, date: strToDate(entry.date).valueOf()}));
  const xDomain = buildDomain(data, "date");
  const yDomain = buildDomain(data, "open", "high");

  return {
    data,
    xDomain,
    yDomain
  }
};
