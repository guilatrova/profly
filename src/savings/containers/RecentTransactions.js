import React from 'react'

import { useQuery } from '@apollo/client'
// import TransactionForm from './TransactionFormDrawer';
import ErrorHandler from 'core/components/ApolloErrorHandler'
import Transactions from 'savings/components/Transactions'
import queries from 'savings/queries'

const RecentTransactions = () => {
  const {
    data: transactionsData,
    error,
    loading,
  } = useQuery(queries.listTransactions)

  if (error)
    return (
      <ErrorHandler operation="list savings transactions">{error}</ErrorHandler>
    )

  const transactions = transactionsData?.savingTransactions

  return (
    <>
      {/* <TransactionForm /> */}
      <Transactions data={transactions} loading={loading} />
    </>
  )
}

export default RecentTransactions
