import React from 'react';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import Transactions from '../components/Transactions';
import TransactionForm from './TransactionFormContainer';
import ErrorHandler from '../../core/components/ApolloErrorHandler';

const RecentTransactions = () => {
  const { loading, error, data: transactionsData} = useQuery(queries.listTransactions);

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  const transactions = transactionsData?.transactions;

  return (
    <>
      <Transactions loading={loading} data={transactions} />
      <TransactionForm />
    </>
  );
}

export default RecentTransactions;
