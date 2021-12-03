import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
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
      <AreaChart
        data={chartData.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="4 4"
          fill="#1b6ae5"
        />

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

        <Area
          type="monotone"
          dataKey="close"
          stroke="#fff"
          fill="#649bed"
          strokeWidth={2}
          dot={<TransactionDot />}
        />
      </AreaChart>
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
