import React from 'react';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import Transactions from '../components/Transactions';
import TransactionForm from './TransactionFormDrawer';
import ErrorHandler from '../../core/components/ApolloErrorHandler';

const RecentTransactions = () => {
  const { loading, error, data: transactionsData} = useQuery(queries.listTransactions);

  if (error) return <ErrorHandler operation="list transactions">{error}</ErrorHandler>;

  const transactions = transactionsData?.transactions;

  return (
    <>
      <TransactionForm />
      <Transactions loading={loading} data={transactions} />
    </>
  );
}

export default RecentTransactions;
