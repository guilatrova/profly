import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { epochToDateOutput } from 'utils/dates'
import { formatCurrency } from 'utils/money'
import { getCurrencyRoundedNumber } from 'utils/numberFormat'

import TransactionDot from './TransactionDot'
import TransactionsTooltip from './TransactionsTooltip'

export const COLORS = {
  activeArea: '#649bed',
  activeLine: '#fff',
  background: '#1b6ae5',
  tooltipCursor: '#fff',
  unactiveArea: '#3079e7',
  unactiveLine: '#a9c8f5',
}

const StockHistoryLineChart = ({ chartData, currency = 'BRL' }) => {
  const [cursorPos, setCursorPos] = useState(0)
  const [Xpos, setXpos] = useState(0)

  const onMouseMove = (hoveredData) => {
    if (
      hoveredData &&
      hoveredData.activePayload &&
      hoveredData.chartX != Xpos
    ) {
      const index = hoveredData.activeTooltipIndex
      const total = chartData.data.length

      const percentage = ((total - index) * 100) / total

      setCursorPos(100 - percentage)
      setXpos(hoveredData.chartX)
    }
  }

  const onMouseOut = () => {
    setCursorPos(100)
  }

  const yTicks = [
    Math.min(...chartData.data.map((d) => d.close)),
    chartData.data.at(-1).close,
    Math.max(...chartData.data.map((d) => d.close)),
  ]
  return (
    <ResponsiveContainer height={300} width="100%">
      <AreaChart
        data={chartData.data}
        margin={{
          bottom: -30,
          left: 0,
          right: 10,
          top: 15,
        }}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      >
        <CartesianGrid
          fill={COLORS.background}
          strokeDasharray="8 8"
          vertical={false}
        />

        <defs>
          <linearGradient id="colorClose" x1="0%" x2="100%" y1="0" y2="0">
            <stop offset="0%" stopColor={COLORS.activeArea} />
            <stop offset={`${cursorPos}%`} stopColor={COLORS.activeArea} />
            <stop offset={`${cursorPos}%`} stopColor={COLORS.unactiveArea} />
            <stop offset="100%" stopColor={COLORS.unactiveArea} />
          </linearGradient>
          <linearGradient id="colorStroke" x1="0%" x2="100%" y1="0" y2="0">
            <stop offset="0%" stopColor={COLORS.activeLine} />
            <stop offset={`${cursorPos}%`} stopColor={COLORS.activeLine} />
            <stop offset={`${cursorPos}%`} stopColor={COLORS.unactiveLine} />
            <stop offset="100%" stopColor={COLORS.unactiveLine} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          domain={chartData.xDomain}
          scale="time"
          tick={false}
          tickLine={false}
          type="number"
        />
        <YAxis
          axisLine={false}
          domain={chartData.yDomain}
          orientation="right"
          tick={{ stroke: '#fff' }}
          tickFormatter={(val) => getCurrencyRoundedNumber(val, currency)}
          tickLine={false}
          ticks={yTicks}
        />

        <Tooltip
          content={<TransactionsTooltip />}
          cursor={{ stroke: COLORS.tooltipCursor, strokeWidth: 2 }}
          formatter={(val) => formatCurrency(val, currency)}
          labelFormatter={epochToDateOutput}
        />

        <Area
          dataKey="close"
          dot={<TransactionDot />}
          fill="url(#colorClose)"
          stroke="url(#colorStroke)"
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

StockHistoryLineChart.propTypes = {
  chartData: PropTypes.shape({
    data: PropTypes.array,
    xDomain: PropTypes.arrayOf(PropTypes.number),
    yDomain: PropTypes.arrayOf(PropTypes.number),
  }),
  currency: PropTypes.string,
}

export default StockHistoryLineChart
