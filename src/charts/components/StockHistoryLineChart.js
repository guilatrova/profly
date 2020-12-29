/* eslint-disable react/prop-types */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { epochToDateOutput, epochToShortDateOutput, formatShortTimeOutput } from '../../utils/dates';
import { getCurrencyFormattedNumber, getCurrencyRoundedNumber } from '../../utils/numberFormat';
import { prepareHistoryLineChartData } from '../utils';
import SellIcon from '@material-ui/icons/MoneyOff';
import BuyIcon from '@material-ui/icons/MonetizationOn';
import TradeIcon from '@material-ui/icons/SyncAlt';


const CustomizedDot = ({ cx, cy, stroke, payload, value }) => {
  if (!value) {
    return null;
  }

  const hasBought = payload.transactions.some(t => t.units > 0);
  const hasSold = payload.transactions.some(t => t.units <= 0);

  if (hasBought && hasSold) {
    return <TradeIcon x={cx - 10} y={cy - 10} width={20} height={20} htmlColor="#3498DB" />;
  }

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

const TransactionEventEntry = ({ transaction: t }) => {
  let eventDesc = "bought";
  let units = t.units;
  if (t.units <= 0) {
    eventDesc = "sold";
    units = -t.units;
  }
  const atTime = formatShortTimeOutput(t.performedAt);
  const value = getCurrencyFormattedNumber(t.value);

  return (
    <p>You {eventDesc} {units} units at {atTime} ({value})</p>
  )
};

const CustomTooltip = ({ active, label, labelFormatter, formatter, payload , ...props }) => {
  if (active) {
    const transactions = payload[0].payload.transactions;
    const hasTransactions = !!transactions.length;
    if (hasTransactions) {
      console.log("transactions", transactions);
    }

    return (
      <div className="custom-tooltip">
        <h4 className="label">{`${labelFormatter(label)}`}</h4>
        <p>{`${formatter(payload[0].value)}`}</p>

        {hasTransactions &&
          <>
            <h5>Transactions</h5>
            {transactions.map(t => <TransactionEventEntry key={t.id} transaction={t} />)}
          </>
        }
      </div>
    );
  }

  return null;
};

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
        tick={CustomizedAxisTick}
      />
      <YAxis
        tickFormatter={getCurrencyRoundedNumber}
        domain={chart.yDomain}
      />

      <Tooltip
        content={<CustomTooltip />}
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
