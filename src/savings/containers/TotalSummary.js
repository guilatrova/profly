import React from 'react';
import { useQuery } from '@apollo/client';
import chartQueries from '../../charts/queries';
import savingsQueries from '../queries';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import Typography from '@material-ui/core/Typography';
import { formatCurrency } from '../../utils/money';


const TotalSummary = () => {
  const { error, data = [] } = useQuery(chartQueries.chartStocksValues);
  const { walletError, walletData } = useQuery(savingsQueries.defaultWallet);

  if (error) return <ErrorHandler operation="portfolio summary">{error}</ErrorHandler>;
  if (walletError) return <ErrorHandler operation="wallet summary">{walletError}</ErrorHandler>;

  const chartData = data?.stocks || [];
  const walletTotal = walletData?.value || 0;
  // TODO: Consider different currencies
  const stocksTotal = chartData.reduce((acc, cur) => acc + cur.value, 0);
  const finalValue = stocksTotal + walletTotal;

  return (
    <Typography variant="h2">{formatCurrency(finalValue)}</Typography>
  );
};

export default TotalSummary;
