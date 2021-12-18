import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { COLORS } from 'stocks/charts/components/StockHistoryLineChart'
import StockHistoryLineChart from 'stocks/charts/containers/StockHistoryLineChart'
import PeriodToggle from 'stocks/components/PeriodToggle'
import StockBreadcrumbs from 'stocks/components/StockBreadcrumbs'
import StockStatusSummary from 'stocks/containers/StockStatusSummary'
import StockTransactions from 'stocks/containers/StockTransactions'
import ValueHeader from 'stocks/containers/ValueHeader'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(2),
  },
  paperChart: {
    background: COLORS.background,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  paperless: {
    padding: theme.spacing(2),
  },
}))

const StockPage = () => {
  const classes = useStyles()
  const { ticker } = useParams()
  const [period, setPeriod] = useState('ytd')
  const interval = period == '1d' ? '1h' : '1d'

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">{ticker}</Typography>
        <StockBreadcrumbs location={ticker} />
      </Grid>

      <Grid item xs={12}>
        <ValueHeader ticker={ticker} />
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paperChart}>
          <StockHistoryLineChart
            interval={interval}
            period={period}
            ticker={ticker}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <PeriodToggle onChange={setPeriod} />
      </Grid>

      <Grid container className={classes.paperless}>
        <Grid item md={6} xs={12}>
          <Typography component="h2" variant="h6">
            Status
          </Typography>
          <StockStatusSummary ticker={ticker} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography component="h2" variant="h6">
          Transactions
        </Typography>
        <StockTransactions period={period} ticker={ticker} />
      </Grid>
    </Grid>
  )
}

export default StockPage
