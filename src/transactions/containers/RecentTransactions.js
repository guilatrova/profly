import React from 'react'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'

import Transactions from '../components/Transactions'
import queries from '../queries'
import TransactionForm from './TransactionFormDrawer'

const RecentTransactions = () => {
  const {
    data: transactionsData,
    error,
    loading,
  } = useQuery(queries.listTransactions)

  if (error)
    return <ErrorHandler operation="list transactions">{error}</ErrorHandler>

  const transactions = transactionsData?.transactions

  return (
    <>
      <TransactionForm />
      <Transactions data={transactions} loading={loading} />
    </>
  )
}

export default RecentTransactions
