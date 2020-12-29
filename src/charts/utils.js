import { strToDate } from '../utils/dates';


// TODO: Move it to util dates
const getDateEpochFromISO = (raw) => raw.split("T")[0].valueOf();

const buildDomain = (arr, minKey, maxKey) => {
  maxKey = maxKey || minKey;
  const minDomain = Math.min(...arr.map(entry => entry[minKey]));
  const maxDomain = Math.max(...arr.map(entry => entry[maxKey]));

  return [minDomain, maxDomain];
}

const buildPoints = transactions => {
  return transactions.reduce((acc, cur) => {
    const date = getDateEpochFromISO(cur.performedAt);
    const entryDate = {...cur, performedAt: strToDate(cur.performedAt)};

    acc[date] = acc[date] || [];
    acc[date].push(entryDate);

    return acc;
  }, {});
};

const buildData = queryData => {
  const points = buildPoints(queryData.transactions);
  const data = queryData.history.map(entry => {
    const date = strToDate(entry.date).valueOf();

    return {
      ...entry,
      date,
      transactions: points[date] || null
    };
  });

  return data;
};

export const prepareHistoryLineChartData = (queryData) => {
  if (!queryData) {
    return { data: [], xDomain: [], yDomain: [] };
  }

  const data = buildData(queryData);
  const xDomain = buildDomain(data, "date");
  const yDomain = buildDomain(data, "open", "high");

  return {
    data,
    xDomain,
    yDomain
  }
};
