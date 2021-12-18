import React from 'react'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'
import { periodType, tickerType } from 'core/types'
import { subPeriod } from 'utils/dates'

import Transactions from '../../transactions/components/Transactions'
import queries from '../queries'

const StockTransactions = ({ period, ticker }) => {
  const start = subPeriod(period).toISOString()
  const { data, error, loading } = useQuery(queries.transactionsFromStock, {
    variables: { start, ticker },
  })

  if (error)
    return <ErrorHandler operation="stock transactions">{error}</ErrorHandler>

  const tableData = data?.transactionsFilter.found.map((item) => item.node)

  return <Transactions data={tableData} loading={loading} mode="STOCK" />
}

StockTransactions.propTypes = {
  period: periodType.isRequired,
  ticker: tickerType.isRequired,
}

export default StockTransactions
