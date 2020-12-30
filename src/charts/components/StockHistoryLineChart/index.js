import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { epochToDateOutput } from '../../../utils/dates';
import { getCurrencyFormattedNumber, getCurrencyRoundedNumber } from '../../../utils/numberFormat';
import TransactionsTooltip from './TransactionsTooltip';
import DateAxisTick from './DateAxisTick';
import TransactionDot from './TransactionDot';

const StockHistoryLineChart = ({ chartData }) => {
  return (
    <LineChart
      width={1000}
      height={300}
      data={chartData.data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="date"
        domain={chartData.xDomain}
        scale="time"
        type="number"
        tick={DateAxisTick}
      />
      <YAxis
        tickFormatter={getCurrencyRoundedNumber}
        domain={chartData.yDomain}
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

StockHistoryLineChart.propTypes = {
  chartData: PropTypes.shape({
    data: PropTypes.array,
    xDomain: PropTypes.arrayOf(PropTypes.number),
    yDomain: PropTypes.arrayOf(PropTypes.number)
  })
}

export default StockHistoryLineChart;
