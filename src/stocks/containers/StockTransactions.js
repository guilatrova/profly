import React from 'react';
import Title from '../../savings/Title';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import TransactionsTable from '../../transactions/components/TransactionsTable';
import TransactionForm from '../../transactions/containers/TransactionFormContainer';
import { tickerType, periodType } from '../../core/types';

const StockTransactions = ({ ticker, period }) => {
  const start = "2020-01-01T00:00";
  const { loading, error, data } = useQuery(queries.transactionsFromStock, { variables: { ticker, start }});

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;

  const tableData = data?.transactionsFilter.found.map(item => item.node);

  return (
    <>
      <Title>Transactions</Title>
      <TransactionsTable data={tableData} />
      <TransactionForm />
    </>
  );
}


StockTransactions.propTypes = {
  ticker: tickerType.isRequired,
  period: periodType.isRequired
}

export default StockTransactions;
