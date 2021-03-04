import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { prepareHistoryLineChartData } from '../utils';
import StockHistoryLineChart from '../components/StockHistoryLineChart';
import Title from '../../core/components/Title';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorHandler from '../../core/components/ApolloErrorHandler';


const StockHistoryLineChartContainer = ({ ticker, period = "ytd", interval = "1d"}) => {
  const { loading, error, data } = useQuery(queries.stockLineChart, { variables: { ticker, period, interval }});


  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  const stockHistory = data?.stockHistory;
  const chart = prepareHistoryLineChartData(stockHistory);

  return (
    <>
      <Title>History</Title>
      {loading ? <Skeleton variant="rect" height={300} /> : <StockHistoryLineChart currency={stockHistory?.currency} chartData={chart} />}
    </>
  )
}

StockHistoryLineChartContainer.propTypes = {
  ticker: PropTypes.string.isRequired,
  period: PropTypes.string,
  interval: PropTypes.string
};

export default StockHistoryLineChartContainer;
