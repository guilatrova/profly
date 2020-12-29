import React from 'react';
import Title from '../../savings/Title';
import queries from '../../savings/queries';
import { useQuery } from '@apollo/client';
import TransactionsTable from '../components/TransactionsTable';
import TransactionForm from './TransactionFormContainer';

const RecentTransactions = () => {
  const { loading, error, data: transactionsData} = useQuery(queries.listTransactions);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <pre>{JSON.stringify(error)}</pre></p>;

  return (
    <>
      <Title>Recent Transactions</Title>
      <TransactionsTable data={transactionsData.transactions} />
      <TransactionForm />
    </>
  );
}

export default RecentTransactions;
