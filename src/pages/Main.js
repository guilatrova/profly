import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SavingsCardsSummary from 'savings/containers/SavingsCardsSummary'
import TotalSummary from 'savings/containers/TotalSummary'

const Main = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h3">
          Your Savings
        </Typography>

        <TotalSummary />

        <SavingsCardsSummary />
      </Grid>
    </Grid>
  )
}

export default Main
