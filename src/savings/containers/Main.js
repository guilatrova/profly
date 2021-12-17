import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import SavingsCardsSummary from './SavingsCardsSummary'
// import RecentTransactions from '../../transactions/containers/RecentTransactions';
import TotalSummary from './TotalSummary'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    overflow: 'auto',
    padding: theme.spacing(2),
  },
}))

const Main = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h3">
          Your Savings
        </Typography>

        <Paper className={classes.paper}>
          <Typography component="h2" variant="subtitle2">
            Total
          </Typography>

          <TotalSummary />
        </Paper>

        <SavingsCardsSummary />
      </Grid>
    </Grid>
  )
}

export default Main
