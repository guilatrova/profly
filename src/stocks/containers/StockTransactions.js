import React from 'react';
import Title from '../../core/components/Title';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import TransactionsTable from '../../transactions/components/TransactionsTable';
import { tickerType, periodType } from '../../core/types';
import { subPeriod } from '../../utils/dates';


const StockTransactions = ({ ticker, period }) => {
  const start = subPeriod(period).toISOString();
  const { loading, error, data } = useQuery(queries.transactionsFromStock, { variables: { ticker, start }});

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;

  const tableData = data?.transactionsFilter.found.map(item => item.node);

  return (
    <div>
      <Title>Transactions</Title>
      <TransactionsTable data={tableData} displayStock={false} />
    </div>
  );
}


StockTransactions.propTypes = {
  ticker: tickerType.isRequired,
  period: periodType.isRequired
}

export default StockTransactions;
