import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { prepareHistoryLineChartData } from '../utils';
import StockHistoryLineChart from '../components/StockHistoryLineChart';
import Title from '../../core/components/Title';


const StockHistoryLineChartContainer = ({ ticker, period = "ytd", interval = "1d"}) => {
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
    <>
      <Title>History</Title>
      <StockHistoryLineChart chartData={chart} />
    </>
  )
}

StockHistoryLineChartContainer.propTypes = {
  ticker: PropTypes.string.isRequired,
  period: PropTypes.string,
  interval: PropTypes.string
}

export default StockHistoryLineChartContainer;
