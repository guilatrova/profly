import React from 'react';

import { useQuery } from '@apollo/client';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

import ErrorHandler from '../../core/components/ApolloErrorHandler';
import StockHistoryLineChart from '../components/StockHistoryLineChart';
import queries from '../queries';
import { prepareHistoryLineChartData } from '../utils';


const StockHistoryLineChartContainer = ({ interval = "1d", period = "ytd", ticker}) => {
  const { data, error, loading } = useQuery(queries.stockLineChart, { variables: { interval, period, ticker }});


  if (error) return <ErrorHandler operation="line chart data">{error}</ErrorHandler>;

  const stockHistory = data?.stockHistory;
  const chart = prepareHistoryLineChartData(stockHistory);

  return (
    <>
      {loading ? <Skeleton height={300} variant="rect" /> : <StockHistoryLineChart chartData={chart} currency={stockHistory?.currency} />}
    </>
  )
}

StockHistoryLineChartContainer.propTypes = {
  interval: PropTypes.string,
  period: PropTypes.string,
  ticker: PropTypes.string.isRequired
};

export default StockHistoryLineChartContainer;
