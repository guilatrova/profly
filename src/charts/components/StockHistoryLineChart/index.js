import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { epochToDateOutput } from '../../../utils/dates';
import { getCurrencyRoundedNumber } from '../../../utils/numberFormat';
import { formatCurrency } from '../../../utils/money';

import TransactionsTooltip from './TransactionsTooltip';
import DateAxisTick from './DateAxisTick';
import TransactionDot from './TransactionDot';

const StockHistoryLineChart = ({ currency = 'BRL', chartData }) => {
  return (
    <ResponsiveContainer height={300} width="100%">
      <LineChart
        data={chartData.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
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
          tickFormatter={val => getCurrencyRoundedNumber(val, currency)}
          domain={chartData.yDomain}
        />

        <Tooltip
          content={<TransactionsTooltip />}
          labelFormatter={epochToDateOutput}
          formatter={val => formatCurrency(val, currency)}
        />
        <Legend />

        <Line
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          dot={<TransactionDot />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

StockHistoryLineChart.propTypes = {
  currency: PropTypes.string,
  chartData: PropTypes.shape({
    data: PropTypes.array,
    xDomain: PropTypes.arrayOf(PropTypes.number),
    yDomain: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default StockHistoryLineChart;
