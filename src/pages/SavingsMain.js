import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import RecentTransactions from 'stocks/transactions/containers/RecentTransactions'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(2),
  },
}))

const Dashboard = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="subtitle2">
            Wallet
          </Typography>

          {/* <PortfolioSummary /> */}
        </Paper>
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

export default Dashboard
