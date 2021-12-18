import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import PortfolioSummary from 'stocks/containers/PortfolioSummary'
import StocksSummary from 'stocks/containers/StocksSummary'
import RecentTransactions from 'stocks/transactions/containers/RecentTransactions'

const StocksMain = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PortfolioSummary />
      </Grid>

      <Grid item md={6} xs={12}>
        <Typography component="h2" variant="h6">
          🧺 Stocks
        </Typography>

        <StocksSummary />
      </Grid>

      <Grid item md={6} xs={12}>
        <Typography component="h2" variant="h6">
          🛒 Recent transactions
        </Typography>

        <RecentTransactions />
      </Grid>
    </Grid>
  )
}

export default StocksMain
