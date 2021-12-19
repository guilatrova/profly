import React from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import RecentTransactions from 'savings/containers/RecentTransactions'
import WalletsSummary from 'savings/containers/WalletsSummary'

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <WalletsSummary />
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Grid item md={6} xs={12}>
            <Typography component="h2" variant="h6">
              🛒 Recent transactions
            </Typography>

            <RecentTransactions />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Dashboard
