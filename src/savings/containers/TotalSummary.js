import React from 'react'

import Typography from '@material-ui/core/Typography'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'
import chartQueries from 'stocks/charts/queries'
import { formatCurrency } from 'utils/money'

import savingsQueries from '../queries'

const TotalSummary = () => {
  const { error, data = [] } = useQuery(chartQueries.chartStocksValues)
  const { data: walletData, error: walletError } = useQuery(
    savingsQueries.defaultWallet
  )

  if (error)
    return <ErrorHandler operation="portfolio summary">{error}</ErrorHandler>
  if (walletError)
    return <ErrorHandler operation="wallet summary">{walletError}</ErrorHandler>

  const chartData = data?.stocks || []
  const walletTotal = walletData?.wallet?.value || 0
  // TODO: Consider different currencies
  const stocksTotal = chartData.reduce((acc, cur) => acc + cur.value, 0)
  const finalValue = stocksTotal + walletTotal

  return <Typography variant="h2">{formatCurrency(finalValue)}</Typography>
}

export default TotalSummary
