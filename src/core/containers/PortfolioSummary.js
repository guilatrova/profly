import React from 'react';

import Typography from '@material-ui/core/Typography';

import { useQuery } from '@apollo/client';

import queries from '../../charts/queries';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import { formatCurrency } from '../../utils/money';


const PortfolioSummary = () => {
  const { error, data = [] } = useQuery(queries.chartStocksValues);

  if (error) return <ErrorHandler operation="portfolio summary">{error}</ErrorHandler>;

  const chartData = data?.stocks || [];
  // TODO: Consider different currencies
  const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Typography variant="h2">{formatCurrency(total)}</Typography>
  );
};

export default PortfolioSummary;
