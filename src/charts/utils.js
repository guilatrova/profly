import { strToDate } from '../utils/dates';


const buildDomain = (arr, key) => {
  const minDomain = Math.min(...arr.map(entry => entry[key]));
  const maxDomain = Math.max(...arr.map(entry => entry[key]));

  return [minDomain, maxDomain];
}

export const prepareLineChartData = (queryData = []) => {
  const data = queryData.map(entry => ({...entry, date: strToDate(entry.date).valueOf()}));
  const xDomain = buildDomain(data, "date");

  return {
    data,
    xDomain
  }
};
