import React from 'react';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import Transactions from '../../transactions/components/Transactions';
import { tickerType, periodType } from '../../core/types';
import { subPeriod } from '../../utils/dates';
import ErrorHandler from '../../core/components/ApolloErrorHandler';


const StockTransactions = ({ ticker, period }) => {
  const start = subPeriod(period).toISOString();
  const { loading, error, data } = useQuery(queries.transactionsFromStock, { variables: { ticker, start }});

  if (error) return <ErrorHandler operation="stock transactions">{error}</ErrorHandler>;

  const tableData = data?.transactionsFilter.found.map(item => item.node);

  return (
    <Transactions
      mode="STOCK"
      loading={loading}
      data={tableData} />
  );
}


StockTransactions.propTypes = {
  ticker: tickerType.isRequired,
  period: periodType.isRequired
}

export default StockTransactions;
