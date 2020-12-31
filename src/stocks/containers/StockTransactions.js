import React from 'react';
import Title from '../../core/components/Title';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import TransactionsTable from '../../transactions/components/TransactionsTable';
import { tickerType, periodType } from '../../core/types';
import { subPeriod } from '../../utils/dates';
import ErrorHandler from '../../core/components/ApolloErrorHandler';


const StockTransactions = ({ ticker, period }) => {
  const start = subPeriod(period).toISOString();
  const { loading, error, data } = useQuery(queries.transactionsFromStock, { variables: { ticker, start }});

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  const tableData = data?.transactionsFilter.found.map(item => item.node);

  return (
    <div>
      <Title>Transactions</Title>
      <TransactionsTable loading={loading} data={tableData} displayStock={false} />
    </div>
  );
}


StockTransactions.propTypes = {
  ticker: tickerType.isRequired,
  period: periodType.isRequired
}

export default StockTransactions;
