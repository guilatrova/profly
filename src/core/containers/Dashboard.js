import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RecentTransactions from '../../transactions/containers/RecentTransactions';
import StocksSummary from './StocksSummary';
import PortfolioSummary from './PortfolioSummary';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle2">Portfolio</Typography>

          <PortfolioSummary />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Typography component="h2" variant="h6">Stocks</Typography>

        <StocksSummary />
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <RecentTransactions />
        </Paper>
      </Grid>

    </Grid>
  );
};

export default Dashboard;
