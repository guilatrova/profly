import React from 'react';
import Title from '../../core/components/Title';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import TransactionsTable from '../components/TransactionsTable';
import TransactionForm from './TransactionFormContainer';
import ErrorHandler from '../../core/components/ApolloErrorHandler';

const RecentTransactions = () => {
  const { loading, error, data: transactionsData} = useQuery(queries.listTransactions);

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  const transactions = transactionsData?.transactions;

  return (
    <>
      <Title>Recent Transactions</Title>
      <TransactionsTable loading={loading} data={transactions} />
      <TransactionForm />
    </>
  );
}

export default RecentTransactions;
