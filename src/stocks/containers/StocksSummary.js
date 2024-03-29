import React from 'react'

import Grid from '@material-ui/core/Grid'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'
import StocksTable from 'stocks/components/StocksTable'
import queries from 'stocks/queries'

const StocksSummary = () => {
  const { loading, error, data = [] } = useQuery(queries.chartStocksValues)

  if (error)
    return <ErrorHandler operation="stocks summary">{error}</ErrorHandler>

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StocksTable data={data?.stocks} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default StocksSummary
