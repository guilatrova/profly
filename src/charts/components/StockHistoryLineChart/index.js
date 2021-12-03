import React, { useState } from 'react';
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

export const COLORS = {
  activeLine: '#fff',
  unactiveLine: '#a9c8f5',
  activeArea: '#649bed',
  unactiveArea: '#3079e7',
  background: '#1b6ae5'
};

const StockHistoryLineChart = ({ currency = 'BRL', chartData }) => {
  const [cursorPos, setCursorPos] = useState(0);

  const onMouseMove = hoveredData => {
    if (hoveredData && hoveredData.activePayload) {
      const index = hoveredData.activeTooltipIndex;
      const total = chartData.data.length;

      const percentage = ((total - index) * 100) / total;

      setCursorPos(100 - percentage);
    }
  };

  const onMouseOut = () => {
    setCursorPos(100);
  };

  return (
    <ResponsiveContainer height={300} width="100%">
      <AreaChart
        data={chartData.data}
        margin={{
          top: 15,
          right: 10,
          left: 0,
          bottom: -30,
        }}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="4 4"
          fill={COLORS.background}
        />

      <defs>
        <linearGradient id="colorClose" x1="0%" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor={COLORS.activeArea} />
          <stop offset={`${cursorPos}%`} stopColor={COLORS.activeArea} />
          <stop offset={`${cursorPos}%`} stopColor={COLORS.unactiveArea} />
          <stop offset={`${100}%`} stopColor={COLORS.unactiveArea} />
        </linearGradient>
        <linearGradient id="colorStroke" x1="0%" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor={COLORS.activeLine} />
          <stop offset={`${cursorPos}%`} stopColor={COLORS.activeLine} />
          <stop offset={`${cursorPos}%`} stopColor={COLORS.unactiveLine} />
          <stop offset={`${100}%`} stopColor={COLORS.unactiveLine} />
        </linearGradient>
      </defs>

        <XAxis
          dataKey="date"
          domain={chartData.xDomain}
          scale="time"
          type="number"
          tickLine={false}
          tick={false}
          // tick={DateAxisTick}
          />
        <YAxis
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{stroke:'#fff'}}
          tickFormatter={val => getCurrencyRoundedNumber(val, currency)}
          domain={chartData.yDomain}
        />

        <Tooltip
          content={<TransactionsTooltip />}
          labelFormatter={epochToDateOutput}
          formatter={val => formatCurrency(val, currency)}
        />

        <Area
          type="monotone"
          dataKey="close"
          stroke="url(#colorStroke)"
          fill="url(#colorClose)"
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
