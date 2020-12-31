import React from 'react';
import Title from '../../core/components/Title';
import queries from '../queries';
import { useQuery } from '@apollo/client';
import TransactionsTable from '../components/TransactionsTable';
import TransactionForm from './TransactionFormContainer';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorHandler from '../../core/components/ApolloErrorHandler';

const RecentTransactions = () => {
  const { loading, error, data: transactionsData} = useQuery(queries.listTransactions);

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  return (
    <>
      <Title>Recent Transactions</Title>
      {loading ? <Skeleton variant="rect" height={150} /> : <TransactionsTable data={transactionsData.transactions} />}
      <TransactionForm />
    </>
  );
}

export default RecentTransactions;
