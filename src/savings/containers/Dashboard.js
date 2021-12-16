import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import RecentTransactions from '../../transactions/containers/RecentTransactions';
import TotalSummary from './TotalSummary';
import SavingsAccordionSummary from './SavingsAccordionSummary';
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
          <Typography component="h2" variant="subtitle2">Total</Typography>

          <TotalSummary />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography component="h2" variant="h6">👛 Savings</Typography>

        <SavingsAccordionSummary />
      </Grid>

    </Grid>
  );
};

export default Dashboard;
