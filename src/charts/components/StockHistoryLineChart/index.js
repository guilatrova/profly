/* eslint-disable react/prop-types */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@apollo/client';
import queries from '../../queries';
import { epochToDateOutput } from '../../../utils/dates';
import { getCurrencyFormattedNumber, getCurrencyRoundedNumber } from '../../../utils/numberFormat';
import { prepareHistoryLineChartData } from '../../utils';
import TransactionsTooltip from './TransactionsTooltip';
import DateAxisTick from './DateAxisTick';
import TransactionDot from './TransactionDot';

const StockHistoryLineChart = ({ ticker, period = "ytd", interval = "1d"}) => {
  const { loading, error, data } = useQuery(queries.stockLineChart, { variables: { ticker, period, interval }});

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  const stockHistory = data?.stockHistory;
  const chart = prepareHistoryLineChartData(stockHistory);

  return (
    <LineChart
      width={1000}
      height={300}
      data={chart.data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="date"
        domain={chart.xDomain}
        scale="time"
        type="number"
        tick={DateAxisTick}
      />
      <YAxis
        tickFormatter={getCurrencyRoundedNumber}
        domain={chart.yDomain}
      />

      <Tooltip
        content={<TransactionsTooltip />}
        labelFormatter={epochToDateOutput}
        formatter={getCurrencyFormattedNumber}
      />
      <Legend />

      <Line type="monotone" dataKey="close" stroke="#8884d8" dot={<TransactionDot />} />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
}

export default StockHistoryLineChart;
