import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { epochToDateOutput, epochToShortDateOutput } from '../../utils/dates';
import { getCurrencyFormattedNumber, getCurrencyRoundedNumber } from '../../utils/numberFormat';
import { prepareHistoryLineChartData } from '../utils';
import SellIcon from '@material-ui/icons/MoneyOff';
import BuyIcon from '@material-ui/icons/MonetizationOn';


const CustomizedDot = ({ cx, cy, stroke, payload, value }) => {
  if (!value) {
    return null;
  }

  const hasBought = payload.transactions.some(t => t.units > 0);
  const hasSold = payload.transactions.some(t => t.units <= 0);

  if (hasSold) {
    return <SellIcon x={cx - 10} y={cy - 10} width={20} height={20} htmlColor="red" />;
  }

  if (hasBought) {
    return <BuyIcon x={cx - 10} y={cy - 10} width={20} height={20} htmlColor="green" />
  }

  return null;
};

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{epochToShortDateOutput(payload.value)}</text>
      </g>
    );
  }

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
  console.log("chart", chart);

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
        tick={CustomizedAxisTick}
      />
      <YAxis
        tickFormatter={getCurrencyRoundedNumber}
        domain={chart.yDomain}
      />

      <Tooltip
        labelFormatter={epochToDateOutput}
        formatter={getCurrencyFormattedNumber}
      />
      <Legend />

      <Line type="monotone" dataKey="close" stroke="#8884d8" dot={<CustomizedDot />} />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
}

export default StockHistoryLineChart;
